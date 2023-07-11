import { useState, useRef } from 'react';
import axios from "axios";
import React from 'react'

function ModalConfig(props) {

    const {showModal,setShowModal, cargar} = props;
    const crear = useRef();

    const [dataCrear, setDataCrear] = useState({
        key:"",
        value:""
    });

    async function enviar(e){
        e.preventDefault();
        const res = await axios.post("https://jdeleon-001-site1.btempurl.com/api/Clinica/Config",dataCrear)
        cargar()
        setShowModal(false)
        crear.current.classList.remove("active-Modal");
    }

    function onChangeData(e) {

        setDataCrear({
            ...dataCrear,
            [e.target.name]: e.target.value
        })
    }
    
    function closeModalCrear(e){
        setShowModal(false)
       crear.current.classList.remove("active-Modal");
    }

    if(showModal){
      crear.current.classList.add("active-Modal")
    }

  return (
    <>

            <div className='cont-modal' ref={crear}>
                <form className='form-modal' onSubmit={enviar}>
                    <div className='titu-modal'>
                        <h1>Crear Configuraciones</h1>
                    </div>

                    <div className='box-modal'>
                        <label>Key</label>
                        <input placeholder='Key' required onChange={onChangeData} name='key'/>

                        <label>Value</label>
                        <input placeholder='Value' required  onChange={onChangeData} name='value'/>

                        <input className='btn guardar'  type='submit' value="Guardar"/>
                        <button className='btn eliminar' type='button' onClick={closeModalCrear}>Cancelar</button>
                    </div>
                    
                </form>
            </div> 
    
         
    </>
  )
}

export default ModalConfig
