import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Select from 'react-select';
import swal from 'sweetalert';
import Headers from "../../components/Headers/Headers"
import "./Asignación.css";

function Asignación() {

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
        <>
            <div className='cont_form_asignar'>
                <form className='form_asignar' ref={resportes} onSubmit={enviars}>
                    <div className='cont_titu_asignar'>
                        <h1>Asignación Terapeuta</h1>
                    </div>
                    <div className='box_asignar'>

                                    <select required onChange={e => handleTerapeuta(e.target.value)} >
                                        <option value=''>Seleccione un Terapeuta</option>
                                        {
                                            terapeuta.map(item => [
                                                <option key={item.idUser}  value={item.idUser}>{item.names} {item.apellido}</option>
                                            ])
                                        }
                                    </select>

                                    <Select
                                        isMulti
                                        options={data}
                                        onChange={handle}
                                        required
                                        placeholder = "Seleccione una Terapia"
                                    />            
                            <button className='btn' type='submit'>Guardar</button>
                    </div>
                </form>
            </div>
            <Headers />


        </>
    )
}

export default Asignación