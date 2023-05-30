import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import logo from "../imagenes/IMG-20230221-WA0009.png";
import doctor from "../imagenes/undraw_medicine_b1ol.png";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import Select from "react-select";
import swal from "sweetalert";
import Headers from "../Headers";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { findDOMNode } from "react-dom";
import { FaUser } from "react-icons/fa";
import {
  deleteToken,
  getToken,
  initAxiosInterceptors,
  setUsuarioM,
  setUsuario,
  getDatosUsuario,
  getUsuarioCompleto,
} from "../auth-helpers";
import { Loading, LoaLogin } from "../components/Loading";

function Evaluacion() {
  const [data, setData] = useState([]);
  const [dataPaciente, setDataPaciente] = useState([]);
  const [listapacientes, setListaPasientes] = useState([]);
  const [listaTerapia, setListaTerapia] = useState([]);
  const cookies = new Cookies();
  const navigation = useNavigate();
  const [day, setDay] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [repetir, setRepetir] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [nom, setNom] = useState("");
  const [terapeuta, setTerapeuta] = useState([]);
  const [consultorios, setconsultorios] = useState([]);
  const [idPatients, setIdPatients] = useState(0);
  const [idTherapy, setIdTherapy] = useState(0);
  const [priceEvaluacion, setPriceEvaluacion] = useState(0);
  const [idterapeuta, setIdterapeuta] = useState(0);
  const [consul, setConsul] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const pasientes = (e) => {
    setIdPatients(e);
  };

  const Fterapeuta = (e) => {
    setIdterapeuta(e);
  };

  const terapias = (e) => {
    if (e != null) {
      $("#FormModal").show();
      setIdTherapy(e);
    }
  };

  const precioModal = (e) => {
    setPriceEvaluacion(e);
  };

  const dataEvaluacion = {
    IdPatients: parseInt(idPatients),
    IdTherapy: parseInt(idTherapy),
    Price: parseInt(priceEvaluacion),
    IdTerapeuta: parseInt(idterapeuta),
    visitas: true,
    IdConsultorio: consul,
    IdConsultorioNavigation: null,
    Recurrencia: [],
  };

  const dataRecurrencia = {
    FechaInicio: fechaInicio,
    Repetir: repetir,
    Frecuencia: frecuencia,
    Dias: day,
    IdTerapeuta: idterapeuta,
    IdEvaluation: 0,
  };

  const EnviarEvaluacion = (e) => {
    e.preventDefault();

    resportes.current.classList.add("contenedors");

    const url =
      "https://jdeleon-001-site1.btempurl.com/api/traerpaciente/CrearEvaluacion";
    const urlRecurrencia =
      "https://jdeleon-001-site1.btempurl.com/api/traerpaciente/CrearRecurrencia";

    axios.post(url, dataEvaluacion).then((resultEvaluacion) => {
      if (resultEvaluacion.data > 0) {
        dataRecurrencia.IdEvaluation = resultEvaluacion.data;

        axios.post(urlRecurrencia, dataRecurrencia).then((resultEvaluacion) => {
          resportes.current.classList.remove("contenedors");
          swal({
            title: "Correcto",
            text: "Se ha guardado correctamente",
            icon: "success",
            button: "Aceptar",
          });
        });
      }
    });
  };

  function cancelarModal() {
    $("#FormModal").hide();
  }

  function modal() {
    $("#FormModal").hide();
  }

  function dia(e) {
    setDay(e);
  }

  function Ffrecuencia(e) {
    setFrecuencia(e);
  }

  function FRepetir(e) {
    setRepetir(e);
  }
  function FFechaInicio(e) {
    setFechaInicio(e);
  }

  function Fviistas(e) {
    setNom(e);
  }
  return (
    <div>
      <div
        id="FormModal"
        className="modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Terapia
              </h1>
            </div>

            <div className="modal-body ">
              <div className="row  g-2">
                <div className="">
                  <input
                    type="checkbox"
                    value="visitas"
                    onChange={(e) => Fviistas(e.target.value)}
                  />
                  Visitas<br></br>
                  <label htmlFor="txtnombres" className="form-label">
                    Precio de la Terapia
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="txtnombres"
                    onChange={(e) => precioModal(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="cont-btn-evaluacion">
                <button className="btn-Guardar" onClick={modal}>
                  Guardar
                </button>
                <button className="btn-Cancelar" onClick={cancelarModal}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Headers />

      <div className="contenedor-evaluacion">
        <form
          className="form-select-evaluacion"
          onSubmit={EnviarEvaluacion}
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
                  onChange={(e) => pasientes(e.target.value)}
                >
                  <option value="">Seleccione una paciente</option>
                  {dataPaciente.map((item) => [
                    <option
                      key={item.nombrePaciente.IdPatients}
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
                  onChange={(e) => pasientes(e.target.value)}
                >
                  <option value="">Seleccione una paciente</option>
                  {dataPaciente.map((item) => [
                    <option key={item.IdPatients} value={item.idPatients}>
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
                onChange={(e) => terapias(e.target.value)}
                required
              >
                <option value="">Seleccione una terapia</option>
                {data.map((item) => [
                  <option value={item.nombreTerapia.idTherapy}>
                    {item.nombreTerapia.label}
                  </option>,
                ])}
              </select>
            </div>

            <div className="cont-select-evaluacion1">
              <p className="titu-barra"> Terapeuta </p>
              <select
                className="form-select"
                onChange={(e) => Fterapeuta(e.target.value)}
                required
              >
                <option value="">Seleccione un Terapeuta</option>
                {terapeuta.map((item) => [
                  <option value={item.idUser}>
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
                {consultorios.map((item) => [
                  <option value={item.idConsultorio}>{item.nombre} </option>,
                ])}
              </select>
            </div>

            <hr></hr>
            <div>
              <div className="cont-recurrence">
                <p className="tite-recu">Recurrencia</p>
              </div>
              <div className="cont-recurrence" id="recu-fecha">
                <p className="text-recu">Fecha de Inicio</p>
                <input
                  type="datetime-local"
                  className="recu-fecha-inicio"
                  min="2023-03-24"
                  onChange={(e) => FFechaInicio(e.target.value)}
                  required
                />
              </div>

              <div className="cont-recurrence">
                <p className="text-recu">Repetir</p>
                <input
                  type="number"
                  className="recu-repe"
                  onChange={(e) => FRepetir(e.target.value)}
                  required
                  min="1"
                />
                <select
                  className="recu-select"
                  onChange={(e) => Ffrecuencia(e.target.value)}
                  required
                >
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
                  onChange={(e) => dia(e.target.value)}
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
                  onChange={(e) => dia(e.target.value)}
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
                  onChange={(e) => dia(e.target.value)}
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
                  onChange={(e) => dia(e.target.value)}
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
                  onChange={(e) => dia(e.target.value)}
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
                  onChange={(e) => dia(e.target.value)}
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
                  onChange={(e) => dia(e.target.value)}
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
            <button className="btn-evaluacion" type="submit">
              Guadar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Evaluacion;
