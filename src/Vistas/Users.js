
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Headers from '../Headers'
import swal from 'sweetalert';
import { FaUser, FaUsers, FaTrash, FaEdit } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa'
import { BrowserRouter, Routes, Route, Link, Redirect } from 'react-router-dom'
import { DeleteToken, getToken, initAxiosInterceptors, setUsuarioM, obtenerUser, getNombreUsuario, getUsuarioCompleto } from '../auth-helpers'
import { useNavigate } from 'react-router-dom';
import logo from "../imagenes/IMG-20230221-WA0009.png"

function Users() {

    let rol = getUsuarioCompleto()
    useEffect(() => {
        cargar()
    }, []);


    const [terapeuta, setTerapeuta] = useState([])
    const [idUser, setIdUser] = useState(0)
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [correo, setCorreo] = useState('')
    const [contraseñas, setContraseñas] = useState('')
    const [idRol, setIdRol] = useState(0)
    const FormularioTherapy = document.getElementById("txtCrearUusario");
    const navigation = useNavigate();

    const modalEditar = useRef()
    const modalCrear = useRef()
    const modalEliminar = useRef()

    const cargar = async => {

        axios.get('http://yankisggm-001-site1.ctempurl.com/api/Clinica/ListaUsers')

            .then(response => {
                response.data.lista.map(a => {

                    if (a.idRol == 1) {

                        setTerapeuta(a.idRol = 'Administrador')
                    }
                    else if (a.idRol == 2) {
                        setTerapeuta(a.idRol = 'Terapeuta')
                    }
                    else if (a.idRol == 3) {
                        setTerapeuta(a.idRol = 'Asistente')
                    }
                    setTerapeuta(response.data.lista)
                })
            })
    }


    const data = {
        IdUser: parseInt(idUser),
        Names: nombre,
        Label: nombre,
        Apellido: apellido,
        Telefono: telefono,
        Direccion: direccion,
        Email: correo,
        Password: contraseñas,
        IdRol: parseInt(idRol)
    };


    function enviar(e) {

        e.preventDefault()

        /*
       
        if(idRol = "Terapeuta"){
            data.IdRol = 2
        }else{
            data.IdRol = 1
        }
        */

        console.log(data)
        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/GuardarUsers';
        axios.post(url, data).then((result) => {

            const probar = async () => {
                modalEditar.current.classList.remove('activeUsers')
                cargar()
                const ale = await swal({
                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });
            }

            if (result) {
                probar()
            }

        })

    }

    const dataCrear = {

        Names: nombre,
        Label: nombre,
        Apellido: apellido,
        Telefono: telefono,
        Direccion: direccion,
        Email: correo,
        Password: contraseñas,
        IdRol: parseInt(idRol)
    };


    function CrearUsuario(e) {

        e.preventDefault()
        console.log(dataCrear)


        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/CrearUsuario';
        axios.post(url, dataCrear).then((result) => {
            const probar = async () => {
                modalCrear.current.classList.remove('activeCrear')
                cargar()
                const ale = await swal({
                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });
            }
            if (result) {
                probar()
            }

            FormularioTherapy.reset()
        })
    }


    function EditarUsuario(valor) {

        modalEditar.current.classList.add('activeUsers')

        const encontrado = terapeuta.filter(e => e.idUser == valor)

        console.log(encontrado.IdRol)

        encontrado.map(item => {
            setNombre(item.names)
            setApellido(item.apellido)
            setTelefono(item.telefono)
            setDireccion(item.direccion)
            setCorreo(item.email)
            setContraseñas(item.password)
            setIdRol(item.idRol)
        })
        setIdUser(valor)
    }


    function Cancelar() {
        modalCrear.current.classList.remove('activeCrear')
        modalEditar.current.classList.remove('activeUsers')
        modalEliminar.current.classList.remove('activeEli')
        FormularioTherapy.reset()
    }

    function modalF() {
        modalCrear.current.classList.add('activeCrear')

    }

    function EliminarUsuario(valor) {

        const encontrado = terapeuta.filter(e => e.idUser == valor)
        encontrado.map(n => {
            setNombre(n.names)
        })

        setIdUser(valor)
        modalEliminar.current.classList.add('activeEli')
    }


    const idusers = {
        IdUser: idUser
    }

    function enviarId() {

        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/EliminarUsuario';
        axios.post(url, idusers).then((result) => {
            const probar = async () => {
                modalEliminar.current.classList.remove('activeEli')
                cargar()
                const ale = await swal({
                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });
            }
            if (result) {
                probar()
            }
        })
    }

    const logout = () => {
        DeleteToken()
        navigation("/login")
    }

    const myElement = useRef(null);


    const handleClickOtro = () => {
        myElement.current.classList.toggle('mi-clase-css');
    };

    return (

        <div>

          
                <header className='encabezado'>
                    <div>
                        <nav>
                            <input type="checkbox" id="check" />
                            <label htmlFor="check" className="checkbtn">
                                <FaBars id='bar' />
                            </label>
                         
                            <div className='cont-menu'>
                                <ul>
                                    <li>
                                        <Link className='letras-menu' to="/admin">Paciente de ingreso</Link>
                                    </li>
                                    <li>
                                        <Link className='letras-menu' to="/evaluacion">Citas</Link>
                                    </li>
                                    <li>
                                        <Link className='letras-menu' to="/terapia">Crear terapia</Link>
                                    </li>
                                    {rol == 1 ?
                                    <span>
                                        <li>
                                            <Link className='letras-menu' to="/listasPacientes">Listado de Pacientes</Link>
                                        </li>

                                        <li>
                                            <Link className='letras-menu' to="/listasTerapias">Listado de Terapias</Link>
                                        </li>
                                    </span>
                                    :
                                    ""
                                }
                                    <li>
                                        <Link className='letras-menu' to="/asistencias">Asistencia</Link>
                                    </li>
                                    <li>
                                        <Link className='letras-menu' to="/calendario">Calendario</Link>
                                    </li>
                                    <li>
                                        <Link className='letras-menu' to="/TerapiaTerapeuta">Asignación</Link>
                                    </li>
                                    <li>
                                        <Link className='letras-menu' to="/Users">Usuario</Link>
                                    </li>
                                    {rol == 1 ?
                                    <span>
                                        <li>
                                            <Link className='letras-menu' to="/gastos">Registro de gastos</Link>
                                        </li>
                                        <li>
                                            <Link className='letras-menu' to="/VerGanancias">Reporte</Link>
                                        </li>
                                        <li>
                                            <Link className='letras-menu' to="/AbonoTerapias">AbonoTerapias</Link>
                                        </li>
                                        <li>
                                            <Link className='letras-menu' to="/PagoTerapeutas">PagoTerapeutas</Link>
                                        </li>
                                    </span>
                                    :
                                    ""
                                }

                                    <li>
                                        <a className='letras-menu' onClick={logout}>Cerra Sesión</a>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                    </div>

                    <div className='cont-logo-header'>
                        <img className='img-admin-logo' src={logo} />
                        <span className='ver'><span className='gg'>é</span>nfasis</span>
                    </div>

                    <div className='contenedor-botones'>
                        <div className='cont-btn-headers'>
                            <div className='probarUs'>
                                <Link className='Link' to="/perfilAdmin">{obtenerUser()}</Link>
                            </div>
                        </div>
                        <div className='cont-nombre-usuario'>
                            <p className='nombreUsuario'>{getNombreUsuario()}</p>
                        </div>
                    </div>
                </header>
            

            <div className='contCard' ref={myElement}>
                <div className="card-box ">

                    <div className="card-body">
                        <div className='contTituUsuario'>
                            <h1>Lista de Usuarios</h1>
                        </div>

                        <div className='subBoxTableUsuario'>
                            <div className="cont-bnt-crear">
                                <div className="col-sm-6">
                                    <button type="button" className="btn-crear-Paciente-tabla" onClick={modalF}>Crear Nuevo</button>
                                </div>
                            </div>
                            <hr />
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Telefono</th>
                                        <th>Correo</th>
                                        <th>Cargo</th>
                                        <th> </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {

                                        terapeuta.map(item => [
                                            <tr>
                                                <td data-label="Nombre">{item.names}</td>
                                                <td data-label="apellido">{item.apellido}</td>
                                                <td data-label="telefono">{item.telefono}</td>
                                                <td data-label="direccion">{item.email}</td>
                                                <td data-label="direccion">{item.idRol}</td>
                                                <td className='tr-btn'>
                                                    <button className='btn-tabla-usuario' type='button' value={item.idUser} onClick={e => EditarUsuario(e.target.value)}>Editar</button>
                                                    <button className='btn-tabla-usuario-eliminar ' type='button' value={item.idUser} onClick={e => EliminarUsuario(e.target.value)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ])

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL EDITAR USUARIO */}
            <div className='cont-modal-lista-usuario' ref={modalEditar}>

                <form className='form-perfil-usuario' onSubmit={enviar}>
                    <div className='cont-titu-usuario'>
                        <h1>Editar Usuario</h1>
                    </div>

                    <div className='box-con'>

                        <div className='row'>
                            <div className='col'>
                                <label>Nombre</label>
                                <input className='form-users' value={nombre} required onChange={e => setNombre(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>Apellido</label>
                                <input className='form-users' value={apellido} required onChange={e => setApellido(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <label>Telefono</label>
                                <input className='form-users' value={telefono} required onChange={e => setTelefono(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>Direccion</label>
                                <input className='form-users' value={direccion} required onChange={e => setDireccion(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <label>Correo</label><br></br>
                                <input className='form-users' value={correo} required onChange={e => setCorreo(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>contraseñas</label>
                                <input className='form-users' type='password' value={contraseñas} required onChange={e => setContraseñas(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <select onChange={e => setIdRol(e.target.value)} values={idRol} className='form-select-usuario' required>
                                    <option defaultValue> seleccione un Rol</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Terapeuta</option>
                                    <option value="3">Asistente</option>
                                </select>
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-sm-12'>
                                <button className='btn-editar-terapia' type='submit' >Editar</button>
                                <button className='btn-eliminar-terapia' type='button' onClick={Cancelar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* MODAL CREAR USUARIO */}

            <div className='cont-modal-crear-usuario' ref={modalCrear} >

                <form className='form-crear-usuario' onSubmit={CrearUsuario} id="txtCrearUusario" >
                    <div className='cont-titu-crear-usuario'>
                        <h1>Crear Usuario</h1>
                    </div>

                    <div className='box-con-usuario'>

                        <div className='row'>
                            <div className='col'>
                                <label>Nombre</label>
                                <input className='form-users' required onChange={e => setNombre(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>Apellido</label>
                                <input className='form-users' required onChange={e => setApellido(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <label>Telefono</label>
                                <input className='form-users' required onChange={e => setTelefono(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>Direccion</label>
                                <input className='form-users' required onChange={e => setDireccion(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <label>Correo</label><br></br >
                                <input className='form-users' onChange={e => setCorreo(e.target.value)} required />
                            </div>
                            <div className='col'>
                                <label>contraseñas</label>
                                <input className='form-users' type='password' onChange={e => setContraseñas(e.target.value)} required />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <select onChange={e => setIdRol(e.target.value)} className='form-select-usuario' required>
                                    <option value=''> seleccione un Rol</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Terapeuta</option>
                                    <option value="3">Asistente</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <input className='btn-editar-terapia' type='submit' value="Crear" />
                                <button className='btn-eliminar-terapia' type='button' onClick={Cancelar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="modal-usuario-eliminar" ref={modalEliminar}>
                <div className="modal-dialog-usuario" role="document">
                    <div className="modal-content-usuario">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar Usuario</h5>

                        </div>
                        <div className='sub-box-usuario'>
                            <div className="modal-body">
                                {
                                    <p>¿Deseas eliminar el Usuario:<span className='text-eliminar'> {nombre}</span> ?</p>
                                }
                            </div>
                            <hr></hr>
                            <div className="modal-footer">

                                <button type="button" className="btn si" data-dismiss="modal" onClick={enviarId}>Si</button>
                                <button type="button" className="btn no" onClick={Cancelar} >No</button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Users

/*
       <td className='tr-btn'>
                                                <button className='btn-tabla-usuario' type='button' value={item.idUser} onClick={e => EditarUsuario(e.target.value)}><FaEdit /></button>
                                                <button className='btn-tabla-usuario-eliminar ' type='button' value={item.idUser} onClick={e => EliminarUsuario(e.target.value)}><FaTrash /></button>
                                            </td>

*/