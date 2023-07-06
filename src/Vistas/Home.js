import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Headers from "../components/Headers/Headers"

import "../responsive.css";

const Home = () => {

  const [name, setName] = useState("");
  const [sex, setSexo] = useState("");
  const [parents_name, setPadreMadreNombre] = useState("");
  const [parent_or_guardian_phone_number, setParent_or_guardian_phone_number] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [educational_institution, setCentroEstudio] = useState("");
  const [course, setCurso] = useState("");
  const [who_refers, setQuienRefiere] = useState("");
  const [family_settings, setCongiracionFamilia] = useState("");
  const [therapies_or_service_you_will_receive_at_the_center,setTerapiaServicio,] = useState("");
  const [diagnosis, setDiagnóstico] = useState("");
  const [recommendations, setRecomendaciones] = useState("");
  const [family_members_concerns, setPreocupacionFamiliar] = useState("");
  const [specific_medical_condition, setCondicionMedica] =useState("");
  const [other, setOtro] = useState("");
  const [numberMothers, setNumberMothers] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [NumPadre, setNumPadre] = useState("");
  const [NumMadre, setNumMadre] = useState("");

  const handlemothers_number = (value) => {
    const regex = /^[0-9\b]+$/;
    if (value.target.value === "" || regex.test(value.target.value)) {
      setNumMadre(value.target.value);
    }

    setNumberMothers(value.target.value);
  };


  

  const handleparent_or_guardian_phone_numberChange = (value) => {
    const regex = /^[0-9\b]+$/;

    if (value.target.value === "" || regex.test(value.target.value)) {
      setNumPadre(value.target.value);
    }

    setParent_or_guardian_phone_number(value.target.value);
  };

  const handledate_of_birthChange = (event) => {
    setDate_of_birth(event);
    setInputValue(event);
  };

  function calculateAge() {
    const currentDate = new Date();
    const birthDate = new Date(inputValue);
    const differenceMs = currentDate - birthDate;
    const differenceYears = parseFloat(
      (differenceMs / (1000 * 60 * 60 * 24 * 365)).toFixed(2)
    );
    let SinEdad = "";

    if (isNaN(differenceYears)) {
      return SinEdad;
    }

    return differenceYears.toString();
  }

 
  const data = {
    Name: name,
    Sex: sex,
    ParentsName: parents_name,
    ParentOrGuardianPhoneNumber: parent_or_guardian_phone_number,
    DateOfBirth: date_of_birth,
    Age: calculateAge(),
    EducationalInstitution: educational_institution,
    NumberMothers: numberMothers,
    Course: course,
    WhoRefers: who_refers,
    FamilySettings: family_settings,
    TherapiesOrServiceYouWillReceiveAtTheCenter:
   therapies_or_service_you_will_receive_at_the_center,
    Diagnosis: diagnosis,
    Recommendations: recommendations,
    FamilyMembersConcerns: family_members_concerns,
    SpecificMedicalCondition: specific_medical_condition,
    Other: other,
    Activo: true,
  };

  const FormularioAdmin = document.getElementById("FormularioAdmin");
  const handleGuardar = (e) => {
    e.preventDefault();

    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/GuardarPaciente";
    axios
      .post(url, data)
      .then((result) => {
        swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
          button: "Aceptar",
        });
        FormularioAdmin.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Headers />

      <div className="cont-admin">
        <form
          onSubmit={handleGuardar}
          id="FormularioAdmin"
          className="contenedor-admin"
        >
          <div className="cont-titulo-form">
            <h1>Pacientes de nuevo ingreso </h1>
          </div>

          <div className="paddd">
            <div className="row" id="primeraFila">
              <div className="col">
                <label htmlFor="validationServer01" className="labelPaciente">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer01"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col">
                <label htmlFor="validationServer01" className="labelPaciente">
                  Sexo
                </label>
                <select
                  className="form-control"
                  required
                  onChange={(e) => setSexo(e.target.value)}
                >
                  <option>seleccione una opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenina">Femenino</option>
                </select>
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Nombre De Los Padres{" "}
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  onChange={(e) => setPadreMadreNombre(e.target.value)}
                  required
                />
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className="labelPacienteCC">
                  Teléfono del padre
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  value={NumPadre}
                  required
                  onChange={handleparent_or_guardian_phone_numberChange}
                />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className="labelPacienteCC">
                  Teléfono de la madre
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  value={NumMadre}
                  required
                  onChange={handlemothers_number}
                />
              </div>
            </div>

            <div className="row" id="segundaFila">
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="validationServer02"
                  required
                  onChange={(e) => handledate_of_birthChange(e.target.value)}
                />
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Edad
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationServer02"
                  value={calculateAge()}
                  readOnly
                />
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Centro de Estudios
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  required
                  onChange={(e) =>
                    setCentroEstudio(e.target.value)
                  }
                />
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Curso
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  required
                  onChange={(e) => setCurso(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Recomendaciones{" "}
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  required
                  onChange={(e) => setRecomendaciones(e.target.value)}
                />
              </div>
            </div>
            <div className="row" id="terceraFila">
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Quien refiere
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  required
                  onChange={(e) => setQuienRefiere(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Configuración familiar
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  required
                  onChange={(e) => setCongiracionFamilia(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Terapias o servicio{" "}
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  required
                  onChange={(e) =>
                    setTerapiaServicio(
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Diagnóstico{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationServer02"
                  required
                  onChange={(e) => setDiagnóstico(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Condición médica específica{" "}
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  required
                  onChange={(e) =>
                    setCondicionMedica(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Preocupación de los familiares
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="validationServer02"
                  required
                  onChange={(e) =>
                    setPreocupacionFamiliar(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="validationServer02">Otro </label>
                <textarea
                  id="txtArea"
                  onChange={(e) => setOtro(e.target.value)}
                  rows="10"
                  cols="70"
                ></textarea>
              </div>
            </div>
            <div className="col" id="cont-btn-admin">
              <button className="btnWeb">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
