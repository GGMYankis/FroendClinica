import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Headers from '../Headers'
import { Loading, LoaLogin } from '../components/Loading';

function PagoTerapeutas() {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dataPaciente, setDataPaciente] = useState([]);
    const [loading, setLoading] = useState(false);
    const resportes = useRef();

    const data = {
        FechaInicio: startDate,
        FechaFinal: endDate,
    }

    const enviars = (e) => {
        e.preventDefault();

        resportes.current.classList.add('contenedors');

        const urls = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/ListaEvaluacion'
        axios.post(urls, data).then((result) => {

            resportes.current.classList.remove('contenedors');
            setDataPaciente(result.data)
        })
    }


    return (

        <div>
            <div className='cont-formPagoTerapeuat'>
                <form className='formPagoTerapeuat' onSubmit={enviars} ref={resportes}>
                    {
                        loading ? <Loading /> : ""
                    }
                    <div className='cont-titu-gastos'>
                        <h1>Pagos a Terapeutas</h1>
                    </div>

                    <div className='cont-box-body-gastos'>
                        <div className='row' id='cont-input-gastos'>
                            <div className='col'>
                                <label>Fecha Inicio</label>
                                <input type='date' className='inputgastos' onChange={e => setStartDate(e.target.value)} required />
                            </div>
                            <div className='col'>
                                <label>Fecha Fin</label>
                                <input type='date' className='inputgastos' onChange={e => setEndDate(e.target.value)} required />
                            </div>
                            <div className='col'>
                                <button className='btn-gastos' type='submit'>Buscar</button>
                            </div>
                        </div>
                        <hr></hr>

                        <table className='table-formPagoTerapeuat'>
                            <thead>
                                <tr>
                                    <th>Terapeuta</th>
                                    <th>Terapia</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    dataPaciente.map(x => [
                                        <tr>
                                            <td>{x.terapeuta}</td>
                                            <td>{x.terapia}</td>
                                            <td>{x.fechaInicio.substring('', 10)}</td>
                                        </tr>
                                    ])
                                }

                            </tbody>

                        </table>
                    </div>
                </form>
                <Headers />
            </div>

        </div>
    )
}

export default PagoTerapeutas
