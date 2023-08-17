import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Headers from "../components/Headers/Headers"
import { useEffect , useRef} from 'react';
import { urlApi } from '../auth-helpers';

function ReportesPago() {
  const [paciente, setPaciente] = useState([]);
      
    useEffect(() => { 

        axios.get(`${urlApi}Clinica/Lista`)       
        .then((responses) => {
            setPaciente(responses.data);
        });
    },[])

   let reportesPagos = useRef();
    const [filtrado , setFiltrado] = useState([]);
    const [data ,setData] = useState({
        fechaInicio:"",
        fechaFinal:"",
        idPatients:"",
    })

    function handleChange(e) {
        setData({
             ...data,
             [e.target.name]: e.target.value
        })
      }

    const enviar = async (e) => {
        e.preventDefault();

         const res = await axios.post(`${urlApi}Clinica/ReportesPago`,data)
         setFiltrado(res.data)
    }

  return (

    <>

    <Headers reportesPagos={reportesPagos}  />
     <div className='container-Reportes-Pagos' ref={reportesPagos} >
        <div className='box-resporte-pagos'  >
            <div className='titu-reportes-pagos'>
                <h1>Reporte de Pagos</h1>
            </div>
            <form className='form-repostes-pagos' onSubmit={enviar}>
                <div>
                    <label>Fecha Inicio</label>
                    <input type='date'onChange={e => handleChange(e)} name='fechaInicio' required/>
                </div>
                <div>
                    <label>Fecha Fin</label>
                    <input type='date' onChange={e => handleChange(e)} name='fechaFinal' required/>
                </div>
                       <div>
                       <select
                        className="form-select"
                        required
                        onChange={(e) => handleChange(e)}
                        name='idPatients'
                      >
                        <option value="">Seleccione una paciente</option>
                        <option value="0">Todos los Pacientes</option>

                        {paciente.map((item) => [
                          <option key={item.idPatients} value={item.idPatients}>
                            {item.name}
                          </option>,
                        ])}
                      </select>
                       </div>
                <button type='submit' className='btn-gastos'>Buscar</button>
            </form>


            <table className='td-reportes-pagos'>
                <thead>
                <tr>
                        <th>Pacientes</th>
                        <th>Fechas</th>
                        <th>Precio</th>
                        <th>Sesiones Realizadas</th>
                        <th>A pagar</th>
                        <th>Abono</th>
                        <th>Cobrar</th>
                        <th>A favor</th>
                       <th>Especialista</th> 
                     </tr>
                </thead>
                <tbody>

                {
                        filtrado.map((v , index) => [
                            <tr key={index}>
                            <td>{v.paciente.name  + " " +"("+v.terapia.description+")" + " " + v.terapia.label }</td>
                            <td>{v.fechas}</td>
                            <td>RD${parseFloat(v.terapia.price).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td>{v.cantidadAsistencia}</td>                         
                            <td>RD${parseFloat(v.aPagar).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td>RD${parseFloat(v.abono).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td>{ v.abono <  v.aPagar  ?"RD$"+parseFloat(Math.abs(v.aPagar - v.abono)).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) :""   }</td>
                            <td>{ v.abono >  v.aPagar  ?"RD$"+parseFloat( Math.abs(v.aPagar - v.abono)).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) :  ""  }</td>
                            
                           <td>{v.terapeuta.names + " " + v.terapeuta.apellido}</td>
                          
                         </tr>
                        ])
                    }
                   
                </tbody>
            </table>
           </div>
        </div>
    </>
  )

}

export default ReportesPago


