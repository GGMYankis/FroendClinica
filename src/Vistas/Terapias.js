import React, { useRef, useState } from "react";
import logo from "../imagenes/IMG-20230221-WA0009.png";
import { FaBars } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Headers from "../components/Headers/Headers";

import { Loading, LoaLogin } from "../components/Loading";

function Terapias() {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [porcentajeCentro, setPorcentajeCentro] = useState(0);
  const [vali, setVali] = useState(0);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const resportes = useRef();

  const handleTerapia = (e) => {
    setLabel(e);
  };

  const handleDescripcion = (e) => {
    setDescription(e);
  };

  const handlePrecio = (event) => {
    const regex = /^[0-9\b]+$/;

    if (event.target.value === "" || regex.test(event.target.value)) {
      setValue(event.target.value);
    }

    setPrice(event.target.value);
  };

  const data = {
    Label: label,
    Value: label,
    Description: description,
    Price: price,
    Porcentaje: porcentaje,
    PorcentajeCentro: porcentajeCentro,
  };

  function refreshPage() {
    window.location.reload();
  }

  const enviarTerapia = (e) => {
    e.preventDefault();

    resportes.current.classList.add("contenedors");

    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/CrearTerapia";
    axios
      .post(url, data)
      .then((result) => {
        const probar = async () => {
          const ale = await swal({
            title: "Correcto",
            text: "Cambio guardado ",
            icon: "success",
          });

          refreshPage();
        };
        if (result) {
          resportes.current.classList.remove("contenedors");
          probar();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Headers />

      <div className="cont-form-terapia">
        <form
          className="form-terapias"
          onSubmit={enviarTerapia}
          id="formterapia"
          ref={resportes}
        >
          {loading ? <Loading /> : ""}

          <div className="cont-titu-Pagina-terapia">
            <h1>Terapia</h1>
          </div>

          <div className="sub-box-Terapia">
            <div className="cont-sub-terapia">
              <div className="cont-barra-tera">
                <label>Terapia</label>
                <input
                  onChange={(e) => handleTerapia(e.target.value)}
                  required
                />
              </div>

              <div className="cont-barra-tera">
                <label>Precio</label>
                <input type="text" onChange={handlePrecio} required />
              </div>
              <div className="cont-barra-tera">
                <label>Porcentaje del Terapeuta</label>
                <input
                  type="text"
                  onChange={(e) => setPorcentaje(e.target.value)}
                  required
                />
              </div>
              <div className="cont-barra-tera">
                <label>Porcentaje del Centro</label>
                <input
                  type="text"
                  onChange={(e) => setPorcentajeCentro(e.target.value)}
                  required
                />
              </div>
              <div className="cont-barra-tera">
                <label>Descripción</label>
                <textarea
                  onChange={(e) => handleDescripcion(e.target.value)}
                ></textarea>
              </div>
              <button className="btnWeb">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Terapias;
