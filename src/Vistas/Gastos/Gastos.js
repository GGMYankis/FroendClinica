
import Headers from "../../components/Headers/Headers"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { Loading, LoaLogin } from '../../components/Loading';
import "./Gastos.css";
import {urlApi} from "../../auth-helpers"

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

        const url = `${urlApi}Clinica/ContabilidadReportes`;
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
            <div className='cont_form_gastos' >
                <form className='form_gastos' onSubmit={enviarReporte} ref={resportes}>
                    {
                        loading ? <Loading /> : ""
                    }
                    <div className='cont_titu_gastos'>
                        <h1>Gastos</h1>
                    </div>

                    <div className='box_gastos'>
                        <div className='cont_sub_gastos'>
                            <div>
                                <label>Nombre</label>
                                <input onChange={(e) => setNombre(e.target.value)} required />
                            </div>

                            <div>
                                <label>Monto</label>
                                <input value={NumMadre} onChange={ValidarMonto} required />
                            </div>
                            <div >
                                <label>Fecha</label>
                                <input type="date" onChange={(e) => setFecha(e.target.value)} required />
                            </div>

                            <div >
                                <label>Descripcion</label>
                                <textarea className='txtdescripciongastos' onChange={(e) => setDescipcion(e.target.value)} required></textarea>
                            </div>
                            <button className='btn' type='submit'>Guardar</button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Gastos
