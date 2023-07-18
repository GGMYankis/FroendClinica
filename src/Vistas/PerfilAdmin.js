
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import React from 'react'
import { getDatosUsuario, DeleteToken } from '../auth-helpers'
import Headers from "../components/Headers/Headers"



function PerfilAdmin() {


    const [usuarioPerfil, setusuarioPerfil] = useState('');
    const [correoPerfil, setcorreoPerfil] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [tipoRol, setTipoRol] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [mensajeError, setMensajeError] = useState(false);
    const [mensajeInfo, setMensajeInfo] = useState(false);
    const [mensaje, setMensaje] = useState(false);


    const id = getDatosUsuario()



    const formRef = useRef(null);


    const resetForm = () => {
        formRef.current.reset();
    };


    useEffect(() => {

        const data = {
            idUser: id
        }

        const url = 'https://jdeleon-001-site1.btempurl.com/api/Clinica/TraerUsuario';
        axios.post(url, data).then((result) => {

            if (result.data.users.idRol == 1) {
                setTipoRol("Admin")
            }else{
                setTipoRol("Terapeuta")
            }
        
            setusuarioPerfil(result.data.users.names)
            setcorreoPerfil(result.data.users.email)

        });

    }, []);



    const editarDatos = {

        IdUser: getDatosUsuario(),
        Password: contraseña
    }

    const editarPerfil = (e) => {

        e.preventDefault()

        if (contraseña.length == 0 || confirmar.length == 0) {
            setMensajeError('los campos no pueden estar vacios')
            return;
        }

        if (contraseña != confirmar) {
            setMensajeError('las Contraseña no coniciden')
            return;
        }

        const url = 'https://jdeleon-001-site1.btempurl.com/api/Clinica/editarPassword';
        axios.put(url, editarDatos).then((result) => {

            resetForm()
            setMensaje(true)
        });
    }

    const editarInfoUser = {

        IdUser: getDatosUsuario(),
        Email: correoPerfil,
        Names: usuarioPerfil
    }

    const editarInfo = (e) => {

        e.preventDefault()

        if (correoPerfil.length == 0 || usuarioPerfil.length == 0) {
            setMensajeInfo('los campos no pueden estar vacios')
            return;
        }


        const url = 'https://jdeleon-001-site1.btempurl.com/api/Clinica/EditarAdmin';
        axios.put(url, editarInfoUser).then((result) => {
            resetForm()
            setMensaje(true)
        });
    }

    function quitar() {
        setMensaje(false)
    }

    const user = {
        IdUser: id
    }

    function eliminarCuenta(e) {
        e.preventDefault()
        const url = 'https://jdeleon-001-site1.btempurl.com/api/Clinica/EliminarUsuario';
        axios.post(url, user).then((result) => {

            if (result) {
                DeleteToken()
            }

        });
    }


    return (

        <div>
            <Headers />

            <div className='contenedorPadre'>

                {mensaje ? <div className="alertPerfilActualiazado" id='mensaje' role="alert">
                    Perfil actualizado.

                    <button className='close' onClick={quitar} >x</button>
                </div>
                    : ""
                }

                {/*Primer CONTENEDOR */}

                <div className='sub-elemento'>
                    <h1 className='titulosPerfil'>Información de tu cuenta</h1>
                    <hr></hr>


                    <div>
                        <form onSubmit={editarInfo}>
                            <div className='con-barra'>
                                <label>Email</label><br></br>
                                <input className='barra-perfil' type='text' value={correoPerfil} onChange={e => setcorreoPerfil(e.target.value)} />
                            </div>

                            <div className='con-barra'>
                                <label>Nombre</label><br></br>
                                <input className='barra-perfil' type='text' value={usuarioPerfil} onChange={e => setusuarioPerfil(e.target.value)} />
                                {mensajeInfo && correoPerfil.length <= 0 ?
                                    <div class="alert alert-danger" role="alert">
                                        {mensajeInfo}
                                    </div> : ""}
                            </div>
                            
                            <div className='con-barra'>
                                <label>Rol: {tipoRol}</label>
                               
                            </div>

                            <button className='btn-perfil'>Guardar Cambios</button>
                        </form>
                    </div>
                </div>


                {/*SEGUNDO CONTENEDOR */}


                <div className='sub-elemento'>
                    <h1 className='titulosPerfil'>Cambiar Contraseña</h1>
                    <hr></hr>
                    <form onSubmit={editarPerfil} ref={formRef}>
                        <div className='con-barra'>
                            <label>Nueva contraseña</label><br></br>
                            <input className='barra-perfil' type='password' onChange={e => setContraseña(e.target.value)} />
                        </div>
                        <div className='con-barra'>
                            <label>Confirmar contraseña</label><br></br>
                            <input className='barra-perfil' type='password' onChange={e => setConfirmar(e.target.value)} />

                            {mensajeError ?
                                <div class="alert alert-danger" role="alert">
                                    {mensajeError}
                                </div> : ""}

                        </div>

                        <button className='btn-perfil' type='submit'  >Actualizar Contraseña</button>
                    </form>
                </div>


                <div className='sub-elemento'>
                    <h1 className='titulosPerfil'>Eliminar Cuenta</h1>
                    <hr></hr>
                    <form ref={formRef}>
                        <div className='con-barra'>
                            <p>Puedes eliminar tu cuenta, pero esta acción es irreversible.</p>
                        </div>

                        <button className='btn-perfil' id='eliminar-perfil' type='submit' onClick={eliminarCuenta} >Eliminar mi cuenta</button>
                    </form>
                </div>


            </div>


        </div>
    )

}

export default PerfilAdmin



