import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Headers from "../components/Headers/Headers";
import "bootstrap/dist/css/bootstrap.min.css";
import $, { event } from "jquery";
import { Loading } from "../components/Loading";
import { addDays } from "date-fns";
import { urlApi } from "../auth-helpers";

function Calendario() {
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [showNav, setShowNav] = useState(true);

  const [inicio, setInicio] = useState("");
  const [final, setFinal] = useState("");
  const [consult, setConsult] = useState("");

  const [fechaInicio, setfechaInicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [consultorios, setconsultorios] = useState([]);
  const [terapeuta, setTerapeuta] = useState("");
  const [terapia, setTerapia] = useState("");
  const [consultorioCalendario, setConsultorioCalendario] = useState("");
  const [hora, setHora] = useState("");
  const [apellido, setApellido] = useState("");
  const [loading, setLoading] = useState(false);
  const [citas, setCitas] = useState([]);

  const [filtrando, setFiltrando] = useState(false);

  useEffect(() => {
    async function solicitarData() {
      try {
        const res = await axios.get(
          `${urlApi}Citas/CitasNoUnicas`
        );
        res.data.map((x) => {
          if (x.dias == "domingo") {
            x.dias = 0;
          }
          if (x.dias == "lunes") {
            x.dias = 1;
          }
          if (x.dias == "martes") {
            x.dias = 2;
          }
          if (x.dias == "miercoles") {
            x.dias = 3;
          }
          if (x.dias == "jueves") {
            x.dias = 4;
          }
          if (x.dias == "viernes") {
            x.dias = 5;
          }
          if (x.dias == "sabado") {
            x.dias = 6;
          }
        });

        setCitas(res.data);
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get(
         `${urlApi}Clinica/Consultorios`
        );
        setconsultorios(response.data.lista);
      } catch (error) {
        console.log(error);
      }
    }
    solicitarData();
  }, []);

  const empezar = new Date();

  const fechaLimite = addDays(empezar, 9999, 11, 31);
  let eventos = [];

  citas.forEach((cita) => {
    let iniciar = new Date(cita.fechaInicio);

    while (iniciar <= fechaLimite) {
      if (cita.dias == iniciar.getDay()) {
        const evento = {
          title: cita.paciente.name,
          start: new Date(iniciar.getTime()),
          extendedProps: {
            additionalProperty: cita.terapeuta.names,
            anotherProperty: cita.terapia.label,
            description: cita.consultorio.nombre,
            name: cita.terapeuta.apellido,
          },
        };

        eventos.push(evento);
      }

      iniciar = addDays(iniciar, 1);
    }
  });

  const modalCerrarEliminarFecha = () => {
    $("#eliminarEvento").hide();
  };

  const calendario = useRef(null);

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
    const amPM = hora >= 12 ? "PM" : "AM";

    if (hora > 12) {
      hora12 = hora - 12;
    } else if (hora === 0) {
      hora12 = 12;
    }

    const reaHora = `${hora12}:${
      minutos < 10 ? "0" + minutos : minutos
    } ${amPM}`;
    const titu = info.event.title;
    setfechaInicio(fecha);

    setHora(reaHora);
    setDescripcion(titu);
    setTerapeuta(info.event.extendedProps.additionalProperty);
    setTerapia(info.event.extendedProps.anotherProperty);
    setConsultorioCalendario(info.event.extendedProps.description);
    setApellido(info.event.extendedProps.name);
  }

  async function Buscar(e) {
    e.preventDefault();

    setFiltrando(true);
    setShowNav(false);
    const consultorio = consultorios.filter((c) => c.idConsultorio == consult);
    let DescripcionConsultorio = "";

    consultorio.map((c) => {
      DescripcionConsultorio = c.descripcion;
    });

    let fechaInicio = inicio;
    let fechaFin = final;

    const fecha = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    var cita = eventos.filter((eventos) => {
      const fechaEvento = new Date(eventos.start);
      return (
        fechaEvento >= fecha &&
        fechaEvento <= fin &&
        eventos.extendedProps.description == DescripcionConsultorio
      );
    });

    setEventosFiltrados(
      cita.map((c) => ({
        title: c.title,
        start: c.start,
        extendedProps: {
          additionalProperty: c.extendedProps.additionalProperty,
          anotherProperty: c.extendedProps.anotherProperty,
          description: c.extendedProps.description,
          name: c.extendedProps.name,
        },
      }))
    );

    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(fechaInicio);
  }

  const nevegar = () => {
    setShowNav(true);
    setFiltrando(false);
  };

  const calendarRef = useRef(null);

  return (
    <div>
      <Headers calendario={calendario} />

      <div className="cont-padre">
        <div className="calendario" ref={calendario}>
          {loading ? <Loading /> : ""}
          <form onSubmit={Buscar} className="form-calendario-option ">
            <div className="padre-box-calendara-option">
              <div className="option-box">
                <label>Fecha Inicio</label>
                <input
                  type="date"
                  className="inputgastos"
                  onChange={(e) => setInicio(e.target.value)}
                  required
                />
              </div>

              <div className="option-box">
                <label>Fecha Fin</label>
                <input
                  type="date"
                  className="inputgastos"
                  onChange={(e) => setFinal(e.target.value)}
                  required
                />
              </div>

              <div className="option-box">
                <label>Consultorio</label>
                <select
                  className="form-select"
                  onChange={(e) => setConsult(e.target.value)}
                  required
                  id="selec-consultorio"
                >
                  <option value="">Seleccione un Consultorio</option>
                  <option value="0">Todos los Consultorios</option>
                  {consultorios.map((item, index) => [
                    <option key={index} value={item.idConsultorio}>
                      {item.nombre}{" "}
                    </option>,
                  ])}
                </select>
              </div>

              <div className="option-box">
                <label className="visilibi-buscar-calendar">sdw</label>
                <button className="btn-gastos" id="calendar-btn" type="submit">
                  Buscar
                </button>
              </div>

              <div className="option-box">
                {!showNav ? (
                  <div className="option-box">
                    <label className="visilibi-buscar-calendar">sdw</label>
                    <button
                      className="btn-gastos"
                      id="calendar-navegar"
                      onClick={() => nevegar()}
                    >
                      Navegar
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            ref={calendarRef}
            droppable={true}
            initialView={"dayGridMonth"}
            events={filtrando ? eventosFiltrados : eventos}
            headerToolbar={{
              left: showNav ? "prev,next" : "",
              center: "title",
              right: showNav ? "today" : "",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height={"80vh"}
            eventClick={handleEventClickFecha}
          />
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
                <span className="infocitas">Terapeuta :</span> {terapeuta}{" "}
                {apellido}
              </p>
              <p>
                <span className="infocitas">Consultorio :</span>{" "}
                {consultorioCalendario}
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
