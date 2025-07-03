using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Hora_Extra_EmpleadoController : Controller
    {
        private readonly DataHoraExtraEmpleado dataHoraExtraEmpleado = new DataHoraExtraEmpleado();

        public JsonResult CrearHoraExtraEmpleado(string IdUser, int IdEmpleado, int IdTipoHoraExtra, decimal CantidadHE, string FechaHE, string FechaPagoHE, string Observacion)
        {
            var resultado = dataHoraExtraEmpleado.CrearHoraExtraEmpleado(IdUser, IdEmpleado, IdTipoHoraExtra, CantidadHE, FechaHE, FechaPagoHE, Observacion);
            return Json(resultado);
        }

        public JsonResult ActualizarHoraExtraEmpleado(string IdUser, int IdHoraExtra, int IdTipoHoraExtra, decimal CantidadHE, string FechaHE, string FechaPagoHE, string Observacion, int IdEstado)
        {
            var resultado = dataHoraExtraEmpleado.ActualizarHoraExtraEmpleado(IdUser, IdHoraExtra, IdTipoHoraExtra, CantidadHE, FechaHE, FechaPagoHE, Observacion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarHoraExtraEmpleado(string IdUser, int IdCasinoEmpleado)
        {
            string resultado = dataHoraExtraEmpleado.EliminarHoraExtraEmpleado(IdUser, IdCasinoEmpleado);
            return Json(resultado);
        }

        public ActionResult GridHoraExtraEmpleado()
        {
            var data = dataHoraExtraEmpleado.GridHoraExtraEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }


    }
}