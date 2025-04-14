using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Casino_EmpleadoController : Controller
    {
        private readonly DataCasinoEmpleado dataCasinoEmpleado = new DataCasinoEmpleado();

        public JsonResult CrearCasinoEmpleado(string IdUser, int IdEmpleado, int Valor, string Fecha, string FechaPago, string Observacion)
        {
            var resultado = dataCasinoEmpleado.CrearCasinoEmpleado(IdUser, IdEmpleado, Valor, Fecha, FechaPago, Observacion);
            return Json(resultado);
        }

        public JsonResult ActualizarCasinoEmpleado(string IdUser, int IdCasinoEmpleado, int Valor, string Fecha, string FechaPago, string Observacion, int IdEstado)
        {
            var resultado = dataCasinoEmpleado.ActualizarCasinoEmpleado(IdUser, IdCasinoEmpleado, Valor, Fecha, FechaPago, Observacion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarCasinoEmpleado(string IdUser, int IdCasinoEmpleado)
        {
            string resultado = dataCasinoEmpleado.EliminarCasinoEmpleado(IdUser, IdCasinoEmpleado);
            return Json(resultado);
        }

        public ActionResult GridCasinoEmpleado()
        {
            var data = dataCasinoEmpleado.GridCasinoEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }
    }
}