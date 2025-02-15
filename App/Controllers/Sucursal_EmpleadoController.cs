using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class Sucursal_EmpleadoController : Controller
    {
        private readonly DataSucursalEmpleado dataSucursalEmpleado = new DataSucursalEmpleado();
               
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult CrearSucursalEmpleado(string IdUser, int IdEmpleado, int IdSucursal, string FechaInicio, string FechaFin, string Observacion)
        {
            var resultado = dataSucursalEmpleado.CrearSucursalEmpleado(IdUser, IdEmpleado, IdSucursal, FechaInicio, FechaFin, Observacion);

            return Json(resultado);
        }

        public JsonResult ActualizarSucursalEmpleado(string IdUser, int IdSucursalEmpleado, string FechaFin, string Observacion, int IdEstado)
        {
            var resultado = dataSucursalEmpleado.ActualizarSucursalEmpleado(IdUser, IdSucursalEmpleado, FechaFin, Observacion, IdEstado);
            return Json(resultado);
        }

        public ActionResult GridSucursalEmpleado()
        {
            var data = dataSucursalEmpleado.GridSucursalEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

    }
}