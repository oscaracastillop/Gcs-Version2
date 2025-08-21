using Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class CotizacionController : Controller
    {

        private readonly DataCotizacion dataCotizacion = new DataCotizacion();
        public JsonResult CrearCotizacion(string IdUser, int IdCliente)
        {
            var resultado = dataCotizacion.CrearCotizacion(IdUser, IdCliente);

            return Json(resultado);
        }

        public ActionResult GridCotizacion()
        {
            var data = dataCotizacion.GridCotizacion();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }
    }
}