import React from 'react'
import { useState, useEffect, useRef } from "react";
import swal from "sweetalert";
import axios from "axios";
import "./ModalTerapia.css";


function ModalTerapia(props) {

   const {cargar, showModal,setShowModal} = props;

    const [terapia, setTerapia] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [price, setPrice] = useState(0);
    const [input1Value, setInput1Value] = useState('');
    const [input2Value, setInput2Value] = useState('');
    const [porcentaje1, setPorcentaje1] = useState('');
    const [porcentaje2, setPorcentaje2] = useState('');

     const modal = useRef();


  const data2 = {
    Label: terapia,
    Value: terapia,
    Description: descripcion,
    Price: price,
    Porcentaje: porcentaje1.toString().replace("%", ""),
    PorcentajeCentro: porcentaje2.toString().replace("%", ""),
  };

  const FormularioTherapy = document.getElementById("FormularioTherapy");

  const SubmitCrear = (e) => {
    e.preventDefault();

    const url = "https://jdeleon-001-site1.btempurl.com/api/Clinica/CrearTerapia";
    axios.post(url, data2).then((res) => {
      const probar = async () => {
        modal.current.classList.remove("active_modal_terapia");
        setShowModal(false)
        cargar();
        const ale = await swal({
          title: "Correcto",
          text: "Cambio guardado ",
          icon: "success",
        });
      };

      if (res) {
        probar();
      }

      FormularioTherapy.reset();
    });
  };

        const handleInput1Change = (event) => {
            const inputValue = event.target.value;
            if (inputValue.length <= 2) {
            if (!isNaN(parseFloat(inputValue))) { 
            const porcentaje1 = parseFloat(inputValue);
            const porcentajeRestante = 100 - porcentaje1;
        
            setInput1Value(inputValue);
            setInput2Value(porcentajeRestante + '%');
            setPorcentaje1(inputValue);
            setPorcentaje2(porcentajeRestante + '%');
            } else {
            setInput1Value(inputValue);
            setInput2Value('');
            setPorcentaje1('');
            setPorcentaje2('');
            
            }
        }
        };
        
        const handleInput2Change = (event) => {
        const inputValue = event.target.value;
        
        if (inputValue.length <= 2) { 
            if (!isNaN(parseFloat(inputValue))) { // Verificar si es un número válido
                const porcentaje2 = parseFloat(inputValue);
                const porcentajeRestante = 100 - porcentaje2;
        
                setInput2Value(inputValue); // Mantener el valor sin el signo de porcentaje
                setInput1Value(porcentajeRestante + '%');
                setPorcentaje1(porcentajeRestante + '%');
                setPorcentaje2(inputValue + '%');
            } else {
                setInput2Value(inputValue);
                setInput1Value('');
                setPorcentaje1('');
                setPorcentaje2('');
            }
        }
        };


      function closeModal() {
        modal.current.classList.remove("active_modal_terapia");
        setShowModal(false)
      }

      if(showModal){
        modal.current.classList.add("active_modal_terapia");
      }

  return (
    <>
    
      <div className="cont_modal-terapia" ref={modal}>

        <form className="form_terapia" onSubmit={SubmitCrear}>
          
          <div className="cont_titu_terapia">
            <h1>Crear Terapia</h1>
          </div>
      <div className='box_terapia'>    
          <div>
            <label>Terapia</label>
              <input
                placeholder="Terapia"
                required
                onChange={(e) => setTerapia(e.target.value)}
              />
          </div>

        <div>
             <label>Descripción</label>
              <input
                placeholder="Descripción"
                required
                onChange={(e) => setDescripcion(e.target.value)}
              />
         </div>

           <div>

           <label>Porcentaje del Centro</label>
                <input
                    placeholder="Porcentaje del Centro"
                    value={input2Value}
                    onChange={handleInput2Change}
                    required
                /> 

             
           </div>
             
             <div>
             <label>Porcentaje del Terapeuta </label>
              <input
                placeholder="Porcentaje del Terapeuta"
                required
                value={input1Value}
                onChange={handleInput1Change}
              />
             </div>
              </div>
              
            <div>
            <label>Precio</label>
              <input
                placeholder="Precio"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
             </div>
                     
            <button className="btn guardar">Crear</button>
            <button  className="btn cancelar"type="button"onClick={closeModal}>Cancelar</button>

        </form>
      </div>
    </>
  );

}

export default ModalTerapia
