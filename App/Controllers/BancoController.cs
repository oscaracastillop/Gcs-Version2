using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class BancoController : Controller
    {
        private readonly DataBanco dataBanco = new DataBanco();

        public JsonResult CrearBanco(string IdUser, string NombreBanco)
        {
            var resultado = dataBanco.CrearBanco(IdUser, NombreBanco);

            return Json(resultado);
        }

        public JsonResult ActualizarBanco(string IdUser, int IdBanco, string NombreBanco, int IdEstado)
        {
            var resultado = dataBanco.ActualizarBanco(IdUser, IdBanco, NombreBanco, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarBanco(string IdUser, int IdBanco)
        {
            string resultado = dataBanco.EliminarBanco(IdUser, IdBanco);
            return Json(resultado);
        }

        public ActionResult GridBanco()
        {
            var data = dataBanco.GridBanco();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaBanco()
        {
            var resultado = dataBanco.ListaBanco();
            return Json(resultado);
        }
    }
}