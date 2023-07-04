import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import Headers from "../Headers";
import {getDatosUsuario , getUsuarioCompleto} from "../auth-helpers";
import { Loading } from "../components/Loading";

function Evaluacion() {

  const [data, setData] = useState([]);
  const [dataPaciente, setDataPaciente] = useState([]);
  const [day, setDay] = useState("");
  const [visitas, setVisitas] = useState(false);
  const [frecuencia, setFrecuencia] = useState("");
  const [repetir, setRepetir] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [terapeuta, setTerapeuta] = useState([]);
  const [consultorios, setconsultorios] = useState([]);
  const [idPatients, setIdPatients] = useState(0);
  const [idTherapy, setIdTherapy] = useState(0);
  const [priceEvaluacion, setPriceEvaluacion] = useState(0);
  const [pricePrimeraEvaluacion, setPricePrimeraEvaluacion] = useState(0);
  const [idterapeuta, setIdterapeuta] = useState(0);
  const [consul, setConsul] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dayEnviar, setDayEnviar] = useState([]);
  let id = getDatosUsuario();
  let rol = getUsuarioCompleto();
  const resportes = useRef();

  const date = {
    Idterapeuta: id,
  };

  useEffect(() => {
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
  }, []);

 

  const dataEvaluacion = {
    IdPatients: parseInt(idPatients),
    IdTherapy: parseInt(idTherapy),
    Price: parseInt(priceEvaluacion),
    FirstPrice: parseInt(pricePrimeraEvaluacion),
    IdTerapeuta: parseInt(idterapeuta),
    visitas: visitas,
    IdConsultorio: consul,
    FechaInicio: fechaInicio,
    Repetir: repetir,
    Frecuencia: frecuencia,
    Dias: dayEnviar,
    IdTerapeuta: idterapeuta,
  };

  

  function handle(selectedItems) {
    const diasEnviar = [];
    diasEnviar.push(selectedItems.target.value);
    setDayEnviar(diasEnviar);
    
    setDay(selectedItems.target.value);

}
  

