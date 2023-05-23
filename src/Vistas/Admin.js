import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "../imagenes/IMG-20230221-WA0009.png"
import { FaBars } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { FaCaretDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert';
import Headers from '../Headers'
import '../responsive.css'


const Admin = () => {

    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [parents_name, setParents_Name] = useState('');
    const [parent_or_guardian_phone_number, setParent_or_guardian_phone_number] = useState('');
    const [date_of_birth, setDate_of_birth] = useState('');
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
    const [numberMothers, setNumberMothers] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [NumPadre, setNumPadre] = useState("");
    const [NumMadre, setNumMadre] = useState("");

    const handleNameChange = (value) => {

        setName(value);
    }

    const handleSexChange = (value) => {
        setSex(value);
    }

    const handleParents_NameChange = (value) => {
        setParents_Name(value);
    }

    

    const handlemothers_number = (value) => {

        const regex = /^[0-9\b]+$/;
        if (value.target.value === "" || regex.test(value.target.value)) {
            setNumMadre(value.target.value);
        }

        setNumberMothers(value.target.value);
    }




    const handleparent_or_guardian_phone_numberChange = (value) => {

        const regex = /^[0-9\b]+$/;

        if (value.target.value === "" || regex.test(value.target.value)) {
            setNumPadre(value.target.value);
        }

        setParent_or_guardian_phone_number(value.target.value);
    }

    const handledate_of_birthChange = (event) => {
        setDate_of_birth(event);
        setInputValue(event);
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
        console.log(parents_name)
    }
    const handleCurso = (value) => {
        setCourse(value);
        console.log(course)
    }

    //
    const handlewho_refersChange = (value) => {
        setWho_refers(value);
        console.log(parents_name)
    }
    //
    const handlefamily_settingsChange = (value) => {
        setFamily_settings(value);
        console.log(parents_name)
    }
    ///
    const handletherapies_or_service_you_will_receive_at_the_centerChange = (value) => {
        setTherapies_or_service_you_will_receive_at_the_center(value);
        console.log(parents_name)
    }
    const handlediagnosisChange = (value) => {
        setDiagnosis(value);
        console.log(name)
    }
    const handlerecommendationsChange = (value) => {
        setRecommendations(value);
        console.log(name)
    }
    const handlefamily_members_concernsChange = (value) => {
        setFamily_members_concerns(value);
        console.log(name)
    }
    const handlespecific_medical_conditionChange = (value) => {
        setSpecific_medical_condition(value);
        console.log(name)
    }
    const handleotherChange = (value) => {
        setOther(value);
        console.log(name)
    }

    const data = ({

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
        TherapiesOrServiceYouWillReceiveAtTheCenter: therapies_or_service_you_will_receive_at_the_center,
        Diagnosis: diagnosis,
        Recommendations: recommendations,
        FamilyMembersConcerns: family_members_concerns,
        SpecificMedicalCondition: specific_medical_condition,
        Other: other,
        Activo:true
    })

    const FormularioAdmin = document.getElementById("FormularioAdmin");
    const handleGuardar = (e) => {

        e.preventDefault()


        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/GuardarPaciente';
        axios.post(url, data).then((result) => {
            swal({
                title: "Correcto",
                text: "Cambio guardado ",
                icon: "success",
                button: "Aceptar",

            });
            FormularioAdmin.reset()

        }).catch((error) => {
            console.log(error)
        })
    }


    return (

        <div>
            
            <Headers />

            <div className='cont-admin'>
                <form onSubmit={handleGuardar} id="FormularioAdmin" className='contenedor-admin'>

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
                                    <option >seleccione una opción</option>
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
                                <input type="text" className="form-control " id="validationServer02" value={NumPadre} required onChange={handleparent_or_guardian_phone_numberChange} />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono de la madre</label>
                                <input type="text" className="form-control " id="validationServer02" value={NumMadre} required onChange={handlemothers_number} />
                            </div>
                        </div>

                        <div className='row' id='segundaFila'>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Fecha de nacimiento</label>
                                <input type="date" className="form-control" id="validationServer02" required onChange={e => handledate_of_birthChange(e.target.value)} />
                            </div>


                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Edad</label>
                                <input type="text" className="form-control" id="validationServer02" value={calculateAge()} />

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
                                <textarea id="txtArea" onChange={e => handleotherChange(e.target.value)} rows="10" cols="70"></textarea>
                                {/*}  <input type="text" className="form-control " id="validationServer02" required onChange={e => handleotherChange(e.target.value)} /> */}
                            </div>
                        </div>
                        <div className="col" id='cont-btn-admin'>
                            <button className="btn-cita">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>


        </div >
    )
}



export default Admin

