using Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Fondo_CesantiasController : Controller
    {
        private readonly DataFondoCesantias dataFondoCesantias = new DataFondoCesantias();

        public JsonResult CrearFondoCesantias(string IdUser, string NombreFondoCesantias)
        {
            var resultado = dataFondoCesantias.CrearFondoCesantias(IdUser, NombreFondoCesantias);

            return Json(resultado);
        }

        public JsonResult ActualizarFondoCesantias(string IdUser, int IdFondoCesantias, string NombreFondoCesantias, int IdEstado)
        {
            var resultado = dataFondoCesantias.ActualizarFondoCesantias(IdUser, IdFondoCesantias, NombreFondoCesantias, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarFondoCesantias(string IdUser, int IdFondoCesantias)
        {
            string resultado = dataFondoCesantias.EliminarFondoCesantias(IdUser, IdFondoCesantias);
            return Json(resultado);
        }

        public ActionResult GridFondoCesantias()
        {
            var data = dataFondoCesantias.GridFondoCesantias();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaFondoCesantias()
        {
            var resultado = dataFondoCesantias.ListaFondoCesantias();
            return Json(resultado);
        }
    }
}