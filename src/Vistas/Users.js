import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Headers from "../components/Headers/Headers";
import ModalUsuario from "../Modal/ModalUsuario/ModalUsuario";
import swal from "sweetalert";
import { urlApi } from "../auth-helpers";

function Users() {
  useEffect(() => {
    cargar();
  }, []);

  const [terapeuta, setTerapeuta] = useState([]);
  const [idUser, setIdUser] = useState(0);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseñas, setContraseñas] = useState("");
  const [idRol, setIdRol] = useState();
  const [showModal, setShowModal] = useState(false);

  const modalEditar = useRef();
  const modalEliminar = useRef();

  const cargar = (async) => {
    axios
      .get(`${urlApi}Clinica/ListaUsers`)

      .then((response) => {
        response.data.lista.map((a) => {
          if (a.idRol == 1) {
            setTerapeuta((a.idRol = "Administrador"));
          } else if (a.idRol == 2) {
            setTerapeuta((a.idRol = "Terapeuta"));
          } else if (a.idRol == 3) {
            setTerapeuta((a.idRol = "Asistente"));
          }
          setTerapeuta(response.data.lista);
        });
      });
  };

  const data = {
    IdUser: parseInt(idUser),
    Names: nombre,
    Label: nombre,
    Apellido: apellido,
    Telefono: telefono,
    Direccion: direccion,
    Email: correo,
    Password: contraseñas,
    IdRol: parseInt(idRol),
  };

  function enviar(e) {
    e.preventDefault();


    axios.post(`${urlApi}Clinica/GuardarUsers`, data).then((result) => {
      const probar = async () => {
        modalEditar.current.classList.remove("active_modal_usuario_editar");
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

  function EditarUsuario(valor) {
    setIdRol(null);
    modalEditar.current.classList.add("active_modal_usuario_editar");

    const encontrado = terapeuta.filter((e) => e.idUser == valor);

    encontrado.map((item) => {
      if (item.idRol == "Administrador") {
        setIdRol(1);
      } else if (item.idRol == "Terapeuta") {
        setIdRol(2);
      } else {
        setIdRol(3);
      }
    });

    encontrado.map((item) => {
      setNombre(item.names);
      setApellido(item.apellido);
      setTelefono(item.telefono);
      setDireccion(item.direccion);
      setCorreo(item.email);
      setContraseñas(item.password);
    });
    setIdUser(valor);
  }

  function Cancelar() {
    modalEditar.current.classList.remove("active_modal_usuario_editar");
    modalEliminar.current.classList.remove("activeEli");
  }

  function EliminarUsuario(valor) {
    const encontrado = terapeuta.filter((e) => e.idUser == valor);
    encontrado.map((n) => {
      setNombre(n.names);
    });

    setIdUser(valor);
    modalEliminar.current.classList.add("activeEli");
  }

  const idusers = {
    IdUser: idUser,
  };

  function enviarId() {
    axios.post(`${urlApi}Clinica/EliminarUsuario`, idusers).then((result) => {
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

  const myElementUsuario = useRef(null);

  const handlerModal = (type) => {
    switch (type) {
      case "crear":
        setShowModal(true);
        break;
      case "editar":
        setShowModal(true);

      default:
        break;
    }
  };

  return (
    <>
      <Headers myElementUsuario={myElementUsuario} />

      <div className="contCard" ref={myElementUsuario}>
        <div className="card-box ">
          <div className="card-body">
            <div className="contTituUsuario">
              <h1>Listado de Usuarios</h1>
            </div>

            <div className="subBoxTableUsuario">
              <div className="cont-bnt-crear">
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn-crear-Paciente-tabla"
                    onClick={() => handlerModal("crear")}
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
                    <th>Apellido</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Cargo</th>
                    <th> </th>
                  </tr>
                </thead>

                <tbody>
                  {terapeuta.map((item) => [
                    <tr key={item.idUser}>
                      <td data-label="Nombre">{item.names}</td>
                      <td data-label="apellido">{item.apellido}</td>
                      <td data-label="telefono">{item.telefono}</td>
                      <td data-label="direccion">{item.email}</td>
                      <td data-label="direccion">{item.idRol}</td>
                      <td className="tr-btn">
                        <button
                          className="btn-tabla-usuario"
                          type="button"
                          value={item.idUser}
                          onClick={(e) => EditarUsuario(e.target.value)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn-tabla-usuario-eliminar "
                          type="button"
                          value={item.idUser}
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
      <div className="cont_modal_usuario" ref={modalEditar}>
        <form className="form_usuario" onSubmit={enviar}>
          <div className="cont_titu_usuario_editar">
            <h1>Editar Usuario</h1>
          </div>

          <div className="box_usuario_editar">
           
              <div>
                <label>Nombre</label>
                <input
                  className="form-users"
                  value={nombre}
                  required
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div >
                <label>Apellido</label>
                <input
                  className="form-users"
                  value={apellido}
                  required
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>

              <div >
                <label>Telefono</label>
                <input
                  className="form-users"
                  value={telefono}
                  required
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
              <div >
                <label>Direccion</label>
                <input
                  
                  value={direccion}
                  required
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>

              <div >
                <label>Correo</label>
                <br></br>
                <input
                  
                  value={correo}
                  required
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div >
                <label>Rol</label>
                <select                     
                  value={idRol}
                  onChange={(e) => setIdRol(e.target.value)}
                  required
                >
                  <option value="">seleccione un rol</option>
                  <option value="1">Administrador</option>
                  <option value="2">Terapeuta</option>
                  <option value="3">Asistente</option>
                  <option value="4">Usuario</option>
                </select>
              </div>

              <div className="col">
                <label>Contraseña</label>
                <input
                  
                  type="password"
                  value={contraseñas}
                  required
                  onChange={(e) => setContraseñas(e.target.value)}
                />
              </div>

              

              
          </div>
          <div >
                <button type="submit" className="btn editar">
                  Editar
                </button>
                <button             
                  type="button"
                  className="btn cancelar"
                  onClick={Cancelar}
                >
                  Cancelar
                </button>
              </div>
        </form>
      </div>

      <ModalUsuario showModal={showModal} setShowModal={setShowModal} cargar={cargar}/>

      <div className="modal-usuario-eliminar" ref={modalEliminar} >
        <div className="modal-dialog-usuario" role="document">
          <div className="modal-content-usuario">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar Usuario</h5>
            </div>
            <div className="sub-box-usuario">
              <div className="modal-body">
                {
                  <p>
                    ¿Deseas eliminar el Usuario:
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
    </>
  );
}
export default Users;
