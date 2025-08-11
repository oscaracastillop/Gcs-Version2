using Data.DataEntities;
using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class Sucursal_EmpleadoController : Controller
    {
        private readonly DataSucursalEmpleado dataSucursalEmpleado = new DataSucursalEmpleado();
       

        public JsonResult CambiarSucursalEmpleado(string IdUser, int IdSucursalEmpleado, int IdSucursal, string Observacion)
        {
            var resultado = dataSucursalEmpleado.CambiarSucursalEmpleado(IdUser, IdSucursalEmpleado, IdSucursal, Observacion);
            return Json(resultado);
        }

        public ActionResult GridSucursalEmpleado()
        {
            var data = dataSucursalEmpleado.GridSucursalEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

    }
}