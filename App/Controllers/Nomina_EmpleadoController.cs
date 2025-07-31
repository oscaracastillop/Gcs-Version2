using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Nomina_EmpleadoController : Controller
    {
        private readonly DataNominaEmpleado dataNominaEmpleado = new DataNominaEmpleado();

        public JsonResult CrearNominaEmpleado(string IdUser, int IdEmpleado, string FechaInicio, string FechaFin, int DiasaPagar)
        {
            var resultado = dataNominaEmpleado.CrearNominaEmpleado(IdUser, IdEmpleado, FechaInicio, FechaFin, DiasaPagar);
            return Json(resultado);
        }

        public JsonResult PagarNominaEmpleado(string IdUser, int IdNominaEmpleado)
        {
            var resultado = dataNominaEmpleado.PagarNominaEmpleado(IdUser, IdNominaEmpleado);
            return Json(resultado);
        }

        public JsonResult EliminarNominaEmpleado(string IdUser, int IdNominaEmpleado)
        {
            var resultado = dataNominaEmpleado.EliminarNominaEmpleado(IdUser, IdNominaEmpleado);
            return Json(resultado);
        }

        public ActionResult GridNominaEmpleado()
        {
            var data = dataNominaEmpleado.GridNominaEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DatosComprobanteNomina(int Id)
        {
            var data = dataNominaEmpleado.DatosComprobanteNomina(Id);
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CargarDatosEmpleadoNomina(int IdEmpleado, string FechaInicio, string FechaFin, int DiasaPagar)
        {
            var resultado = dataNominaEmpleado.CargarDatosEmpleadoNomina(IdEmpleado, FechaInicio, FechaFin, DiasaPagar);
            return Json(resultado);
        }

    }

}