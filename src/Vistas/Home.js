import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { useFormik } from 'formik';
import Headers from "../components/Headers/Headers"

function Home(props) {

  const {cargar, setShowModal,showModal} = props;
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const modal = useRef();
  const fecha = useRef();

  const formik = useFormik({

    initialValues:initialValues(),
    validationSchema:Yup.object({
        Name:Yup.string(),
        Sex:Yup.string(),
        ParentsName:Yup.string(),
        ParentOrGuardianPhoneNumber:Yup.string(),
        NumberMothers:Yup.string(),
        DateOfBirth:Yup.string(),
        Age:Yup.string(),
        EducationalInstitution:Yup.string(),
        Course:Yup.string(),
        WhoRefers:Yup.string(),
        FamilySettings:Yup.string(),
        TherapiesOrServiceYouWillReceiveAtTheCenter:Yup.string(),
        Diagnosis:Yup.string(),
        Recommendations:Yup.string(),
        FamilyMembersConcerns:Yup.string(),
        SpecificMedicalCondition:Yup.string(),
        Other:Yup.string(),
        Activo:Yup.boolean(),
    }),
    onSubmit: async (formValue) => {

      try {
        formValue.DateOfBirth = inputValue;
        formValue.Age = calculateAge();
   

        if(formValue.Age == ""){
          console.log("entro")
          console.log(formValue)
          return;
        }

        const activo = formValue.Activo.trim() === "true";
        formValue.Activo = activo;
        
        
        const res = await axios.post("https://jdeleon-001-site1.btempurl.com/api/Clinica/GuardarPaciente",formValue);
        VaciarForm();

         const ale = await swal({
           title: "Correcto",
           text: "Cambio guardado ",
           icon: "success",
         });
      } catch (error) {
        setError(error.response.data)
      }

    },
  });



  if(showModal){
    modal.current.classList.add("active_modal_crear_paciente")
}

  function closeModal() {
    modal.current.classList.remove("active_modal_crear_paciente");
    setShowModal(false)
    VaciarForm()
  }

  function calculateAge(edad){
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

  function initialValues (){
    return{
        Name:"",
        Sex:"",
        ParentsName:"",
        ParentOrGuardianPhoneNumber:"",
        NumberMothers:"",
        DateOfBirth:"",
        Age:19.45,
        EducationalInstitution:"",
        Course:"",
        WhoRefers:"",
        FamilySettings:"",
        TherapiesOrServiceYouWillReceiveAtTheCenter:"",
        Diagnosis:"",
        Recommendations:"",
        FamilyMembersConcerns:"",
        SpecificMedicalCondition:"",
        Other:"",
        Activo:"",
    };
  }

  function  VaciarForm() {
    formik.handleReset()
  }

  const handleDateChange = (e) => {

    let fecha = e.target.value;
    let yearPattern = /^(?!0\d{3})\d{4}-\d{1,2}-\d{1,2}$/;
    let inputElement = e.target;
  
    if (!yearPattern.test(fecha)) {
      inputElement.style.backgroundColor = '#ec7c96';
      setInputValue("")
      return;
    }
  
    let dateObject = new Date(fecha);
    if (isNaN(dateObject.getTime())) {
      inputElement.style.backgroundColor = '#ec7c96';
      setInputValue("")

    } else {
      setInputValue(e.target.value)
      inputElement.style.backgroundColor = 'white';
    }

  };
  

  return (

    <>
    <Headers/>
     
      <div className="cont_modal_home" ref={modal}>
        <form  onSubmit={formik.handleSubmit} className="form_modal_crear_paciente" id="home_modal">
 
          <div className="cont-titulo-form_crear_paciente">
            <h1>Pacientes de nuevo ingreso </h1>
          </div>

          <div className="box_crear_paciente">
              <div>
                <label htmlFor="validationServer01" className="labelPaciente">
                  Nombre
                </label>
                <input
                  type="text"
                  id="validationServer01"
                  onChange={formik.handleChange}
                  required
                  name="Name"
                  value={formik.values.Name}
                />
              </div>
              
              <div>
                <label htmlFor="validationServer01">
                  Sexo
                </label>
                <select
                  required
                  onChange={formik.handleChange}
                  name="Sex"
                  value={formik.values.Sex}
                >
                  <option value="">seleccione una opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenina">Femenino</option>
                </select>
              </div>

              <div>
                <label htmlFor="validationServer02">
                  Nombre De Los Padres{" "}
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  onChange={formik.handleChange}
                  required
                  name="ParentsName"
                  value={formik.values.ParentsName}
                />
              </div>
           
        
              <div>
                <label htmlFor="validationServer02" >
                  Teléfono del padre
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  onChange={formik.handleChange}
                  name="ParentOrGuardianPhoneNumber"
                  value={formik.values.ParentOrGuardianPhoneNumber}

                />
              </div>
              <div>
                <label htmlFor="validationServer02">
                  Teléfono de la madre
                </label>
                <input
                  type="text"
                
                  id="validationServer02"
                  onChange={formik.handleChange}
                  name="NumberMothers"
                  value={formik.values.NumberMothers}
                />
              </div>

           
              <div>
                <label htmlFor="validationServer02">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  id="validationServer02"
                  required
                  onChange={handleDateChange }
                  name="DateOfBirth"
                  ref={fecha}
                />
              </div>

              <div>
                <label htmlFor="validationServer02">
                  Edad
                </label>
                <input
                  type="number"
                  id="validationServer02"
                  required
                  readOnly
                  name="Age"
                  value={calculateAge()}
                />
              </div>
            
              <div>
                <label htmlFor="validationServer02" >
                  Centro de Estudios
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  required
                  onChange={formik.handleChange}
                  name="EducationalInstitution"
                  value={formik.values.EducationalInstitution}
                />
              </div>

              <div>
                <label htmlFor="validationServer02">
                  Curso
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  required
                  onChange={formik.handleChange}
                  name="Course"
                  value={formik.values.Course}
                />
              </div>


             
              <div>
                <label htmlFor="validationServer02">
                  Recomendaciones{" "}
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  required
                  onChange={formik.handleChange}
                  name="Recommendations"
                  value={formik.values.Recommendations}
                />
              </div>
          

            
              <div>
                <label htmlFor="validationServer02" >
                  Quien refiere
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  required
                  onChange={formik.handleChange}
                  name="WhoRefers"
                  value={formik.values.WhoRefers}
                />
              </div>
              <div>
                <label htmlFor="validationServer02">
                  Configuración familiar
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  required
                  onChange={formik.handleChange}
                  name="FamilySettings"
                  value={formik.values.FamilySettings}

                />
              </div>

              <div>
                <label htmlFor="validationServer02" >
                  Terapias o servicio{" "}
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  required
                  onChange={formik.handleChange}
                  name="TherapiesOrServiceYouWillReceiveAtTheCenter"
                  value={formik.values.TherapiesOrServiceYouWillReceiveAtTheCenter}
                />
              </div>
              <div>
                <label htmlFor="validationServer02">
                  Diagnóstico{" "}
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  required
                  onChange={formik.handleChange}
                  name="Diagnosis"
                  value={formik.values.Diagnosis}
                />
              </div>

              <div>
                <label htmlFor="validationServer02">
                  Condición médica específica{" "}
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  required
                  onChange={formik.handleChange}
                  name="SpecificMedicalCondition"
                  value={formik.values.SpecificMedicalCondition}
                />
              </div>
          

            <div className="row">
              <div className="col">
                <label htmlFor="validationServer02" >
                  Preocupación de los familiares
                </label>
                <input
                  type="text"
                  id="validationServer02"
                  required
                  onChange={formik.handleChange}
                  name="FamilyMembersConcerns"
                  value={formik.values.FamilyMembersConcerns}
                />
              </div>
            </div>
            
              <div>
                <label>Activo</label>
              <select name="Activo"  required value={formik.values.Activo} onChange={formik.handleChange} >
                  <option value="">seleccione una opción</option>
                  <option value="true">Si</option>
                  <option value="false">No</option>
                </select>
              </div>      
{/* 
            */}
            {error  ?
              <div className="cont_error">
                  <p>{error}</p>
              </div>
              : "" }

          </div>

              <div >
                <label htmlFor="validationServer02">Otro </label>
                <textarea
                  id="txtArea"
                  rows="10"
                  cols="70"
                  onChange={formik.handleChange}
                  name="Other"
                  value={formik.values.Other}
                  className="textArea"
                ></textarea>
              </div>

            <div className="footer_crear_paciente">
              <button className="btn guardar">Guardar</button>
              <button  className="btn cancelar" type="button" onClick={closeModal}> Cancelar    </button>
            </div>
        </form>
      </div>


    </>
  );
}

export default Home;




