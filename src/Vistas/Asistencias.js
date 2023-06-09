import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Headers from "../components/Headers/Headers"
import swal from "sweetalert";
import "../responsive.css";
import { getDatosUsuario, getUsuarioCompleto } from "../auth-helpers";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Toolbar from "react-multi-date-picker/plugins/toolbar"


function Asistencias() {

  const [paciente, setPaciente] = useState();
  const [terapia, setTerapia] = useState();
  const [idTerapeuta, setIdTerapeuta] = useState();
  const [observaciones, setObservaciones] = useState("");
  const [terapeuta, setTerapeuta] = useState([]);
  const [data, setData] = useState([]);
  const [dataPaciente, setDataPaciente] = useState([]);
  const [justificaciones, setJustificaciones] = useState("");

  const [razonAsistencia, setRazonAsistencia] = useState([]);


  const resportes = useRef();

  let id = getDatosUsuario();

  const date = {
    Idterapeuta: id,
  };

  let rol = getUsuarioCompleto();

  useEffect(() => {

    let no = document.querySelector("div.rmdp-container > :nth-child(2)");
    no.style.transform = "translate(7.20215e-6px, 185.406px)";;
    no.style.left = "auto";
  
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
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/razon")
      .then((response) => {
        setRazonAsistencia(response.data);
      });

  }, []);

  const dataValor = {
    idPatients: paciente,
    idTherapy: terapia,
    IdTerapeuta: idTerapeuta,
    FechaInicio: [],
    TipoAsistencias: justificaciones,
    remarks: observaciones,
  };

  const formAsistensscia = document.getElementById("formAsistencia");

  const enviar = (e) => {
    e.preventDefault();

    

    const fechas = values.map((date) => date.format("YYYY-MM-DDTHH:mm:ss"));


    dataValor.FechaInicio = fechas

    resportes.current.classList.add("contenedors");
    if (rol == 2) {
      dataValor.IdTerapeuta = id;
    }

    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/Asistencias";
    axios
      .post(url, dataValor)
      .then((result) => {
        resportes.current.classList.remove("contenedors");
        swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
          button: "Aceptar",
        });

        if (result) {
          formAsistensscia.reset();
        }
      })
      .catch((error) => {
        resportes.current.classList.remove("contenedors");

        swal(error.response.data, "Intentelo mas tarde", "warning");
      });
  };



  const [values, setValues] = useState(
    [1, 2, 3].map((number) =>
      new DateObject().set({
        day: number,
        hour: number,
        minute: number,
        second: number,
      })
    )
  );

  const handleDateChange = (newValues) => {
    setValues(newValues);
  };


  return (
    <div>
      <Headers />

      <div className="cont-padre-asistencia">
        <div className="contanedor-asistencias" ref={resportes}>
          <div className="cont-titu-asistencias">
            <h1>Asistencias</h1>
          </div>

          <form  onSubmit={enviar} className="form-asistencia" id="formAsistencia" >
 
            <div
              className="box-asistencia"
              
            >
              <label className="label-asistencia">Razón Asistencia</label>
              <select className="justificacinAsistencias" onChange={(e) => setJustificaciones(e.target.value)}>
                 {
                    razonAsistencia.map((r,i) => [
                    <option value={r.id} key={i}>{r.descripcion}</option>
        
                  ])
                }
              </select>
            </div>
            {rol == 2 ? (
              <div className="box-asistencia">
                <label className="label-asistencia">Lista de Pacientes</label>
                <select
                  onChange={(e) => setPaciente(e.target.value)}
                  required
                  className="select-asistencia"
                >
                  <option value="">Seleccione un Paciente</option>
                  {dataPaciente.map((item,index) => [
                    //<option key={item.value} value={item.value}>{item.value}</option>
                    <option key={index} value={item.nombrePaciente.idPatients}>
                      {item.nombrePaciente.name}
                    </option>,
                  ])}
                </select>
              </div>
            ) : (
              <div className="box-asistencia">
                <label className="label-asistencia">Lista de Pacientes</label>
                <select
                  onChange={(e) => setPaciente(e.target.value)}
                  required
                  className="select-asistencia"
                >
                  <option value="">Seleccione un Paciente</option>
                  {dataPaciente.map((item, index) => [
                    <option  key={index}  value={item.idPatients}>{item.name}</option>,
                  ])}
                </select>
              </div>
            )}

            <div className="box-asistencia">
              <label className="label-asistencia">Lista de Terapias</label>
              { rol == 2 ? 
                <select
                onChange={(e) => setTerapia(e.target.value)}
                required
                className="select-asistencia"
              >
                <option  value="">Seleccione una Terapia</option>
                {data.map((item, index) => [
                  <option key={index}  value={item.idTherapy}>
                    {item.label}
                  </option>,
                ])}
              </select>
              :
              <select
              onChange={(e) => setTerapia(e.target.value)}
              required
              className="select-asistencia"
            >
              <option value="">Seleccione una Terapia</option>
              {data.map((item,index) => [
                <option key={index}  value={item.nombreTerapia.idTherapy}>
                  {item.nombreTerapia.label}
                </option>,
              ])}
            </select>
              }
            
            </div>

            {rol == 1 ? (
              <div className="box-asistencia">
                <label className="label-asistencia">Lista de Terapeuta</label>
                <select
                  onChange={(e) => setIdTerapeuta(e.target.value)}
                  required
                  className="select-asistencia"
                >
                  <option value="">Seleccione un Terapeuta</option>
                  {terapeuta.map((item, index) => [
                    //<option key={item.value} value={item.value}>{item.value}</option>
                    <option key={index}  value={item.idUser}>
                      {item.names} {item.apellido}
                    </option>,
                  ])}
                </select>
              </div>
            ) : (
              ""
            )}
            <div className="box-asistencia">
              <label className="label-asistencia">Fecha</label>
              <DatePicker
             value={values}
                  onChange={handleDateChange}
                  format="MM/DD/YYYY HH:mm:ss"
                  multiple
                  plugins={[<TimePicker position="bottom" />, <DatePanel markFocused />,
                  <Toolbar 
                  position="bottom" 
                  sort={["deselect", "close", "today"]} 
                  
                />,
                 ]}
                 style={{ height: '50px', width: '100%' }}
                 
                />
            </div>
            <div className="box-asistencia">
              <label className="label-asistencia">Observaciones</label>
              <textarea
                required
                onChange={(e) => setObservaciones(e.target.value)}
                className="select-asistencia"
              />
            </div>
            <div className="box-asistencia">
              <div className="col">
                <button type="submit" className="btnWeb">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Asistencias;
