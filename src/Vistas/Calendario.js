import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import Headers from '../Headers'
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import $ from 'jquery';
import logo from "../imagenes/IMG-20230221-WA0009.png"
import { FaBars } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import { DeleteToken, getToken, initAxiosInterceptors, setUsuarioM, obtenerUser, getNombreUsuario, getUsuarioCompleto } from '../auth-helpers'



function Calendario() {


    const [event, setEvent] = useState([])
    const [valor, setValor] = useState()
    const cookies = new Cookies();
    const navigation = useNavigate();
    const [fechaInicio, setfechaInicio] = useState('')
    const [horaInicio, setHoraInicio] = useState('')
    const [descripcion, setDescripcion] = useState('')
    obtenerUser()


    let rol = getUsuarioCompleto()

    const FfechaInicio = (e) => {
        setfechaInicio(e)
    }


    const FHoraInicio = (e) => {
        setHoraInicio(e)
    }

    const FDescripcion = (e) => {
        setDescripcion(e)
    }

    useEffect(() => {


        axios.get('http://yankisggm-001-site1.ctempurl.com/api/Clinica/calendario')
            .then(res => {

                setEvent(res.data.lista.map(item => ({
                    id: item.idAsistencias,
                    title: item.remarks,
                    start: new Date(item.fechaInicio),
                })))

            });

    }, []);




    const data =
    {
        FechaInicio: fechaInicio + 'T' + horaInicio,
        Remarks: descripcion
    }



    function refreshPage() {
        window.location.reload();
    }



    const enviar = (e) => {

        e.preventDefault()


        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/AgregarEvento'
        axios.post(url, data).then((result) => {
            const probar = async () => {

                const ale = await swal({

                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",

                });

                refreshPage()
            }

            if (result) {
                probar()
            }

            $('#eliminarPaciente').hide();

            //  refreshPage()
        })


    }


    const logout = () => {

        DeleteToken()
        navigation("/login")
    }

    const modalCerrarEliminar = () => {

        $('#eliminarPaciente').hide();
    }
    const modalCerrarEliminarFecha = () => {

        $('#eliminarEvento').hide();
    }




    const calendario = useRef(null);

    function handleEventClick(info) {

        $('#eliminarPaciente').show();
        if (info.allDay) {

            $('#FechaInicio').val(info.dateStr);
            setfechaInicio(info.dateStr)


        }

    }


    const [id, setId] = useState()

    async function handleEventClickFecha(info) {

        $('#eliminarEvento').show();
        const IdAsistencias = await info.event.id
        setId(IdAsistencias)

    }





    const datas = {

        IdAsistencias: id
    }

    function eliminarFecha() {


        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/Fecha';
        axios.post(url, datas)
            .then(response => {



                $('#eliminarEvento').hide();
                const probar = async () => {

                    const ale = await swal({

                        title: "Correcto",
                        text: "Cambio guardado ",
                        icon: "success",

                    });

                    refreshPage()
                }

                if (response) {
                    probar()
                }


            })
            .catch(error => {
                console.error(error);
            });
    }



    async function handleEventDrop({ event }) {


        const fechad = await event.start
        await setfechaInicio(fechad)

        enviarOtra()

    }



    const datass =
    {
        Age: fechaInicio,
        Description: 'nose'
    }


    const enviarOtra = () => {

        console.log(datass)
        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/traerpaciente/AgregarEvento'
        axios.post(url, datass).then((result) => {

        })
    }



    return (

        <div>
            <Headers calendario={calendario} />

            <div className='cont-padre' >
                <div className='calendario' ref={calendario} >
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        editable={true}
                        droppable={true}
                        initialView={'dayGridMonth'}
                        events={event}
                        headerToolbar={{
                            start: "today prev,next",
                            center: "title",
                            end: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        eventDrop={handleEventDrop}
                        height={"80vh"}
                        dateClick={handleEventClick}
                        eventClick={handleEventClickFecha}
                    />
                </div>
            </div>

            <div className="modal" tabIndex="-1" id='eliminarPaciente' >

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Agenda de eventos</h5>

                        </div>
                        <div className="modal-body">

                            <form onSubmit={enviar}>
                                <div className='row' id='fila-agenda' >
                                    <div className='col'>
                                        <label>Fecha de inicio</label>
                                        <div className='input-group' data-autoclose="true">
                                            <input type="date" id='FechaInicio' value={valor} className='form-control' onChange={e => FfechaInicio(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='col'  >

                                        <label>Hora de inicio</label>
                                        <div className='input-group' data-autoclose="true">
                                            <input type="time" id='FechaInicio' className='form-control' onChange={e => FHoraInicio(e.target.value)} />
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className='col'>
                                        <textarea required className='form-control' onChange={e => FDescripcion(e.target.value)} rows="3" />
                                    </div>

                                </div>
                                <div className='modal-footer'>
                                    <button id='BotonAgregar' className='btn btn-primary' type='submit'>Guardar</button>
                                    <button id='BotonAgregar' className='btn btn-danger' type='button' onClick={modalCerrarEliminar}>Cancelar</button>
                                </div>

                            </form>

                        </div>




                    </div>
                </div>
            </div>
            <div className="modal" tabIndex="-1" id='eliminarEvento' >

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar evento</h5>

                        </div>
                        <div className="modal-body">
                            {

                                <p>¿Deseas eliminar esta  evento?</p>

                            }
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary" onClick={modalCerrarEliminarFecha}>No</button>
                            <button type="Submit" className="btn btn-danger" data-dismiss="modal" onClick={eliminarFecha}>Si</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendario







//como obtener la fecha al darle clik en un full calendar y poder obtener esa fecha  y enviar a .net 6  para en el servidor eliminarla 



/*
[HttpDelete]
public IActionResult DeleteEvento(DateTime fecha)
{
    var evento = dbContext.Eventos.FirstOrDefault(e => e.Fecha == fecha);
    if (evento == null)
    {
        return NotFound();
    }

    dbContext.Eventos.Remove(evento);
    dbContext.SaveChanges();

    return Ok();
}


*/
