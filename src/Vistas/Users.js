import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Headers from "../components/Headers/Headers"
import ModalUsuario from "../Modal/ModalUsuario/ModalUsuario";
import swal from "sweetalert";
import {
  getUsuarioCompleto,
} from "../auth-helpers";

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
  const[showModal, setShowModal]= useState(false);
  
  const FormularioTherapy = document.getElementById("txtCrearUusario");

  const modalEditar = useRef();
  const modalCrear = useRef();
  const modalEliminar = useRef();



  const cargar = (async) => {
    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/ListaUsers")

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


    const url = "https://jdeleon-001-site1.btempurl.com/api/Clinica/GuardarUsers";
      
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

 

 

  function EditarUsuario(valor) {
    setIdRol(null)
    modalEditar.current.classList.add("activeUsers");

    const encontrado = terapeuta.filter((e) => e.idUser == valor);

    encontrado.map((item) => {
      if (item.idRol == "Administrador") {
        setIdRol(1);

      }
      else if(item.idRol == "Terapeuta") {
        setIdRol(2);
      }else{
        setIdRol(3)
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
    modalCrear.current.classList.remove("activeCrear");
    modalEditar.current.classList.remove("activeUsers");
    modalEliminar.current.classList.remove("activeEli");
    FormularioTherapy.reset();
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
    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/EliminarUsuario";
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

 
  const myElementUsuario = useRef(null);

 


 const handlerModal = (type) =>{
  switch(type){
    case "crear":
          setShowModal(true)
      break;
      case "editar":
        setShowModal(true)
      
      default:
        break;
  }

 } 

 

  return (
    <>
     
    <Headers myElementUsuario={myElementUsuario}/>

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
      <div className="cont-modal-lista-usuario" ref={modalEditar}>
        <form className="form-perfil-usuario" onSubmit={enviar}>
          <div className="cont-titu-usuario">
            <h1>Editar Usuario</h1>
          </div>

          <div className="box-con">
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
                <label>Apellido</label>
                <input
                  className="form-users"
                  value={apellido}
                  required
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label>Telefono</label>
                <input
                  className="form-users"
                  value={telefono}
                  required
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
              <div className="col">
                <label>Direccion</label>
                <input
                  className="form-users"
                  value={direccion}
                  required
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label>Correo</label>
                <br></br>
                <input
                  className="form-users"
                  value={correo}
                  required
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="col">
                <label>contraseñas</label>
                <input
                  className="form-users"
                  type="password"
                  value={contraseñas}
                  required
                  onChange={(e) => setContraseñas(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
              <select
                  id="cboactivo"
                  className="form-control"
                  value={idRol}
                  onChange={(e) => setIdRol(e.target.value)}
                  required
                >
                  <option value="">seleccione una opción</option>
                  <option value="1">Administrador</option>
                  <option value="2">Terapeuta</option>
                  <option value="3">Asistente</option>
                  <option value="4">Usuario</option>
                </select>
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


      <ModalUsuario showModal={showModal} setShowModal={setShowModal}/>

      <div className="modal-usuario-eliminar" ref={modalEliminar}>
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


