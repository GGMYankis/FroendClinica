import React, { useRef } from "react";
import "./ModalUsuario.css";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import swal from "sweetalert";

export default function ModalUsuario(props) {
  const { showModal, setShowModal } = props;
  const modal = useRef();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      names: Yup.string(),
      apellido: Yup.string(),
      telefono: Yup.string(),
      direccion: Yup.string(),
      email: Yup.string(),
      password: Yup.string(),
      idRol: Yup.string(),
    }),
    onSubmit: async (formValue) => {
      try {
        const result = await axios.post(
          "https://jdeleon-001-site1.btempurl.com/api/Clinica/CrearUsuario",
          formValue
        );
        modal.current.classList.remove("active_modal_usuario");
        setShowModal(false);
        const ale = await swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
        });
      } catch (error) {}
    },
  });

  if (showModal) {
    modal.current.classList.add("active_modal_usuario");
  }

  function closeModal() {
    modal.current.classList.remove("active_modal_usuario");
    setShowModal(false);
  }

  return (
    <div className="cont_usuario" ref={modal}>
      <div className="form_modal_usuario">
        <form className="modal_crear_usuario" onSubmit={formik.handleSubmit}>
          <div className="cont_titu_usuario">
            <h1>Crear Usuario</h1>
          </div>
          <div className="box_usuario">
            <div>
              <label>Nombre</label>
              <input
                name="names"
                error={formik.errors.names}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <label>Apellido</label>
              <input
                name="apellido"
                error={formik.errors.apellido}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <label>Telefono</label>
              <input
                name="telefono"
                error={formik.errors.telefono}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <label>Direccion</label>
              <input
                name="direccion"
                error={formik.errors.direccion}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <label>Correo</label>
              <input
                name="email"
                error={formik.errors.email}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <label>Rol</label>
              <select
                name="idRol"
                error={formik.errors.idRol}
                onChange={formik.handleChange}
              >
                <option value="">seleccione un rol</option>
                <option value="1">Administrador</option>
                <option value="2">Terapeuta</option>
                <option value="3">Asistente</option>
                <option value="4">Usuario</option>
              </select>
            </div>
          </div>

          <label>Contraseñas</label>
          <input
            name="password"
            error={formik.errors.password}
            onChange={formik.handleChange}
          />

          <button className="btn crear" type="submit">
            Crear
          </button>
          <button className="btn cancelar" onClick={closeModal}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

function initialValues() {
  return {
    names: "",
    apellido: "",
    telefono: "",
    direccion: "",
    email: "",
    password: "",
    idRol: "",
  };
}
