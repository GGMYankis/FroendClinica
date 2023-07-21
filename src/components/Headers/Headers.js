import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../../imagenes/IMG-20230221-WA0009.png";
import { useEffect } from "react";
import { getUsuarioCompleto } from "../../auth-helpers";
import useAuth from "../../components/Auth/LoginForm/hook/useAuth";
import arrow from "../../imagenes/arrow.svg";
import "./Headers.css";
import { createBrowserHistory } from "history";

function Headers(props) {
  const navigator = useNavigate();
  const {
    citas,
    home,
    reportesPagos,
    calendario,
    myElement,
    paciente,
    myElementTerapia,
    RefCitas,
    myElementUsuario,
    pagotera,
    consultorio,
  } = props;
  const history = createBrowserHistory();

  useEffect(() => {
    let listElements = document.querySelectorAll(".list__button--click");
    let lista = document.querySelector("#lista");

    listElements.forEach((listElement) => {
      listElement.addEventListener("click", () => {
        listElement.classList.toggle("arrow");
        let height = 0;
        let menu = listElement.nextElementSibling;

        if (menu.clientHeight == "0") {
          height = menu.scrollHeight;
        }
        menu.style.height = `${height}px`;
        lista.style.background = "#0b2f57";
      });
    });

    return () => {
      window.removeEventListener("click", () => {});
    };
  }, []);

  const { auth, logout } = useAuth();

  let user = auth.nameid[1];
  let PrimeraL = user.substr(0, 1);

  function onLogout() {
    logout();
  }

  let rol = getUsuarioCompleto();

  function ver() {
    let menu = document.querySelector("#menu");

    menu.classList.toggle("activef");

    if (paciente) {
      paciente.current.classList.toggle("mi-clase-css");
    }

    if (calendario) {
      calendario.current.classList.toggle("mi-clase-css");
    } else if (myElement) {
      myElement.current.classList.toggle("mi-clase-css");
    }
    if (myElementTerapia) {
      myElementTerapia.current.classList.toggle("move_left_modal");
    }
    if (RefCitas) {
      RefCitas.current.classList.toggle("mi-clase-css");
    }
    if (myElementUsuario) {
      myElementUsuario.current.classList.toggle("mi-clase-css");
    }

    if (pagotera) {
      pagotera.current.classList.toggle("mi-clase-css2");
    }

    if (consultorio) {
      consultorio.current.classList.toggle("mi-clase-css");
    }

    if (reportesPagos) {
      reportesPagos.current.classList.toggle("reportesAnimation");
    }

    if (citas) {
      citas.current.classList.toggle("reportesAnimation");
    }

    if (home) {
      home.current.classList.toggle("move_left_modal");
    }
  }

  return (
    <>
      <nav className="header">
        <label onClick={ver}>
          {" "}
          <FaBars id="bar" />
        </label>
        <div>
          <img className="img-admin-logo" src={logo} />
          <Link to="/" className="logo">
            énfasis
          </Link>
        </div>
        <div className="Colum3">
          <Link className="Initial--header" to="/perfilAdmin">
            {PrimeraL}
          </Link>
          {/* <div className="NomCm-header"> {user}</div> */}
        </div>
      </nav>

      <nav className="navsd activef" id="menu">
        {rol == 1 || rol == 3 ? (
          <ul className="list" id="lista">
            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/AbonoTerapias">
                  {" "}
                  Abono Terapias
                </Link>
              </div>
            </li>
            {rol == 1 || rol == 3 ? (
              <span>
                <li className="list__item">
                  <div className="list__button">
                    <Link className="nav__link" to="/Asignación">
                      Asignación
                    </Link>
                  </div>
                </li>
              </span>
            ) : (
              ""
            )}
            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/Asistencia">
                  Asistencia
                </Link>
              </div>
            </li>
            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/calendario">
                  Calendario
                </Link>
              </div>
            </li>
            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/evaluacion">
                  Citas
                </Link>
              </div>
            </li>
            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/terapia">
                  {" "}
                  Crear terapia
                </Link>
              </div>
            </li>

            <li className="list__item list__item--click">
              <div className="list__button list__button--click">
                <Link className="nav__link">Listados</Link>
                <img src={arrow} className="list__img" />
              </div>

              <ul className="list__show">
                <li className="list__inside">
                  <Link
                    className="nav__link nav__link--inside"
                    to="/ListadodeCItas"
                  >
                    Listado de Citas
                  </Link>
                </li>

                {rol == 1 || rol == 3 ? (
                  <span>
                    <li className="list__inside">
                      <Link
                        className="nav__link nav__link--inside"
                        to="/Consultorios"
                      >
                        Listado de Consultorios
                      </Link>
                    </li>
                    <li className="list__inside">
                      <Link
                        className="nav__link nav__link--inside"
                        to="/listasPacientes"
                      >
                        Listado de Pacientes
                      </Link>
                    </li>
                    <li className="list__inside">
                      <Link
                        className="nav__link nav__link--inside"
                        to="/listasTerapias"
                      >
                        {" "}
                        Listado de Terapias
                      </Link>
                    </li>
                    <li className="list__inside">
                      <Link
                        className="nav__link nav__link--inside"
                        to="/listadoAsistencia"
                      >
                        {" "}
                        Listado de Asistencias
                      </Link>
                    </li>
                  </span>
                ) : (
                  ""
                )}
              </ul>
            </li>

            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/">
                  Paciente de ingreso
                </Link>
              </div>
            </li>
            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/gastos">
                  Registro de gastos
                </Link>
              </div>
            </li>

            <li className="list__item list__item--click">
              <div className="list__button list__button--click">
                <Link className="nav__link">Reportes</Link>
                <img src={arrow} className="list__img" />
              </div>

              <ul className="list__show">
                <li className="list__inside">
                  <Link
                    className="nav__link nav__link--inside"
                    to="/reportesPago"
                  >
                    Reportes de Pagos
                  </Link>
                </li>

                {rol == 1 ? (
                  <span>
                    <li className="list__inside">
                      <Link
                        className="nav__link nav__link--inside"
                        to="/PagoTerapeutas"
                      >
                        {" "}
                        Pago Terapeutas
                      </Link>
                    </li>

                    <li className="list__inside">
                      <Link
                        className="nav__link nav__link--inside"
                        to="/VerGanancias"
                      >
                        Historial de gastos
                      </Link>
                    </li>
                  </span>
                ) : (
                  ""
                )}
              </ul>
            </li>
            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/Users">
                  Usuarios
                </Link>
              </div>
            </li>
            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/configuraciones">
                  Configuraciones
                </Link>
              </div>
            </li>

            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/" onClick={onLogout}>
                  Cerra Sesión
                </Link>
              </div>
            </li>
          </ul>
        ) : (
          <ul className="list" id="lista">
            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/calendario">
                  Calendario
                </Link>
              </div>
            </li>

            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/listasPacientes">
                  Listado de Pacientes
                </Link>
              </div>
            </li>
            <li className="list__item">
              <div className="list__button">
                <Link className="nav__link" to="/" onClick={onLogout}>
                  Cerra Sesión
                </Link>
              </div>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Headers;
