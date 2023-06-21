import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link, Redirect } from 'react-router-dom'
import logo from "../imagenes/IMG-20230221-WA0009.png"
import doctor from "../imagenes/undraw_medicine_b1ol.png"
import { FaBars } from 'react-icons/fa'
import axios from 'axios'
import Select from 'react-select';
import swal from 'sweetalert';
import Headers from '../Headers'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { findDOMNode } from 'react-dom'
import { FaUser } from 'react-icons/fa'
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, setUsuario, getDatosUsuario, setToken } from '../auth-helpers';





function TerapiaTerapeuta() {

    const FormularioTherapy = document.getElementById("FormularioTherapy");
    const [data, setData] = useState([]);
    const [terapeuta, setTerapeuta] = useState([])
    const [idTerapeuta, setIdTerapeuta] = useState([])
    const [idTerapias, setIdTerapias] = useState([]);
    const resportes = useRef();

    useEffect(() => {
        cargar()
    }, []);


    function cargar() {

        axios.get('https://jdeleon-001-site1.btempurl.com/api/Clinica/terapeuta')

            .then(response => {
                setTerapeuta(response.data.usuarios)
            })

        axios.get('https://jdeleon-001-site1.btempurl.com/api/Clinica/ListaTerapia')
            .then(response => {
                const florw = []
                response.data.map(tera => {
                    florw.push(tera.nombreTerapia)

                    setData(florw)

                })
            });
    }


    const datos = {
        teras:
            idTerapias
        ,
        id: idTerapeuta
    }

    const enviars = (e) => {
        e.preventDefault()
        resportes.current.classList.add('contenedors');

        const url = 'https://jdeleon-001-site1.btempurl.com/api/Clinica/Post'
        axios.post(url, datos).then((result) => {

            if (result) {

                FormularioTherapy.reset()
                resportes.current.classList.remove('contenedors');
                swal({
                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });
            }

        })
    }

    function handleTerapeuta(e) {
        console.log(e)
        setIdTerapeuta(e)
    }

    function handle(selectedItems) {
        const ids = [];

        selectedItems.map(item => {

            ids.push(item.idTherapy)
        })
        setIdTerapias(ids)
    }

    return (
        <div >
            <Headers />
            <div className='cont-asignar'>

                <div className='form-asignar' ref={resportes}>
                    <div className='cont-titu-asignacionTerapeuta'>
                        <h1>Asignación Terapeuta</h1>
                    </div>
                    <div className='sub-asignar'>
                        <form id="FormularioTherapy" onSubmit={enviars}>
                            <div className='row' id='row-1-asignar' >
                                <div className='col'>

                                    <select required className='asignarBarra' onChange={e => handleTerapeuta(e.target.value)} >
                                        <option value=''>Seleccione un Terapeuta</option>
                                        {
                                            terapeuta.map(item => [
                                                <option key={item.idUser}  value={item.idUser}>{item.names} {item.apellido}</option>
                                            ])
                                        }
                                    </select>
                                    {/*
                                <Select
                                    options={terapeuta}
                                    onChange={handleTerapeuta}
                                />
                                   */}
                                </div>
                            </div>
                            <div className='row' id='id-react-select' >
                                <div className='col'>
                                    {/*
                                <select required className='asignarBarra' onChange={e => handle(e.target.value)} >
                                    <option selected>Select</option>
                                    {
                                        data.map(item => [
                                            <option value={item.nombreTerapia.idTherapy}>{item.nombreTerapia.label}</option>
                                        ])
                                    }
                                </select>
  */}

                                    <Select
                                        isMulti
                                        options={data}
                                        onChange={handle}
                                        required
                                        placeholder = "Seleccione una Terapia"
                                    />
                                </div>
                            </div>
                            <button className='btnWeb' type='submit'>Guardar</button>
                        </form>

                    </div>
                </div>
            </div>


        </div >
    )
}

export default TerapiaTerapeuta