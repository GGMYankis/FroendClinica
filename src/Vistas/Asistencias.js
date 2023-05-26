
import { error } from 'jquery'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Headers from '../Headers'
import swal from 'sweetalert';
import '../responsive.css'
import { getDatosUsuario, getUsuarioCompleto } from '../auth-helpers'

function Asistencias() {

    const [paciente, setPaciente] = useState()
    const [terapia, setTerapia] = useState()
    const [fecha, setFecha] = useState()
    const [idTerapeuta, setIdTerapeuta] = useState()
    const [observaciones, setObservaciones] = useState('')
    const [terapeuta, setTerapeuta] = useState([])
    const [data, setData] = useState([]);
    const [dataPaciente, setDataPaciente] = useState([]);
    const [justificaciones, setJustificaciones] = useState('');
    const resportes = useRef();

    const Fobser = (e) => {
        setFecha(e)
    }

    let id = getDatosUsuario()

    const date = {
        Idterapeuta: id
    }

    let rol = getUsuarioCompleto()

    useEffect(() => {

        if (rol == 2) {

            axios.post('https://localhost:63958/api/Clinica/BuscarPacientePorTerapeuta', date)
                .then(responses => {
                    setDataPaciente(responses.data)
                });
        } else {

            axios.get('https://localhost:63958/api/Clinica/Lista')
                .then(responses => {

                    setDataPaciente(responses.data)
                });
        }

        if (rol == 2) {
            axios.post('http://yankisggm-001-site1.ctempurl.com/api/Clinica/GetEvaluacionByTerapeuta', date)
                .then(response => {
                    setData(response.data)
                });
        } else {
            axios.get('http://yankisggm-001-site1.ctempurl.com/api/Clinica/ListaTerapia')
                .then(response => {
                    setData(response.data)
                });
        }
        axios.get('http://yankisggm-001-site1.ctempurl.com/api/Clinica/terapeuta')
            .then(response => {

                setTerapeuta(response.data.usuarios)
            });

    }, []);


    const dataValor =
    {
        idPatients: paciente,
        idTherapy: terapia,
        IdTerapeuta: idTerapeuta,
        FechaInicio: fecha,
        TipoAsistencias: justificaciones,
        remarks: observaciones
    }


    const formAsistensscia = document.getElementById("formAsistencia");

    const enviar = (e) => {
        e.preventDefault()

        resportes.current.classList.add('contenedors');
        if (rol == 2) {
            dataValor.IdTerapeuta = id
        }

        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/Asistencias';
        axios.post(url, dataValor).then((result) => {
            resportes.current.classList.remove('contenedors');
            swal({
                title: "Correcto",
                text: "Cambio guardado ",
                icon: "success",
                button: "Aceptar"
            });

            if (result) {
                formAsistensscia.reset()
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    return (

        <div>
            <Headers />

            <div className='cont-padre-asistencia' >
                <div className='contanedor-asistencias' ref={resportes}>
                    <div className='cont-titu-asistencias'>
                        <h1>Asistencias</h1>
                    </div>

                    <form onSubmit={enviar} className="form-asistencia" id='formAsistencia'>
                        <div className='box-asistencia' onChange={e => setJustificaciones(e.target.value)}>
                            <label className='label-asistencia'>
                                Razón Asistencia</label>
                            <select className='justificacinAsistencias'>
                                <option value=''>Seleccione una asistencia</option>
                                <option value="asistio">Asistencia</option>
                                <option value="justifico">Falta</option>
                                <option value="injustificada">Justificada</option>
                            </select>
                        </div>
                        {rol == 2 ?

                            <div className='box-asistencia'>
                                <label className='label-asistencia'>Lista de Pacientes</label>
                                <select onChange={e => setPaciente(e.target.value)} required className='select-asistencia' >
                                    <option value='' >Seleccione un Paciente</option>
                                    {
                                        dataPaciente.map(item => [
                                            //<option key={item.value} value={item.value}>{item.value}</option>
                                            <option value={item.nombrePaciente.idPatients}>{item.nombrePaciente.name}</option>
                                        ])
                                    }
                                </select>
                            </div>

                            :
                            <div className='box-asistencia'>
                                <label className='label-asistencia'>Lista de Pacientes</label>
                                <select onChange={e => setPaciente(e.target.value)} required className='select-asistencia' >
                                    <option value='' >Seleccione un Paciente</option>
                                    {
                                        dataPaciente.map(item => [
                                            <option value={item.idPatients}>{item.name}</option>
                                        ])
                                    }
                                </select>
                            </div>

                        }


                        <div className='box-asistencia'>
                            <label className='label-asistencia'>Lista de Terapias</label>
                            <select onChange={e => setTerapia(e.target.value)} required className='select-asistencia' >
                                <option value=''>Seleccione una Terapia</option>
                                {
                                    data.map(item => [
                                        //<option key={item.value} value={item.value}>{item.value}</option>
                                        <option value={item.nombreTerapia.idTherapy}>{item.nombreTerapia.label}</option>
                                    ])
                                }

                            </select>
                        </div>

                        {rol == 1 ?

                            <div className='box-asistencia'>
                                <label className='label-asistencia'>Lista de Terapeuta</label>
                                <select onChange={e => setIdTerapeuta(e.target.value)} required className='select-asistencia' >
                                    <option value='' >Seleccione un Terapeuta</option>
                                    {
                                        terapeuta.map(item => [
                                            //<option key={item.value} value={item.value}>{item.value}</option>
                                            <option value={item.idUser}>{item.names} {item.apellido}</option>
                                        ])
                                    }

                                </select>
                            </div>
                            :
                            ""
                        }
                        <div className='box-asistencia'>

                            <label className='label-asistencia'>Fecha</label>
                            <input type="datetime-local" required onChange={e => Fobser(e.target.value)} className='select-asistencia' />
                        </div>
                        <div className='box-asistencia'>
                            <label className='label-asistencia'>Observaciones</label>
                            <textarea required onChange={e => setObservaciones(e.target.value)} className='select-asistencia' />
                        </div>
                        <div className='box-asistencia'>
                            <div className='col'>
                                <button type='submit' className='btn-asistencia' >Guardar</button>
                            </div>

                        </div>

                    </form>

                </div>
            </div >
        </div >
    )
}

export default Asistencias

/* 
{rol == 2 ? */