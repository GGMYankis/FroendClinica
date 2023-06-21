import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Headers from "../Headers";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import $ from "jquery";
import logo from "../imagenes/IMG-20230221-WA0009.png";
import { FaBars } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import {
  DeleteToken,
  getToken,
  initAxiosInterceptors,
  setUsuarioM,
  getUsuarioCompleto,
} from "../auth-helpers";

function Calendario() {
  const [event, setEvent] = useState([]);
  const [valor, setValor] = useState();
  const cookies = new Cookies();
  const navigation = useNavigate();
  const [fechaInicio, setfechaInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [consultorios, setconsultorios] = useState([]);
  const [consul, setConsul] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [terapeuta, setTerapeuta] = useState("");
  const [terapia, setTerapia] = useState("");
  const [consultorioCalendario, setConsultorioCalendario] = useState("");
  const [hora, setHora] = useState("");
  const [apellido, setApellido] = useState("");

  let rol = getUsuarioCompleto();

  const FfechaInicio = (e) => {
    setfechaInicio(e);
  };

  const FHoraInicio = (e) => {
    setHoraInicio(e);
  };

  const FDescripcion = (e) => {
    setDescripcion(e);
  };

  useEffect(() => {
    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Citas")
      .then((res) => {
        
        console.log(res.data)
       
        setEvent(
          res.data.map((item, index) => ({
            id:`event-${item.idEvaluacion}-${index}`,
            title: item.paciente.name,
            start: new Date(item.fechaInicio),
            extendedProps: {
              additionalProperty: item.terapeuta.names , 
              anotherProperty: item.terapia.label, 
              description:item.consultorio.nombre,
            name:item.terapeuta.apellido, 
            },
          }))
        );
      });

    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Consultorios")

      .then((response) => {
        setconsultorios(response.data.lista);
      });
  }, []);

  const data = {
    FechaInicio: fechaInicio + "T" + horaInicio,
    Remarks: descripcion,
  };

  function refreshPage() {
    window.location.reload();
  }

  const enviar = (e) => {
    e.preventDefault();

    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/AgregarEvento";
    axios.post(url, data).then((result) => {
      const probar = async () => {
        const ale = await swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
        });

        refreshPage();
      };

      if (result) {
        probar();
      }

      $("#eliminarPaciente").hide();

      //  refreshPage()
    });
  };



  const modalCerrarEliminar = () => {
    $("#eliminarPaciente").hide();
  };
  const modalCerrarEliminarFecha = () => {
    $("#eliminarEvento").hide();
  };

  const calendario = useRef(null);

  function handleEventClick(info) {
    $("#eliminarPaciente").show();
    if (info.allDay) {
      $("#FechaInicio").val(info.dateStr);
      setfechaInicio(info.dateStr);
    }
  }

  const [id, setId] = useState();

  async function handleEventClickFecha(info) {
    $("#eliminarEvento").show();

    
    const start = info.event.start;

    const day = String(start.getDate()).padStart(2, "0");
    const month = String(start.getMonth() + 1).padStart(2, "0");

    const year = String(start.getFullYear()).padStart(2, "0");

    
    const fecha = `${year}-${month}-${day}`;
    const hora = start.getHours();
    let hora12 = hora;
    const minutos = start.getMinutes();
    const amPM = (hora >= 12) ? 'PM' : 'AM';

    if (hora > 12) {
      hora12 = hora - 12;
    } else if (hora === 0) {
      hora12 = 12;
    }

    const reaHora = `${hora12}:${minutos < 10 ? '0' + minutos : minutos} ${amPM}`;
    const titu = info.event.title;
    setfechaInicio(fecha);
    
    
    setHora(reaHora);


    setDescripcion(titu);
    setTerapeuta(info.event.extendedProps.additionalProperty);
    setTerapia(info.event.extendedProps.anotherProperty);
    setConsultorioCalendario(info.event.extendedProps.description);
    setApellido(info.event.extendedProps.name);
    
  }

  const datas = {
    IdAsistencias: id,
  };

  function eliminarFecha() {
    const url = "https://jdeleon-001-site1.btempurl.com/api/Clinica/Fecha";
    axios
      .post(url, datas)
      .then((response) => {
        $("#eliminarEvento").hide();
        const probar = async () => {
          const ale = await swal({
            title: "Correcto",
            text: "Cambio guardado ",
            icon: "success",
          });

          refreshPage();
        };

        if (response) {
          probar();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleEventDrop({ event }) {
    const fechad = await event.start;
    await setfechaInicio(fechad);

    enviarOtra();
  }

  const datass = {
    Age: fechaInicio,
    Description: "nose",
  };

  const enviarOtra = () => {
    console.log(datass);
    const url =
      "https://jdeleon-001-site1.btempurl.com/traerpaciente/AgregarEvento";
    axios.post(url, datass).then((result) => {});
  };

  const consultorio = {
    IdConsultorio: consul,
    FechaInicio: startDate,
    FechaFinal: endDate,
  };

  const enviars = (e) => {
    e.preventDefault()
    const urls =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/FiltrarConsultorios";
    axios.post(urls, consultorio).then((result) => {
     setEvent(
        result.data.map((item) => ({
          id: item.idEvaluacion,
          title: item.paciente.name,
          start: new Date(item.fechaInicio),
          extendedProps: {
            additionalProperty: item.terapeuta.names + " " + item.terapeuta.apellido, 
            anotherProperty: item.terapia.label, 
            description:item.consultorio.nombre
           
          }
        }))
      ); 
    });

  };

  

  return (

    <div>
      <Headers calendario={calendario} />

      <div className="cont-padre">
        <div className="calendario" ref={calendario}>
          <form onSubmit={enviars} className="form-calendario-option ">
            <div className="padre-box-calendara-option" >

             
              <div className="option-box">
                <label>Fecha Inicio</label>
                <input
                  type="date"
                  className="inputgastos"
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="option-box">
                <label>Fecha Fin</label>
                <input
                  type="date"
                  className="inputgastos"
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              <div className="option-box" >
                <label>Consultorio</label>
                <select
                  className="form-select"
                  onChange={(e) => setConsul(e.target.value)}
                  required
                  id="selec-consultorio"
                >
                  <option value="">Seleccione un Consultorio</option>
                  <option value="0">Todos los Consultorio</option>
                  {consultorios.map((item) => [
                    <option value={item.idConsultorio}>{item.nombre} </option>,
                  ])}
                </select>
             
              </div>

              <div className="option-box">
                <label className="visilibi-buscar-calendar">sdw</label>
                <button className="btn-gastos" id="calendar-btn" type="submit">
                  Buscar
                </button>
              </div>
            </div>
          </form>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            droppable={true}
            initialView={"dayGridMonth"}
            events={event}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventDrop={handleEventDrop}
            height={"80vh"}
            // dateClick={handleEventClick}
            eventClick={handleEventClickFecha}
          />
        </div>
      </div>

      <div className="modal" tabIndex="-1" id="eliminarPaciente">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agenda de eventos</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={enviar}>
                <div className="row" id="fila-agenda">
                  <div className="col">
                    <label>Fecha de inicio</label>
                    <div className="input-group" data-autoclose="true">
                      <input
                        type="date"
                        id="FechaInicio"
                        value={valor}
                        className="form-control"
                        onChange={(e) => FfechaInicio(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label>Hora de inicio</label>
                    <div className="input-group" data-autoclose="true">
                      <input
                        type="time"
                        id="FechaInicio"
                        className="form-control"
                        onChange={(e) => FHoraInicio(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <textarea
                      required
                      className="form-control"
                      onChange={(e) => FDescripcion(e.target.value)}
                      rows="3"
                    />
                  </div>
                </div>
                <div className="modal-footer" id="footerEliminarCalendario">
                  <button
                    id="BotonAgregar"
                    className="btn btn-primary"
                    type="submit"
                  >
                    Guardar
                  </button>
                  <button
                    id="BotonAgregar"
                    className="btn btn-danger"
                    type="button"
                    onClick={modalCerrarEliminar}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal" tabIndex="-1" id="eliminarEvento">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header-citas">
              <h5 className="modal-title">Cita</h5>
            </div>
            <div className="modal-body">
              <p>
                <span className="infocitas">Fecha de la cita :</span>{" "}
                {fechaInicio}
              </p>
              <p>
                <span className="infocitas">Hora :</span> {hora}
              </p>
              <p>
                <span className="infocitas">Paciente : </span>
                {descripcion}
              </p>
              <p>
                <span className="infocitas">Terapia :</span> {terapia}
              </p>
              <p>
                <span className="infocitas">Terapeuta :</span> {terapeuta} {apellido}
              </p>
              <p>
                <span className="infocitas">Consultorio :</span> {consultorioCalendario}
              </p>
              
              <div className="footerCitas">
                <button
                  type="button"
                  className="btnCitas"
                  onClick={modalCerrarEliminarFecha}
                >
                   Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendario;

//como obtener la fecha al darle clik en un full calendar y poder obtener esa fecha  y enviar a .net 6  para en el servidor eliminarla

/* mongodb+srv://instaclone-admin:instaclone123@cluster0.flmkdam.mongodb.net/instaclone */
