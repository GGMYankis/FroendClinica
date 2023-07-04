import {Form,Button} from 'semantic-ui-react';
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from 'formik';
import { BrowserRouter,Route,Link, Redirect,useNavigate} from "react-router-dom";
import {setToken, setUsuarioCompleto,idUser} from "../../../auth-helpers";
import "./LoginForm.css";
import logo from "../../../imagenes/IMG-20230221-WA0009.png";
import { FaFontAwesomeIcon ,FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode";
import { set } from 'date-fns';
import useAuth from './hook/useAuth';
import { decodeToken } from './Utils/token';


function LoginForm() {

  const [error, setError] = useState("")
  const  {setUser} = useAuth()
  
  const formik = useFormik({
    initialValues:initialValues(),
    validationSchema:Yup.object({
      email:Yup.string().email("El email no es valido").required("el email es obligatorio"),
      password:Yup.string().required("la contraseñas es obligatoria"),
    }),
    onSubmit:(formValue) => {

        const url = "https://jdeleon-001-site1.btempurl.com/api/Autenticacion/Login";
        axios .post(url, formValue)
        .then((result) => {
          setToken(result.data.tokencreado);
          setUser(decodeToken(result.data.tokencreado));
          setUsuarioCompleto(result.data.user.idRol) 
          idUser(result.data.user.idUser);
        }).catch((error) => {
         setError(error.response.data)
        });
      
    },
  });

  return (
    <div>
     
         <div className="contenedor_login3">
            <Form className='hhh' onSubmit={formik.handleSubmit}>
              <img className="img3" src={logo} />
                <br></br>

                <span className="verL">
                  <span className="ggL">É</span>nfasis
                </span>

              <Form.Input
              type='text'
              placeholder="Correo electronico"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
              />
                  <Form.Input
              type='password'
              placeholder="Contraseña"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password }
              />
              <button className='btn'>Iniciar Sesion</button>
              {error && <p className='submit-error'>{error}</p>}
        </Form>
          </div>
    </div>
  )

}

export default LoginForm

function initialValues (){
  return{
    email:"",
    password:"",
  };
}