import "react-date-range/dist/styles.css"; // Importa los estilos CSS
import "react-date-range/dist/theme/default.css"; // Importa los estilos del tema por defecto
import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Headers from "../components/Headers/Headers"

import { Loading, LoaLogin } from "../components/Loading";
import { useRef } from "react";

import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

function VerGanancias() {
  const [citas, setCitas] = useState([]);
  const [tera, setTera] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mensaje, setMensaje] = useState(false);
  const [mostrarVacio, setMostrarVacio] = useState(true);
  const [sumarGastos, setSumarGastos] = useState(0);
  const [surmarAsistencia, setSurmarAsistencia] = useState(0);
  const [acolumaldo, setAcolumaldo] = useState(0);
  const [loading, setLoading] = useState(false);
  const negaClas = useRef(null);
  const resportes = useRef();

  function suma(monto) {
    let acolumaldo = 0;
    for (let i = 0; i < monto.length; i++) {
      acolumaldo += monto[i];
    }
    setSumarGastos(acolumaldo);
  }

  function sumas(monto) {
    let acolumaldo = 0;
    for (let i = 0; i < monto.length; i++) {
      acolumaldo += monto[i];
    }
    setSurmarAsistencia(acolumaldo);
  }

  const gana = sumarGastos - surmarAsistencia;

  const consultorio = surmarAsistencia * 0.4;
  const neto = consultorio - sumarGastos;
  const totalTerapeuta = sumarGastos * 0.6;

  function ganancias() {
    setAcolumaldo(sumarGastos - surmarAsistencia);

    if (acolumaldo == 0) {
    } else if (acolumaldo > 0) {
    } else {
      // negaClas.current.classList.add('activoNega')
    }
  }

  const data = {
    DateOfInvestment: startDate,
    EndDate: endDate,
  };

  const datas = {
    FechaInicio: startDate,
    FechaFinal: endDate,
  };

  const enviars = (e) => {
    resportes.current.classList.add("contenedors");

    const urls =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/FiltrarGastos";
    axios.post(urls, data).then((result) => {
      if (result.data.mensaje) {
        setMensaje(true);
      } else {
        setMostrarVacio(false);
        setCitas(result.data);
        const monto = result.data.map((m) => m.amount);
        const resultado = suma(monto);
      }
    });

    try {
      e.preventDefault();
      const url = "https://jdeleon-001-site1.btempurl.com/api/Clinica/Probar";
      axios.post(url, datas).then((result) => {
        if (result.data) {
          resportes.current.classList.remove("contenedors");
        }

        setTera(result.data);

        const montos = result.data.map((m) => m.price);

        const resultados = sumas(montos);
        ganancias();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Headers myElement={resportes} />

      <div className="contenedor-FiltrarGastos">
        <form className="contTableGastos" onSubmit={enviars} ref={resportes}>
          {loading ? <Loading /> : ""}
          <div className="cont-titu-gastos">
            <h1>Historial de gastos</h1>
          </div>

          <div className="cont-box-body-gastos">
            <div className="row" id="cont-input-gastos">
              <div className="col">
                <label>Fecha Inicio</label>
                <input
                  type="date"
                  className="inputgastos"
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <label>Fecha Fin</label>
                <input
                  type="date"
                  className="inputgastos"
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <button className="btn-gastos" type="submit">
                  Buscar
                </button>
              </div>
            </div>
            <hr></hr>

            <div className="cont-table-gastos">
              <div className="cont-titu-gastos-tabla">
                <p>Gastos</p>
              </div>
              <table className="table-gastos">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody className="body-table-gastos">
                  {citas.map((item,index) => [
                    <tr key={index}>
                      <td data-label="Descripcion">{item.nombre}</td>
                      <td data-label="Descripcion">{item.descripcion}</td>
                     <td data-label="Monto">RD${parseFloat(item.amount).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

                      <td data-label="Fecha">
                        {item.dateOfInvestment.substring("", 10)}
                      </td>
                    </tr>,
                  ])}
                </tbody>
              </table>
              {mostrarVacio ? (
                <div className="mostrarMensaje">
                  <p className="sinbusqueda-gastos">Sin busqueda...</p>
                </div>
              ) : (
                ""
              )}
              <div className="cont-titu-ganancia-tabla">
                <p>Ingresos</p>
              </div>
              <table className="table-gastos">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody className="body-table-gastos"> 
                  {tera.map((item,index) => [
                   <tr key={index}>
                      <td data-label="Descripcion">{item.label}</td>
                    
                      <td data-label="Descripcion">RD${parseFloat(item.price).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td data-label="Descripcion">
                        {item.fechaInicio.substring("", 10)}
                      </td>
                    </tr>,
                  ])}
                </tbody>
              </table>


              {mostrarVacio ? (
                <div className="mostrarMensaje">
                  <p className="sinbusqueda-gastos">Sin busqueda...</p>
                </div>
              ) : (
                ""
              )}

              <div className="cont-titu-ganancia-tabla">
                <p>Ganancia del Periodo</p>
              </div>
              <div>
                {sumarGastos == false && surmarAsistencia == false ? (
                  <div className="mostrarMensaje">
                    <p className="sinbusqueda-gastos">Sin busqueda...</p>
                  </div>
                ) : (
                  <div className="mostrarMensaje">
                    <h1 className="resultadoGanancias" ref={negaClas}>
                      ${gana.toFixed(2)}
                    </h1>
                  </div>
                )}
              </div>

              <div className="cont-titu-ganancia-tabla">
                <p>Totales</p>
              </div>

              <div>
                {sumarGastos == false && surmarAsistencia == false ? (
                  <div className="mostrarMensaje">
                    <p className="sinbusqueda-gastos">Sin busqueda...</p>
                  </div>
                ) : (
                  <div className="mostrarMensaje">
                    <h1 className="negaClas" ref={negaClas}>
                      Total Consultorio = {consultorio}
                    </h1>
                  </div>
                )}
              </div>

              <div className="cont-titu-ganancia-tabla">
                <p>Total Neto</p>
              </div>
              <div>
                {sumarGastos == false && surmarAsistencia == false ? (
                  <div className="mostrarMensaje">
                    <p className="sinbusqueda-gastos">Sin busqueda...</p>
                  </div>
                ) : (
                  <div className="mostrarMensaje">
                    <h1 className="negaClas" ref={negaClas}>
                      Total Neto = {neto.toFixed(2)}
                    </h1>
                  </div>
                )}
              </div>

              <div className="cont-titu-ganancia-tabla">
                <p>Total Terapeutas</p>
              </div>
              <div>
                {sumarGastos == false && surmarAsistencia == false ? (
                  <div className="mostrarMensaje">
                    <p className="sinbusqueda-gastos">Sin busqueda...</p>
                  </div>
                ) : (
                  <div className="mostrarMensaje">
                    <h1 className="negaClas" ref={negaClas}>
                      Total Terapeutas = {totalTerapeuta.toFixed(2)}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerGanancias;

