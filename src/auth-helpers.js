import { useNavigate } from 'react-router-dom';
import useAuth from './components/Auth/LoginForm/hook/useAuth';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

export function setToken(token) {

    return cookies.set('Token', token, { path: '/' });
}

export function setUsuarioCompleto(users) {
    return cookies.set('rxu', users, { path: '/' });
}



export function idUser(idUser) {
    
    return cookies.set('ius^', idUser, { path: '/' });
}

export function getDatosUsuario() {
    return cookies.get('ius^');
}

export function getUsuarioCompleto() {
    return cookies.get('rxu');
}

export function getToken() {
    return cookies.get('Token');
}

export function DeleteToken(){
 //  cookies.remove('Token');
    cookies.remove('Nombre');
    cookies.remove('rxu');
    cookies.remove('ius^');
}

export function initAxiosInterceptors() {
    axios.interceptors.request.use(function (config) {
    const token = getToken();
    //  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        if (token) {
            config.headers.Authorization = `bearer ${token}`
        }
        return config;
    })
   /*  axios.interceptors.response.use(
        function (response) {
            return response;
        }
        ,
        function (error) {
           if (error.response.status === 401) {
               // DeleteToken();
            //    console.log("El token expiro en auth-helpers")

            } else {
                return Promise.reject(error)
            } 
        }
    ) */

}