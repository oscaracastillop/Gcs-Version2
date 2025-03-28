using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class EpsController : Controller
    {
        private readonly DataEps dataEps = new DataEps();

        public JsonResult CrearEps(string IdUser, string NombreEps)
        {
            var resultado = dataEps.CrearEps(IdUser, NombreEps);

            return Json(resultado);
        }

        public JsonResult ActualizarEps(string IdUser, int IdEps, string NombreEps, int IdEstado)
        {
            var resultado = dataEps.ActualizarEps(IdUser, IdEps, NombreEps, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarEps(string IdUser, int IdEps)
        {
            string resultado = dataEps.EliminarEps(IdUser, IdEps);
            return Json(resultado);
        }

        public ActionResult GridEps()
        {
            var data = dataEps.GridEps();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaEps()
        {
            var resultado = dataEps.ListaEps();
            return Json(resultado);
        }
    }
}