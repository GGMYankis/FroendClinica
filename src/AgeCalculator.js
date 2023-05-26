import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net';
import 'datatables.net-dt';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import './Carrito.css';
import logo from "./imagenes/New_iPhone_7_Plus_128GB_Red_Edition.jpg";
import logso from "./imagenes/tv-curvas-1.jpg";
import iphone from "./imagenes/Iphone-12-Pro-Max.jpg";
import axios from 'axios';
import DataTable from 'react-data-table-component';


function AgeCalculator() {

  const modalCrear = useRef()
  const modalEditar = useRef()
  const [listaPaciente, setlistaPaciente] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [resPacientes, setResPacientes] = useState([]);
  const [active, setActive] = useState(null);
  const [verificarActivo, setVerificarActivo] = useState(false);
  const [filtro, setFiltro] = useState('2');
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [parents_name, setParents_Name] = useState('');
  const [parent_or_guardian_phone_number, setParent_or_guardian_phone_number] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [age, setAge] = useState();
  const [educational_institution, setEducational_institution] = useState('');
  const [course, setCourse] = useState('');
  const [who_refers, setWho_refers] = useState('');
  const [family_settings, setFamily_settings] = useState('');
  const [therapies_or_service_you_will_receive_at_the_center, setTherapies_or_service_you_will_receive_at_the_center] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [family_members_concerns, setFamily_members_concerns] = useState('');
  const [specific_medical_condition, setSpecific_medical_condition] = useState('');
  const [other, setOther] = useState('');
  const [number_Mothers, setNumber_Mothers] = useState('');
  const [ac, setAc] = useState([])

  useEffect(() => {

    cargar()
  }, []);

  const cargar = async => {

    axios.get('http://yankisggm-001-site1.ctempurl.com/api/Clinica/Lista')
      .then(res => {

        res.data.map(item => {


          if (item.activo == true) {

            setlistaPaciente(item.activo = 'si')

          }
          if (item.activo == false) {
            setlistaPaciente(item.activo = 'no')

          }
          setlistaPaciente(res.data)

        })

      });
  }

  const handleEdit = (e) => {
    modalEditar.current.classList.add('active')
    const IdEditarPaciente = listaPaciente.filter(item => item.idPatients == e)

    IdEditarPaciente.map(item => {
      if (item.activo == 'si') {

        setAc(1)

      }
      if (item.activo == 'no') {
        setAc(0)

      }

    })


    IdEditarPaciente.map(item => [
      setName(item.name),
      setSex(item.sex),
      setParents_Name(item.parentsName),
      setParent_or_guardian_phone_number(item.parentOrGuardianPhoneNumber),
      setDate_of_birth(item.dateOfBirth.substring('', 10)),
      setAge(item.age),
      setEducational_institution(item.educationalInstitution),
      setWho_refers(item.whoRefers),
      setFamily_settings(item.familySettings),
      setTherapies_or_service_you_will_receive_at_the_center(item.therapiesOrServiceYouWillReceiveAtTheCenter),
      setDiagnosis(item.diagnosis),
      setRecommendations(item.recommendations),
      setFamily_members_concerns(item.familyMembersConcerns),
      setSpecific_medical_condition(item.specificMedicalCondition),
      setOther(item.other),
      setNumber_Mothers(item.numberMothers),
      setCourse(item.course),
      setSex(item.sex),

    ])
  };


  const handleDelete = (id) => {
    console.log('Eliminar paciente con ID:', id);
  };

  const columns = [

    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Sexo',
      selector: 'sex',
      sortable: true,
    },
    {
      name: 'Nombre De Los Padres',
      selector: 'parentsName',
      sortable: true,
    },
    {
      name: 'Teléfono de los padres o tutores',
      selector: 'parentOrGuardianPhoneNumber',
      sortable: true,
    },
    {
      name: 'Fecha de nacimiento',
      selector: 'dateOfBirth',
      sortable: true,
    },
    {
      name: 'Edad',
      selector: 'age',
      sortable: true,
    },
    {
      name: 'Activo',
      selector: 'activo',
      sortable: true,
    },
    {
      cell: row => (
        <div className='actions-container'>
          <button className='btnEditar' onClick={() => handleEdit(row.idPatients)}>Editar</button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: row => (
        <div className='actions-container'>
          <button className='btnEliminar' onClick={() => handleDelete(row.idPatients)}>Eliminar</button>
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
    }

    else if (verificarActivo) {
      const filteredResults = filteredData.filter(item => {
        return item.name.toLowerCase().includes(keyword.toLowerCase());

      });
      setFilteredData(filteredResults);
    } else {
        const filteredResults = listaPaciente.filter(item => {
        return item.name.toLowerCase().includes(keyword.toLowerCase());

      });
      setFilteredData(filteredResults);
    }
  };



  const handleFiltroChange = (event) => {

    if (event.target.value == 2) {
      setVerificarActivo(true)
      setFilteredData(listaPaciente)
    }

    if (event.target.value == "si") {
      setVerificarActivo(true)
      const res = listaPaciente.filter(p => p.activo == "si")
      setFilteredData(res)
    }

    else if (event.target.value == "no") {
      setVerificarActivo(true)

      const filteredResults = listaPaciente.filter(item => {

        const res = item.activo == "no"
        setFilteredData(res)
      });

      const res = listaPaciente.filter(p => p.activo == "no")
      setFilteredData(res)
    } else {
      setVerificarActivo(false)
    }
  };



  return (

    <div >

      <div id='table-container' className='table-container'>
        <div className='sex-tables'>

          <div className='cont-titu-tables'>
            <h1>Listado de Pacientes</h1>
          </div>


          <div className='cont-action'>
            <div className='cont-crear-paciente'  >
              <button className="btn-crear-Paciente-tabla">Crear Paciente</button>
            </div>

            <div className='cont-crear-paciente'  >
              <label>Status</label>
              <select id='txtbuscar' onChange={handleFiltroChange}>
                <option value="2">Todos</option>
                <option value="si">Activo</option>
                <option value="no">Inactivos</option>
              </select>
              <label>Paciente</label>
              <input id='txtbuscar' placeholder='Nombre' onChange={handleFilter} />
            </div>
          </div>
          <hr></hr>

          <DataTable
            columns={columns}
            data={verificarActivo || filteredData.length > 0 ? filteredData : listaPaciente}
            pagination
          />

        </div>
      </div>


      <div className='modal-paciente-editar' ref={modalEditar} >
        <form className='contenedor-cita'>

          <div className='cont-titulo-form'>
            <h1>Editar Paciente </h1>
          </div>


          <div className='paddd'>

            <div className="row" id='primeraFila'>
              <div className="col">
                <label htmlFor="validationServer01" className='labelPaciente'>Nombre</label>
                <input type="text" className="form-control " value={name} id="validationServer01" required />
              </div>


              <div className="col">
                <label htmlFor="validationServer01" className='labelPaciente'>Sexo</label>
                <select className="form-control" required value={sex} >
                  <option defaultValue >seleccione una opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenina">Femenino</option>
                </select>
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Nombre De Los Padres </label>
                <input type="text" className="form-control " value={parents_name} id="validationServer02" required />
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono del padre</label>
                <input type="text" className="form-control " value={parent_or_guardian_phone_number} id="validationServer02" required />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono de la madre</label>
                <input type="text" className="form-control " value={number_Mothers} id="validationServer02" required />
              </div>
            </div>

            <div className='row' id='segundaFila'>
              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Fecha de nacimiento</label>
                <input type="date" className="form-control" value={date_of_birth} id="validationServer02" required />
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Edad</label>
                <input type="number" className="form-control" id="validationServer02" />
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Centro de Estudios</label>
                <input type="text" className="form-control " value={educational_institution} id="validationServer02" required />
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Curso</label>
                <input type="text" className="form-control " value={course} id="validationServer02" required />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Recomendaciones </label>
                <input type="text" className="form-control " value={recommendations} id="validationServer02" required />
              </div>
            </div>

            <div className='row' id='terceraFila'>
              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Quien refiere</label>
                <input type="text" className="form-control " value={who_refers} id="validationServer02" required />

              </div>
              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Configuración familiar</label>
                <input type="text" className="form-control " value={family_settings} id="validationServer02" required />
              </div>

              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Terapias o servicio  </label>
                <input type="text" className="form-control " value={therapies_or_service_you_will_receive_at_the_center} id="validationServer02" />

              </div>
              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Diagnóstico </label>
                <input type="text" className="form-control" value={diagnosis} id="validationServer02" required />
              </div>
              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Condición médica específica </label>
                <input type="text" className="form-control " value={specific_medical_condition} id="validationServer02" required />
              </div>
            </div>
            <div className='row'>
              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Activo</label>
                <select id="cboactivo" className="form-control" value={ac}  >
                  <option defaultValue>seleccione una opción</option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
            <div className='row'>
              <div className="col">
                <label htmlFor="validationServer02" className='labelPaciente'>Preocupación de los familiares</label>
                <input type="text" className="form-control " value={family_members_concerns} id="validationServer02" required />
              </div>
            </div>
            <div className='row'>
              <div className="col">
                <label htmlFor="validationServer02">Otro </label>
                <textarea id="txtArea" rows="10" cols="70" value={other} ></textarea>
              </div>
            </div>
            <div className="col" id='cont-btn-admin'>
              <button className="btn-cita">Guardar</button>
              <button className="btn-cita" type='button'>Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </div >

  );
}

export default AgeCalculator;

