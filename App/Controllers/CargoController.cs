using Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class CargoController : Controller
    {
        private readonly DataCargo dataCargo = new DataCargo();

        public JsonResult CrearCargo(string IdUser, string NombreCargo)
        {
            var resultado = dataCargo.CrearCargo(IdUser, NombreCargo);

            return Json(resultado);
        }

        public JsonResult ActualizarCargo(string IdUser, int IdCargo, string NombreCargo, int IdEstado)
        {
            var resultado = dataCargo.ActualizarCargo(IdUser, IdCargo, NombreCargo, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarCargo(string IdUser, int IdCargo)
        {
            string resultado = dataCargo.EliminarCargo(IdUser, IdCargo);
            return Json(resultado);
        }

        public ActionResult GridCargo()
        {
            var data = dataCargo.GridCargo();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaCargo()
        {
            var resultado = dataCargo.ListaCargo();
            return Json(resultado);
        }
    }
}