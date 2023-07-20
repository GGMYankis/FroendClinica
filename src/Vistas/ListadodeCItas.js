import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import Headers from "../components/Headers/Headers"

import {getDatosUsuario,getUsuarioCompleto} from "../auth-helpers";
import Select from 'react-select';
import {Loading} from "../components/Loading"

function ListadodeCItas() {

  const modalCrear = useRef();
  const modalEditar = useRef();
  const alertEliminar = useRef();
  const FormularioTherapy = document.getElementById("txtCrearPaciente");
  const [citas, setCitas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [verificarActivo, setVerificarActivo] = useState(false);
  let rol = getUsuarioCompleto();
  const RefCitas = useRef(null);
  const [terapia, setTerapia] = useState(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [dataPaciente, setDataPaciente] = useState([]);
  const [datas, setData] = useState([]);
  const [terapeuta, setTerapeuta] = useState([]);
  const [consultorios, setconsultorios] = useState([]);
  const [idPatients, setIdPatients] = useState(0);
  const [idterapeuta, setIdterapeuta] = useState(0);
  const [consul, setConsul] = useState(0);
  const [repetir, setRepetir] = useState(0);
  const [day, setDay] = useState([]);
  const [frecuencia, setFrecuencia] = useState("");
  const [priceEvaluacion, setPriceEvaluacion] = useState(0);
  const [idEvaluacion, setIdEvaluacion] = useState(0);
  const [nomPaciente, setNomPaciente] = useState("");
  const [recurrencia, setRecurrencia] = useState(0);
  const [dayEnviar, setDayEnviar] = useState([]);
  const [visitas, setVisitas] = useState(false);
  const [fechaInicioF, setFechaInicioF] = useState('');
  const [fechaFinF, setFechaFinF] = useState('');
  const [pricePrimeraEvaluacion, setPricePrimeraEvaluacion] = useState(0);
  const [loading, setLoading] = useState(false);


  const [dataCrear, setDataCrear] = useState({
    idPatients:"",
    idTherapy:"",
    fechaInicio:"",
    idTerapeuta:"",
    price:null,
    firstPrice:"",
    idConsultorio:"",
    Dias:[],
    Visitas:true,
   /*  repetir:"",
    frecuencia:"", */
  });

  function handleChange(e) {
    setDataCrear({
         ...dataCrear,
         [e.target.name]: e.target.value
    })
  }

  let id = getDatosUsuario();

  const date = {
    Idterapeuta: id,
  };

  const objDias = [
    {label:"lunes", value:"lunes"},
    {label:"martes", value:"martes"},
    {label:"miercoles", value:"miercoles"},
    {label:"jueves", value:"jueves"},
    {label:"viernes", value:"viernes"},
    {label:"sabado", value:"sabado"},
    {label:"domingo", value:"domingo"}
  ];




  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {

    try {

      const res = await axios.get("https://jdeleon-001-site1.btempurl.com/api/Citas/Citas");
      setCitas(res.data);
    } catch (error) {
      console.error("el error es : " + error);
    }
   

    if (rol == 2) {
      axios
        .post(
          "https://jdeleon-001-site1.btempurl.com/api/Clinica/BuscarPacientePorTerapeuta",
          date
        )
        .then((responses) => {
          setDataPaciente(responses.data);
        });
    } else {
      axios
        .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Lista")
        .then((responses) => {
          setDataPaciente(responses.data);
        });
    }

    if (rol == 2) {
      axios
        .post(
          "https://jdeleon-001-site1.btempurl.com/api/Clinica/GetEvaluacionByTerapeuta",
          date
        )
        .then((response) => {
          setData(response.data);
        });
    } else {
      axios
        .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/ListaTerapia")
        .then((response) => {
          setData(response.data);
        });
    }

    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/terapeuta")

      .then((response) => {
        setTerapeuta(response.data.usuarios);
      });
    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Consultorios")

      .then((response) => {
        setconsultorios(response.data.lista);
      });
  };

  const CrearCitas = async (e) => {
    e.preventDefault();
    try{


      setLoading(true)

      const res = await axios.post("https://jdeleon-001-site1.btempurl.com/api/traerpaciente/CrearEvaluacion",dataCrear);
      if(res.status == 200){
        setLoading(false)
        cargar();
          modalCrear.current.classList.remove("active");
          const ale = await swal({
            title: "Correcto",
            text: "Cambio guardado ",
            icon: "success",
          });
      }
    }catch(error){   
      setLoading(false)
      swal(error.response.data, "Intentelo mas tarde", "error");
    }
     
  };

  const dtEditar = {
    Id: parseInt(idEvaluacion),
    IdPatients: parseInt(idPatients),
    IdTherapy: parseInt(terapia),
    Price: parseInt(priceEvaluacion),
    FirstPrice: parseInt(pricePrimeraEvaluacion),
    IdTerapeuta: parseInt(idterapeuta),
    visitas: visitas,
    IdConsultorio: consul,
    IdConsultorioNavigation: null,
  };

  const dtRecu = {
    IdRecurrencia: recurrencia,
    FechaInicio: fechaInicio,
    Repetir: repetir,
    Frecuencia: frecuencia,
    DiasA: dayEnviar,
    IdEvaluation:parseInt(idEvaluacion),
  };

  function handle(selectedItems) {

    const diasEnviar = []

    selectedItems.map(item => {
  
    diasEnviar.push(item.value);
    setDayEnviar(diasEnviar);
   dataCrear.Dias = diasEnviar

 
 })

   setDay(selectedItems)

}


  const  EnviarEvaluacionEditada = async(e) =>{
    e.preventDefault();


    const res =  axios.post("https://jdeleon-001-site1.btempurl.com/api/Clinica/EditarCitas",dtEditar);
    const resRecurrencia = await axios.post("https://jdeleon-001-site1.btempurl.com/api/traerpaciente/EditarRecurrencia",dtRecu);
    if(resRecurrencia.status == 200){
      cargar();
      modalEditar.current.classList.remove("active");
      const ale = await swal({
        title: "Correcto",
        text: "Cambio guardado ",
        icon: "success",
      }); 
     }
  }

  const modalCraePaciente = () => {
    modalCrear.current.classList.add("active");
  };


  const CancelarPaciente = () => {
    modalCrear.current.classList.remove("active");
    FormularioTherapy.reset();
  };

  const CancelarPacienteEditar = () => {
    modalEditar.current.classList.remove("active");
  };

  const handleEdit = (e) => {
    setIdEvaluacion(e);
    modalEditar.current.classList.add("active");

    const IdEvaluacion = citas.filter((item) => item.idEvaluacion == e);

      const dias = [];
    const diasEDITAR = [];

   IdEvaluacion.map(e => {
      
    e.diasUi.map(d => {

      const dia = {
        label: d,
        value:d
      };
        diasEDITAR.push(d)
        dias.push(dia)
      })
    })

    setDay(dias)
    setDayEnviar(diasEDITAR)
   
    IdEvaluacion.map((item) => [ 
       setIdPatients(item.paciente.idPatients),
      setTerapia(item.terapia.idTherapy),
      setIdterapeuta(item.terapeuta.idUser),
      setConsul(item.consultorio.idConsultorio),
      setPriceEvaluacion(item.price),
      setFechaInicio(item.fechaInicio),
      setRepetir(item.repetir),
      setFrecuencia(item.frecuencia),
      setRecurrencia(item.recurrencia.idRecurrencia),   
    setPricePrimeraEvaluacion(item.firstPrice),   
    ]);
  };

  const columns = [
    {
      name: "Paciente",
      selector: (row) => row.paciente.name,
      sortable: true,
    },
    {
      name: "Terapia",
      selector: (row) => row.terapia.label,
      sortable: true,
    },
    ,
    {
      name: "Terapeuta",
      selector: (row) => row.terapeuta.names + " " +row.terapeuta.apellido,
      sortable: true,
    },
    {
      name: "Fecha Inicio",
      selector: (row) => row.fechaInicio,
      sortable: true,
      cell: (row) => new Date(row.fechaInicio).toLocaleDateString(),
    },
    {
      name: "Consultorio",
      selector: (row) => row.consultorio.nombre,
      sortable: true,
    },

    {
      cell: (row) => (
        <div className="actions-container">
          <button
            className="btnEditar"
            onClick={() => handleEdit(row.idEvaluacion)}
          >
            Editar
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) => (
        <div className="actions-container">
          <button className="btn-tabla-usuario-eliminar"  onClick={() => modalEliminar(row.idEvaluacion)}>            
            Eliminar
            </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleFilter = (e) => {
    const keyword = e.target.value;
    if (keyword === "") {
      setFilteredData(citas);
      return;
    } else {
      const filteredResults = citas.filter((item) => {
        return item.paciente.name.toLowerCase().includes(keyword.toLowerCase());
      });
      setFilteredData(filteredResults);
    }
  };

 
 
  function Fterapia(e) {
    setTerapia(e);
  }


  const modalCerrarEliminar = () => {
    alertEliminar.current.classList.remove("activeEli");
  };
  
  const handleEliminar = () => {

    const idEva = {
       IdEvaluation: idEvaluacion,
       IdRecurrencia:recurrencia
      };


    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/EliminarCita";
     axios
      .post(url,idEva)
      .then((result) => {
        const probar = async () => {
          alertEliminar.current.classList.remove("activeEli");

          setFilteredData([]);
          cargar();

          const ale = await swal({
            title: "Correcto",
            text: "Cambio guardado ",
            icon: "success",
          });
        };

        if (result) {
          probar();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const modalEliminar = (e) => {
    const IdEliminarCita = citas.filter(
      (item) => item.idEvaluacion == e
    );

    IdEliminarCita.map((item) => {
      setNomPaciente(item.paciente.name);
      setRecurrencia(item.recurrencia.idRecurrencia)
    }); 
     setIdEvaluacion(e)
    alertEliminar.current.classList.add("activeEli");
  };

 function filtrarCitasFechas () {
  setCitas([])
    const fechaConHora = citas.filter(cita => cita.fechaInicio.substring(0, 10) >= fechaInicioF
      &&
      cita.fechaInicio.substring(0, 10) < fechaFinF )
      setCitas(fechaConHora)
 }


 function getCurrentDateTime() {
  const now = new Date();
  let month = (now.getMonth() + 1).toString();
  let day = now.getDate().toString();
  let hour = now.getHours().toString();
  let minute = now.getMinutes().toString();

  month = month.length === 1 ? '0' + month : month;
  day = day.length === 1 ? '0' + day : day;
  hour = hour.length === 1 ? '0' + hour : hour;
  minute = minute.length === 1 ? '0' + minute : minute;

  return `${now.getFullYear()}-${month}-${day}T${hour}:${minute}`;
}


  return (
    <div>
      <Headers RefCitas={RefCitas} />

      <div id="table-container" className="table-container" ref={RefCitas}>
        <div className="sex-tables">
          <div className="cont-titu-tables">
            <h1>Listado de Citas</h1>
          </div>

          <div className="cont-action">
            <div className="cont-crear-paciente">
              <button
                className="btn-crear-Paciente-tabla"
                onClick={modalCraePaciente}
              >
                {" "}
                Crear Cita
              </button>
         
              
            </div>

            <div className="cont-crear-paciente">
              <label>Citas</label>
              <input
                id="txtbuscar"
                placeholder="Buscar"
                onChange={handleFilter}
                autoComplete="off"
              />
            </div>

            <form onSubmit={filtrarCitasFechas} className="filtrarCitastables">            
            <div className="cont-crear-paciente">
              <label>Fecha Inicio</label>   
              <input
                id="txtbuscar"
                placeholder="Buscar"
                onChange={e => setFechaInicioF(e.target.value)}
                autoComplete="off"
                type="date" 
                required
              />
            </div>
            <div className="cont-crear-paciente">
              <label>Fecha Fin</label>   
              <input
                id="txtbuscar"
                placeholder="Buscar"
                onChange={e => setFechaFinF(e.target.value)}
                autoComplete="off"
                type="date"
                required
              />
            </div>

            <button
                className="btn-gastos"
                
              >
                {" "}
                Buscar
              </button>
              </form>
          </div>

          <DataTable
            columns={columns}
            data={
              verificarActivo || filteredData.length > 0 ? filteredData : citas
            }
            pagination
          />
        </div>
      </div>



      <div className="modal-paciente" ref={modalCrear}>
        <form onSubmit={CrearCitas} className="contenedor-cita"id="txtCrearCita">

          {
            loading ? <Loading/> : ""
          }
          
          <div className="cont-titulo-form">
            <h1>Nuevas Citas </h1>
          </div>

          <div className="paddd">
            <div className="row">
              <div className="col">
                <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Paciente{" "}
                  </label>
                  {rol == 2 ? (
                    <div className="rowCitas">
                      <p className="titu-barra"> Pacientes </p>
                      <select
                        className="form-select"
                        required
                        onChange={handleChange} 
                        name="idPatients"
                      >
                        <option value="">Seleccione una paciente</option>
                        {dataPaciente.map((item) => [
                          <option
                            key={item.nombrePaciente.idPatients}
                            value={item.nombrePaciente.idPatients}
                          >
                            {item.nombrePaciente.name}
                          </option>,
                        ])}
                      </select>
                    </div>
                  ) : (
                    <div className="rowCitas">
                      <select
                        className="form-select"
                        required
                        onChange={handleChange} 
                        name="idPatients"

                      >
                        <option value="">Seleccione una paciente</option>
                        {dataPaciente.map((item) => [
                          <option key={item.idPatients} value={item.idPatients}>
                            {item.name}
                          </option>,
                        ])}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Terapia{" "}
                  </label>
                  <select
                    className="form-select"
                    onChange={handleChange} 
                    required
                    name="idTherapy"

                  >
                    <option value="">Seleccione una terapia</option>
                    {datas.map((item) => [
                      <option
                        key={item.nombreTerapia.idTherapy}
                        value={item.nombreTerapia.idTherapy}
                      >
                        {item.nombreTerapia.label}
                      </option>,
                    ])}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                {" "}
                <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Fecha Inicio{" "}
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control "
                    id="validationServer02"
                    required
                    onChange={handleChange} 
                    min={getCurrentDateTime()}
                    name="fechaInicio"
                  />
                </div>
              </div>
              <div className="col">
                <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Terapeuta{" "}
                  </label>
                  <select
                    className="form-select"
                    onChange={handleChange} 
                    required
                    name="idTerapeuta"
                  >
                    <option value="">Seleccione un Terapeuta</option>
                    {terapeuta.map((item) => [
                      <option value={item.idUser} key={item.idUser}>
                        {item.names} {item.apellido}{" "}
                      </option>,
                    ])}
                  </select>
                </div>
              </div>
            </div>

              <div className="rowCitas">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Precio{" "}
                </label>
                <input
                 onChange={handleChange} 
                  type="text"
                  className="barraInput"
                  name="price"
                />
              </div>
              <div className="rowCitas">
                <label htmlFor="validationServer02" className="labelPaciente">
                Precio de la primera Evaluación{" "}
                </label>
                <input
                 onChange={handleChange} 
                  required
                  type="text"
                  className="barraInput"
                  name="firstPrice"
                />
              </div>
              
            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Consultorio{" "}
              </label>
              <select
                className="form-select"
                onChange={handleChange} 
                required
                name="idConsultorio"
              >
                    <option value="">Seleccione un Consultorio</option>

                {consultorios.map((item) => [
                  <option value={item.idConsultorio} key={item.idConsultorio}>
                    {item.nombre}{" "}
                  </option>,
                ])}
              </select>
            </div>

            <div className="rowCitas" id="ultidias">
              <label htmlFor="validationServer02" className="labelPaciente">
               Días{" "}
              </label>
              <Select
                                        isMulti
                                        options={objDias}
                                        onChange={e => handle(e)}                                       
                                        placeholder = "Seleccione una Terapia"
                                        name="dias"
                                        required
                                    />
            
            </div>

           {/*  <div id="ulticita">
                <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Repetir{" "}
                  </label>
                  <input
                    type="number"
                    className="recu-repe"
                    required
                    min="1"
                    onChange={handleChange} 
                    name="repetir"
                  />
                </div>
                {" "}
                <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Frecuencia{" "}
                  </label>
                  <select
                    className="recu-select"
                    required
                    onChange={handleChange} 
                    name="frecuencia"
                  >
                    <option>Diario</option>
                    <option>Semanal</option>
                    <option>Mensual</option>
                  </select>

              </div>
            </div> */}

            <div className="col" id="cont-btn-admin">
              <button className="btnWeb">Guardar</button>
              <button
                className="btnWeb"
                type="button"
                onClick={CancelarPaciente}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>


      <div className="modal-paciente" ref={modalEditar}>
        <form
          onSubmit={EnviarEvaluacionEditada}
          className="contenedor-cita"
          id="txtCrearPaciente"
        >
          <div className="cont-titulo-form">
            <h1>Editar Cita </h1>
          </div>

          <div className="paddd">
            <div className="row">
              <div className="col">
                <div className="">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Paciente{" "}
                  </label>
                  {rol == 2 ? (
                    <div className="rowCitas">
                      <p className="titu-barra"> Pacientes </p>
                      <select
                        className="form-select"
                        required
                        onChange={(e) => setIdPatients(e.target.value)}
                      >
                        <option value="">Seleccione una paciente</option>
                        {dataPaciente.map((item) => [
                          <option
                            key={item.nombrePaciente.idPatients}
                            value={item.nombrePaciente.idPatients}
                          >
                            {item.nombrePaciente.name}
                          </option>,
                        ])}
                      </select>
                    </div>
                  ) : (
                    <div className="">
                      <select
                        className="form-select"
                        required
                        onChange={(e) => setIdPatients(e.target.value)}
                        value={idPatients}
                      >
                        {dataPaciente.map((item) => [
                          <option key={item.idPatients} value={item.idPatients}>
                            {item.name}
                          </option>,
                        ])}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="col">
                <div>
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Terapia{" "}
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => Fterapia(e.target.value)}
                    required
                    value={terapia}
                  >
                    {datas.map((item) => [
                      <option
                        key={item.nombreTerapia.idTherapy}
                        value={item.nombreTerapia.idTherapy}
                      >
                        {item.nombreTerapia.label}
                      </option>,
                    ])}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">

              <div className="col">
                <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Precio{" "}
                  </label>
                  <input
                    onChange={(e) => setPriceEvaluacion(e.target.value)}
                    type="text"
                    value={parseFloat(priceEvaluacion).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    className="form-control "
                  />
                </div>
              </div>

              <div className="col">
                <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Fecha Inicio{" "}
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control "
                    id="validationServer02"
                    required
                    onChange={(e) => setFechaInicio(e.target.value)}
                    value={fechaInicio}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                {" "}
                <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Terapeuta{" "}
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setIdterapeuta(e.target.value)}
                    required
                    value={idterapeuta}
                  >
                    {terapeuta.map((item) => [
                      <option value={item.idUser} key={item.idUser}>
                        {item.names} {item.apellido}{" "}
                      </option>,
                    ])}
                  </select>
                </div>
              </div>
              <div className="col">
                {" "}
                <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Consultorio{" "}
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setConsul(e.target.value)}
                    required
                    value={consul}
                  >
                    {consultorios.map((item) => [
                      <option
                        value={item.idConsultorio}
                        key={item.idConsultorio}
                      >
                        {item.nombre}{" "}
                      </option>,
                    ])}
                  </select>
                </div>
              </div>
            </div>

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
              Días{" "}
              </label>
              <Select
                                        isMulti
                                        options={objDias}
                                        onChange={(e) => handle(e)}
                                        value={day} 
                                        required
                                        placeholder = "Seleccione una Terapia"
                                    />


         
            </div>

              <div className="row">
                       <div className="rowCitas">
                            <label htmlFor="validationServer02" className="labelPaciente">
                            Precio de la primera Evaluación{" "}
                            </label>
                            <input
                           onChange={(e) => setPricePrimeraEvaluacion(e.target.value)}
                              required
                              type="text"
                              value={pricePrimeraEvaluacion}
                              className="form-control "
                            />
                          </div>
                 </div>


            <div className="row" id="ulticita">
              <div className="col">
                {" "}
             {/*    <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Repetir{" "}
                  </label>
                  <input
                    type="number"
                    className="repeti-citas"
                    required
                    min="1"
                    onChange={(e) => setRepetir(e.target.value)}
                    value={repetir}
                  />
                </div> */}
              </div>
              <div className="col">
                {" "}
             {/*    <div className="rowCitas">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Frecuencia{" "}
                  </label>
                  <select
                    className="recu-select"
                    required
                    onChange={(e) => setFrecuencia(e.target.value)}
                    value={frecuencia}
                  >
                    <option>Diario</option>
                    <option>Semanal</option>
                    <option>Mensual</option>
                  </select>
                </div> */}
              </div>
            </div>

            <div className="col" id="cont-btn-admin">
              <button className="btn-cita">Guardar</button>
              <button
                className="btn-cita"
                type="button"
                onClick={CancelarPacienteEditar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
      
        
      <div className="modal-usuario-eliminar" ref={alertEliminar}>
        <div className="modal-dialog-usuario" role="document">
          <div className="modal-content-usuario">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar Cita</h5>
            </div>
            <div className="sub-box-usuario">
              <div className="modal-body">
                {
                  <p>
                    ¿Deseas eliminar la cita con : 
                    <span className="text-eliminar"> {nomPaciente} </span> ?
                  </p>
                }
              </div>
              <hr></hr>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn si"
                  data-dismiss="modal"
                  onClick={handleEliminar}
                >
                  Si
                </button>
                <button
                  type="button"
                  className="btn no"
                  onClick={modalCerrarEliminar}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> 

    </div>
  );
}

export default ListadodeCItas;


