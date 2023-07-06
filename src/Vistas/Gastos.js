

import Headers from "../components/Headers/Headers"

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import $ from 'jquery';
import swal from 'sweetalert';
import { FaUser, FaUsers } from 'react-icons/fa';
import { Loading, LoaLogin } from '../components/Loading';

function Gastos() {

    const [descripcion, setDescipcion] = useState('')
    const [nombre, setNombre] = useState('')
    const [monto, setMonto] = useState('')
    const [fecha, setFecha] = useState('')
    const [NumMadre, setNumMadre] = useState("");
    const [loading, setLoading] = useState(false);
    const resportes = useRef();
    
    const ValidarMonto = (value) => {

        const regex = /^[0-9\b]+$/;
        if (value.target.value === "" || regex.test(value.target.value)) {
            setNumMadre(value.target.value);
        }
        setMonto(value.target.value);
    }


    const dataCrear = {
        Nombre: nombre,
        Descripcion: descripcion,
        Amount: parseFloat(monto),
        DateOfInvestment: fecha
    };


    function enviarReporte(e) {

        e.preventDefault()

        resportes.current.classList.add('contenedors');

        const url = 'https://jdeleon-001-site1.btempurl.com/api/Clinica/ContabilidadReportes';
        axios.post(url, dataCrear).then((result) => {
            const probar = async () => {
                const ale = await swal({
                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });
            }
            if (result) {
                resportes.current.classList.remove('contenedors')
                probar()
            }
        })
    }


    return (

        <div>
            <Headers />
            <div className='cont-form-gastos' >
                <form className='formReportesGastos' onSubmit={enviarReporte} id="formterapia" ref={resportes}>
                    {
                        loading ? <Loading /> : ""
                    }
                    <div className='cont-titu-Pagina-terapia'>
                        <h1>Gastos</h1>
                    </div>

                    <div className='sub-box-Terapia'>
                        <div className='cont-sub-terapia'>
                            <div className='cont-barra-tera'>
                                <label>Nombre</label>
                                <input onChange={(e) => setNombre(e.target.value)} required />
                            </div>

                            <div className='cont-barra-tera'>
                                <label>Monto</label>
                                <input value={NumMadre} onChange={ValidarMonto} required />
                            </div>
                            <div className='cont-barra-tera'>
                                <label>Fecha</label>
                                <input type="date" onChange={(e) => setFecha(e.target.value)} required />
                            </div>

                            <div className='cont-barra-tera'>
                                <label>Descripcion</label>
                                <textarea className='txtdescripciongastos' onChange={(e) => setDescipcion(e.target.value)} required></textarea>
                            </div>
                            <button className='btnWeb' type='submit'>Guardar</button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Gastos
