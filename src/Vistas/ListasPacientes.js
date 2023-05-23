import Cookies from 'universal-cookie';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import logo from "../imagenes/IMG-20230221-WA0009.png"
import { FaBars } from 'react-icons/fa'
import { FaUser, FaUsers, FaTrash, FaEdit } from 'react-icons/fa'
import { FaCaretDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link, Redirect } from 'react-router-dom'
import $ from 'jquery';
import { findDOMNode } from 'react-dom'
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import Headers from '../Headers'
import { DeleteToken, getToken, initAxiosInterceptors, setUsuarioM, obtenerUser, getNombreUsuario, getUsuarioCompleto } from '../auth-helpers'
import { set } from 'date-fns';
import { Label } from 'reactstrap';


function ListasPacientes({usuarioLogin}) {

    const [ac, setAc] = useState([])

    const modalCrear = useRef()
    const modalEditar = useRef()
    const alertEliminar = useRef()
    const [idPaciente, setIdPaciente] = useState()
    const [idPacienteEliminar, setIdPacienteEliminar] = useState()
    const navigation = useNavigate();
    const [listaPaciente, setlistaPaciente] = useState([])
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
    const [idEditar, setIdEditar] = useState([]);
    const [activos, setActivo] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState("");
    const [number_Mothers, setNumber_Mothers] = useState('');
    const [NumPadre, setNumPadre] = useState("");
    const [NumMadre, setNumMadre] = useState("");
    const FormularioTherapy = document.getElementById("txtCrearPaciente");
    const [filtroNombre, setFiltroNombre] = useState('');
    const [bsActivo, setBsActivo] = useState(null);
    const [active, setActive] = useState(null);

    let rol = getUsuarioCompleto()
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


    obtenerUser()

    const handleNameChange = (value) => {

        setName(value);
    }

    const FActivo = (value) => {

        setAc(value)

        if (value == 1) {
            value = true
            setActivo(value);

        } else {
            value = false
            setActivo(value);

        }

    }

    const handleSexChange = (value) => {
        setSex(value);
    }

    const handleParents_NameChange = (value) => {
        setParents_Name(value);
    }

    const handleparent_or_guardian_phone_numberChange = (value) => {


        const regex = /^[0-9\b]+$/;


        if (value.target.value === "" || regex.test(value.target.value)) {
            setNumPadre(value.target.value);
        }
        setParent_or_guardian_phone_number(value.target.value);
    }



    const handledate_of_birthChange = (event) => {

        setInputValue(event.target.value);
        setDate_of_birth(event.target.value);

    }


    function calculateAge() {
        const currentDate = new Date();
        const birthDate = new Date(inputValue);
        const differenceMs = currentDate - birthDate;
        const differenceYears = parseFloat((differenceMs / (1000 * 60 * 60 * 24 * 365)).toFixed(2));
        return differenceYears.toString();
    }



    const handleducational_institutionChange = (value) => {
        setEducational_institution(value);
    }

    const handleCurso = (value) => {
        setCourse(value);
    }

    const handlemothers_number = (value) => {


        const regex = /^[0-9\b]+$/;


        if (value.target.value === "" || regex.test(value.target.value)) {
            setNumMadre(value.target.value);
        }

        setNumber_Mothers(value.target.value);
    }




    const handlewho_refersChange = (value) => {
        setWho_refers(value);
    }
    const handlefamily_settingsChange = (value) => {
        setFamily_settings(value);
    }
    const handletherapies_or_service_you_will_receive_at_the_centerChange = (value) => {
        setTherapies_or_service_you_will_receive_at_the_center(value);
    }
    const handlediagnosisChange = (value) => {
        setDiagnosis(value);
    }
    const handlerecommendationsChange = (value) => {
        setRecommendations(value);
    }
    const handlefamily_members_concernsChange = (value) => {
        setFamily_members_concerns(value);
    }
    const handlespecific_medical_conditionChange = (value) => {
        setSpecific_medical_condition(value);
    }
    const handleotherChange = (value) => {
        setOther(value);
    }

    const data = ({
        Name: name,
        Sex: sex,
        ParentsName: parents_name,
        ParentOrGuardianPhoneNumber: parent_or_guardian_phone_number,
        DateOfBirth: date_of_birth,
        Age: calculateAge(),
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
        Activo:true
    })

    const handleGuardar = (e) => {

        e.preventDefault()

        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/GuardarPaciente';
        axios.post(url, data).then((result) => {

            const probar = async () => {
                modalCrear.current.classList.remove('active')
                cargar()
                const ale = await swal({

                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });
            }

            if (result) {
                probar()
            }
            FormularioTherapy.reset()


        }).catch((error) => {
            console.log(error)
        })


    }


    const modalCraePaciente = () => {

        modalCrear.current.classList.add('active')

    }




    const dataEditar = ({

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
        Activo: activos
    })
    const FormularioEditar = document.getElementById("FormularioEditar");

    const handleEditar = async (e) => {
        e.preventDefault()
        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/EditarPaciente';
        axios.put(url, dataEditar).then((result) => {

            const probar = async () => {
                modalEditar.current.classList.remove('active')
                cargar()
                const ale = await swal({
                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });
            }
            if (result) {
                probar()
            }

            FormularioEditar.reset()
        }).catch((error) => {
            console.log(error)
        })
    }






    const modaleditar = (e) => {

        modalEditar.current.classList.add('active')
        setIdPaciente(e)
        const IdEditarPaciente = listaPaciente.filter(item => item.idPatients == e)
        console.log(IdEditarPaciente)

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
    }


    const handleEliminar = () => {

        const idPa = { IdPatients: idPacienteEliminar }

        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/EliminarPaciente';
        axios.post(url, idPa).then((result) => {

            const probar = async () => {
                alertEliminar.current.classList.remove('activeEli')
                cargar()
                const ale = await swal({

                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });

            }

            if (result) {
                probar()
            }



        }).catch((error) => {
            console.log(error)
        })
    }


    const modalEliminar = (e) => {
        const IdEliminarPaciente = listaPaciente.filter(item => item.idPatients == e)

        IdEliminarPaciente.map(item => {
            setName(item.name)

        })
        alertEliminar.current.classList.add('activeEli')
        setIdPacienteEliminar(e)
    }

    const modalCerrarEliminar = () => {

        alertEliminar.current.classList.remove('activeEli')
    }

    const CancelarPaciente = () => {
        modalCrear.current.classList.remove('active')
        FormularioTherapy.reset()
    }

    const CancelarPacienteEditar = () => {
        modalEditar.current.classList.remove('active')
    }

    const logout = () => {
        DeleteToken()
        navigation("/login")
    }


    const myElement = useRef(null);



    const handleClickOtro = () => {
        myElement.current.classList.toggle('mi-clase-css');
    };

    const handleBuscarNombre = (event) => {
        setFiltroNombre(event.target.value);
    }
    //  .filter(item => item.activo || item.activo == bsActivo)

    const filtrarActivo = (event) => {

        if (event == "2") {
            setActive(2)
        }
        setBsActivo(event)


    }

    return (

        <div>

            <header className='encabezado'>
                <div>
                    <nav>
                        <input type="checkbox" id="check" />
                        <label htmlFor="check" className="checkbtn">
                            <FaBars id='bar' />
                        </label>
                  
                        <div className='cont-menu'>
                            <ul>
                                <li>
                                    <Link className='letras-menu' to="/admin">Paciente de ingreso</Link>
                                </li>
                                <li>
                                    <Link className='letras-menu' to="/evaluacion">Citas</Link>
                                </li>
                                <li>
                                    <Link className='letras-menu' to="/terapia">Crear terapia</Link>
                                </li>

                                {rol == 1 ?
                                    <span>
                                        <li>
                                            <Link className='letras-menu' to="/listasPacientes">Listado de Pacientes</Link>
                                        </li>

                                        <li>
                                            <Link className='letras-menu' to="/listasTerapias">Listado de Terapias</Link>
                                        </li>
                                    </span>
                                    :
                                    ""
                                }
                                <li>
                                    <Link className='letras-menu' to="/asistencias">Asistencia</Link>
                                </li>
                                <li>
                                    <Link className='letras-menu' to="/calendario">Calendario</Link>
                                </li>
                                <li>
                                    <Link className='letras-menu' to="/TerapiaTerapeuta">Asignación</Link>
                                </li>
                                <li>
                                    <Link className='letras-menu' to="/Users">Usuario</Link>
                                </li>

                                {rol == 1 ?
                                    <span>
                                        <li>
                                            <Link className='letras-menu' to="/gastos">Registro de gastos</Link>
                                        </li>
                                        <li>
                                            <Link className='letras-menu' to="/VerGanancias">Reporte</Link>
                                        </li>
                                        <li>
                                            <Link className='letras-menu' to="/AbonoTerapias">AbonoTerapias</Link>
                                        </li>
                                        <li>
                                            <Link className='letras-menu' to="/PagoTerapeutas">PagoTerapeutas</Link>
                                        </li>
                                    </span>
                                    :
                                    ""
                                }
                                <li>
                                    <a className='letras-menu' onClick={logout}>Cerra Sesión</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className='cont-logo-header'>
                    <img className='img-admin-logo' src={logo} />
                    <span className='ver'><span className='gg'>é</span>nfasis</span>
                </div>

                <div className='contenedor-botones'>
                    <div className='cont-btn-headers'>
                        <div className='probarUs'>
                            <Link className='Link' to="/perfilAdmin">{obtenerUser()}</Link>
                        </div>
                    </div>
                    <div className='cont-nombre-usuario'>
                        <p className='nombreUsuario'>{getNombreUsuario()}</p>
                    </div>
                </div>
            </header>



            <div id='table-container' ref={myElement} className='table-container'>
                <div className='sex-tables'>


                    <div className='cont-titu-tables'>
                        <h1>Listado de Pacientes</h1>
                    </div>

                    <div className='cont-action'>
                        <div className='cont-crear-paciente'  >
                            <button className="btn-crear-Paciente-tabla" onClick={modalCraePaciente}>Crear Paciente</button>
                        </div>

                        <div className='cont-crear-paciente'  >
                            <label>Status</label>
                            <select id='txtbuscar' onChange={e => filtrarActivo(e.target.value)}>
                                <option value="2">Todos</option>
                                <option value="si">Activo</option>
                                <option value="no">Inactivos</option>
                            </select>
                            <label>Paciente</label>
                            <input id='txtbuscar' placeholder='Nombre' onChange={handleBuscarNombre} value={filtroNombre} />
                        </div>
                    </div>

                    <hr></hr>
                    <div className='sub-2'>
                        <table className='table'>

                            <thead>
                                <tr>
                                    <th scope="col">Nombre </th>
                                    <th scope="col">Sexo</th>
                                    <th scope="col">Nombre De Los Padres</th>
                                    <th scope="col">Teléfono de los padres o tutores </th>
                                    <th scope="col">Fecha de nacimiento</th>
                                    <th scope="col">Edad</th>
                                    <th scope="col">Activo</th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {bsActivo ?
                                    listaPaciente.filter(item => item.name.toLowerCase().includes(filtroNombre.toLowerCase()))

                                        .filter(item => item.activo == bsActivo)

                                        .map(item => (
                                            <tr key={item.idPatients}>
                                                <td data-label="Nombre"  >{item.name}</td>
                                                <td data-label="Sexo">{item.sex}</td>
                                                <td data-label="Nombre De Los Padres">{item.parentsName}</td>
                                                <td data-label="Teléfono de los padres o tutores">{item.parentOrGuardianPhoneNumber}</td>
                                                <td data-label="Fecha de nacimiento">{item.dateOfBirth.substring('', 10)}</td>
                                                <td data-label="edad">{item.age}</td>
                                                <td data-label="activo">{item.activo}</td>

                                                <td className='tr-btn'>
                                                    <button className='btn ' type='button' value={item.idPatients} onClick={e => modaleditar(e.target.value)}>Editar</button>
                                                    <button className='btn eliminar' type='button' value={item.idPatients} onClick={e => modalEliminar(e.target.value)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                    :
                                    listaPaciente.filter(item => item.name.toLowerCase().includes(filtroNombre.toLowerCase()))
                                        .map(item => (
                                            <tr key={item.idPatients}>
                                                <td data-label="Nombre"  >{item.name}</td>
                                                <td data-label="Sexo">{item.sex}</td>
                                                <td data-label="Nombre De Los Padres">{item.parentsName}</td>
                                                <td data-label="Teléfono de los padres o tutores">{item.parentOrGuardianPhoneNumber}</td>
                                                <td data-label="Fecha de nacimiento">{item.dateOfBirth.substring('', 10)}</td>
                                                <td data-label="edad">{item.age}</td>
                                                <td data-label="activo">{item.activo}</td>

                                                <td className='tr-btn'>
                                                    <button className='btn ' type='button' value={item.idPatients} onClick={e => modaleditar(e.target.value)}>Editar</button>
                                                    <button className='btn eliminar' type='button' value={item.idPatients} onClick={e => modalEliminar(e.target.value)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                }
                                {active ?

                                    listaPaciente.filter(item => item.name.toLowerCase().includes(filtroNombre.toLowerCase()))
                                        .map(item => (
                                            <tr key={item.idPatients}>
                                                <td data-label="Nombre"  >{item.name}</td>
                                                <td data-label="Sexo">{item.sex}</td>
                                                <td data-label="Nombre De Los Padres">{item.parentsName}</td>
                                                <td data-label="Teléfono de los padres o tutores">{item.parentOrGuardianPhoneNumber}</td>
                                                <td data-label="Fecha de nacimiento">{item.dateOfBirth.substring('', 10)}</td>
                                                <td data-label="edad">{item.age}</td>
                                                <td data-label="activo">{item.activo}</td>

                                                <td className='tr-btn'>
                                                    <button className='btn ' type='button' value={item.idPatients} onClick={e => modaleditar(e.target.value)}>Editar</button>
                                                    <button className='btn eliminar' type='button' value={item.idPatients} onClick={e => modalEliminar(e.target.value)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                    : ""
                                }

                            </tbody>
                        </table>
                    </div>
                </div>


            </div>

            <div className='modal-paciente-editar' ref={modalEditar}>
                <form onSubmit={handleEditar} className='contenedor-cita'>

                    <div className='cont-titulo-form'>
                        <h1>Editar Paciente </h1>
                    </div>


                    <div className='paddd'>

                        <div className="row" id='primeraFila'>
                            <div className="col">
                                <label htmlFor="validationServer01" className='labelPaciente'>Nombre</label>
                                <input type="text" className="form-control " value={name} id="validationServer01" onChange={e => handleNameChange(e.target.value)} required />
                            </div>


                            <div className="col">
                                <label htmlFor="validationServer01" className='labelPaciente'>Sexo</label>
                                <select className="form-control" required value={sex} onChange={e => handleSexChange(e.target.value)}>
                                    <option defaultValue >seleccione una opción</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenina">Femenino</option>
                                </select>
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Nombre De Los Padres </label>
                                <input type="text" className="form-control " value={parents_name} id="validationServer02" onChange={e => handleParents_NameChange(e.target.value)} required />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono del padre</label>
                                <input type="text" className="form-control " value={parent_or_guardian_phone_number} id="validationServer02" required onChange={e => handleparent_or_guardian_phone_numberChange(e.target.value)} />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono de la madre</label>
                                <input type="text" className="form-control " value={number_Mothers} id="validationServer02" required onChange={e => handlemothers_number(e.target.value)} />
                            </div>
                        </div>

                        <div className='row' id='segundaFila'>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Fecha de nacimiento</label>
                                <input type="date" className="form-control" value={date_of_birth} id="validationServer02" required onChange={handledate_of_birthChange} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Edad</label>
                                <input type="number" className="form-control" value={calculateAge()} id="validationServer02" />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Centro de Estudios</label>
                                <input type="text" className="form-control " value={educational_institution} id="validationServer02" required onChange={e => handleducational_institutionChange(e.target.value)} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Curso</label>
                                <input type="text" className="form-control " value={course} id="validationServer02" required onChange={e => handleCurso(e.target.value)} />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Recomendaciones </label>
                                <input type="text" className="form-control " value={recommendations} id="validationServer02" required onChange={e => handlerecommendationsChange(e.target.value)} />
                            </div>
                        </div>

                        <div className='row' id='terceraFila'>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Quien refiere</label>
                                <input type="text" className="form-control " value={who_refers} id="validationServer02" required onChange={e => handlewho_refersChange(e.target.value)} />

                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Configuración familiar</label>
                                <input type="text" className="form-control " value={family_settings} id="validationServer02" required onChange={e => handlefamily_settingsChange(e.target.value)} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Terapias o servicio  </label>
                                <input type="text" className="form-control " value={therapies_or_service_you_will_receive_at_the_center} id="validationServer02" required onChange={e => handletherapies_or_service_you_will_receive_at_the_centerChange(e.target.value)} />

                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Diagnóstico </label>
                                <input type="text" className="form-control" value={diagnosis} id="validationServer02" required onChange={e => handlediagnosisChange(e.target.value)} />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Condición médica específica </label>
                                <input type="text" className="form-control " value={specific_medical_condition} id="validationServer02" required onChange={e => handlespecific_medical_conditionChange(e.target.value)} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Activo</label>
                                <select id="cboactivo" className="form-control" value={ac} onChange={e => FActivo(e.target.value)} >
                                    <option defaultValue>seleccione una opción</option>
                                    <option value="1">Si</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Preocupación de los familiares</label>
                                <input type="text" className="form-control " value={family_members_concerns} id="validationServer02" required onChange={e => handlefamily_members_concernsChange(e.target.value)} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col">
                                <label htmlFor="validationServer02">Otro </label>
                                <textarea id="txtArea" rows="10" cols="70" value={other} onChange={e => handleotherChange(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="col" id='cont-btn-admin'>
                            <button className="btn-cita">Guardar</button>
                            <button className="btn-cita" type='button' onClick={CancelarPacienteEditar}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='modal-paciente' ref={modalCrear}>
                <form onSubmit={handleGuardar} className='contenedor-cita' id="txtCrearPaciente">

                    <div className='cont-titulo-form'>
                        <h1>Pacientes de nuevo ingreso </h1>
                    </div>

                    <div className='paddd'>
                        <div className="row" id='primeraFila'>
                            <div className="col">
                                <label htmlFor="validationServer01" className='labelPaciente'>Nombre</label>
                                <input type="text" className="form-control " id="validationServer01" onChange={e => handleNameChange(e.target.value)} required />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer01" className='labelPaciente'>Sexo</label>
                                <select className="form-control" required onChange={e => handleSexChange(e.target.value)}>
                                    <option defaultValue>seleccione una opción</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenina">Femenino</option>
                                </select>
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Nombre De Los Padres </label>
                                <input type="text" className="form-control " id="validationServer02" onChange={e => handleParents_NameChange(e.target.value)} required />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono del padre</label>
                                <input type="text" className="form-control " id="validationServer02" required onChange={handleparent_or_guardian_phone_numberChange} />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono de la madre</label>
                                <input type="text" className="form-control " id="validationServer02" required onChange={handlemothers_number} />
                            </div>
                        </div>

                        <div className='row' id='segundaFila'>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Fecha de nacimiento</label>
                                <input type="date" className="form-control " id="validationServer02" required onChange={handledate_of_birthChange} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Edad</label>
                                <input type="number" className="form-control" value={calculateAge()} id="validationServer02" required />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Centro de Estudios</label>
                                <input type="text" className="form-control " id="validationServer02" required onChange={e => handleducational_institutionChange(e.target.value)} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Curso</label>
                                <input type="text" className="form-control " id="validationServer02" required onChange={e => handleCurso(e.target.value)} />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Recomendaciones </label>
                                <input type="text" className="form-control " id="validationServer02" required onChange={e => handlerecommendationsChange(e.target.value)} />

                            </div>
                        </div>

                        <div className='row' id='terceraFila'>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Quien refiere</label>
                                <input type="text" className="form-control " id="validationServer02" required onChange={e => handlewho_refersChange(e.target.value)} />

                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Configuración familiar</label>
                                <input type="text" className="form-control " id="validationServer02" required onChange={e => handlefamily_settingsChange(e.target.value)} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Terapias o servicio  </label>
                                <input type="text" className="form-control " id="validationServer02" required onChange={e => handletherapies_or_service_you_will_receive_at_the_centerChange(e.target.value)} />

                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Diagnóstico </label>
                                <input type="text" className="form-control" id="validationServer02" required onChange={e => handlediagnosisChange(e.target.value)} />

                            </div>


                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Condición médica específica </label>
                                <input type="text" className="form-control " id="validationServer02" required onChange={e => handlespecific_medical_conditionChange(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Preocupación de los familiares</label>
                                <input type="text" className="form-control " id="validationServer02" required onChange={e => handlefamily_members_concernsChange(e.target.value)} />
                            </div>

                        </div>
                        <div className='row'>

                            <div className="col">
                                <label htmlFor="validationServer02">Otro </label>
                                <textarea id="txtArea" rows="10" cols="70" onChange={e => handleotherChange(e.target.value)}></textarea>
                            </div>
                        </div>

                        <div className="col" id='cont-btn-admin'>
                            <button className="btn-cita">Guardar</button>
                            <button className="btn-cita" type='button' onClick={CancelarPaciente}>Cancelar</button>
                        </div>


                    </div>
                </form>
            </div>

            <div className="modal-usuario-eliminar" ref={alertEliminar}>
                <div className="modal-dialog-usuario" role="document">
                    <div className="modal-content-usuario">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar Paciente</h5>

                        </div>
                        <div className='sub-box-usuario'>
                            <div className="modal-body">
                                {

                                    <p>¿Deseas  eliminar el paciente:<span className='text-eliminar'> {name}</span> ?</p>
                                }
                            </div>
                            <hr></hr>
                            <div className="modal-footer">

                                <button type="button" className="btn si" data-dismiss="modal" onClick={handleEliminar}>Si</button>
                                <button type="button" className="btn no" onClick={modalCerrarEliminar} >No</button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div >
    )
}

export default ListasPacientes

