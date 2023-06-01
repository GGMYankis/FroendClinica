import React from "react";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "./imagenes/IMG-20230221-WA0009.png";
import { FaUser, FaUsers, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  setUsuarioM,
  obtenerUser,
  getNombreUsuario,
  DeleteToken,
  getUsuarioCompleto,
} from "./auth-helpers";

function Headers({ calendario, myElement, paciente }) {
  const navigation = useNavigate();
  obtenerUser();

  const logout = () => {
    DeleteToken();
    navigation("/login");
  };

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
                  <Link className="letras-menu" to="/admin">
                    Paciente de ingreso
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

                {rol == 1 ? (
                  <span>
                    <li>
                      <Link className="letras-menu" to="/listasPacientes">
                        Listado de Pacientes
                      </Link>
                    </li>

                    <li>
                      <Link className="letras-menu" to="/listasTerapias">
                        Listado de Terapias
                      </Link>
                    </li>
                  </span>
                ) : (
                  ""
                )}

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

                {rol == 1 ? (
                  <span>
                    <li>
                      <Link className="letras-menu" to="/TerapiaTerapeuta">
                        Asignación
                      </Link>
                    </li>
                    <li>
                      <Link className="letras-menu" to="/Users">
                        Usuario
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
                    <li>
                      <Link className="letras-menu" to="/AbonoTerapias">
                        AbonoTerapias
                      </Link>
                    </li>
                    <li>
                      <Link className="letras-menu" to="/PagoTerapeutas">
                        PagoTerapeutas
                      </Link>
                    </li>
                    <li>
                      <Link className="letras-menu" to="/Consultorios">
                        Consultorios
                      </Link>
                    </li>
                    <li>
                      <Link className="letras-menu" to="/ListadodeCItas">
                       Listado de  Citas
                      </Link>
                    </li>
                  </span>
                ) : (
                  ""
                )}
                <li>
                  <a className="letras-menu" onClick={logout}>
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
                {obtenerUser()}
              </Link>
            </div>
          </div>
          <div className="cont-nombre-usuario">
            <p className="nombreUsuario">{getNombreUsuario()}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Headers;

{
  /* <input type="checkbox" id="checkOtro" onClick={handleClickOtro} />

<label htmlFor="checkOtro" className="checkbtnOtro">
<FaBars id='bar' />
</label> */
}
