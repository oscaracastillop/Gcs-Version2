using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class CategoriaController : Controller
    {
        private readonly DataCategoria dataCategoria = new DataCategoria();

        public JsonResult CrearCategoria(string IdUser, string NombreCategoria)
        {
            var resultado = dataCategoria.CrearCategoria(IdUser, NombreCategoria);

            return Json(resultado);
        }

        public JsonResult ActualizarCategoria(string IdUser, int IdCategoria, string NombreCategoria, int IdEstado)
        {
            var resultado = dataCategoria.ActualizarCategoria(IdUser, IdCategoria, NombreCategoria, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarCategoria(string IdUser, int IdCategoria)
        {
            string resultado = dataCategoria.EliminarCategoria(IdUser, IdCategoria);
            return Json(resultado);
        }

        public ActionResult GridCategoria()
        {
            var data = dataCategoria.GridCategoria();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaCategoria()
        {
            var resultado = dataCategoria.ListaCategoria();
            return Json(resultado);
        }
    }
}