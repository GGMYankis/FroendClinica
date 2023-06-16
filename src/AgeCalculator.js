import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import { useEffect ,useState} from "react";
import axios from "axios";

function AgeCalculator() {


 
    const data = {
      Fecha: "2023-06-15",
      DiasSemana: [1, 2,3],
      FechaInicio: "2023-06-15",
      Repetir: 2,
      Frecuencia: "mensual",
      IdEvaluation: 250,
    }
    
    function enviar(){
      const url =   "https://localhost:63958/api/traerpaciente/buscarPrimerLunes";
      axios .post(url, data)
      .then((result) => {
          console.log(result.data)
      })
    }

   return (
    <div className="probarAge" id="he">
            
     
      <button onClick={enviar}>enviar</button>
    </div>

  )

}

export default AgeCalculator;
