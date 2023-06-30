import React from 'react'
import "./ListadoDeAsistencia.css";

function ModalAsistencia({ setModal}) {


  return (
    <>
      <div className='cont-modal'>

        <form className='modalEditar'>
            <div className='cont-titu-modal'> 
                  <h1>Editar Asistencia</h1>
            </div>
            <div className='box-modal-asistencia'>

                        <div className='cajas'>
                            <input/>
                            <input/>
                        </div>
                        <div className='cajas'>
                            <input/>
                            <input/>
                        </div>
                        <div className='cajas'>
                            <input/>
                            <input/>
                        </div>
                        <footer className='footer-attendance'>
                                <button className='btn-guardar'>Guardar</button>
                                <button className='btn-cancelar' onClick={() =>  setModal(false)}>Cancelar</button>
                        </footer>
            </div>
            
        </form>
       </div>

    </>
  )
}

export default ModalAsistencia


