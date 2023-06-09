import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

function AgeCalculator() {
  const [values, setValues] = useState(
    [1, 2, 3].map((number) =>
      new DateObject().set({
        day: number,
        hour: number,
        minute: number,
        second: number,
      })
    )
  );

  const handleDateChange = (newValues) => {
    console.log(newValues); // Muestra las fechas seleccionadas en la consola
    setValues(newValues);
  };


  const handleSendDates = () => {
    const fechas = values.map((date) => date.format("YYYY-MM-DDTHH:mm:ss"));

    const data = {
      fechas: fechas
    };
    
    
    fetch("https://localhost:63958/api/Clinica/fechas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
  
    <DatePicker
      value={values}
      onChange={handleDateChange}
      format="MM/DD/YYYY HH:mm:ss"
      multiple
      plugins={[<TimePicker position="bottom" />, <DatePanel markFocused />]}
    />
    <button onClick={handleSendDates}>Enviar</button>
        
    </div>
  );
}

export default AgeCalculator;
