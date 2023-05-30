
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
//import { Navigate, Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Redirect, Form, useNavigate } from 'react-router-dom';
import { Landing, Usuario } from '../pages/paginas';
import { Protect } from '../components/Protect';
import logo from "../imagenes/IMG-20230221-WA0009.png";
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import { FaFontAwesomeIcon, FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from 'jwt-decode';
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, idUser, getDatosUsuario, setUsuarioCompleto, setToken, nombreUsuario } from '../auth-helpers'
import { Loading, LoaLogin } from '../components/Loading';

function Login({ setUsuarioLogin }) {

    const login = document.getElementById("login")
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [mensajeError, setMensajeError] = useState(null)
    const [loading, setLoading] = useState(false);

    const navigation = useNavigate();


    const resportes = useRef();
    const handleLogin = async (e) => {

        try {
            e.preventDefault()

            if (email.length == 0 || Password.length == 0) {
                setMensajeError('Debe de llenar los campos')
                return;
            }

            var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

            var esValido = expReg.test(email);

            if (esValido == true) {

            } else {
                setMensajeError('La dirección del correo no es válida')
                return;
            }
            const data = {
                Email: email,
                Password: Password
            };

            resportes.current.classList.add('contenedorsL');
            setTimeout(() => {
                resportes.current.classList.remove('contenedorsL');
            }, 4000);


            const url = 'https://jdeleon-001-site1.btempurl.com/api/Autenticacion/Login';
            axios.post(url, data).then((result) => {

                if (result.data.user != null) {
                   
                    setToken(result.data.tokencreado)
                     navigation("/admin")
                    const user = result.data.user.names.substring('', 1)
                    setUsuarioM(user)
                    idUser(result.data.user.idUser)
                    nombreUsuario(result.data.user.names)
                    setUsuarioCompleto(result.data.user.idRol)
                    login.reset()

                } else {
                    resportes.current.classList.remove('contenedorsL');
                    setLoading(false)
                    setMensajeError(result.data.message)
                    return;
                }

            }).catch((error) => {

                swal("Ha ocurrido un error", "Intentelo mas tarde", "error");

            })

        } catch (error) {

        }
    }

    return (

        <div className='contenedor_login3'>
            <form className='hhh' onSubmit={handleLogin} id="login" ref={resportes}>
                {
                    loading ? <LoaLogin /> : ""
                }

                <img className='img3' src={logo} /><br></br>

                <span className='verL'><span className='ggL'>É</span>nfasis</span>

                <div className='cont-email-login' >
                    <FontAwesomeIcon icon={faEnvelope} className='email' />
                    <input type="text" placeholder='Email' id='emaillogin' onChange={(e) => setEmail(e.target.value)} autocomplete="off" />
                </div>

                <div className='cont-email-login' >
                    <FontAwesomeIcon icon={faLock} className='email' />
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} autocomplete="off" />
                </div>
                {mensajeError ?
                    <div class="alert alert-danger" role="alert">
                        {mensajeError}
                    </div>
                    : ""
                }
                <button className='btn'>Login</button>
            </form>




        </div >
    )
}

export default Login;


/* input:focus {
    outline-color: red;
  } */