const CrearCitas = async (e) => {
  e.preventDefault();
  try{
     const res = await axios.post("https://jdeleon-001-site1.btempurl.com/api/traerpaciente/CrearEvaluacion",dataEvaluacion);
     if(res.status == 200){
         const ale = await swal({
           title: "Correcto",
           text: "Cambio guardado ",
           icon: "success",
         });
     }
  }catch(error){    
    swal(error.response.data, "Intentelo mas tarde", "error");
  }
 
};  
  return (
    <div>
     

      <Headers />

      <div className="contenedor-evaluacion">
        <form
          className="form-select-evaluacion"
          onSubmit={CrearCitas}
          ref={resportes}
        >
          {loading ? <Loading /> : ""}
          <div className="cont-titu-select">
            <h1>Citas</h1>
            <i className="bi bi-person-circle"></i>
          </div>

          <div className="sub-cont-evaluacion">
            {rol == 2 ? (
              <div className="cont-select-evaluacion1">
                <p className="titu-barra"> Lista de Pacientes </p>
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
              <div className="cont-select-evaluacion1">
                <p className="titu-barra"> Lista de Pacientes </p>
                <select
                  className="form-select"
                  required
                  onChange={(e) => setIdPatients(e.target.value)}
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

            <div className="cont-select-evaluacion1">
              <p className="titu-barra"> Lista de Terapias </p>

              <select
                className="form-select"
                onChange={(e) => setIdTherapy(e.target.value)}
                required
              >
                <option value="">Seleccione una terapia</option>
                {data.map((item) => [
                  <option
                    key={item.nombreTerapia.idTherapy}
                    value={item.nombreTerapia.idTherapy}
                  >
                    {item.nombreTerapia.label}
                  </option>,
                ])}
              </select>
            </div>

            <div className="cont-select-evaluacion1">
              <p className="titu-barra"> Terapeuta </p>
              <select
                className="form-select"
                onChange={(e) => setIdterapeuta(e.target.value)}
                required
              >
                <option value="">Seleccione un Terapeuta</option>
                {terapeuta.map((item) => [
                  <option value={item.idUser} key={item.idUser}>
                    {item.names} {item.apellido}{" "}
                  </option>,
                ])}
              </select>
            </div>

            <div className="cont-select-evaluacion1">
              <p className="titu-barra"> Consultorio </p>
              <select
                className="form-select"
                onChange={(e) => setConsul(e.target.value)}
                required
              >
                <option value="">Seleccione un Consultorio</option>

                {consultorios.map((item) => [
                  <option value={item.idConsultorio} key={item.idConsultorio}>
                    {item.nombre}{" "}
                  </option>,
                ])}
              </select>
            </div>

            <div>

        
              
       
                           
              <div className="cont-recurrence--inside-visitas">

              <input type="checkbox"value="true" onChange={() => setVisitas(true)}/>
             <label htmlFor="txtnombres" className="form-label">Visitas</label>
            </div>

            <div className="cont-recurrence--inside">
                        <label htmlFor="txtnombres" className="form-label">
                                Precio de la Terapia
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="txtnombres"
                                onChange={(e) => setPriceEvaluacion(e.target.value)}
                                autoComplete="off"
                              />
                        </div>
                        <div className="cont-recurrence--inside">
                        <label htmlFor="txtnombres" className="form-label">
                        Precio de la primera Evaluación
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="txtnombres"
                                onChange={(e) => setPricePrimeraEvaluacion(e.target.value)}
                                autoComplete="off"
                              />
                        </div>

            <hr></hr>


                
              <div className="cont-recurrence">
                   <p className="tite-recu">Recurrencia</p>
              </div>

              <div className="cont-recurrence" id="recu-fecha">
                <p className="text-recu">Fecha de Inicio</p>
                <input
                  type="datetime-local"
                  className="recu-fecha-inicio"
                  min="2023-03-24"
                  onChange={(e) => setFechaInicio(e.target.value)}
                  required
                />
              </div>

              <div className="cont-recurrence">
                <p className="text-recu">Repetir</p>
                <input
                  type="number"
                  className="recu-repe"
                  onChange={(e) => setRepetir(e.target.value)}
                  required
                  min="1"
                />
                <select
                  className="recu-select"
                  onChange={(e) => setFrecuencia(e.target.value)}
                  required
                >
                  <option value="">Frecuencia</option>
                  <option>Diario</option>
                  <option>Semanal</option>
                  <option>Mensual</option>
                </select>
              </div>

              <div className="cont-recurrence check-select">
                <input
                  type="checkbox"
                  id="diasCheckD"
                  className="check"
                  value="domingo"
                  onChange={(e) => handle(e)}
                />
                <label
                  htmlFor="diasCheckD"
                  id="labeldiasCheckD"
                  className="labelCheck"
                >
                  D
                </label>
                <input
                  type="checkbox"
                  id="diasCheckL"
                  value="lunes"
                  className="check"
                  onChange={(e) => handle(e)}
                />
                <label
                  htmlFor="diasCheckL"
                  id="labeldiasCheckL"
                  className="labelCheck"
                >
                  L
                </label>
                <input
                  type="checkbox"
                  id="diasCheckM"
                  value="martes"
                  className="check"
                  onChange={(e) => handle(e)}
                />
                <label
                  htmlFor="diasCheckM"
                  id="labeldiasCheckM"
                  className="labelCheck"
                >
                  M
                </label>
                <input
                  type="checkbox"
                  id="diasCheckMM"
                  value="miercoles"
                  className="check"
                  onChange={(e) => handle(e)}
                />
                <label
                  htmlFor="diasCheckMM"
                  id="labeldiasCheckMM"
                  className="labelCheck"
                >
                  M
                </label>
                <input
                  type="checkbox"
                  id="diasCheckJ"
                  value="jueves"
                  className="check"
                  onChange={(e) => handle(e)}
                />
                <label
                  htmlFor="diasCheckJ"
                  id="labediasCheckJ"
                  className="labelCheck"
                >
                  J
                </label>
                <input
                  type="checkbox"
                  id="diasCheckV"
                  value="viernes"
                  className="check"
                  onChange={(e) => handle(e)}
                />
                <label
                  htmlFor="diasCheckV"
                  id="labeldiasCheckV"
                  className="labelCheck"
                >
                  V
                </label>
                <input
                  type="checkbox"
                  id="diasCheckS"
                  value="sabado"
                  className="check"
                  onChange={(e) => handle(e)}
                />
                <label
                  htmlFor="diasCheckS"
                  id="labeldiasCheckS"
                  className="labelCheck"
                >
                  S
                </label>
              </div>
            </div>
            <button className="btnWeb" type="submit">
              Guadar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Evaluacion;
