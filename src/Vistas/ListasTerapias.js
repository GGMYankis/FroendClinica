import Cookies from "universal-cookie";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "../imagenes/IMG-20230221-WA0009.png";
import { FaBars, FaTrash, FaEdit } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import $ from "jquery";
import { findDOMNode } from "react-dom";
import swal from "sweetalert";
import Headers from "../Headers";
import {
  DeleteToken,
  getToken,
  initAxiosInterceptors,
  setUsuarioM,
  obtenerUser,
  getNombreUsuario,
  getUsuarioCompleto,
  getDatosUsuario,
} from "../auth-helpers";
import "../Tabla.css";
import { useCookies } from "react-cookie";

function ListasTerapias({ usuarioLogin }) {
  obtenerUser();
  const [terapias, setTerapias] = useState([]);
  const [nmTerapias, setNmTerapias] = useState("  ");
  const [descripcion, setDescripcion] = useState("  ");
  const [price, setPrice] = useState(0);
  const [porcentaje, setPorcentaje] = useState();
  const [porcentajeCentro, setPorcentajeCentro] = useState(0);
  const [idTerapiaEliminar, setIdTerapiaEliminar] = useState();
  const [id, setId] = useState();
  const navigation = useNavigate();

  const modal = useRef();
  const modalEditar = useRef();
  const alertEliminar = useRef();
  const formRef = useRef(null);

  let rol = getUsuarioCompleto();
  useEffect(() => {
    cargar();
  }, []);

  const cargar = (async) => {
    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/ListaTerapia")
      .then((response) => {
        setTerapias(response.data);
        console.log(response.data)
      });
  };

  const data2 = {
    Label: nmTerapias,
    Value: nmTerapias,
    Description: descripcion,
    Price: price,
    Porcentaje: porcentaje,
    PorcentajeCentro: porcentajeCentro,
  };

  const FormularioTherapy = document.getElementById("FormularioTherapy");
  const enviarDatosCrear = (e) => {
    e.preventDefault();

    console.log(data2);
    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/CrearTerapia";
    axios.post(url, data2).then((res) => {
      const probar = async () => {
        modal.current.classList.remove("activo");
        cargar();
        const ale = await swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
        });
      };

      if (res) {
        probar();
      }

      FormularioTherapy.reset();
    });
  };

  const Fcterapia = (e) => {
    setNmTerapias(e);
  };

  const Fcdescripcion = (e) => {
    setDescripcion(e);
  };

  const logout = () => {
    DeleteToken();
    navigation("/login");
  };

  const dataEdi = {
    IdTherapy: id,
    Label: nmTerapias,
    Description: descripcion,
    Price: price,
    Porcentaje: porcentaje,
    PorcentajeCentro: porcentajeCentro,
  };

  const enviarDatos = (e) => {
    e.preventDefault();
    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/EditarTerapia";
    axios.post(url, dataEdi).then((res) => {
      const probar = async () => {
        modalEditar.current.classList.remove("activoEditar");
        cargar();
        const ale = await swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
        });
      };

      if (res) {
        probar();
      }
    });
  };

  function editar(e) {
    modalEditar.current.classList.add("activoEditar");

    setId(e);
    const res = terapias.filter((item) => item.nombreTerapia.idTherapy == e);
    console.log(res);
    res.map((item) => [
      setNmTerapias(item.nombreTerapia.label),
      setDescripcion(item.nombreTerapia.description),
      setPrice(item.nombreTerapia.price),
      setPorcentaje(item.nombreTerapia.porcentaje),
    ]);
  }

  function refreshPage() {
    window.location.reload();
  }

  function eliminar() {
    const idPa = { IdTherapy: idTerapiaEliminar };
    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/EliminarTerapia";
    axios.post(url, idPa).then((res) => {
      const probar = async () => {
        alertEliminar.current.classList.remove("activeEli");
        cargar();
        const ale = await swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
        });
      };

      if (res) {
        probar();
      }
    });
  }

  const modalCerrarEliminar = () => {
    alertEliminar.current.classList.remove("activeEli");
  };

  function quitarModal() {
    modalEditar.current.classList.remove("activoEditar");
  }

  const modalEliminar = (e) => {
    const res = terapias.filter((item) => item.nombreTerapia.idTherapy == e);
    res.map((item) => [setNmTerapias(item.nombreTerapia.label)]);
    alertEliminar.current.classList.add("activeEli");
    setIdTerapiaEliminar(e);
  };
  const myElementTerapia = useRef(null);

  function modalF() {
    modal.current.classList.add("activo");
  }

  function modalQuitarF() {
    modal.current.classList.remove("activo");
    FormularioTherapy.reset();
  }

  const handleClickOtro = () => {
    myElementTerapia.current.classList.toggle("mi-clase-css");
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
            <button className="btn-crear-Paciente-tabla" onClick={modalF}>
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
                  <th>Porcentaje</th>
                  <th>PorcentajeCentro</th>    
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {terapias.map((item) => [
                  <tr key={item.nombreTerapia.idTherapy}>
                    <td data-label="Nombre">{item.nombreTerapia.label}</td>
                    <td data-label="Descripcion">
                      {item.nombreTerapia.description}
                    </td>
                    <td data-label="Price">{item.nombreTerapia.price}</td>
                    <td data-label="Price">{item.nombreTerapia.porcentaje}</td>
                    <td data-label="Price">{item.nombreTerapia.porcentajeCentro}</td>
                    
                    <td className="tr-btn">
                      <button
                        className="btn "
                        type="button"
                        value={item.nombreTerapia.idTherapy}
                        onClick={(e) => editar(e.target.value)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn eliminar"
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

      <div className="cont-modal-lista-terapia" ref={modal}>
        <form
          className="form-perfil-terapi"
          onSubmit={enviarDatosCrear}
          id="FormularioTherapy"
        >
          <div className="cont-titu-terapia">
            <h1>Crear Terapia</h1>
          </div>
          <div className="box-con">
            <div className="con-input-terapia">
              <label>Terapia</label>
              <input
                placeholder="Terapia"
                required
                onChange={(e) => Fcterapia(e.target.value)}
              />
            </div>
            <div className="con-input-terapia">
              <label>Descripción</label>
              <input
                placeholder="Descripción"
                required
                onChange={(e) => Fcdescripcion(e.target.value)}
              />
            </div>
            <div className="con-input-terapia">
              <label>Precio</label>
              <input
                placeholder="Precio"
                id="precio"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="con-input-terapia">
              <label>Porcentaje del Terapeuta</label>
              <input
                placeholder="Precio"
                id="precio"
                required
                onChange={(e) => setPorcentaje(e.target.value)}
              />
            </div>
            <div className="con-input-terapia">
              <label>Porcentaje del Centro</label>
              <input
                type="text"
                onChange={(e) => setPorcentajeCentro(e.target.value)}
                required
              />
            </div>
            <button className="btn-editar-terapia">Crear</button>
            <button
              className="btn-eliminar-terapia"
              type="button"
              onClick={modalQuitarF}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {/*  EDITAR TERAPIA   onClick={Fcprice} */}

      <div className="cont-modal-lista-terapiaEditar" ref={modalEditar}>
        <form className="form-perfil-terapi" id="FormularioEditarTherapy">
          <div className="cont-titu-terapia">
            <h1>Editar Terapia</h1>
          </div>

          <div className="box-con">
            <div className="con-input-terapia">
              <label>Terapia</label>
              <input
                placeholder="Terapia"
                value={nmTerapias}
                onChange={(e) => setNmTerapias(e.target.value)}
              />
            </div>

            <div className="con-input-terapia">
              <label>Descripción</label>
              <input
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="con-input-terapia">
              <label>Precio</label>
              <input
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="con-input-terapia">
              <label>Porcentaje</label>
              <input
                placeholder="Precio"
                id="precio"
                value={porcentaje}
                required
                onChange={(e) => setPorcentaje(e.target.value)}
              />
            </div>
            <button className="btn-editar-terapia" onClick={enviarDatos}>
              Editar
            </button>
            <button className="btn-eliminar-terapia" onClick={quitarModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div className="modal-usuario-eliminar" ref={alertEliminar}>
        <div className="modal-dialog-usuario" role="document">
          <div className="modal-content-usuario">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar Usuario</h5>
            </div>
            <div className="sub-box-usuario">
              <div className="modal-body">
                {
                  <p>
                    ¿Deseas eliminar la terapia:{" "}
                    <span className="text-eliminar">{nmTerapias}</span>?
                  </p>
                }
              </div>
              <hr></hr>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn si"
                  data-dismiss="modal"
                  onClick={eliminar}
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

export default ListasTerapias;
