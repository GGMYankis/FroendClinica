
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import Headers from "../../components/Headers/Headers"
import {getUsuarioCompleto} from "../../auth-helpers";
import useAuth from "../../components/Auth/LoginForm/hook/useAuth";
import ModalCrearPaciente from "../../Modal/ModalListadoDePacientes/ModalCrearPaciente"
import ModalEliminarPacientes from "../../Modal/ModalListadoDePacientes/ModalEliminarPacientes";
import "./ListasPacientes.css";
function ListasPacientes() {

const {auth} = useAuth();

  const [ac, setAc] = useState('');
  const modalEditar = useRef();

  
  const [idPaciente, setIdPaciente] = useState();
  const [listaPaciente, setlistaPaciente] = useState([]);
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [parents_name, setParents_Name] = useState("");
  const [parent_or_guardian_phone_number, setParent_or_guardian_phone_number] =
    useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [age, setAge] = useState();
  const [educational_institution, setEducational_institution] = useState("");
  const [course, setCourse] = useState("");
  const [who_refers, setWho_refers] = useState("");
  const [family_settings, setFamily_settings] = useState("");
  const [
    therapies_or_service_you_will_receive_at_the_center,
    setTherapies_or_service_you_will_receive_at_the_center,
  ] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [recommendations, setRecommendations] = useState("");
  const [family_members_concerns, setFamily_members_concerns] = useState("");
  const [specific_medical_condition, setSpecific_medical_condition] =
    useState("");
  const [other, setOther] = useState("");
  const [activos, setActivo] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [number_Mothers, setNumber_Mothers] = useState("");
  const [NumPadre, setNumPadre] = useState("");
  const [NumMadre, setNumMadre] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [verificarActivo, setVerificarActivo] = useState(false);
  const [edadEditar, setEdadEditar] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  let rol = getUsuarioCompleto();
  const paciente = useRef(null);

  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [idEliminar, setIdEliminar] = useState(0);


  useEffect(() => {
    cargar();
  }, [refresh]);

  const datass = {
    idUser:auth.nameid[0]
  }
  const cargar =  async () => {


    if(rol == 2){

      const res = await axios.post("https://jdeleon-001-site1.btempurl.com/api/Citas/PacientesTerapeuta",datass );
      res.data.map((item) => {
        item.activo = item.activo ? "si" : "no";
       });
      setlistaPaciente(res.data)
    }else{

      const res = await axios.get("https://jdeleon-001-site1.btempurl.com/api/Clinica/ListaTodos");
      res.data.map((item) => {
         item.activo = item.activo ? "si" : "no";
       });
     setlistaPaciente(res.data); 

    }
        
  };




  const handleNameChange = (value) => {
    setName(value);
  };

  const FActivo = (value) => {
    setAc(value);

    if (value == 1) {
      value = true;
      setActivo(value);
    } else {
      value = false;
      setActivo(value);
    }
  };

  const handleSexChange = (value) => {
    setSex(value);
  };

  const handleParents_NameChange = (value) => {
    setParents_Name(value);
  };

  const handleparent_or_guardian_phone_numberChange = (value) => {
    const regex = /^[0-9\b]+$/;

    if (value.target.value === "" || regex.test(value.target.value)) {
      setNumPadre(value.target.value);
    }
    setParent_or_guardian_phone_number(value.target.value);
  };

  const handledate_of_birthChange = (event) => {
    setEdadEditar(0);
    setInputValue(event.target.value);
    setDate_of_birth(event.target.value);
  };

  function calculateAge(edad) {
    const currentDate = new Date();
    const birthDate = new Date(inputValue);
    const differenceMs = currentDate - birthDate;
    const differenceYears = parseFloat(
      (differenceMs / (1000 * 60 * 60 * 24 * 365)).toFixed(2)
    );
    let SinEdad = "";

    if (edad != null) {
      return edad;
    }

    if (isNaN(differenceYears)) {
      return SinEdad;
    }
    return differenceYears.toString();
  }

  const handleducational_institutionChange = (value) => {
    setEducational_institution(value);
  };

  const handleCurso = (value) => {
    setCourse(value);
  };

  const handlemothers_number = (value) => {
    const regex = /^[0-9\b]+$/;

    if (value.target.value === "" || regex.test(value.target.value)) {
      setNumMadre(value.target.value);
    }

    setNumber_Mothers(value.target.value);
  };

  const handlewho_refersChange = (value) => {
    setWho_refers(value);
  };
  const handlefamily_settingsChange = (value) => {
    setFamily_settings(value);
  };
  const handletherapies_or_service_you_will_receive_at_the_centerChange = (
    value
  ) => {
    setTherapies_or_service_you_will_receive_at_the_center(value);
  };
  const handlediagnosisChange = (value) => {
    setDiagnosis(value);
  };
  const handlerecommendationsChange = (value) => {
    setRecommendations(value);
  };
  const handlefamily_members_concernsChange = (value) => {
    setFamily_members_concerns(value);
  };
  const handlespecific_medical_conditionChange = (value) => {
    setSpecific_medical_condition(value);
  };
  const handleotherChange = (value) => {
    setOther(value);
  };

 
 

  

  const modalCraePaciente = () => {
    setShowModal(true)
    setMensajeError("")
  };

  const dataEditar = {
    IdPatients: idPaciente,
    Name: name,
    Sex: sex,
    ParentsName: parents_name,
    ParentOrGuardianPhoneNumber: parent_or_guardian_phone_number,
    DateOfBirth: date_of_birth,
    Age: age,
    EducationalInstitution: educational_institution,
    NumberMothers: number_Mothers,
    Course: course,
    WhoRefers: who_refers,
    FamilySettings: family_settings,
    TherapiesOrServiceYouWillReceiveAtTheCenter: therapies_or_service_you_will_receive_at_the_center, 
    Diagnosis: diagnosis,
    Recommendations: recommendations,
    FamilyMembersConcerns: family_members_concerns,
    SpecificMedicalCondition: specific_medical_condition,
    Other: other,
    Activo: activos,
  };


  const handleEditar = async (e) => {
    e.preventDefault();

    const url =
      "https://jdeleon-001-site1.btempurl.com/api/Clinica/EditarPaciente";
    axios
      .put(url, dataEditar)
      .then((result) => {

        const probar = async () => {    

          setlistaPaciente([]);   
          cargar();
          modalEditar.current.classList.remove("active");
          const ale = await swal({
            title: "Correcto",
            text: "Cambio guardado ",
            icon: "success",
          });
        };
        if (result) {
          probar();
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };


  

  const modalEliminar = (e) => {
    setShowModalEliminar(true)
    const IdEliminarPaciente = listaPaciente.filter(
      (item) => item.idPatients == e
    );

    IdEliminarPaciente.map((item) => {
      setName(item.name);
    });
    setIdEliminar(e);
  };

  

  const CancelarPacienteEditar = () => {
    modalEditar.current.classList.remove("active");
  };

 

  // codigo de filtrado
  const handleEdit = (e) => {

    setIdPaciente(e);
    modalEditar.current.classList.add("active");
    const IdEditarPaciente = listaPaciente.filter(
      (item) => item.idPatients == e
    );

    IdEditarPaciente.map((item) => {
      if (item.activo == "si") {
        setAc(1);
      }
      if (item.activo == "no") {
        setAc(0);
      }
    });

    IdEditarPaciente.map((item) => [
      setName(item.name),
      setSex(item.sex),
      setParents_Name(item.parentsName),
      setParent_or_guardian_phone_number(item.parentOrGuardianPhoneNumber),
      setDate_of_birth(item.dateOfBirth.substring("", 10)),
      setEdadEditar(item.age),
      setEducational_institution(item.educationalInstitution),
      setWho_refers(item.whoRefers),
      setFamily_settings(item.familySettings),
      setTherapies_or_service_you_will_receive_at_the_center(
        item.therapiesOrServiceYouWillReceiveAtTheCenter
      ),
      setDiagnosis(item.diagnosis),
      setRecommendations(item.recommendations),
      setFamily_members_concerns(item.familyMembersConcerns),
      setSpecific_medical_condition(item.specificMedicalCondition),
      setOther(item.other),
      setNumber_Mothers(item.numberMothers),
      setCourse(item.course),
      setSex(item.sex),
    ]);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Sexo",
      selector: (row) => row.sex,
      sortable: true,
    },
    {
      name: "Nombre De Los Padres",
      selector: (row) => row.parentsName,
      sortable: true,
    },
    {
      name: "Teléfono de los padres o tutores",
      selector: (row) => row.parentOrGuardianPhoneNumber,
      sortable: true,
    },
    {
      name: "Fecha de nacimiento",
      selector: (row) => row.dateOfBirth,
      sortable: true,
      cell: (row) => new Date(row.dateOfBirth).toLocaleDateString(),
    },
    {
      name: "Edad",
      selector: "age",
      selector: (row) => row.age,
      sortable: true,
    },
   {
  name: "Fecha de Ingreso",
  selector: (row) => {
    if (row.fechaIngreso) {
      return new Date(row.fechaIngreso).toLocaleDateString();
    } else {
      return "";
    }
  },
  sortable: true,
}
,
    {
      name: "Activo",
      selector: "activo",
      selector: (row) => row.activo,
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="actions-container">
          <button
            className="btnEditar"
            onClick={() => handleEdit(row.idPatients)}
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
            onClick={() => modalEliminar(row.idPatients)}
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

  const handleFilter = (e) => {
    const keyword = e.target.value;
    if (keyword === "") {
      setFilteredData(listaPaciente);
      return;
    } else if (verificarActivo) {
      const filteredResults = filteredData.filter((item) => {
        return item.name.toLowerCase().includes(keyword.toLowerCase());
      });
      setFilteredData(filteredResults);

    } else {

  
      const filteredResults = listaPaciente.filter((item) => {

        const fullName = item.name + " " + item.numberMothers + " " +  item.parentOrGuardianPhoneNumber;

        const keywordLower = keyword.toLowerCase();
        const fullNameLower = fullName.toLowerCase();

        return fullNameLower.includes(keywordLower);
      });

      setFilteredData(filteredResults);
    }
  };

  const handleFiltroChange = (event) => {
    if (event.target.value == 2) {
      setVerificarActivo(true);
      setFilteredData(listaPaciente);
    }

    if (event.target.value == "si") {
      setVerificarActivo(true);
      const res = listaPaciente.filter((p) => p.activo == "si");
      setFilteredData(res);
    } else if (event.target.value == "no") {
      setVerificarActivo(true);

    

      const res = listaPaciente.filter((p) => p.activo == "no");
      setFilteredData(res);
    } else {
      setVerificarActivo(false);
    }
  };

  return (
    <>
      <Headers paciente={paciente} />

      <div id="table-container" className="table-container" ref={paciente}>
        
        <div className="sex-tables">

          <div className="cont-titu-tables">
            <h1>Listado de Pacientes</h1>
          </div>

          <div className="cont-action">
            <div className="cont-crear-paciente">
              <button
                className="btn-crear-Paciente-tabla"
                onClick={modalCraePaciente}
              >
                {" "}
                Crear Paciente
              </button>
            </div>

            <div className="cont-crear-paciente">
              <label>Status</label>
              <select id="txtbuscar" onChange={handleFiltroChange}>
                <option value="2">Todos</option>
                <option value="si">Activo</option>
                <option value="no">Inactivos</option>
              </select>
            
            </div>

            <div className="cont-crear-paciente">
            <label>Paciente</label>
              <input
                id="txtbuscar"
                placeholder="Nombre"
                onChange={handleFilter}
                autoComplete="off"
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={ 
                verificarActivo || filteredData.length > 0 ? filteredData  : listaPaciente             
            }
            pagination
          />
        </div>
      </div>
 
      <div className="modal-paciente-editar" ref={modalEditar}>
        <form onSubmit={handleEditar} className="contenedor-cita">
          <div className="cont-titulo-form">
            <h1>Editar Paciente </h1>
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
                  value={name}
                  id="validationServer01"
                  onChange={(e) => handleNameChange(e.target.value)}
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
                  value={sex}
                  onChange={(e) => handleSexChange(e.target.value)}
                >
                  <option defaultValue>seleccione una opción</option>
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
                  value={parents_name}
                  id="validationServer02"
                  onChange={(e) => handleParents_NameChange(e.target.value)}
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
                  value={parent_or_guardian_phone_number}
                  id="validationServer02"
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
                  value={number_Mothers}
                  id="validationServer02"
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
                  value={date_of_birth}
                  id="validationServer02"
                  required
                  onChange={handledate_of_birthChange}
                />
              </div>

              {edadEditar ? (
                <div className="col">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Edad
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={edadEditar}
                    id="validationServer02"
                    readOnly
                  />
                </div>
              ) : (
                <div className="col">
                  <label htmlFor="validationServer02" className="labelPaciente">
                    Edad
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={calculateAge()}
                    id="validationServer02"
                    readOnly
                  />
                </div>
              )}

              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Centro de Estudios
                </label>
                <input
                  type="text"
                  className="form-control "
                  value={educational_institution}
                  id="validationServer02"
                  required
                  onChange={(e) =>
                    handleducational_institutionChange(e.target.value)
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
                  value={course}
                  id="validationServer02"
                  required
                  onChange={(e) => handleCurso(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Recomendaciones{" "}
                </label>
                <input
                  type="text"
                  className="form-control "
                  value={recommendations}
                  id="validationServer02"
                  required
                  onChange={(e) => handlerecommendationsChange(e.target.value)}
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
                  value={who_refers}
                  id="validationServer02"
                  required
                  onChange={(e) => handlewho_refersChange(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Configuración familiar
                </label>
                <input
                  type="text"
                  className="form-control "
                  value={family_settings}
                  id="validationServer02"
                  required
                  onChange={(e) => handlefamily_settingsChange(e.target.value)}
                />
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Terapias o servicio{" "}
                </label>
                <input
                  type="text"
                  className="form-control "
                  value={therapies_or_service_you_will_receive_at_the_center}
                  id="validationServer02"
                  required
                  onChange={(e) =>
                    handletherapies_or_service_you_will_receive_at_the_centerChange(
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
                  value={diagnosis}
                  id="validationServer02"
                  required
                  onChange={(e) => handlediagnosisChange(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Condición médica específica{" "}
                </label>
                <input
                  type="text"
                  className="form-control "
                  value={specific_medical_condition}
                  id="validationServer02"
                  required
                  onChange={(e) =>
                    handlespecific_medical_conditionChange(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="validationServer02" className="labelPaciente">
                  Activo
                </label>
                <select
                  id="cboactivo"
                  className="form-control"
                  value={ac}
                  onChange={(e) => FActivo(e.target.value)}
                >
                  <option defaultValue>seleccione una opción</option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </select>
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
                  value={family_members_concerns}
                  id="validationServer02"
                  required
                  onChange={(e) =>
                    handlefamily_members_concernsChange(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="validationServer02">Otro </label>
                <textarea
                  id="txtArea"
                  rows="10"
                  cols="70"
                  value={other}
                  onChange={(e) => handleotherChange(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="footer_editar_pacient">
              <button className="btn guardar">Guardar</button>
              <button
                className="btn cancelar"
                type="button"
                onClick={CancelarPacienteEditar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
      <ModalCrearPaciente cargar={cargar} setShowModal={setShowModal} showModal={showModal}/>
      <ModalEliminarPacientes  cargar={cargar} nombre={name} idPatients={idEliminar} setShowModalEliminar={setShowModalEliminar} showModalEliminar={showModalEliminar} />

    </>
  );
}

export default ListasPacientes;
