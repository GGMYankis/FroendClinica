

import Cookies from "universal-cookie";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import $ from "jquery";
import { findDOMNode } from "react-dom";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import Headers from "../../components/Headers/Headers";
import "./ListadoDeAsistencia.css";

function ListadoAsistencia() {

  const [attendance, setAttendance] = useState([]);
  const [dataPaciente, setDataPaciente] = useState([]);
  const [listadoTerapias, setListadoTerapias] = useState([]);
  const [listadoTerapeuta, setListadoTerapeuta] = useState([]);
  const [listadoConsultorio, setListadoConsultorio] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  
  
  const [fechaFin, setFechaFin] = useState("");
  const [paciente, setPaciente] = useState("");
  const [terapeuta, setTerapeuta] = useState("");
  const [terapia, setTerapia] = useState("");
  const [remark, setRemark] = useState("");
  const [fechaInicio, setfechaInicio] = useState("");
  const [razon, setRazon] = useState(0);
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
          selector: (row) => row.therapeua.names + " " + row.therapeua.apellido,
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
          name: "Razón ",
          selector: (row) => row.tipoAsistencia,
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
        modalEditar.current.classList.add('active-asistencia')
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
        modalEliminar.current.classList.add('active-asistencia')
        var res = attendance.filter(a => a.asistencias.idAsistencias == e);
        
        res.map(a => {
            setAsistencia(a.asistencias.idAsistencias)
        })

      }

      function quitarModal(){
              modalEditar.current.classList.remove('active-asistencia')
              modalEliminar.current.classList.remove('active-asistencia')
      }
  
      const dataEditar = {
        idPatients: parseInt( paciente),
        idAsistencias: parseInt( asistencia),
        idTherapy:  parseInt(terapia),
        IdTerapeuta:  parseInt(terapeuta),
        FechaInicio: fechaInicio,
        TipoAsistencias:parseInt(razon),
        remarks: remark,
      };

      function editarApi(e){
        e.preventDefault()

        const url = "https://jdeleon-001-site1.btempurl.com/api/Clinica/EditarAsistencia";
        
           axios.post(url, dataEditar)
           .then(res => {
          if(res.status == 200){
            fetchData();
            modalEditar.current.classList.remove('active-asistencia')
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

        const url = "https://jdeleon-001-site1.btempurl.com/api/Clinica/EliminarAsistencia";
        
           axios.post(url, dataEliminar)
           .then(res => {

          if(res.status == 200){
            fetchData();
            modalEliminar.current.classList.remove('active-asistencia')
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

      function filtrarAsistencias (e) {
        e.preventDefault()
        const url = "https://jdeleon-001-site1.btempurl.com/api/Clinica/FiltrandoAsistencia";
    
        axios.post(url, filtrar)
        .then(res => {
        if(res.data != null){
            setAttendance([])
            setAttendance(res.data)
        }

        })
        .then(res => {
        })
      }



      const handleFilter = (e) => {
        const keyword = e.target.value;
        if (keyword === "") {
          setFilteredData(attendance);
          return;

        } else {
            const filteredResults = attendance.filter((item) => {

              const fullName = item.pacientes.name + " " + item.therapeua.names + " " + item.asistencias.tipoAsistencias

              const keywordLower = keyword.toLowerCase();
              const fullNameLower = fullName.toLowerCase();
              
              return fullNameLower.includes(keywordLower);

          });
        setFilteredData(filteredResults);
        }
      };


  return (
    <>

    <Headers citas={citas}/>
           <div className="container-padre" ref={citas} >
                <div className="cont-form">
                <div className="header-attendance">
                <h1>Listado de Asistencias</h1>
                </div>

                <form className="cont-action" onSubmit={filtrarAsistencias}>  

               


                <div className="cont-crear-paciente">

                    <label>Paciente</label>
                       <input id="txtbuscar"  placeholder="Nombre"onChange={handleFilter} autoComplete="off" />        
                    </div>

                        <div className="cont-crear-paciente">
                            <label>Fecha Inicio</label>
                            <input
                                id="txtbuscar"
                                placeholder="Nombre"
                                autoComplete="off"
                                type="date"
                                onChange={(e) => setfechaInicio(e.target.value)}
                                required
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
                                required
                            />
                            </div>
                            <div className="cont-crear-paciente">
                            <button className="btn-gastos" type="submit" > Buscar  </button>
                            </div>             
                    </form>

                <DataTable
                        columns={columns}
                            data={ filteredData.length > 0 ? filteredData :  attendance  }    

                        pagination
                    />
                </div>
            </div> 
            
            <div className='cont-modal-asistencia' ref={modalEditar}>
                <form className='modalEditar' onSubmit={editarApi}>
                    <div className='cont-titu-modal'> 
                        <h1>Editar Asistencia</h1>
                    </div>
                    <div className='box-modal-asistencia'>

                            <div className='cajas'>
                              <div>
                              <label className="label-asistencia">Lista de Terapeuta</label>
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
                              </div>
                              <div>
                              <label className="label-asistencia">Lista de Pacientes</label>
                                    <select value={paciente} onChange={(e) => setPaciente(e.target.value)}>
                                    {dataPaciente.map((item) => [
                                        <option key={item.idPatients} value={item.idPatients}>
                                            {item.name}
                                        </option>
                                        ])}
                                    </select>
                              </div>
                               
                                      
                                </div>

                                <div className='cajas'>
                                  <div>
                                  <label className="label-asistencia">Lista de Terapias</label>
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
                                  </div>

                                  <div>
                                  <label className="label-asistencia">Fecha</label>

                                  <input type="datetime-local" value={fechaInicio} onChange={e => setfechaInicio(e.target.value)} />
                                  
                                    </div>     
                                </div>

                                <div className='cajas'>

                                      <div>
                                      <label className="label-asistencia">Observaciones</label>
                                                                        <input value={remark}  onChange={e => setRemark(e.target.value)} required />
                                      </div>
                                  <div>
                                  

                                   <label className="label-asistencia">Razón Asistencia</label>
                                    <select   value={razon}  onChange={e => setRazon(e.target.value)}required >
                                        <option value="1">Asistencia</option>
                                        <option value="2">Falta</option>
                                        <option value="3">Justificada</option>
                                    </select>
                                  </div>
                            
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
