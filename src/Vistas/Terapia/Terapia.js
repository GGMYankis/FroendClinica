import React, { useRef, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Headers from "../../components/Headers/Headers";
import { Loading } from "../../components/Loading";
import "./Terapia.css";

function Terapia() {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [porcentajeCentro, setPorcentajeCentro] = useState(0);
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
    <>
      <div className="cont_form_terapia">
        <form
          className="form_terapia_p"
          onSubmit={enviarTerapia}
          ref={resportes}
        >
          {loading ? <Loading /> : ""}

          <div className="box_terapia_p">
            <div className="cont_titu_terapia_p">
              <h1>Crear Terapia</h1>
            </div>

            <div>
              <label>Terapia</label>
              <input onChange={(e) => handleTerapia(e.target.value)} required />
            </div>

            <div>
              <label>Precio</label>
              <input type="text" onChange={handlePrecio} required />
            </div>

            <div>
              <label>Porcentaje del Terapeuta</label>
              <input
                type="text"
                onChange={(e) => setPorcentaje(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Porcentaje del Centro</label>
              <input
                type="text"
                onChange={(e) => setPorcentajeCentro(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="footer_terapia_p">
            <label>Descripción</label>
            <textarea
              onChange={(e) => handleDescripcion(e.target.value)}
            ></textarea>
          </div>
          <button className="btn">Guardar</button>
        </form>
      </div>
      <Headers />
    </>
  );
}

export default Terapia;
