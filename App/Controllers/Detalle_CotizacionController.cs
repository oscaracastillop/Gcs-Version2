using Data.DataEntities;
using System.Web.Mvc;
using static Models.DetalleCotizacion;

namespace App.Controllers
{
    public class Detalle_CotizacionController : Controller
    {
        private readonly DataDetalleCotizacion dataDetalleCotizacion = new DataDetalleCotizacion();
        public JsonResult AgregarProductoDetCotTemporal(string IdUser, int IdProducto, int Cantidad, int PrecioUnitario, int PorcentajeIva)
        {
            var resultado = dataDetalleCotizacion.AgregarProductoDetCotTemporal(IdUser, IdProducto, Cantidad, PrecioUnitario, PorcentajeIva);

            return Json(resultado);
        }

        public ActionResult GridTDetalleCotizacion()
        {
            var data = dataDetalleCotizacion.GridTDetalleCotizacion();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarTDetalleCotizacion(string IdUser, int IdTDetalleCotizacion)
        {
            string resultado = dataDetalleCotizacion.EliminarTDetalleCotizacion(IdUser, IdTDetalleCotizacion);
            return Json(resultado);
        }

        public JsonResult BorrarTProductoListaDetCot(string IdUser)
        {
            string resultado = dataDetalleCotizacion.BorrarTProductoListaDetCot(IdUser);
            return Json(resultado);
        }

    }
}