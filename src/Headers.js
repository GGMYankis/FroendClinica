import React from "react";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "./imagenes/IMG-20230221-WA0009.png";
import { FaUser, FaUsers, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  setUsuarioM,
  DeleteToken,
  getUsuarioCompleto,
} from "./auth-helpers";
import useAuth from "./components/Auth/LoginForm/hook/useAuth";

function Headers({ reportesPagos, calendario, myElement, paciente,myElementTerapia,RefCitas,myElementUsuario ,pagotera, consultorio}) {
  const navigation = useNavigate();

  const {auth,setUser} = useAuth()
  let user = auth.nameid[1]
  let PrimeraL = user.substr(0, 1)
  
  function StateUser(){
    setUser(null)
    DeleteToken()
  }
 
  
  let rol = getUsuarioCompleto();

  const handleClickOtro = () => {
    if (paciente) {
      paciente.current.classList.toggle("mi-clase-css");
    }

    if (calendario) {
      calendario.current.classList.toggle("mi-clase-css");
    } else if (myElement) {
      myElement.current.classList.toggle("mi-clase-css");
    }
    if(myElementTerapia){
      myElementTerapia.current.classList.toggle("mi-clase-css");

    }
    if(RefCitas){
      RefCitas.current.classList.toggle("mi-clase-css");

    }
    if(myElementUsuario){
      myElementUsuario.current.classList.toggle("mi-clase-css");

    }

    if(pagotera){
      pagotera.current.classList.toggle("mi-clase-css2");

    }

    if(consultorio){
      consultorio.current.classList.toggle("mi-clase-css");

    }

    if(reportesPagos){
      reportesPagos.current.classList.toggle("reportesAnimation");

    }
    
    


    
  };

  return (
    <div>
      <header className="encabezado">
        <div>
          <nav>
            <input type="checkbox" id="check" />

            <label
              htmlFor="check"
              className="checkbtn"
              onClick={handleClickOtro}
            >
              <FaBars id="bar" />
            </label>


            <div className="cont-menu">
              <ul>

                   <li>
                      <Link className="letras-menu" to="/AbonoTerapias">
                        Abono Terapias
                      </Link>
                      
                    </li>

                    <li>
                      <Link className="letras-menu" to="/TerapiaTerapeuta">
                        Asignación
                      </Link>
                    </li>
                    <li>
                  <Link className="letras-menu" to="/asistencias">
                    Asistencia
                  </Link>
                </li>
                <li>
                  <Link className="letras-menu" to="/calendario">
                    Calendario
                  </Link>
                </li>
                <li>
                  <Link className="letras-menu" to="/evaluacion">
                    Citas
                  </Link>
                </li>

                <li>
                  <Link className="letras-menu" to="/terapia">
                    Crear terapia
                  </Link>
                </li>
             
                <li>
                      <Link className="letras-menu" to="/ListadodeCItas">
                       Listado de  Citas
                      </Link>
                    </li>
               
                    <li>
                      <Link className="letras-menu" to="/Consultorios">
                      Listado de Consultorios
                      </Link>
                    </li>

                    {rol == 1 ?
                        <span>

                          <li>
                          <Link className="letras-menu" to="/listasPacientes">
                            Listado de Pacientes
                          </Link>
                        </li>
                        </span>
                    :
                    ""
                    }
                 
                    
                 {rol == 1 ?
                     <span>
                        <li>
                          <Link className="letras-menu" to="/listasTerapias">
                            Listado de Terapias
                          </Link>
                        </li>
                        </span>
                        :
                        ""

                    }
                    {rol == 1 ?
                      <span>          
                      <li>
                        <Link className="letras-menu" to="/">
                          Paciente de ingreso
                        </Link>
                      </li>
                      </span>

                :
                        ""

                    }
                  

                <li>
                      <Link className="letras-menu" to="/PagoTerapeutas">
                        Pago Terapeutas
                      </Link>
                    </li>
              
                    <li>
                      <Link className="letras-menu" to="/gastos">
                        Registro de gastos
                      </Link>
                    </li>
                    <li>
                      <Link className="letras-menu" to="/VerGanancias">
                        Reportes
                      </Link>
                    </li>

                    {rol == 1 ?
                    <span> 
                    <li>
                      <Link className="letras-menu" to="/Users">
                        Usuario
                      </Link>
                    </li>
                    </span>

              :
                      ""

                  }
                    <li>
                      <Link className="letras-menu" to="/reportesPago">
                        Reportes de Pagos
                      </Link>
                    </li>
   
                <li>
                  <a className="letras-menu" id="Cerra-Sesion-ul" onClick={StateUser} >
                    Cerra Sesión
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="cont-logo-header">
          <img className="img-admin-logo" src={logo} />
          <span className="ver">
            <span className="gg">é</span>nfasis
          </span>
        </div>
        <div className="contenedor-botones">
          <div className="cont-btn-headers">
            <div className="probarUs">
              <Link className="Link" to="/perfilAdmin">
                {PrimeraL}
              </Link>
            </div>
          </div>
          <div className="cont-nombre-usuario">
            <p className="nombreUsuario">{user}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Headers;




/* 
{rol == 1 ? (
  <span>


   
   
  </span>
) : (
  ""
)} */