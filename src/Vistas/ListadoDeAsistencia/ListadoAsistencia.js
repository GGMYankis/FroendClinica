

import Cookies from "universal-cookie";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import $ from "jquery";
import { findDOMNode } from "react-dom";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import Headers from "../../Headers";
import "./ListadoDeAsistencia.css";
import ModalAsistencia from "./ModalAsistencia";    

function ListadoAsistencia() {

  const [attendance, setAttendance] = useState([]);
  const [dataPaciente, setDataPaciente] = useState([]);
  const [listadoTerapias, setListadoTerapias] = useState([]);
  const [listadoTerapeuta, setListadoTerapeuta] = useState([]);
  const [listadoConsultorio, setListadoConsultorio] = useState([]);

  
  
  
  const [fechaFin, setFechaFin] = useState("");
  const [fechaBuscar, setfechaBuscar] = useState("");
  const [paciente, setPaciente] = useState("");
  const [terapeuta, setTerapeuta] = useState("");
  const [terapia, setTerapia] = useState("");
  const [remark, setRemark] = useState("");
  const [fechaInicio, setfechaInicio] = useState("");
  const [razon, setRazon] = useState("");
  const [asistencia, setAsistencia] = useState(0);
  const modalEditar = useRef();
  const modalEliminar = useRef();
  const citas = useRef();

  
  const [modal, setModal] = useState(false);

  const fetchData = async () => {
    try {
        const resSolicitud = await axios.get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Listadoasistencia");
        setAttendance(resSolicitud.data)
      } catch (error) {
        
        console.log(error)
      }
}

    useEffect(() => {
     
        fetchData();

        
        axios.get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Lista")   
        .then((responses) => {
            setDataPaciente(responses.data);
        });

        axios
        .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/ListaTerapia")
        .then((response) => {
            setListadoTerapias(response.data);
        });

        axios
        .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/terapeuta")
  
        .then((response) => {
          setListadoTerapeuta(response.data.usuarios);
        });


        axios
        .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Consultorios")
  
        .then((response) => {
            setListadoConsultorio(response.data.lista);
        });
    },[])



    const columns = [
        {
          name: "Terapeuta",
          selector: (row) => row.therapeua.names,
          sortable: true,
        },
        {
          name: "Paciente",
          selector: (row) => row.pacientes.name,
          sortable: true,
        },
        {
          name: "Terapia",
          selector: (row) => row.terapias.label,
          sortable: true,
        },
        {
          name: "Fecha",
          selector: (row) => row.asistencias.fechaInicio,
          sortable: true,
          cell: (row) => new Date(row.asistencias.fechaInicio).toLocaleDateString(),
        },
        {
          name: "Razon",
          selector: (row) => row.asistencias.tipoAsistencias,

          sortable: true,
        },
       
        {
          cell: (row) => (
            <div className="actions-container">
              <button
                className="btnEditar"
                  onClick={() => handleEdit(row.asistencias.idAsistencias)}
              >
                Editar
              </button>
            </div>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
        {
          cell: (row) => (
            <div className="actions-container">
              <button
                className="btn-tabla-usuario-eliminar"
                onClick={() => handelEliminar(row.asistencias.idAsistencias )}          
              >
                Eliminar
              </button>
            </div>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
      ];


      function handleEdit(e){         
        modalEditar.current.classList.add('active')
        setModal(true)

        var res = attendance.filter(a => a.asistencias.idAsistencias == e);
        res.map(a => {
              setPaciente(a.pacientes.idPatients)
                setTerapeuta(a.therapeua.idUser)
                setTerapia(a.terapias.idTherapy)
                setfechaInicio(a.asistencias.fechaInicio)
                setRemark(a.asistencias.remarks)
                setRazon(a.asistencias.tipoAsistencias)
                setAsistencia(a.asistencias.idAsistencias) 
                
        })
      }

      function handelEliminar(e){
        modalEliminar.current.classList.add('active')
        var res = attendance.filter(a => a.asistencias.idAsistencias == e);
        
        res.map(a => {
            setAsistencia(a.asistencias.idAsistencias)
        })

      }

      function quitarModal(){
              modalEditar.current.classList.remove('active')
              modalEliminar.current.classList.remove('active')
      }
  
      const dataEditar = {
        idPatients: parseInt( paciente),
        idAsistencias: parseInt( asistencia),
        idTherapy:  parseInt(terapia),
        IdTerapeuta:  parseInt(terapeuta),
        FechaInicio: fechaInicio,
        TipoAsistencias: razon,
        remarks: remark,
      };

      function editarApi(e){
        e.preventDefault()

        const url = "https://jdeleon-001-site1.btempurl.com/api/Clinica/EditarAsistencia";
        
           axios.post(url, dataEditar)
           .then(res => {
          if(res.status == 200){
            fetchData();
            modalEditar.current.classList.remove('active')
            swal({
                title: "Correcto",
                text: "Cambio guardado ",
                icon: "success",
                button: "Aceptar",
              });
            } 
           })
      }

      const dataEliminar = {
        idAsistencias: parseInt( asistencia),
      };

      function elimibarApi(e){

        const url = "https://localhost:63958/api/Clinica/EliminarAsistencia";
        
           axios.post(url, dataEliminar)
           .then(res => {

          if(res.status == 200){
            fetchData();
            modalEliminar.current.classList.remove('active')
            swal({
                title: "Correcto",
                text: "Cambio guardado ",
                icon: "success",
                button: "Aceptar",
              });
            } 
           })
      }

      const filtrar = {
        fechaInicio: fechaInicio,
        fechaFinal: fechaFin,
      };

      function filtrarAsistencias () {
        const url = "https://jdeleon-001-site1.btempurl.com/api/Clinica/FiltrandoAsistencia";
    
        axios.post(url, filtrar)
        .then(res => {
        if(res.data != null){
            setAttendance([])
            setAttendance(res.data)
        }

        })
        .then(res => {
            console.log(res)
        })
      }

  return (
    <>

    <Headers citas={citas}/>
           <div className="container-padre" ref={citas} >
                <div className="cont-form">
                <div className="header-attendance">
                <h1>Listado de Asistencias</h1>
                </div>

                <div className="cont-action">
                
                        <div className="cont-crear-paciente">
                            <label>Fecha Inicio</label>
                            <input
                                id="txtbuscar"
                                placeholder="Nombre"
                                autoComplete="off"
                                type="date"
                                onChange={(e) => setfechaInicio(e.target.value)}
                            />
                            </div>

                            <div className="cont-crear-paciente">
                            <label>Fecha Fin</label>
                            <input
                                id="txtbuscar"
                                placeholder="Nombre"
                                autoComplete="off"
                                type="date"
                                onChange={(e) => setFechaFin(e.target.value)}

                            />
                            </div>
                            <div className="cont-crear-paciente">
                            <button className="btn-gastos" type="submit" onClick={filtrarAsistencias}> Buscar  </button>
                            </div>
                        
                    
                
                    </div>

                <DataTable
                        columns={columns}
                            data={ attendance  }    
                        pagination
                    />
                </div>
            </div> 
            
            <div className='cont-modal' ref={modalEditar}>
                <form className='modalEditar' onSubmit={editarApi}>
                    <div className='cont-titu-modal'> 
                        <h1>Editar Asistencia</h1>
                    </div>
                    <div className='box-modal-asistencia'>

                                <div className='cajas'>

                                        <select
                                                className="form-select"
                                                onChange={(e) => setTerapeuta(e.target.value)}
                                                required
                                                value={terapeuta}
                                            >
                                                {listadoTerapeuta.map((item) => [
                                                <option value={item.idUser} key={item.idUser}>
                                                    {item.names} {item.apellido}{" "}
                                                </option>,
                                                ])}
                                      </select>

                                    <select value={paciente} onChange={(e) => setPaciente(e.target.value)}>
                                    {dataPaciente.map((item) => [
                                        <option key={item.idPatients} value={item.idPatients}>
                                            {item.name}
                                        </option>
                                        ])}
                                    </select>
                                </div>

                                <div className='cajas'>
                                <select
                                   
                                    onChange={(e) => setTerapia(e.target.value)}
                                    required
                                    value={terapia}
                                >
                                    {listadoTerapias.map((item) => [
                                    <option
                                        key={item.nombreTerapia.idTherapy}
                                        value={item.nombreTerapia.idTherapy}
                                    >
                                        {item.nombreTerapia.label}
                                    </option>,
                                    ])}
                                </select>
                                    <input type="date" value={fechaInicio.substring(0, 10)} onChange={e => setfechaInicio(e.target.value)} />
                                </div>

                                <div className='cajas'>
                                   <input value={remark}  onChange={e => setRemark(e.target.value)} required />

                                    <select   value={razon}  onChange={e => setRazon(e.target.value)}required >
                                        <option value="asistio">Asistencia</option>
                                        <option value="falta">Falta</option>
                                        <option value="Justificada">Justificada</option>
                                    </select>
                                </div>

                                <footer className='footer-attendance'>
                                        <button className='btn-guardar' type="submit">Guardar</button>
                                        <button className='btn-cancelar' type="button" onClick={quitarModal}>Cancelar</button>
                                </footer>
                    </div>
                    
                </form>
            </div>
            
      <div className="modal-usuario-eliminar" ref={modalEliminar}>
        <div className="modal-dialog-usuario" role="document">
          <div className="modal-content-usuario">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar Paciente</h5>
            </div>
            <div className="sub-box-usuario">
              <div className="modal-body">
                {
                  <p>
                    ¿Deseas eliminar la asistencia:
                    <span className="text-eliminar"> {asistencia}</span> ?
                  </p>
                }
              </div>
              <hr></hr>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn si"
                  data-dismiss="modal"
                  onClick={elimibarApi}

                >
                  Si
                </button>
                <button
                  type="button"
                  className="btn no"
                  onClick={quitarModal}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ListadoAsistencia
