import React from 'react';
import Headers from "../../components/Headers/Headers";
import "./Configuraciones.css"
import { useState, useRef } from 'react';
import axios from "axios";
import { useEffect } from 'react';
import ModalConfig from "../../components/Modal/ModalConfig/ModalConfig"

function Configuraciones() {


    const[cofiguracion, setConfig] = useState([]);
    const[Key, setKey] = useState("");
    const[value, setValue] = useState("");
    const[idKey, setIdKey] = useState("");
    const[showModal, setShowModal] = useState(false);

 
    const editar = useRef();
    const eliminar = useRef();

  
       async  function cargar(){
        const res = await axios.get("https://jdeleon-001-site1.btempurl.com/api/Clinica/ConfigListado")
        setConfig(res.data);

        }
        useEffect(() => {
            cargar();
        },[])
      

        const dataEditar = {
            idKey:idKey,
            key:Key,
            value:value
        }

        async function SubmitEditar(e){
            e.preventDefault();
            const res = await axios.post("https://jdeleon-001-site1.btempurl.com/api/Clinica/ConfigEditar",dataEditar)
            cargar();
            editar.current.classList.remove("active-Modal");
        }


        function handleEditar(e){

                    let filterConifg = cofiguracion.filter(c => c.idKey == e);
                    filterConifg.map(c => {
                            setKey(c.key)
                            setValue(c.value)
                            setIdKey(c.idKey)
                    })

                    editar.current.classList.add("active-Modal");
        }

        function closeModal(e){
            editar.current.classList.remove("active-Modal");

        }

       
        function closeModalEliminar(e){
            eliminar.current.classList.remove("active-Modal");

        }


        function handleEliminar(e){

            let filterConifg = cofiguracion.filter(c => c.idKey == e);
            filterConifg.map(c => {
             setIdKey(c.idKey)
            })

            eliminar.current.classList.add("active-Modal");

        }


        const dataEliminar = {
            idKey:idKey
        }

        async function SubmitEliminar(e){

            e.preventDefault();
            const res = await axios.post("https://jdeleon-001-site1.btempurl.com/api/Clinica/ConfigEliminar",dataEliminar)
            cargar();
            eliminar.current.classList.remove("active-Modal");
        }

    
  return (
    <>
      
            <div className='cont-consultorio'>
                   <div className='cont-table'>
                    <div className='titu-config'>
                        <h1>Listado de Configuraciones</h1>
                    </div>

                   {/*  onClick={handleCrear} */}

                    <div className='cont-crear-config'>
                        <button className='btn' onClick={() => setShowModal(true)} >Crear</button>
                    </div>
                    <div className='box-config'>

                    <table className='table-config'>
                        <thead>
                              <tr>
                                <th>Key</th>
                                <th>Value</th>
                                <th></th>
                              </tr>
                        </thead>
                        <tbody>

                    {
                            cofiguracion.map((item, index) => [
                                <tr key={index}>
                                    <td>{item.key}</td>
                                    <td>{item.value}</td>
                                    <td>
                                        <button className='btn editar'value={item.idKey}  onClick={e =>  handleEditar(e.target.value)}>Editar</button>
                                        <button className='btn eliminar' value={item.idKey}  onClick={e =>  handleEliminar(e.target.value)}  >Eliminar</button>
                                    </td>
                                </tr>
                            ])

                    }
                      

                        </tbody>
                    </table>

                    </div>


                   </div>
            </div>

            <div className='cont-modal' ref= {editar}>
                <form className='form-modal' onSubmit={SubmitEditar}>
                    <div className='titu-modal'>
                        <h1>Editar Configuraciones</h1>
                    </div>

                    <div className='box-modal'>
                        <label>Key</label>
                        <input placeholder='Key' value={Key} onChange={e => setKey(e.target.value)} required/>

                        <label>Value</label>
                        <input placeholder='Value' value={value}  onChange={e => setValue(e.target.value)} required/>

                        <button className='btn guardar' type='submit'>Guardar</button>
                        <button className='btn eliminar' onClick={closeModal}>Cancelar</button>
                    </div>
                    
                </form>
            </div> 

            <div className="modal-usuario-eliminar" ref={eliminar}>
                <div className="modal-dialog-usuario" role="document">
                <div className="modal-content-usuario">
                    <div className="modal-header">
                    <h5 className="modal-title">Eliminar Configuración</h5>
                    </div>
                    <div className="sub-box-usuario">
                    <div className="modal-body">
                        {
                        <p>
                            ¿Deseas eliminar el Configuración:{" "}
                            <span className="text-eliminar">{idKey}</span>?
                        </p>
                        }
                    </div>
                    <hr></hr>
                    <div className="modal-footer">
                        <button
                        type="button"
                        className="btn si"
                        data-dismiss="modal"
                        onClick={SubmitEliminar}
                        >
                        Si
                        </button>
                        <button
                        type="button"
                        className="btn no"
                        onClick={closeModalEliminar}
                        >
                        No
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <Headers/>

                 <ModalConfig  setShowModal={setShowModal} showModal={showModal} cargar={cargar()} /> 
                      
           
    </>
  )
}

export default Configuraciones
 