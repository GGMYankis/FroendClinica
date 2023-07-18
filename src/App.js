import Cookies from "universal-cookie";
import { useState, useEffect,useMemo } from "react";
import { Routes, Route, HashRouter, useHistory,} from "react-router-dom";
import "./App.css";
import Home from "./Vistas/Home";
import Gastos from "./Vistas/Gastos";
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
import Configuraciones from "./Vistas/Configuraciones/Configuraciones";
import Terapias from "./Vistas/Terapias";
import Users from "./Vistas/Users";
import Abono from "./Vistas/Abono";
import TerapiaTerapeuta from "./Vistas/TerapiaTerapeuta";
import Contabilidad from "./Vistas/Contabilidad";
import ListasPacientes from "./Vistas/ListasPacientes";
import Asistencias from "./Vistas/Asistencias";
 import Calendario from "./Vistas/Calendario"; 
import ReportesPago from "./Vistas/ReportesPago";
import ErrorPage from "./Vistas/ErrorPage";
import {getToken, initAxiosInterceptors,getUsuarioCompleto, removeToken} from "./auth-helpers";
import { LoaAll } from "./components/Loading";
import  Auth from "./pages/Auth/Auth"
import AuthContext from "./context/AuthContext";
import { decodeToken } from "./components/Auth/LoginForm/Utils/token";
import './pages/admin.css';
import { createBrowserHistory } from 'history';

initAxiosInterceptors();
const cookies = new Cookies();

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
        }else{
           const {exp} = decodeToken(token);

        if( Date.now() >= (exp * 1000) ) {
          logout();
          history.push('/') 
        } else{
          setAuth(decodeToken(token))

        }
      }

     if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
          window.location.href = `https://${window.location.host}${window.location.pathname}`;
        } 
  }, []);

  let rol = getUsuarioCompleto();

  const setUser =  (user) => {
    setAuth(user)
  }

  const logout = () => {
    removeToken();
    setAuth(null);
  }

  const authData = useMemo(
    () => ({
      auth,
      setUser,
      logout
    }),
    [auth]

    )

  if(auth === undefined) return null;

  return (
      <AuthContext.Provider value={authData}>

        {
          auth ?  
          <HashRouter>
            {
              isLoading ? 
              <LoaAll/>
              :           
            <Routes>
        
              <Route >
                <Route exact path="/evaluacion" element={<Evaluacion />} />
                <Route exact path="/perfilAdmin" element={<PerfilAdmin />} />
                <Route exact path="/listasTerapias" element={rol == 1 || rol== 3 ? <ListasTerapias /> : <ErrorPage />} />
                <Route exact path="/listasPacientes" element={ <ListasPacientes  />} />
                <Route exact path="/Users" element={ rol == 1 || rol== 3? <Users /> :  <ErrorPage />} />
                <Route exact path="/terapia" element={<Terapias />} />
                <Route exact path="/" element={<Home />} />
                <Route exact path="/asistencias" element={<Asistencias />} />
                <Route exact path="/calendario" element={<Calendario />} /> 
                <Route exact path="/contabilidad" element={<Contabilidad />} />
                <Route exact path="/abono" element={<Abono />} />
                <Route exact path="/TerapiaTerapeuta" element={<TerapiaTerapeuta />}/>           
                <Route exact path="/gastos" element={<Gastos />} />
                <Route exact path="/verGanancias" element={rol == 1 ?  <VerGanancias /> :  <ErrorPage />} />
                <Route exact path="/AbonoTerapias" element={<AbonoTerapias />} />
                <Route exact path="/PagoTerapeutas" element={rol == 1 ?  <PagoTerapeutas /> : <ErrorPage />} />
                <Route exact path="/Consultorios" element={<Consultorios />} />
                <Route exact path="/listadodeCItas" element={<ListadodeCItas />} />
                <Route exact path="/reportesPago" element={<ReportesPago />} />
                <Route exact path="/listadoAsistencia" element={<ListadoAsistencia />} />
                <Route exact path="/configuraciones" element={<Configuraciones />} />

                
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
             }
          </HashRouter>
          :
          <Auth/>
  }
     
</AuthContext.Provider>
  );
}

export default App;


/*  if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
          window.location.href = `https://${window.location.host}${window.location.pathname}`;
        } */