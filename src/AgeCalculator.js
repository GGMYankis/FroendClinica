function AgeCalculator() {
  return (
    <>
      <p>hola</p>
    </>
  );
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
