import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Headers from "../Headers";
import swal from "sweetalert";
import { FaUser, FaUsers, FaTrash, FaEdit } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import {
  DeleteToken,
  getToken,
  initAxiosInterceptors,
  setUsuarioM,
  obtenerUser,
  getNombreUsuario,
  getUsuarioCompleto,
} from "../auth-helpers";
import { useNavigate } from "react-router-dom";
import logo from "../imagenes/IMG-20230221-WA0009.png";

function Consultorios() {
  let rol = getUsuarioCompleto();
  useEffect(() => {
    cargar();
  }, []);

  const [consultorios, setConsultorio] = useState([]);
  const [idUser, setIdUser] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idRol, setIdRol] = useState(0);
  const FormularioTherapy = document.getElementById("txtCrearUusario");
  const navigation = useNavigate();

  const modalEditar = useRef();
  const modalCrear = useRef();
  const modalEliminar = useRef();

  const cargar = (async) => {
    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Consultorios")

      .then((response) => {
        response.data.lista.map((a) => {
          setConsultorio(response.data.lista);
        });
      });
  };

  const data = {
    IdConsultorio: parseInt(idUser),
    Nombre: nombre,
    Descripcion: descripcion,
  };

  function enviar(e) {
    e.preventDefault();

    console.log(data);
    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/EditarConsultorio";
    axios.post(url, data).then((result) => {
      const probar = async () => {
        modalEditar.current.classList.remove("activeUsers");
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
    });
  }

  const dataCrear = {
    Nombre: nombre,
    Descripcion: nombre,
  };

  function CrearUsuario(e) {
    e.preventDefault();

    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/CrearConsultorio";
    axios.post(url, dataCrear).then((result) => {
      const probar = async () => {
        modalCrear.current.classList.remove("activeCrear");
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

      FormularioTherapy.reset();
    });
  }

  function EditarUsuario(valor) {
    modalEditar.current.classList.add("activeUsers");

    const encontrado = consultorios.filter((e) => e.idConsultorio == valor);

    encontrado.map((item) => {
      setNombre(item.nombre);
      setDescripcion(item.descripcion);
    });
    setIdUser(valor);
  }

  function Cancelar() {
    modalCrear.current.classList.remove("activeCrear");
    modalEditar.current.classList.remove("activeUsers");
    modalEliminar.current.classList.remove("activeEli");
    FormularioTherapy.reset();
  }

  function modalF() {
    modalCrear.current.classList.add("activeCrear");
  }

  function EliminarUsuario(valor) {
    console.log(valor);
    const encontrado = consultorios.filter((e) => e.idConsultorio == valor);
    encontrado.map((n) => {
      setNombre(n.nombre);
    });

    setIdUser(valor);
    modalEliminar.current.classList.add("activeEli");
  }

  const idusers = {
    IdConsultorio: idUser,
  };

  function enviarId() {
    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/EliminarConsultorio";
    axios.post(url, idusers).then((result) => {
      const probar = async () => {
        modalEliminar.current.classList.remove("activeEli");
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
    });
  }

  const logout = () => {
    DeleteToken();
    navigation("/login");
  };

  const consultorio = useRef(null);

  const handleClickOtro = () => {
    consultorio.current.classList.toggle("mi-clase-css");
  };

  return (
    <div>
      <Headers consultorio={consultorio} />

      <div className="contCard" ref={consultorio}>
        <div className="card-box ">
          <div className="card-body">
            <div className="contTituUsuario">
              <h1>Lista de Consultorios</h1>
            </div>

            <div className="subBoxTableUsuario">
              <div className="cont-bnt-crear">
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn-crear-Paciente-tabla"
                    onClick={modalF}
                  >
                    Crear Nuevo
                  </button>
                </div>
              </div>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th> </th>
                  </tr>
                </thead>

                <tbody>
                  {consultorios.map((item) => [
                    <tr>
                      <td data-label="Nombre">{item.nombre}</td>
                      <td data-label="apellido">{item.descripcion}</td>

                      <td className="tr-btn">
                        <button
                          className="btn-tabla-usuario"
                          type="button"
                          value={item.idConsultorio}
                          onClick={(e) => EditarUsuario(e.target.value)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn-tabla-usuario-eliminar "
                          type="button"
                          value={item.idConsultorio}
                          onClick={(e) => EliminarUsuario(e.target.value)}
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
      </div>

      {/* MODAL EDITAR USUARIO */}
      <div className="cont-modal-lista-usuario" ref={modalEditar}>
        <form className="form-perfil-usuario" onSubmit={enviar}>
          <div className="cont-titu-usuario">
            <h1>Editar Consultorio</h1>
          </div>

          <div className="box-con-usuario">
            <div className="row">
              <div className="col">
                <label>Nombre</label>
                <input
                  className="form-users"
                  value={nombre}
                  required
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="col">
                <label>Descripción</label>
                <input
                  className="form-users"
                  value={descripcion}
                  required
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <button className="btn-editar-terapia" type="submit">
                  Editar
                </button>
                <button
                  className="btn-eliminar-terapia"
                  type="button"
                  onClick={Cancelar}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* MODAL CREAR USUARIO */}

      <div className="cont-modal-crear-usuario" ref={modalCrear}>
        <form
          className="form-crear-usuario"
          onSubmit={CrearUsuario}
          id="txtCrearUusario"
        >
          <div className="cont-titu-crear-usuario">
            <h1>Crear Consultorio</h1>
          </div>

          <div className="box-con-usuario">
            <div className="row">
              <div className="col">
                <label>Nombre</label>
                <input
                  className="form-users"
                  required
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="col">
                <label>Descripción</label>
                <input
                  className="form-users"
                  required
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <input
                  className="btn-editar-terapia"
                  type="submit"
                  value="Crear"
                />
                <button
                  className="btn-eliminar-terapia"
                  type="button"
                  onClick={Cancelar}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="modal-usuario-eliminar" ref={modalEliminar}>
        <div className="modal-dialog-usuario" role="document">
          <div className="modal-content-usuario">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar Consultorio</h5>
            </div>
            <div className="sub-box-usuario">
              <div className="modal-body">
                {
                  <p>
                    ¿Deseas eliminar el Consultorio:
                    <span className="text-eliminar"> {nombre}</span> ?
                  </p>
                }
              </div>
              <hr></hr>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn si"
                  data-dismiss="modal"
                  onClick={enviarId}
                >
                  Si
                </button>
                <button type="button" className="btn no" onClick={Cancelar}>
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
export default Consultorios;
