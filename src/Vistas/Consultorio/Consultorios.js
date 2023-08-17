import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Headers from "../../components/Headers/Headers"
import swal from "sweetalert";
import "./Consultorio.css";
import { urlApi } from "../../auth-helpers";

function Consultorios() {

  useEffect(() => {
    cargar();
  }, []);

  const [consultorios, setConsultorio] = useState([]);
  const [idUser, setIdUser] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const FormularioTherapy = document.getElementById("txtCrearUusario");

  const modalEditar = useRef();
  const modalCrear = useRef();
  const modalEliminar = useRef();

  const cargar = async () => {

    const response = await axios.get(`${urlApi}Clinica/Consultorios`)
  
          setConsultorio(response.data.lista);
  };

  const data = {
    IdConsultorio: parseInt(idUser),
    Nombre: nombre,
    Descripcion: descripcion,
  };

  function enviar(e) {
    e.preventDefault();

    
    axios.post(`${urlApi}Clinica/EditarConsultorio`, data).then((result) => {
      const probar = async () => {
        modalEditar.current.classList.remove("active");
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


    axios.post(`${urlApi}Clinica/CrearConsultorio`, dataCrear).then((result) => {
      const probar = async () => {
        modalCrear.current.classList.remove("active");
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
    modalEditar.current.classList.add("active");

    const encontrado = consultorios.filter((e) => e.idConsultorio == valor);

    encontrado.map((item) => {
      setNombre(item.nombre);
      setDescripcion(item.descripcion);
    });
    setIdUser(valor);
  }

  function Cancelar() {
    modalCrear.current.classList.remove("active");
    modalEditar.current.classList.remove("active");
    modalEliminar.current.classList.remove("activeEli");
    FormularioTherapy.reset();
  }

  function modalF() {
    modalCrear.current.classList.add("active");
  }

  function EliminarUsuario(valor) {
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
   
    axios.post(`${urlApi}Clinica/EliminarConsultorio`, idusers).then((result) => {
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

  
  const consultorio = useRef(null);


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
                  {consultorios.map((item, index) => [
                    <tr key={index}>
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
      <div className="cont_consultorio" ref={modalEditar}>
        <form className="form_consultorio" onSubmit={enviar}>
          <div className="titu-consultorio">
            <h1>Editar Consultorio</h1>
          </div>

          <div className="box_consultorio">
                <label>Nombre</label>
                <input
                  className="form-users"
                  value={nombre}
                  required
                  onChange={(e) => setNombre(e.target.value)}
                />
                <label>Descripción</label>
                <input
                  className="form-users"
                  value={descripcion}
                  required
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              <div>
                <button   className="btn_consultorio guardar" type="submit">
                  Editar
                </button>
                <button
                   className="btn_consultorio cancelar"
                  type="button"
                  onClick={Cancelar}
                >
                  Cancelar
                </button>
            </div>
          </div>
        </form>
      </div>

      {/* MODAL CREAR USUARIO */}

      <div className="cont_consultorio" ref={modalCrear}>
        <form  className="form_consultorio"onSubmit={CrearUsuario}>
         
          
          <div className="titu-consultorio">
            <h1>Crear Consultorio</h1>
          </div>

          <div className="box_consultorio">
                <label>Nombre</label>
                <input className="form-users" required onChange={(e) => setNombre(e.target.value)}/>


                <label>Descripción</label>
                <input className="form-users" required onChange={(e) => setDescripcion(e.target.value)}/>

                
               
              <div className="footer_consultorio">
                <button
                  className="btn_consultorio guardar"
                  type="submit"
                  value="Crear"
                >Guardar</button>
                <button
                   className="btn_consultorio cancelar"
                  type="button"
                  onClick={Cancelar}
                >
                  Cancelar
                </button>
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
