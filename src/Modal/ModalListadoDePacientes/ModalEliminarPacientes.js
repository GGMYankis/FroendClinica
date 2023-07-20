import React,{useRef} from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import axios from "axios";
import swal from "sweetalert";


export default function ModalEliminarPacientes(props) {
    
    const {setShowModalEliminar , showModalEliminar, nombre ,idPatients , cargar} = props;
    const modal = useRef();


    const  data = {
        idPatients:idPatients
    }

    const SubmitEliminar = async (e) => {
         e.preventDefault();
         
        try {
            console.log(idPatients)
            const res = axios.post("https://jdeleon-001-site1.btempurl.com/api/Clinica/EliminarPaciente", data);
            modal.current.classList.remove("active_Modal_Eliminar");
            setShowModalEliminar(false);
            cargar();
            const ale = await swal({
                title: "Correcto",
                text: "Cambio guardado ",
                icon: "success",
              });
        } catch (error) {
            console.log(error.response)
        }
         
    }

      


    function closeModal(e){
        setShowModalEliminar(false)
        modal.current.classList.remove("active_Modal_Eliminar");
       }

   if(showModalEliminar){
    modal.current.classList.add("active_Modal_Eliminar");
  }

  return (
    <div className='cont_modal-eliminar' ref={modal}>
        <form className='form-eliminar' onSubmit={SubmitEliminar}>
            <div className='header_eliminar'>
              <p>Eliminar paciente</p>
            </div>

            <div className='body-eliminar'>
                <p>¿Eliminar el paciente: <span>{nombre}</span>?</p>
                <button className='btn eliminar'  type='submit'>Eliminar</button>
                <button className='btn cancelar'type='button' onClick={closeModal} >Cancelar</button>
            </div>  
       </form>
    </div>     
  )
}

