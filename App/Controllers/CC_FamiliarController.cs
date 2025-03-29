using Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class CC_FamiliarController : Controller
    {
        private readonly DataCCFamiliar dataCCFamiliar = new DataCCFamiliar();

        public JsonResult CrearCCFamiliar(string IdUser, string NombreCCFamiliar)
        {
            var resultado = dataCCFamiliar.CrearCCFamiliar(IdUser, NombreCCFamiliar);

            return Json(resultado);
        }

        public JsonResult ActualizarCCFamiliar(string IdUser, int IdCCFamiliar, string NombreCCFamiliar, int IdEstado)
        {
            var resultado = dataCCFamiliar.ActualizarCCFamiliar(IdUser, IdCCFamiliar, NombreCCFamiliar, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarCCFamiliar(string IdUser, int IdCCFamiliar)
        {
            string resultado = dataCCFamiliar.EliminarCCFamiliar(IdUser, IdCCFamiliar);
            return Json(resultado);
        }

        public ActionResult GridCCFamiliar()
        {
            var data = dataCCFamiliar.GridCCFamiliar();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaCCFamiliar()
        {
            var resultado = dataCCFamiliar.ListaCCFamiliar();
            return Json(resultado);
        }
    }
}