import Cookies from "universal-cookie";
import { useState, useEffect,useMemo } from "react";
import axios from "axios";
import logo from "./imagenes/IMG-20230221-WA0009.png";
import { FaBars } from "react-icons/fa";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice";
import jwt_decode from "jwt-decode";
import Admin from "./Vistas/Admin";
import Gastos from "./Vistas/Gastos";
import AbonoTerapias from "./Vistas/AbonoTerapias";
import Evaluacion from "./Vistas/Evaluacion";
import Consultorios from "./Vistas/Consultorios";
import { Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VerGanancias from "./Vistas/VerGanancias";
import PagoTerapeutas from "./Vistas/PagoTerapeutas";
import AgeCalculator from "./AgeCalculator";
import PerfilAdmin from "./Vistas/PerfilAdmin";
import ListasTerapias from "./Vistas/ListasTerapias";
import ListadodeCItas from "./Vistas/ListadodeCItas";
import Login from "./Vistas/Login";
import Terapias from "./Vistas/Terapias";
import Users from "./Vistas/Users";
import Abono from "./Vistas/Abono";
import TerapiaTerapeuta from "./Vistas/TerapiaTerapeuta";
import Contabilidad from "./Vistas/Contabilidad";
import ListasPacientes from "./Vistas/ListasPacientes";
import Asistencias from "./Vistas/Asistencias";
import Calendario from "./Vistas/Calendario";
import ReportesPago from "./Vistas/ReportesPago";


import { Protect } from "./components/Protect";
import Autenticacion from "./components/Autenticacion";
import {
  deleteToken,
  getToken,
  initAxiosInterceptors,
  setUsuarioM,
  idUser,
  getDatosUsuario,
  nombreUsuario,
} from "./auth-helpers";
import { Loading, LoaLogin, LoaAll } from "./components/Loading";
import Headers from "./Headers";
import  Auth from "./pages/Auth/Auth"
import AuthContext from "./context/AuthContext";
import { error } from "jquery";
import { decodeToken } from "./components/Auth/LoginForm/Utils/token";

initAxiosInterceptors();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [usuarioLogin, setUsuarioLogin] = useState([]);
  const [tokenHook, setTokenHook] = useState("");
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    let token = getToken();

      try {

        if (!token) {
          setAuth(null)
        }else{
          axios
            .post("https://jdeleon-001-site1.btempurl.com/api/Autenticacion/getUserByToken")               
            .then((res) => {
               setAuth(decodeToken(token))
            }).catch((error) => {
                 setAuth(null)
             });
        }

      } catch (error) {
        console.log(error);
      }

  }, []);




  const setUser =  (user) => {
    setAuth(user)
  }

  const authData = useMemo(
    () => ({
      auth,
      setUser
    }),
    [auth]
  )

  if(auth === undefined) return null;

  return (
      <AuthContext.Provider value={authData}>

        {
          auth ?  
          <HashRouter>
            <Routes>
        
              <Route >
                <Route exact path="/evaluacion" element={<Evaluacion />} />
                <Route exact path="/perfilAdmin" element={<PerfilAdmin />} />
                <Route exact path="/listasTerapias"element={<ListasTerapias usuarioLogin={usuarioLogin} />}/>
                <Route exact path="/listasPacientes"element={<ListasPacientes usuarioLogin={usuarioLogin} />}/>  
                <Route exact path="/terapia" element={<Terapias />} />
                <Route exact path="/" element={<Admin />} />
                <Route exact path="/asistencias" element={<Asistencias />} />
                <Route exact path="/calendario" element={<Calendario />} />
                <Route exact path="/contabilidad" element={<Contabilidad />} />
                <Route exact path="/AgeCalculator" element={<AgeCalculator />} />
                <Route exact path="/Users" element={<Users />} />
                <Route exact path="/abono" element={<Abono />} />
                <Route exact path="/TerapiaTerapeuta" element={<TerapiaTerapeuta />}/>           
                <Route exact path="/gastos" element={<Gastos />} />
                <Route exact path="/verGanancias" element={<VerGanancias />} />
                <Route exact path="/AbonoTerapias" element={<AbonoTerapias />} />
                <Route exact path="/PagoTerapeutas" element={<PagoTerapeutas />} />
                <Route exact path="/Consultorios" element={<Consultorios />} />
                <Route exact path="/listadodeCItas" element={<ListadodeCItas />} />
                <Route exact path="/reportesPago" element={<ReportesPago />} />
              </Route>
            </Routes>
          </HashRouter>
          :
          <Auth/>
  }
     
</AuthContext.Provider>
  );
}

export default App;
