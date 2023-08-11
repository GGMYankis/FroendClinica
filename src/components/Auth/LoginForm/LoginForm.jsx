import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { setToken, setUsuarioCompleto, idUser, urlApi } from "../../../auth-helpers";
import "./LoginForm.css";
import logo from "../../../imagenes/IMG-20230221-WA0009.png";
import useAuth from "./hook/useAuth";
import { decodeToken } from "./Utils/token";
import { Form } from "semantic-ui-react";
import { LoaLogin } from "../../../components/Loading";
import ForgotPassword from "../../ForgotPassword/ForgotPassword";


function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const[forgot , setForgot] = useState(false)
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    }),

    onSubmit: async (formValue) => {
      try {
        setLoading(true);
        const result = await axios.post(`${urlApi}Autenticacion/Login`,formValue)
        
       // console.log(result.data.user)
        setUser(decodeToken(result.data.tokencreado));
        setToken(result.data.tokencreado);
        setUsuarioCompleto(result.data.user.idRol);
        idUser(result.data.user.idUser);
      } catch (error) {
        setError(error.response.data);
        setLoading(false);
      }
      setLoading(false);
    },
  });

  if(forgot) return <ForgotPassword setForgot={setForgot}/>


  return (
    <>
      <div className="cont_login">
        <Form className="form_login" onSubmit={formik.handleSubmit}>
          <img className="logo_login" src={logo} />

          <p className="inicial_letra_login">
            É<span>nfasis</span>
          </p>

          <Form.Input
            type="text"
            placeholder="Correo electronico"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
            input={{
              style: {
                width: "235px",
                padding: "8px 10px",
                borderRadius: "5px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              },
            }}
          />
          <Form.Input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
            input={{
              style: {
                width: "235px",
                padding: "8px 10px",
                borderRadius: "5px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              },
            }}
          />
          {error && <p className="submit-error">{error}</p>}

          <button className={loading ? "btn disabled" : "btn"}>
            Iniciar Sesion{loading && <LoaLogin />}
          </button>
        </Form>

        {/*  <div className="cont-forgot">
           <p onClick={() => setForgot(true)}>Forgot password?</p>
        </div>   */}
       
            
      </div>
    </>
  );
}

export default LoginForm;

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
