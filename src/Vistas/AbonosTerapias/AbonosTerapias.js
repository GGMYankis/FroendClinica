
import React, { useEffect, useState, useRef } from 'react'
import { Loading, LoaLogin } from '../../components/Loading';
import swal from 'sweetalert';
import axios from 'axios';
import {getUsuarioCompleto, urlApi } from '../../auth-helpers'
import Headers from "../../components/Headers/Headers";
import "./AbonoTerapias.css";



function AbonoTerapias() {

    const [fecha, setFecha] = useState(0)
    const [idUsuario, setIdUsuario] = useState(0)
    const [idTerapia, setIdTerapia] = useState(0)
    const [idPaciente, setIdPaciente] = useState(0)
    const [idTerapeuta, setIdTerapeuta] = useState(0)
    const [montoPagado, setMontoPagado] = useState(0)
    const [apagarIu, setApagarIu] = useState("")

    
    const [data, setData] = useState([]);
    const [dataPaciente, setDataPaciente] = useState([]);
    const [loading, setLoading] = useState(false);
    const [terapeuta, setTerapeuta] = useState([])
    const resportes = useRef();

    useEffect(() => {
        axios.get(`${urlApi}Clinica/Lista`)
            .then(responses => {

                setDataPaciente(responses.data)
            });

        axios.get(`${urlApi}Clinica/ListaTerapia`)
            .then(response => {
                setData(response.data)
            });

        axios.get(`${urlApi}Clinica/terapeuta`)

            .then(response => {
                setTerapeuta(response.data.usuarios)
            })

        setIdUsuario(getUsuarioCompleto())

        const obtenerFechaActual = () => {
            const fechaActual = new Date();
            const año = fechaActual.getFullYear();
            const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
            const dia = String(fechaActual.getDate()).padStart(2, '0');

            const fechaFormateada = `${año}-${mes}-${dia}`;
            setFecha(fechaFormateada);
        };

        obtenerFechaActual();

    }, []);



    const dataEnviar = {
        fecha: fecha,
        idUsuario: idUsuario,
        idTerapia: idTerapia,
        idTerapeuta: idTerapeuta,
        idPaciente: idPaciente,
        montoPagado: montoPagado
    }

    const CrearAbonoTerapias = (e) => {

        e.preventDefault()
        resportes.current.classList.add('contenedors');

        axios.post(`${urlApi}Clinica/AbonoTerapias `, dataEnviar).then((result) => {


            const probar = async () => {
                resportes.current.classList.remove('contenedors');
                const ale = await swal({

                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",

                });
            }
            if (result) {
                probar()
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    const FmontoApagar = (value) => {
        const regex = /^[0-9\b]+$/;

        if (value.target.value === "" || regex.test(value.target.value)) {
            setApagarIu(value.target.value);
        }
       setMontoPagado(value.target.value);
      };

    return (

        <>
            <div className='cont_form_abono'>
                <form onSubmit={CrearAbonoTerapias} className='form_abono' ref={resportes}>
                    {
                        loading ? <Loading /> : ""
                    }
                    <div className='cont_titu_abono'>
                        <h1>Abonos</h1>
                    </div>


                        <div className='box-abono'>
                            <select onChange={e => setIdTerapia(e.target.value)} required >
                                <option value="">Seleccione una terapia</option>
                                {
                                    data.map((item, index) => [
                                        <option key={index} value={item.nombreTerapia.idTherapy} >{item.nombreTerapia.label}</option>
                                    ])
                                }
                            </select>

                            <select  required onChange={e => setIdPaciente(e.target.value)}  >
                                <option value="" >Seleccione una paciente</option>
                                {
                                    dataPaciente.map((item, index) => [
                                        <option key={index} value={item.idPatients}>{item.name}</option>
                                    ])
                                }
                            </select>
                            <select onChange={e => setIdTerapeuta(e.target.value)} required >
                                <option value="">Seleccione un Terapeuta</option>
                                {
                                    terapeuta.map((item, index) => [
                                        <option key={index} value={item.idUser}>{item.names} {item.apellido}</option>
                                    ])
                                }
                            </select>
                        <div className='cont_box_abono'>
                            <input type='text' value={apagarIu}  placeholder='Monto' name='montoPagado' onChange={FmontoApagar} required />
                        </div>

                        <button type='submit' className='btn guardar'>Guardar</button>
                    </div>
                </form>
            </div>
            <Headers />


        </>


    )
}

export default AbonoTerapias
