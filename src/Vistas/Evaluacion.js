import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import Headers from "../components/Headers/Headers";
import { getDatosUsuario, getUsuarioCompleto } from "../auth-helpers";
import { Loading } from "../components/Loading";
import Select from "react-select";

function Evaluacion() {
  const [data, setData] = useState([]);
  const [dataPaciente, setDataPaciente] = useState([]);
  const [visitas, setVisitas] = useState(false);
  const [terapeuta, setTerapeuta] = useState([]);
  const [consultorios, setconsultorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dayEnviar, setDayEnviar] = useState([]);
  const [price, setPrice] = useState("");
  const [price1, setPrice1] = useState("");

  let id = getDatosUsuario();
  let rol = getUsuarioCompleto();
  const resportes = useRef();

  const date = {
    Idterapeuta: id,
  };

  useEffect(() => {
    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Lista")
      .then((responses) => {
        setDataPaciente(responses.data);
      });

    if (rol == 2) {
      axios
        .post(
          "https://jdeleon-001-site1.btempurl.com/api/Clinica/GetEvaluacionByTerapeuta",
          date
        )
        .then((response) => {
          setData(response.data);
        });
    } else {
      axios
        .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/ListaTerapia")
        .then((response) => {
          setData(response.data);
        });
    }

    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/terapeuta")

      .then((response) => {
        setTerapeuta(response.data.usuarios);
      });
    axios
      .get("https://jdeleon-001-site1.btempurl.com/api/Clinica/Consultorios")

      .then((response) => {
        setconsultorios(response.data.lista);
      });
  }, []);

  const objDias = [
    { label: "lunes", value: "lunes" },
    { label: "martes", value: "martes" },
    { label: "miercoles", value: "miercoles" },
    { label: "jueves", value: "jueves" },
    { label: "viernes", value: "viernes" },
    { label: "sabado", value: "sabado" },
    { label: "domingo", value: "domingo" },
  ];

  const [dataCrear, setDataCrear] = useState({
    idPatients: "",
    idTherapy: "",
    fechaInicio: "",
    idTerapeuta: "",
    price: null,
    firstPrice: "",
    idConsultorio: "",
    Dias: [],
    Visitas: true,
    /*  repetir:"",
    frecuencia:"", */
  });

  function handle(selectedItems) {
    const diasEnviar = [];

    selectedItems.map((item) => {
      diasEnviar.push(item.value);
      setDayEnviar(diasEnviar);
      dataCrear.Dias = diasEnviar;
    });
  }

  const CrearCitas = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://jdeleon-001-site1.btempurl.com/api/traerpaciente/CrearEvaluacion",
        dataCrear
      );
      if (res.status == 200) {
        setLoading(false);
        const ale = await swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
        });
      }
    } catch (error) {
      swal(error.response.data, "Intentelo mas tarde", "warning");
      console.log(error);
      setLoading(false);
    }
  };

  function handleChange(e) {
    setDataCrear({
      ...dataCrear,
      [e.target.name]: e.target.value,
    });
  }

  const Fprecio = (value) => {
    const regex = /^[0-9\b]+$/;
    if (value.target.value === "" || regex.test(value.target.value)) {
      setPrice(value.target.value);
    }

    dataCrear.firstPrice = value.target.value;
  };

  const Fprecio2 = (value) => {
    const regex = /^[0-9\b]+$/;
    if (value.target.value === "" || regex.test(value.target.value)) {
      setPrice1(value.target.value);
    }

    dataCrear.price = value.target.value;
  };

  return (
    <div>
      <Headers />

      <div className="cont_evaluacion">
        <form className="form_evaluacion" onSubmit={CrearCitas} ref={resportes}>
          <div className="cont-titu-select">
            <h1>Citas</h1>
            <i className="bi bi-person-circle"></i>
          </div>

          <div className="box_evaluacion">
            <div>
              <label>Lista de Pacientes</label>
              <select name="idPatients" required onChange={handleChange}>
                <option value=""></option>
                {dataPaciente.map((item) => [
                  <option key={item.idPatients} value={item.idPatients}>
                    {item.name}
                  </option>,
                ])}
              </select>
            </div>

            <div>
              <label>Lista de Terapias </label>
              <select onChange={handleChange} required name="idTherapy">
                <option value=""></option>
                {data.map((item) => [
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
              <label>Terapeuta</label>
              <select onChange={handleChange} required name="idTerapeuta">
                <option value=""></option>
                {terapeuta.map((item) => [
                  <option value={item.idUser} key={item.idUser}>
                    {item.names} {item.apellido}{" "}
                  </option>,
                ])}
              </select>
            </div>

            <div>
              <label>Consultorio </label>
              <select onChange={handleChange} required name="idConsultorio">
                <option value=""></option>

                {consultorios.map((item) => [
                  <option value={item.idConsultorio} key={item.idConsultorio}>
                    {item.nombre}{" "}
                  </option>,
                ])}
              </select>
            </div>

            <div>
              <label htmlFor="txtnombres">Precio de la Terapia</label>
              <input
                type="text"
                id="txtnombres"
                onChange={Fprecio2}
                value={price1}
                autoComplete="off"
                name="price"
              />
            </div>
            <div>
              <label htmlFor="txtnombres">P.C de la primera Evaluación</label>
              <input
                type="text"
                id="txtnombres"
                onChange={Fprecio}
                value={price}
                required
                autoComplete="off"
                name="firstPrice"
              />
            </div>
          </div>

          <div className="cont_visitas">
            <div>
              <input
                type="checkbox"
                value="true"
                onChange={() => setVisitas(true)}
              />
              <label htmlFor="txtnombres">Visitas</label>
            </div>
          </div>

          <hr></hr>

          <div className="cont_titu_recurrencia">
            <h1>Recurrencia</h1>
          </div>

          <div className="box_recurrencia">
            <div>
              <label>Fecha de Inicio</label>

              <label></label>
              <input
                type="datetime-local"
                min="2023-03-24"
                onChange={handleChange}
                required
                name="fechaInicio"
              />
            </div>

            <div className="cont-recurrence-select check-select">
              <label></label>

              <Select
                isMulti
                options={objDias}
                onChange={(e) => handle(e)}
                placeholder="Seleccione los días "
                name="dias"
                required
              />
            </div>
          </div>
          <div className="footer_cita">
            <button
              className={loading ? "btn guardar disabledAll" : "btn guardar"}
              type="submit"
            >
              Guadar
              {loading ? <Loading /> : ""}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Evaluacion;
