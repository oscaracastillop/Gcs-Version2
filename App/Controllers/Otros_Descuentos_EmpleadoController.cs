using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Otros_Descuentos_EmpleadoController : Controller
    {
        private readonly DataOtrosDescuentosEmpleado dataOtrosDescuentosEmpleado = new DataOtrosDescuentosEmpleado();

        public JsonResult CrearOtrosDescuentosEmpleado(string IdUser, int IdEmpleado, int Valor, string FechaCobro, string Observacion)
        {
            var resultado = dataOtrosDescuentosEmpleado.CrearOtrosDescuentosEmpleado(IdUser, IdEmpleado, Valor, FechaCobro, Observacion);
            return Json(resultado);
        }

        public JsonResult ActualizarOtrosDescuentosEmpleado(string IdUser, int IdOtrosDescuentosEmpleado, int Valor, string FechaCobro, string Observacion, int IdEstado)
        {
            var resultado = dataOtrosDescuentosEmpleado.ActualizarOtrosDescuentosEmpleado(IdUser, IdOtrosDescuentosEmpleado, Valor, FechaCobro, Observacion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarOtrosDescuentosEmpleado(string IdUser, int IdOtrosDescuentosEmpleado)
        {
            string resultado = dataOtrosDescuentosEmpleado.EliminarOtrosDescuentosEmpleado(IdUser, IdOtrosDescuentosEmpleado);
            return Json(resultado);
        }

        public ActionResult GridOtrosDescuentosEmpleado()
        {
            var data = dataOtrosDescuentosEmpleado.GridOtrosDescuentosEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

    }
}