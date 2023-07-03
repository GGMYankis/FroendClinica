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
import arrow from "./imagenes/arrow.svg";
import "./Headers.css";

function Headers({ citas,reportesPagos, calendario, myElement, paciente,myElementTerapia,RefCitas,myElementUsuario ,pagotera, consultorio}) {
 
  useEffect(() => {
   

    let listElements = document.querySelectorAll('.list__button--click');
    let checkbtn = document.querySelector('.checkbtn');
    let nav = document.querySelector('.nav');
    let lista = document.querySelector('#lista');
    

    listElements.forEach(listElement => {
        listElement.addEventListener('click',() => {
            listElement.classList.toggle('arrow');
            let height = 0;
            let menu = listElement.nextElementSibling;
 
            if(menu.clientHeight == "0"){
             height= menu.scrollHeight;
            }
            menu.style.height = `${height}px`;
            lista.style.background = "#0b2f57";
        });
    });

    return () => {
        window.removeEventListener("click", () => {         
        })
    }
 
},[])


  const navigation = useNavigate();  
   const {auth,setUser, deleteTokenC} = useAuth()
   let user = auth.nameid[1]
   let PrimeraL = user.substr(0, 1) 
  
  function StateUser(){
    setUser(null)
    deleteTokenC();
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

  function ver (){
    let menu = document.querySelector('#menu');

   menu.classList.toggle("activef");


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

    if(citas){
      citas.current.classList.toggle("reportesAnimation");

    }
    
  }

  return (
    <div>

          <nav className="header">
            <label onClick={ver}> <FaBars id="bar" /></label>                      
                <div>
                  <img className="img-admin-logo" src={logo} />
                  <Link to="/"className="logo" >énfasis</Link>
                </div>
              <div className="Colum3">
                  <Link className="Initial--header"to="/perfilAdmin" >{PrimeraL}</Link>
                  {/* <div className="NomCm-header"> {user}</div> */}
              </div>      
          </nav>
 
        <nav className="navsd activef" id="menu">
          <ul className="list" id="lista">

              <li className="list__item">
                  <div className="list__button">
                  {/*    <img src={reportes} className="list__img"/> */}
                      <Link className="nav__link"  to="/AbonoTerapias">  Abono Terapias</Link>
                  </div>
              </li>
              {rol == 1 ? 

              <span>
                <li className="list__item">
                    <div className="list__button">
                        <Link className="nav__link" to="/TerapiaTerapeuta">Asignación</Link>
                    </div>
                </li>
              </span>

              :
              ""
            }
              <li className="list__item">
                  <div className="list__button">
                      <Link className="nav__link" to="/asistencias">Asistencia</Link>
                  </div>
              </li>
              <li className="list__item">
                  <div className="list__button">
                      <Link className="nav__link"  to="/calendario">Calendario</Link>
                  </div>
              </li>
              <li className="list__item">
                  <div className="list__button">
                      <Link className="nav__link"  to="/evaluacion">Citas</Link>
                  </div>
              </li>
              <li className="list__item">
                  <div className="list__button">
                      <Link className="nav__link" to="/terapia"> Crear terapia</Link>
                  </div>
              </li>

              <li className="list__item list__item--click">
                  <div className="list__button list__button--click">
                          <Link  className="nav__link"   >Listados</Link>
                          <img src={arrow} className="list__img"/>
                  </div>

                  <ul className="list__show">
                      <li className="list__inside">
                          <Link className="nav__link nav__link--inside" to="/ListadodeCItas">Listado de  Citas</Link>
                      </li>
 
                       {rol == 1 ? 
 
                      <span>
                       <li className="list__inside">
                                                <Link className="nav__link nav__link--inside" to="/Consultorios">Listado de Consultorios</Link>
                                            </li>
                                            <li className="list__inside">
                                                <Link className="nav__link nav__link--inside" to="/listasPacientes">Listado de Pacientes</Link>
                                            </li>
                                            <li className="list__inside">
                                                <Link className="nav__link nav__link--inside" to="/listasTerapias"> Listado de Terapias</Link>
                                            </li>
                                            <li className="list__inside">
                                                <Link className="nav__link nav__link--inside" to="/listadoAsistencia"> Listado de Asistencias</Link>
                                            </li>
                          </span>
                        :
                        ""

                        }
                  
                  </ul>

              </li>

              <li className="list__item">
                  <div className="list__button">
                      <Link className="nav__link" to="/">Paciente de ingreso</Link>
                  </div>
              </li>
              <li className="list__item">
                  <div className="list__button">
                      <Link className="nav__link" to="/PagoTerapeutas">  Pago Terapeutas</Link>
                  </div>
              </li>
              <li className="list__item">
                  <div className="list__button">
                      <Link className="nav__link"to="/gastos"> Registro de gastos</Link>
                  </div>
              </li>

              <li className="list__item list__item--click">
                  <div className="list__button list__button--click">
                          <Link  className="nav__link" >Reportes</Link>
                          <img src={arrow} className="list__img"/>
                  </div>

                  <ul className="list__show">
                      <li className="list__inside">
                          <Link className="nav__link nav__link--inside"  to="/reportesPago">Reportes de Pagos</Link>
                      </li>

                      <li className="list__inside">
                          <Link className="nav__link nav__link--inside"  to="/VerGanancias">Reportes</Link>
                      </li>                      
                  </ul>

              </li>
              <li className="list__item">
                  <div className="list__button">
                      <Link className="nav__link" to="/Users">Usuario</Link>
                  </div>
              </li>

              <li className="list__item">
                  <div className="list__button">
                      <Link className="nav__link" to="/Users" onClick={StateUser}>Cerra Sesión</Link>
                  </div>
              </li>
          </ul>
        </nav>

    </div>
  );
}

export default Headers;



