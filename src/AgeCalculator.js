import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import { useEffect ,useState} from "react";
import axios from "axios";

function AgeCalculator() {
  const [repetir , setRepetir] = useState();
  const [frecuencia , setFrecuencia] = useState();

    const data = {
      Fecha: "2023-06-16",
      DiasSemana: [1, 2,3],
      FechaInicio: "2023-06-16",
      Repetir: repetir,
      Frecuencia: frecuencia,
      IdEvaluation: 336,
    }
    
    function enviar(){
      const url =   "https://localhost:63958/api/traerpaciente/buscarPrimerLunes";
      axios .post(url, data)
      .then((result) => {
          console.log(result.data)
      })
    }

   return (
    <>
        <div className="probarAge" id="he">  
          <button className="buttos" onClick={enviar}>enviar</button>
          <select  className="buttos" onChange={e => setRepetir(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>   
              <option value="3">3</option>   
              <option value="4">4</option>   
            </select>
            <select  className="buttos" onChange={e => setFrecuencia(e.target.value)}>
              <option value="diario">diario</option>
              <option value="semanal">semanal</option>   
              <option value="mensual">mensual</option>   
            </select>
        </div>      
   </>
  )

}

export default AgeCalculator;
