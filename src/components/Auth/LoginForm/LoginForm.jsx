import React, {  useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from 'formik';
import {setToken, setUsuarioCompleto,idUser} from "../../../auth-helpers";
import "./LoginForm.css";
import logo from "../../../imagenes/IMG-20230221-WA0009.png";
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
    
    onSubmit: async (formValue) => {

      try {

          const result = await axios.post("https://jdeleon-001-site1.btempurl.com/api/Autenticacion/Login", formValue);

          setUser(decodeToken(result.data.tokencreado));
          setToken(result.data.tokencreado);
          setUsuarioCompleto(result.data.user.idRol) 
          idUser(result.data.user.idUser);

      } catch (error) {
        setError(error.response.data)
      }
    },

  });

  return (
    <>
     
         <div className="contenedor_login3">
            <form className='hhh' onSubmit={formik.handleSubmit}>
              <img className="img3" src={logo} />
                <br></br>

                <span className="verL">
                  <span className="ggL">É</span>nfasis
                </span>

              <input
              type='text'
              placeholder="Correo electronico"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={formik.errors.email && "error" }
              />
                  <input
              type='password'
              placeholder="Contraseña"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
               className={formik.errors.password && "error" }


/>
              <button className='btn'>Iniciar Sesion</button>
              {error && <p className='submit-error'>{error}</p>}
        </form>
          </div>
    </>
  )

}

export default LoginForm

function initialValues (){
  return{
    email:"",
    password:"",
  };
}