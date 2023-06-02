import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



function AgeCalculator() {

  const [selectedDates, setSelectedDates] = useState([]);
  const [fechas, setfechas] = useState([]);


  const handle = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const year = String(date.getFullYear()).padStart(2, "0");
    let fecha = `${year}-${month}-${day}`;
    
    setSelectedDates((prevDates) => [...prevDates, fecha]);

    selectedDates.map(item => {
     setfechas(item)
    })
  };
  
  console.log(fechas)


  return (

    <div >
      <p>Probando</p> 
    <input value={selectedDates} className='dateI'/>
    <DatePicker
  onChange={handle}
  placeholderText="Selecciona fechas"
  calendarClassName="multi-datepicker"
  inline
  multiple
/>
    </div >

  );
}

export default AgeCalculator;

