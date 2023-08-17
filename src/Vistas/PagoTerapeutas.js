import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Headers from "../components/Headers/Headers"
import { urlApi } from "../auth-helpers";
import { Loading } from "../components/Loading";

function PagoTerapeutas() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dataPaciente, setDataPaciente] = useState([]);
  const [loading, setLoading] = useState(false);
  const resportes = useRef();
  const pagotera = useRef();
  const [idterapeuta, setIdterapeuta] = useState(0);
  const [terapeuta, setTerapeuta] = useState([]);
  const [total, setTotal] = useState(0);



  useEffect(() =>{

    axios
    .get(`${urlApi}Clinica/terapeuta`)

    .then((response) => {
      setTerapeuta(response.data.usuarios);
    });
  },[])

  const data = {
    FechaInicio: startDate,
    FechaFinal: endDate,
    IdTerapeuta:idterapeuta
  }; 

  const enviars = (e) => {
    e.preventDefault();

    resportes.current.classList.add("contenedors");

   
    
    axios.post(`${urlApi}Clinica/ListaEvaluacions`, data).then((result) => {
      setDataPaciente(result.data)

      const total =  result.data.map(c => c.price).reduce((acc , curr) => acc + curr,0)

      setTotal(total)

  /*      let obj = [];
       let validos = [];

    result.data.map(a => {

      let  existe = validos.filter(t => t.terapeuta.idUser == 59)
   
      if(existe.length > 0){

        let precio = existe.map(p => p.price += a.price)
     
        console.log("si existe")
      }else{
      validos.push(a)
       setDataPaciente(validos)
      }
      
    }) */
  
    resportes.current.classList.remove("contenedors");
    });
  };

  const Fterapeuta = (e) => {
    setIdterapeuta(e);
  };

  return (
    <div>
      <div className="cont-formPagoTerapeuat" ref={pagotera}>

        <form className="formPagoTerapeuat" onSubmit={enviars} ref={resportes}>
          {loading ? <Loading /> : ""}
          <div className="cont-titu-gastos">
            <h1>Pagos a Terapeutas</h1>
          </div>

          <div className="cont-box-body-gastos">

            <div className="padrePagoTerapeuta" id="cont-input-gastos">

              <div>
                <label>Fecha Inicio</label>
                  <input required type="date" className="inputgastos"onChange={(e) => setStartDate(e.target.value)}/>                  
                
                <label>Fecha Fin</label>
                <input
                  type="date"
                  className="inputgastos"
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

             <div >    
                <select className="inputgastos" onChange={(e) => Fterapeuta(e.target.value)}  required  >
                     
                  <option value="">Seleccione un Terapeuta</option>
                  {terapeuta.map((item) => [
                    <option value={item.idUser} key={item.idUser}>
                      {item.names} {item.apellido}{" "}
                    </option>,
                  ])}
                  </select>
              </div>
           


              <div >
                <button className="btn-gastos" type="submit">
                  Buscar
                </button>
              </div>
            </div>
            <hr></hr>

            <table className="table-formPagoTerapeuat">
              <thead>
                <tr>
                  <th>Terapeuta</th>
                  <th>Terapia</th>
                  <th>Paciente</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Razón </th>
                </tr>
              </thead>
              <tbody>
                {dataPaciente.map((x, c) => [
                  <tr key={c}>
                    <td>{x.terapeuta.names}  {x.terapeuta.apellido}</td>
                    <td>{x.terapia.label}</td>
                    <td>{x.paciente.name}</td>
                    <td>RD${parseFloat(x.price).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>{x.fechaInicio.substring("", 10)}</td>
                    <td>{x.tipoAsistencia.descripcion}</td>
                  </tr>,
                ])}
              </tbody>
            </table>
          </div>

          <div className="total-pagoTerapeuta" >
            { total ? 
                 <p>Total a Pagar: RD${parseFloat(total).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>      
              :
              ""
            }
          </div>

        </form>
         <Headers  pagotera={pagotera} />
      </div>
    </div>
  );
}

export default PagoTerapeutas;
