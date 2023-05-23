import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();



export function setToken(token) {

    return cookies.set('Token', token, { path: '/' });
}

export function setUsuarioCompleto(users) {

    return cookies.set('UsuarioCompleto', users, { path: '/' });
}

export function setUsuarioM(usuario) {

    return cookies.set('PrimeraLetra', usuario, { path: '/' });
}
export function nombreUsuario(name) {

    return cookies.set('Nombre', name, { path: '/' });
}

export function idUser(idUser) {
    

    return cookies.set('idUser', idUser, { path: '/' });
}

export function getDatosUsuario() {

    return cookies.get('idUser');
}

export function getNombreUsuario() {

    return cookies.get('Nombre');
}


export function getUsuarioCompleto() {

    return cookies.get('UsuarioCompleto');
}


export function obtenerUser() {

    return cookies.get('PrimeraLetra');
}
export function getToken() {

    return cookies.get('Token')
}


export function DeleteToken() {

    cookies.remove('Token')
    cookies.remove('Nombre')
    cookies.remove('UsuarioId')
    cookies.remove('PrimeraLetra')
    cookies.remove('idUser')
    return;
}

export function initAxiosInterceptors() {
    axios.interceptors.request.use(function (config) {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `bearer ${token}`
        }

        return config;
    })
    axios.interceptors.response.use(
        function (response) {
            return response;
        }
        ,
        function (error) {
            if (error.response.status === 401) {
                DeleteToken();
            } else {
                return Promise.reject(error)
            }
        }
    )

}