import Cookies from "universal-cookie";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import Home from "./Vistas/Home";
import Gastos from "./Vistas/Gastos/Gastos"
import AbonoTerapias from "./Vistas/AbonosTerapias/AbonosTerapias";
import Evaluacion from "./Vistas/Evaluacion";
import Consultorios from "./Vistas/Consultorio/Consultorios";
import "bootstrap/dist/css/bootstrap.min.css";
import VerGanancias from "./Vistas/VerGanancias";
import PagoTerapeutas from "./Vistas/PagoTerapeutas";
import PerfilAdmin from "./Vistas/PerfilAdmin";
import ListasTerapias from "./Vistas/ListadoDeTerapias/ListadoTerapias";
import ListadodeCItas from "./Vistas/ListadodeCItas";
import ListadoAsistencia from "./Vistas/ListadoDeAsistencia/ListadoAsistencia";
import Asistencia from "./Vistas/Asistencia/Asistencia";
import Terapia from "./Vistas/Terapia/Terapia";
import Asignación from "./Vistas/Asignación/Asignación";
import Configuraciones from "./Vistas/Configuraciones/Configuraciones";
import Users from "./Vistas/Users";
import Abono from "./Vistas/Abono";
import Contabilidad from "./Vistas/Contabilidad";
import ListasPacientes from "./Vistas/ListadoDePacientes/ListasPacientes";
import Calendario from "./Vistas/Calendario";
import ReportesPago from "./Vistas/ReportesPago";
import ErrorPage from "./Vistas/ErrorPage";
import {
  getToken,
  initAxiosInterceptors,
  getUsuarioCompleto,
  removeToken,
} from "./auth-helpers";
import { LoaAll } from "./components/Loading";
import Auth from "./pages/Auth/Auth";
import AuthContext from "./context/AuthContext";
import { decodeToken } from "./components/Auth/LoginForm/Utils/token";
import "./pages/admin.css";
import { createBrowserHistory } from "history";

initAxiosInterceptors();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState(undefined);
  const history = createBrowserHistory();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    let token = getToken();

    if (!token) {
      setAuth(null);
    } else {
      const { exp } = decodeToken(token);

      if (Date.now() >= exp * 1000) {
        logout();
        history.push("/");
      } else {
        setAuth(decodeToken(token));
      }
    }

   
  }, []);

  let rol = getUsuarioCompleto();

  const setUser = (user) => {
    setAuth(user);
  };

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const authData = useMemo(
    () => ({
      auth,
      setUser,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      {auth ? (
        <HashRouter>
          {isLoading ? (
            <LoaAll />
          ) : (
            <Routes>
              <Route>
                <Route
                  exact
                  path="/evaluacion"
                  element={
                    rol == 1 || rol == 3 ? <Evaluacion /> : <ErrorPage />
                  }
                />
                <Route exact path="/perfilAdmin" element={<PerfilAdmin />} />
                <Route
                  exact
                  path="/listasTerapias"
                  element={
                    rol == 1 || rol == 3 ? <ListasTerapias /> : <ErrorPage />
                  }
                />
                <Route
                  exact
                  path="/listasPacientes"
                  element={<ListasPacientes />}
                />
                <Route
                  exact
                  path="/Users"
                  element={rol == 1 || rol == 3 ? <Users /> : <ErrorPage />}
                />
                <Route
                  exact
                  path="/Terapia"
                  element={rol == 1 || rol == 3 ? <Terapia /> : <ErrorPage />}
                />
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/Asistencia"
                  element={
                    rol == 1 || rol == 3 ? <Asistencia /> : <ErrorPage />
                  }
                />
                <Route exact path="/calendario" element={<Calendario />} />
                <Route
                  exact
                  path="/contabilidad"
                  element={
                    rol == 1 || rol == 3 ? <Contabilidad /> : <ErrorPage />
                  }
                />
                <Route
                  exact
                  path="/abono"
                  element={rol == 1 || rol == 3 ? <Abono /> : <ErrorPage />}
                />
                <Route exact path="/Asignación" element={<Asignación />} />
                <Route
                  exact
                  path="/gastos"
                  element={rol == 1 || rol == 3 ? <Gastos /> : <ErrorPage />}
                />
                <Route
                  exact
                  path="/verGanancias"
                  element={rol == 1 ? <VerGanancias /> : <ErrorPage />}
                />
                <Route
                  exact
                  path="/AbonoTerapias"
                  element={
                    rol == 1 || rol == 3 ? <AbonoTerapias /> : <ErrorPage />
                  }
                />
                <Route
                  exact
                  path="/PagoTerapeutas"
                  element={rol == 1 ? <PagoTerapeutas /> : <ErrorPage />}
                />
                <Route exact path="/Consultorios" element={<Consultorios />} />
                <Route
                  exact
                  path="/listadodeCItas"
                  element={
                    rol == 1 || rol == 3 ? <ListadodeCItas /> : <ErrorPage />
                  }
                />
                <Route exact path="/reportesPago" element={<ReportesPago />} />
                <Route
                  exact
                  path="/listadoAsistencia"
                  element={
                    rol == 1 || rol == 3 ? <ListadoAsistencia /> : <ErrorPage />
                  }
                />
                <Route
                  exact
                  path="/configuraciones"
                  element={
                    rol == 1 || rol == 3 ? <Configuraciones /> : <ErrorPage />
                  }
                />

                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          )}
        </HashRouter>
      ) : (
        <Auth />
      )}
    </AuthContext.Provider>
  );
}

export default App;
