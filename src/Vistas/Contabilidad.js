import 'react-date-range/dist/styles.css'; // Importa los estilos CSS
import 'react-date-range/dist/theme/default.css'; // Importa los estilos del tema por defecto
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from '../Headers';
import { useRef } from 'react';
import $ from 'jquery';

import { DatePicker } from 'antd';
import moment from 'moment'



const { RangePicker } = DatePicker;

function Contabilidad() {

    const [idTerapeuta, setIdterapeuta] = useState()
    const [terapeuta, setTerapeuta] = useState([])
    const [citas, setCitas] = useState([]);




    useEffect(() => {

        axios.get('https://jdeleon-001-site1.btempurl.com/api/Clinica/terapeuta')
            .then(res => {
                setTerapeuta(res.data.usuarios)
            });
    }, []);




    // ------------------------

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateChange = (values) => {
        if (values) {
            const [start, end] = values;
            setStartDate(start);
            setEndDate(end);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    };



    const datas = {
        IdTerapeuta: idTerapeuta,
        FechaInicio: startDate,
        FechaFinal: endDate
    }


    const enviars = (e) => {

        e.preventDefault()


        const url = 'https://jdeleon-001-site1.btempurl.com/api/Clinica/Buscar'
        axios.post(url, datas).then((result) => {

            console.log(result.data)
            if (result.data != null) {
                setCitas(result.data)
            }
        })
    }


    return (

        <div>
            <Headers />

            <div className='contPadreContabilidad'>


                <div className='cont-table-contabilidad'>

                    <div className='RangePicker'>
                        <div className='col'>
                            <div className='row' id='cont-input-gastos'>
                                <div className='col'>
                                    <label>Fecha Inicio</label>
                                    <input type='date' className='inputgastos' onChange={e => setStartDate(e.target.value)} />
                                </div>
                                <div className='col'>
                                    <label>Fecha Fin</label>
                                    <input type='date' className='inputgastos' onChange={e => setEndDate(e.target.value)} />
                                </div>
                                <div className='col'>
                                    <button className='btn-gastos' onClick={enviars}>Buscar</button>
                                </div>
                            </div>
                            {/*<RangePicker onChange={handleDateChange} className='probarKi' />*/}
                        </div>

                        <div className='col'>
                            <select className='form-select-contabilidad' onChange={e => setIdterapeuta(e.target.value)} >
                                {
                                    terapeuta.map(item => [
                                        <option value={item.idUser}>{item.names} {item.apellido}</option>
                                    ])
                                }
                            </select>
                        </div>



                    </div>

                    <div className='subBoxContabilidad'>



                        <table class="table" id='tabelContabilidad'>
                            <thead className='head'>
                                <tr>
                                    <th className="col">Pacientes</th>
                                    <th className="col">Terapias</th>
                                    <th className="col">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    citas.map(item => [
                                        <tr>
                                            <td data-label="Pacientes">{item.nombrePaciente.name}</td>
                                            <td data-label="Terapias">{item.nombreTerapia.label}</td>
                                            <td data-label="Precio">{item.nombreTerapia.price}</td>
                                        </tr>
                                    ])
                                }
                            </tbody>
                        </table>
                        <button className='btn-buscar-citas' onClick={enviars}>Buscar</button>
                    </div>

                </div>

            </div>



        </div>
    );
}

export default Contabilidad;


