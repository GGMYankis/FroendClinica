import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import logo from "../imagenes/IMG-20230221-WA0009.png";
import doctor from "../imagenes/undraw_medicine_b1ol.png";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import Select from "react-select";
import swal from "sweetalert";
import Headers from "../Headers";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { findDOMNode } from "react-dom";
import { FaUser } from "react-icons/fa";

// irannysdd
function Abono() {
  const [data, setData] = useState([]);
  const [dataPaciente, setDataPaciente] = useState([]);

  const [idTherapy, setIdTherapy] = useState(0);
  const [idPatients, setIdPatients] = useState(0);
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Lista")
      .then((responses) => {
        setDataPaciente(responses.data);
      });

    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/ListaTerapia")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const pasientes = (e) => {
    setIdPatients(e);
  };

  const terapias = (e) => {
    setIdTherapy(e);
  };

  const Fdecripcion = (e) => {
    setDescription(e);
  };

  const Ffecha = (e) => {
    setFecha(e);
  };

  const dataEvaluacion = {
    IdTherapy: idTherapy,
    IdPatients: idPatients,
    Fecha: fecha,
    Monto: 2,
    Description: description,
  };

  const EnviarAbono = (e) => {
    e.preventDefault();

    console.log(dataEvaluacion);

    const url = "https://jdeleon-001-site1.btempurl.com/api/Clinica/CrearAbono";
    axios.post(url, dataEvaluacion).then((resultEvaluacion) => {
      if (resultEvaluacion) {
        swal({
          title: "Correcto",
          text: "Se ha guardado correctamente",
          icon: "success",
          button: "Aceptar",
        });
      }
    });
  };

  return (
    <div>
      <Headers />

      <div className="cont-abono">
        <form className="form-abono">
          <div className="cont-titu-abono">
            <h1>Abono</h1>
          </div>
          <div className="sub-boxAbono">
            <div className="row" id="cont-barra-bono">
              <select
                className="form-select"
                required
                onChange={(e) => pasientes(e.target.value)}
              >
                <option>Seleccione una paciente</option>
                {dataPaciente.map((item) => [
                  //<option key={item.value} value={item.value}>{item.value}</option>
                  <option key={item.IdPatients} value={item.idPatients}>
                    {item.name}
                  </option>,
                ])}
              </select>
            </div>

            <div className="row" id="cont-barra-bono">
              <select
                className="form-select"
                onChange={(e) => terapias(e.target.value)}
                required
              >
                <option>Seleccione una terapia</option>
                {data.map((item) => [
                  //<option key={item.value} value={item.value}>{item.value}</option>
                  <option value={item.nombreTerapia.idTherapy}>
                    {item.nombreTerapia.label}
                  </option>,
                ])}
              </select>
            </div>

            <div className="row" id="cont-barra-bono">
              <input
                type="date"
                className="form-select"
                onChange={(e) => Ffecha(e.target.value)}
                required
              />
            </div>
            <div className="row" id="cont-barra-bono">
              <input
                type="text"
                className="form-select"
                onChange={(e) => Fdecripcion(e.target.value)}
                required
              />
            </div>
            <button className="btnAbono" onClick={EnviarAbono}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Abono;
