import { useState, useEffect, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import Headers from "../../components/Headers/Headers"
import "../../Tabla.css";
import ModalTerapia from "../../components/Modal/ModalTerapia/ModalTerapia";
import ModalEliminar from "../../components/Modal/ModalEliminar/ModalEliminar";
import "./ListadoDeTerapias.css";
function ListasTerapias() {
  
  const [terapias, setTerapias] = useState([]);
  const [nmTerapias, setNmTerapias] = useState("  ");
  const [descripcion, setDescripcion] = useState("  ");
  const [price, setPrice] = useState(0);
  const [idEliminar, setIdEliminar] = useState();
  const [id, setId] = useState();
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');
  const [porcentaje1, setPorcentaje1] = useState('');
  const [porcentaje2, setPorcentaje2] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [title, setTitle] = useState('');
  const [mensaje, setMensaje] = useState('');

  
  const modalEditar = useRef();

  useEffect(() => {
    cargar();
  }, []);

  
  const cargar = (async) => {
    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/ListaTerapia")
      .then((response) => {
        setTerapias(response.data);   
      });
  };


  const dataEdi = {
    IdTherapy: id,
    Label: nmTerapias,
    Description: descripcion,
    Price: price,
    Porcentaje: parseInt(porcentaje1.toString().replace("%", "")),
    PorcentajeCentro:parseInt(porcentaje2.toString().replace("%", "")),
  };

  const SubmitEditar = (e) => {
    e.preventDefault();
    const url ="https://jdeleon-001-site1.btempurl.com/api/Clinica/EditarTerapia";
    axios.post(url, dataEdi).then((res) => {
      
      if(res.status === 200){
        modalEditar.current.classList.remove("active_modal_editar_terapia");
        cargar();
           swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
        });
      }
      
     
    }).catch((error) => {
      swal(error.response.data, "Intentelo mas tarde", "error");
    }) ;
  };



  function editar(e) {
    modalEditar.current.classList.add("active_modal_editar_terapia");

    setId(e);
    const res = terapias.filter((item) => item.nombreTerapia.idTherapy == e);
    res.map((item) => [
      setNmTerapias(item.nombreTerapia.label),
      setDescripcion(item.nombreTerapia.description),
      setPrice(item.nombreTerapia.price),
      setInput1Value(item.nombreTerapia.porcentaje),
      setInput2Value(item.nombreTerapia.porcentajeCentro),
    ]);
  }

  function refreshPage() {
    window.location.reload();
  }


  function quitarModal() {
    modalEditar.current.classList.remove("active_modal_editar_terapia");
  }

  const modalEliminar = (e) => {
    setTitle("Eliminar Terapia");
    setShowModalEliminar(true)

    const res = terapias.filter((item) => item.nombreTerapia.idTherapy == e);
    res.map((item) => {
    setMensaje(item.nombreTerapia.label);
  });

  setIdEliminar(e);
  };

  const myElementTerapia = useRef(null);


  const handleInput1Change = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 2) {
    if (!isNaN(parseFloat(inputValue))) { 
      const porcentaje1 = parseFloat(inputValue);
      const porcentajeRestante = 100 - porcentaje1;

      setInput1Value(inputValue);
      setInput2Value(porcentajeRestante + '%');
      setPorcentaje1(inputValue);
      setPorcentaje2(porcentajeRestante + '%');
    } else {
      setInput1Value(inputValue);
      setInput2Value('');
      setPorcentaje1('');
      setPorcentaje2('');
      
    }
  }
  };

  const handleInput2Change = (event) => {
  const inputValue = event.target.value;

  if (inputValue.length <= 2) { 
      if (!isNaN(parseFloat(inputValue))) { // Verificar si es un número válido
        const porcentaje2 = parseFloat(inputValue);
        const porcentajeRestante = 100 - porcentaje2;

        setInput2Value(inputValue); // Mantener el valor sin el signo de porcentaje
        setInput1Value(porcentajeRestante + '%');
        setPorcentaje1(porcentajeRestante + '%');
        setPorcentaje2(inputValue + '%');
      } else {
        setInput2Value(inputValue);
        setInput1Value('');
        setPorcentaje1('');
        setPorcentaje2('');
      }
}
};

  
  
  
  return (
    <div>
      <Headers myElementTerapia={myElementTerapia} />

      <div className="table-container" ref={myElementTerapia} id="ggs">
        <div className="sex-tables">
          <div className="cont-titu-terapia">
            <h1>Listado de Terapias</h1>
          </div>
          <div className="cont-crear-paciente" id="cont-crear-terapia-listado">
            <button className="btn-crear-Paciente-tabla" onClick={() => setShowModal(true)}>
              Crear Terapia
            </button>
          </div>

          <div className="sub-2">
            <table className="table" id="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Porcentaje del Terapeuta</th>
                  <th>Porcentaje del Centro</th>    
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {terapias.map((item ,index) => [
                  <tr key={index}>
                    <td data-label="Nombre">{item.nombreTerapia.label}</td>
                    <td data-label="Descripcion">
                      {item.nombreTerapia.description}
                    </td>
                    <td data-label="Price">RD${parseFloat(item.nombreTerapia.price).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td data-label="Price">{item.nombreTerapia.porcentaje}%</td>
                    <td data-label="Price">{item.nombreTerapia.porcentajeCentro}%</td>
                    
                    <td className="tr-btn">
                      <button
                        className="btn-tabla-usuario "
                        type="button"
                        value={item.nombreTerapia.idTherapy}
                        onClick={(e) => editar(e.target.value)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-tabla-usuario-eliminar"
                        type="button"
                        value={item.nombreTerapia.idTherapy}
                        onClick={(e) => modalEliminar(e.target.value)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>,
                ])}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
      {/*  EDITAR TERAPIA */}

      <div className="cont_modal_editar_terapia" ref={modalEditar}>
        
        <form onSubmit={SubmitEditar} className="form_terapia_editar" id="FormularioEditarTherapy">
          <div className="cont_titu_terapia_editar">
            <h1>Editar Terapia</h1>
          </div>

          <div className="box_con_editar">
          <div>
              <label>Terapia</label>
              <input
                required
                placeholder="Terapia"
                value={nmTerapias}
                onChange={(e) => setNmTerapias(e.target.value)}
              />
            </div>

            <div>
              <label>Descripción</label>
              <input
                required
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
          
            <div>
              <label>Porcentaje del Centro</label>
              <input
                placeholder="Porcentaje del Centro"
                value={input2Value}
                onChange={handleInput2Change}
                required
              />
            </div>
            <div>
              <label>Porcentaje del Terapeuta </label>
              <input
                placeholder="Porcentaje del Terapeuta"
                id="precio"
                required
                value={input1Value}
                onChange={handleInput1Change}
              />
             
            </div>
           
          </div>

          <div>
              <label>Precio</label>
              <input
              required
                placeholder="Precio"
                value={parseFloat(price).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

          <input className="btn editar" type="submit" value="Editar"/>
          <button className="btn cancelar" type="button" onClick={quitarModal}>Cancelar </button>
                       
        </form>
      </div> 

      {/*  CREAR TERAPIA */}
      <ModalTerapia setShowModal={setShowModal} showModal={showModal} cargar={cargar}/>

      {/*  ELIMINAR TERAPIA */}
      <ModalEliminar cargar={cargar} idEliminar={idEliminar} mensaje={mensaje} title={title} showModalEliminar={showModalEliminar} setShowModalEliminar={setShowModalEliminar} />
    </div>
  );
}

export default ListasTerapias;
