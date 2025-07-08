using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Otros_Ingresos_EmpleadoController : Controller
    {
        private readonly DataOtrosIngresosEmpleado dataOtrosIngresosEmpleado = new DataOtrosIngresosEmpleado();

        public JsonResult CrearOtrosIngresosEmpleado(string IdUser, int IdEmpleado, int Valor, string FechaPago, string Observacion)
        {
            var resultado = dataOtrosIngresosEmpleado.CrearOtrosIngresosEmpleado(IdUser, IdEmpleado, Valor, FechaPago, Observacion);
            return Json(resultado);
        }

        public JsonResult ActualizarOtrosIngresosEmpleado(string IdUser, int IdOtrosIngresosEmpleado, int Valor, string FechaPago, string Observacion, int IdEstado)
        {
            var resultado = dataOtrosIngresosEmpleado.ActualizarOtrosIngresosEmpleado(IdUser, IdOtrosIngresosEmpleado, Valor, FechaPago, Observacion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarOtrosIngresosEmpleado(string IdUser, int IdOtrosIngresosEmpleado)
        {
            string resultado = dataOtrosIngresosEmpleado.EliminarOtrosIngresosEmpleado(IdUser, IdOtrosIngresosEmpleado);
            return Json(resultado);
        }

        public ActionResult GridOtrosIngresosEmpleado()
        {
            var data = dataOtrosIngresosEmpleado.GridOtrosIngresosEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

    }
}