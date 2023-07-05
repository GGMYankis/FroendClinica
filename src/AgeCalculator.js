import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import { useEffect ,useState} from "react";
import {Loading} from "./components/Loading"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { addDays, startOfDay } from 'date-fns';


function AgeCalculator() {

    const [citas, setCitas] = useState([]);

    useEffect(() => {

       async function soli (){
        const res = await axios.get("https://localhost:63958/api/Citas/Citas")
            console.log(res.data)
        res.data.map(x => {
            if(x.dias == "domingo"){
              x.dias = 0
            }
            if(x.dias == "lunes"){
                x.dias = 1
              }
            if(x.dias == "martes"){
                x.dias = 2
              }
              if(x.dias == "miercoles"){
                x.dias = 3
              }
              if(x.dias == "jueves"){
                  x.dias = 4
                }
                if(x.dias == "viernes"){
                    x.dias = 5
                  }
                  if(x.dias == "sabado"){
                      x.dias = 6
                    }
        })
        setCitas(res.data);

        }
        soli()
    },[])


    const empezar = new Date();
    const diasSemana = [1, 3]; 

    const fechaLimite = addDays(empezar, 9999, 11, 31); 
    const eventos = [];

    
   
    const citass = [
        { paciente:{name:"juan"} , dias:1 , fechaInicio:new Date()},
        { paciente:{name:"irannys"} , dias:3, fechaInicio:new Date()}
    ];

    citas.forEach(cita => {

       let iniciar = new Date(cita.fechaInicio)

        while (iniciar <= fechaLimite) {

            if (cita.dias  == iniciar.getDay()) {
            
                const evento = {
                    title:cita.paciente.name,
                    start: new Date(iniciar.getTime()),
                };
    
              eventos.push(evento);
            }
    
            iniciar = addDays(iniciar, 1);
     
     }  
        
    });

    

    
   return (
    <>
        <FullCalendar
        
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable={true}
        droppable={true}
        initialView={"dayGridMonth"}
        events={eventos}
        />
        <p>hola yankis</p>
   </>
  ) 

}

export default AgeCalculator;

/* while (fechaActual <= fechaLimite) {

  if (fechaActual.getDay() === diaSemana) {

    const evento = {
      title: 'Evento repetido',
      start: new Date(fechaActual.getTime()),
    };

    eventos.push(evento);
  }
  fechaActual = addDays(fechaActual, 7);
} */


/* [HttpPost]
[Route("InsertMondays")]

public IActionResult InsertMondays([FromBody] MondayRequest request)
{
    DateTime startDate = DateTime.Now;
    DayOfWeek targetDay = request.TargetDay;

    int year = startDate.Year;
    int dia = (int)startDate.DayOfWeek;
    int mes = startDate.Month;

    var mondays = new List<DateTime>();

    DateTime currentDate = new DateTime(year, mes, dia);


    while (currentDate.Year == year)
    {
        if (currentDate.DayOfWeek == targetDay)
        {
            mondays.Add(currentDate);
        }

        currentDate = currentDate.AddDays(1);
    }

    return Ok(mondays);
} 

*/

/*    [HttpPost]
        [Route("InsertMondays")]
        public IActionResult InsertMondays([FromBody] Citas objeto)
        {
            DateTime startDate = DateTime.Now;

            int year = startDate.Year;
            int dia = (int)startDate.DayOfWeek;
            int mes = startDate.Month;

            var mondays = new List<DateTime>();

            DateTime currentDate = new DateTime(year, mes, dia);

            Evaluation datos = new Evaluation()
            {
                IdPatients = objeto.IdPatients,
                IdTherapy = objeto.IdTherapy,
                Price = objeto.Price,
                FirstPrice = objeto.FirstPrice,
                IdTerapeuta = objeto.IdTerapeuta,
                Visitas = objeto.Visitas,
                IdConsultorio = objeto.IdConsultorio
            };

            _dbcontext.Evaluations.Add(datos);
            _dbcontext.SaveChanges();

            var idObtenido = datos.Id;

            foreach (var dias in objeto.TargetDay)
            {
                while (currentDate.Year == year)
                {
                    if (currentDate.DayOfWeek == dias)
                    {
                        mondays.Add(currentDate);
                    }

                    currentDate = currentDate.AddDays(1);
                }
                 currentDate = new DateTime(year, mes, dia);

              

                foreach (var diaContext in mondays)
                {
                    Recurrencium recu = new Recurrencium();

                    recu.FechaInicio = diaContext;
                    recu.Repetir = objeto.Repetir;
                    recu.Frecuencia = objeto.Frecuencia;
                    recu.IdEvaluation = idObtenido;


                   
                    _dbcontext.Recurrencia.Add(recu);
                    _dbcontext.SaveChanges();
                }

            }



            return Ok(mondays);
        } */