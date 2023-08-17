
import React from 'react';
import { useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import {urlApi} from "../../../auth-helpers";

function ModalEliminar(props) {

    const {title,idEliminar , cargar, showModalEliminar , setShowModalEliminar, mensaje} = props;
     const modal = useRef()

 
   function closeModal(e){
    setShowModalEliminar(false)
    modal.current.classList.remove("active_Modal_Eliminar");
   }

   if(showModalEliminar){
     modal.current.classList.add("active_Modal_Eliminar");
   }

   async function SubmitEliminar() {
    
    const data = { IdTherapy: idEliminar };

    const res = await axios.post(`${urlApi}Clinica/EliminarTerapia`,data);
      const probar = async () => {
        cargar();
        setShowModalEliminar(false)
        modal.current.classList.remove("active_Modal_Eliminar");
        const ale = await swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
        });
      };

     probar();
  }

  return (
    <>
      <div className='cont_modal-eliminar' ref={modal}>
        <div className='form-eliminar'>
            <div className='header_eliminar'>
                {title ? title : "Eliminando Datos" }
            </div>

            <div className='body-eliminar'>
                <p>¿Deseas eliminar la terapia:<span>{mensaje}</span>?</p>
                <button className='btn eliminar' onClick={SubmitEliminar}>Eliminar</button>
                <button className='btn cancelar'onClick={closeModal} >Cancelar</button>
            </div>
         
            </div>
        </div>      
    </>
  )
}

export default ModalEliminar
