using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Bono_EmpleadoController : Controller
    {
        private readonly DataBonoEmpleado dataBonoEmpleado = new DataBonoEmpleado();

        public JsonResult CrearBonoEmpleado(string IdUser, int IdEmpleado, int Valor, string FechaPago, string Observacion)
        {
            var resultado = dataBonoEmpleado.CrearBonoEmpleado(IdUser, IdEmpleado, Valor, FechaPago, Observacion);
            return Json(resultado);
        }

        public JsonResult ActualizarBonoEmpleado(string IdUser, int IdBonoEmpleado, int Valor, string FechaPago, string Observacion, int IdEstado)
        {
            var resultado = dataBonoEmpleado.ActualizarBonoEmpleado(IdUser, IdBonoEmpleado, Valor, FechaPago, Observacion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarBonoEmpleado(string IdUser, int IdBonoEmpleado)
        {
            string resultado = dataBonoEmpleado.EliminarBonoEmpleado(IdUser, IdBonoEmpleado);
            return Json(resultado);
        }

        public ActionResult GridBonoEmpleado()
        {
            var data = dataBonoEmpleado.GridBonoEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

    }
}