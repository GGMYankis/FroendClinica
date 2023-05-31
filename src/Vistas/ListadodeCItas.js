import Cookies from "universal-cookie";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import logo from "../imagenes/IMG-20230221-WA0009.png";
import { FaBars } from "react-icons/fa";
import { FaUser, FaUsers, FaTrash, FaEdit } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import $ from "jquery";
import { findDOMNode } from "react-dom";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import Headers from "../Headers";
import {
  deleteToken,
  getToken,
  initAxiosInterceptors,
  setUsuarioM,
  setUsuario,
  getDatosUsuario,
  getUsuarioCompleto,
} from "../auth-helpers";
import { set } from "date-fns";
import { Label } from "reactstrap";
import { format } from "date-fns";

function ListadodeCItas({ usuarioLogin }) {
  const [ac, setAc] = useState([]);
  const modalCrear = useRef();
  const modalEditar = useRef();
  const alertEliminar = useRef();
  const FormularioTherapy = document.getElementById("txtCrearPaciente");
  const [citas, setCitas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [verificarActivo, setVerificarActivo] = useState(false);
  const currentDate = new Date(); // Obtener la fecha actual
  const formattedDate = format(currentDate, "yyyy/MM/dd");
  let rol = getUsuarioCompleto();
  const paciente = useRef(null);

  const [pacienteN, setPacienteN] = useState("");
  const [terapia, setTerapia] = useState(0);
  const [consultorio, setConsultorio] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [dataPaciente, setDataPaciente] = useState([]);
  const [datas, setData] = useState([]);
  const [terapeuta, setTerapeuta] = useState([]);
  const [consultorios, setconsultorios] = useState([]);
  const [idPatients, setIdPatients] = useState(0);
  const [idterapeuta, setIdterapeuta] = useState(0);
  const [consul, setConsul] = useState(0);
  const [repetir, setRepetir] = useState(null);
  const [day, setDay] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [priceEvaluacion, setPriceEvaluacion] = useState(0);
  const [idEvaluacion, setIdEvaluacion] = useState(0);

  const [nomPaciente, setNomPaciente] = useState("");
  const [nomTerapia, setNomTerapia] = useState("");
  const [nomConsultorio, setNomConsultorio] = useState("");
  const [nomTerapeuta, setNomTerapeuta] = useState("");
  const [precioEditar, setPrecioEditar] = useState("");

  const [visitas, setVisitas] = useState(false);

  let id = getDatosUsuario();
  const resportes = useRef();

  const date = {
    Idterapeuta: id,
  };

  useEffect(() => {
    cargar();
  }, []);

  const cargar = (async) => {
    // ultimo commit
    axios.get("https://localhost:63958/api/Clinica/Citas").then((res) => {
      console.log(res.data);
      setCitas(res.data);
    });
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

  const dataEvaluacion = {
    IdPatients: parseInt(idPatients),
    IdTherapy: parseInt(terapia),
    Price: parseInt(priceEvaluacion),
    IdTerapeuta: parseInt(idterapeuta),
    visitas: visitas,
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

    //resportes.current.classList.add("contenedors");

    const url = "https://localhost:63958/api/traerpaciente/CrearEvaluacion";
    const urlRecurrencia =
      "https://localhost:63958/api/traerpaciente/CrearRecurrencia";

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
      } else {
        console.log("nada");
      }
    });
  };

  const dtEditar = {
    IdPatients: parseInt(idPatients),
    IdTherapy: parseInt(terapia),
    Price: parseInt(priceEvaluacion),
    IdTerapeuta: parseInt(idterapeuta),
    visitas: visitas,
    IdConsultorio: consul,
    IdConsultorioNavigation: null,
    Recurrencia: [],
  };

  function EnviarEvaluacionEditada(e) {
    e.preventDefault();

    const url = "https://localhost:63958/api/Clinica/EditarCitas";
    axios.post(url, dataEvaluacion).then((resultEvaluacion) => {});
  }

  const modalCraePaciente = () => {
    modalCrear.current.classList.add("active");
  };

  const dataEditar = {};

  const FormularioEditar = document.getElementById("FormularioEditar");

  const handleEditar = async (e) => {
    e.preventDefault();

    console.log(dataEditar);
    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/EditarPaciente";
    axios
      .put(url, dataEditar)
      .then((result) => {
        const probar = async () => {
          cargar();
          modalEditar.current.classList.remove("active");
          const ale = await swal({
            title: "Correcto",
            text: "Cambio guardado ",
            icon: "success",
          });
        };
        if (result) {
          probar();
        }

        FormularioEditar.reset();
      })
      .catch((error) => {
        console.log(error);
      });
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

    IdEvaluacion.map((item) => [
      setNomPaciente(item.paciente),
      setNomTerapeuta(item.terapeuta),
      setNomConsultorio(item.consultorio),
      setNomTerapia(item.terapia),
      setPriceEvaluacion(item.price),
      setFechaInicio(item.fechaInicio),
      setRepetir(item.repetir),
      setFrecuencia(item.frecuencia),
      setDay(item.dias),
    ]);
  };

  const columns = [
    {
      name: "Paciente",
      selector: (row) => row.paciente,
      sortable: true,
    },
    {
      name: "Terapia",
      selector: (row) => row.terapia,
      sortable: true,
    },
    ,
    {
      name: "Terapeuta",
      selector: (row) => row.terapeuta,
      sortable: true,
    },
    {
      name: "Fecha Inicio",
      selector: (row) => row.fechaInicio,
      sortable: true,
    },
    {
      name: "consultorio",
      selector: (row) => row.consultorio,
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
          <button className="btnEliminar">Eliminar</button>
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
    } else if (verificarActivo) {
      const filteredResults = filteredData.filter((item) => {
        return item.name.toLowerCase().includes(keyword.toLowerCase());
      });
      setFilteredData(filteredResults);
    } else {
      const filteredResults = citas.filter((item) => {
        return item.name.toLowerCase().includes(keyword.toLowerCase());
      });
      setFilteredData(filteredResults);
    }
  };

  const handleFiltroChange = (event) => {
    if (event.target.value == 2) {
      setVerificarActivo(true);
      setFilteredData(citas);
    }

    if (event.target.value == "si") {
      setVerificarActivo(true);
      const res = citas.filter((p) => p.activo == "si");
      setFilteredData(res);
    } else if (event.target.value == "no") {
      setVerificarActivo(true);

      const filteredResults = citas.filter((item) => {
        const res = item.activo == "no";
        setFilteredData(res);
      });

      const res = citas.filter((p) => p.activo == "no");
      setFilteredData(res);
    } else {
      setVerificarActivo(false);
    }
  };

  function cancelarModal() {
    $("#FormModal").hide();
  }

  function modal() {
    $("#FormModal").hide();
  }

  function Fterapia(e) {
    setTerapia(e);
  }

  return (
    <div>
      <Headers />

      <div id="table-container" className="table-container" ref={paciente}>
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
              <label>Status</label>
              <select id="txtbuscar" onChange={handleFiltroChange}>
                <option value="2">Todos</option>
                <option value="si">Activo</option>
                <option value="no">Inactivos</option>
              </select>
              <label>Paciente</label>
              <input
                id="txtbuscar"
                placeholder="Nombre"
                onChange={handleFilter}
                autoComplete="off"
              />
            </div>
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
                <div className="rowCitas">
                  <select
                    className="form-select"
                    required
                    onChange={(e) => setIdPatients(e.target.value)}
                    value={nomPaciente}
                  >
                    {dataPaciente.map((item) => [
                      <option key={item.idPatients} value={item.idPatients}>
                        {item.name}
                      </option>,
                    ])}
                    <option>{nomPaciente}</option>
                  </select>
                </div>
              )}
            </div>

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Terapia{" "}
              </label>
              <select
                className="form-select"
                onChange={(e) => Fterapia(e.target.value)}
                required
              >
                {datas.map((item) => [
                  <option
                    key={item.nombreTerapia.idTherapy}
                    value={item.nombreTerapia.idTherapy}
                  >
                    {item.nombreTerapia.label}
                  </option>,
                ])}
                <option>{nomTerapia}</option>
              </select>
            </div>

            {terapia ? (
              <div className="rowCitas">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Precio{" "}
                </label>
                <input
                  onChange={(e) => setPriceEvaluacion(e.target.value)}
                  required
                  type="text"
                />
              </div>
            ) : (
              ""
            )}
            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Precio{" "}
              </label>
              <input
                onChange={(e) => setPriceEvaluacion(e.target.value)}
                required
                type="text"
                value={priceEvaluacion}
              />
            </div>

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

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Terapeuta{" "}
              </label>
              <select
                className="form-select"
                onChange={(e) => setIdterapeuta(e.target.value)}
                required
              >
                {terapeuta.map((item) => [
                  <option value={item.idUser} key={item.idUser}>
                    {item.names} {item.apellido}{" "}
                  </option>,
                ])}
                <option>{nomTerapeuta}</option>
              </select>
            </div>

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Consultorio{" "}
              </label>
              <select
                className="form-select"
                onChange={(e) => setConsul(e.target.value)}
                required
              >
                {consultorios.map((item) => [
                  <option value={item.idConsultorio} key={item.idConsultorio}>
                    {item.nombre}{" "}
                  </option>,
                ])}
                <option>{nomConsultorio}</option>
              </select>
            </div>

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Dias{" "}
              </label>
              <select onChange={(e) => setDay(e.target.value)} value={day}>
                <option value="lunes">Lunes</option>
                <option value="martes">Martes</option>
                <option value="miercoles">Miercoles</option>
                <option value="jueves">Jueves</option>
                <option value="viernes">Viernes</option>
                <option value="sabado">Sabado</option>
                <option value="domingo">Domingo</option>
              </select>
            </div>

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Repetir{" "}
              </label>
              <input
                type="number"
                className="recu-repe"
                required
                min="1"
                onChange={(e) => setRepetir(e.target.value)}
                value={repetir}
              />
            </div>

            <div className="rowCitas">
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

      {/*   <div className="modal-paciente" ref={modalCrear}>
        <form
          onSubmit={EnviarEvaluacion}
          className="contenedor-cita"
          id="txtCrearPaciente"
        >
          <div className="cont-titulo-form">
            <h1>Nuevas Citas </h1>
          </div>

          <div className="paddd">
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
                <div className="rowCitas">
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
            </div>

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Terapia{" "}
              </label>
              <select
                className="form-select"
                onChange={(e) => Fterapia(e.target.value)}
                required
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

            {terapia ? (
              <div className="rowCitas">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Precio{" "}
                </label>
                <input
                  onChange={(e) => setPriceEvaluacion(e.target.value)}
                  required
                  type="text"
                />
              </div>
            ) : (
              ""
            )}

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
              />
            </div>

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Terapeuta{" "}
              </label>
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

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Consultorio{" "}
              </label>
              <select
                className="form-select"
                onChange={(e) => setConsul(e.target.value)}
                required
              >
                {consultorios.map((item) => [
                  <option value={item.idConsultorio} key={item.idConsultorio}>
                    {item.nombre}{" "}
                  </option>,
                ])}
              </select>
            </div>

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Dias{" "}
              </label>
              <select onChange={(e) => setDay(e.target.value)}>
                <option>Lunes</option>
                <option>Martes</option>
                <option>Miercoles</option>
                <option>Jueves</option>
                <option>Viernes</option>
                <option>Sabado</option>
                <option>Domingo</option>
              </select>
            </div>

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Repetir{" "}
              </label>
              <input
                type="number"
                className="recu-repe"
                required
                min="1"
                onChange={(e) => setRepetir(e.target.value)}
              />
            </div>

            <div className="rowCitas">
              <label htmlFor="validationServer02" className="labelPaciente">
                Frecuencia{" "}
              </label>
              <select
                className="recu-select"
                required
                onChange={(e) => setFrecuencia(e.target.value)}
              >
                <option>Diario</option>
                <option>Semanal</option>
                <option>Mensual</option>
              </select>
            </div>

            <div className="col" id="cont-btn-admin">
              <button className="btn-cita">Guardar</button>
              <button
                className="btn-cita"
                type="button"
                onClick={CancelarPaciente}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div> */}

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
                    onChange={(e) => setVisitas(e.target.value)}
                  />
                  Visitas<br></br>
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
    </div>
  );
}

export default ListadodeCItas;
