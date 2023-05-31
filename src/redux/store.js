import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
/* 
[HttpPost]
        [Route("EditarCitas")]
        public IActionResult EditarCitas([FromBody] Evaluation objeto)
        {

            Evaluation oProducto = _dbcontext.Evaluations.Find(objeto.Id);

            if (oProducto == null)
            {
                return BadRequest("producto no encontrado");
            }

            oProducto.IdPatients = objeto.IdPatients is null ? oProducto.IdPatients : objeto.IdPatients;
            oProducto.IdTherapy = objeto.IdTherapy is null ? oProducto.IdTherapy : objeto.IdTherapy;
            oProducto.Price = objeto.Price is null ? oProducto.Price : objeto.Price;
            oProducto.IdTerapeuta = objeto.IdTerapeuta is null ? oProducto.IdTerapeuta : objeto.IdTerapeuta;
            oProducto.Visitas = objeto.Visitas is null ? oProducto.Visitas : objeto.Visitas;
            oProducto.IdConsultorio = objeto.IdConsultorio is null ? oProducto.IdConsultorio : objeto.IdConsultorio;

            _dbcontext.Evaluations.Update(oProducto);
            _dbcontext.SaveChanges();
            return Ok();

        }


        [HttpGet]
        [Route("Citas")]
        public object Citas()
        {
            string mensaje = string.Empty;
            List<Evaluation> viewModal = new List<Evaluation>();
            List<UserEvaluacion> olista = new List<UserEvaluacion>();
            List<Buscar> recu = new List<Buscar>();


            using (var dbContext = _dbcontext)
            {
                var result = from r in dbContext.Recurrencia
                             select new Buscar
                             {
                                 FechaInicio = r.FechaInicio,
                                 Repetir = r.Repetir,
                                 Frecuencia = r.Frecuencia,
                                 Dias = r.Dias, 
                                 IdEvaluation = r.IdEvaluation,
                                 IdRecurrencia = r.IdRecurrencia
                             };

                recu = result.ToList();

                foreach (var listado in recu)
                {
                    var idEva = listado.IdEvaluation;


                    var resultEva = from e in dbContext.Evaluations
                                    join t in dbContext.Therapies on e.IdTherapy equals t.IdTherapy
                                    join p in dbContext.Patients on e.IdPatients equals p.IdPatients
                                    join c in dbContext.Consultorios on e.IdConsultorio equals c.IdConsultorio
                                    join u in dbContext.Users on e.IdTerapeuta equals u.IdUser
                                    where e.Id == idEva 
                                    select new Modelos.UserEvaluacion
                                    {
                                        IdEvaluacion = idEva,
                                        Terapeuta = u.Names,
                                        Terapia = t.Label,
                                        Paciente = p.Name,
                                        FechaInicio = listado.FechaInicio,
                                        Price = e.Price,
                                        Consultorio = c.Nombre,
                                        Repetir = listado.Repetir,
                                        Frecuencia = listado.Frecuencia,
                                        Dias = listado.Dias, 
                                    };

                    olista.AddRange(resultEva.Distinct().ToList());
                }

            }


            return olista;
        } */
