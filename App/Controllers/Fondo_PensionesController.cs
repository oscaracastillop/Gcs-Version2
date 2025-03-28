using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Fondo_PensionesController : Controller
    {
        private readonly DataFondoPensiones dataFondoPensiones = new DataFondoPensiones();

        public JsonResult CrearFondoPensiones(string IdUser, string NombreFondoPensiones)
        {
            var resultado = dataFondoPensiones.CrearFondoPensiones(IdUser, NombreFondoPensiones);

            return Json(resultado);
        }

        public JsonResult ActualizarFondoPensiones(string IdUser, int IdFondoPensiones, string NombreFondoPensiones, int IdEstado)
        {
            var resultado = dataFondoPensiones.ActualizarFondoPensiones(IdUser, IdFondoPensiones, NombreFondoPensiones, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarFondoPensiones(string IdUser, int IdFondoPensiones)
        {
            string resultado = dataFondoPensiones.EliminarFondoPensiones(IdUser, IdFondoPensiones);
            return Json(resultado);
        }

        public ActionResult GridFondoPensiones()
        {
            var data = dataFondoPensiones.GridFondoPensiones();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaFondoPensiones()
        {
            var resultado = dataFondoPensiones.ListaFondoPensiones();
            return Json(resultado);
        }
    }
}