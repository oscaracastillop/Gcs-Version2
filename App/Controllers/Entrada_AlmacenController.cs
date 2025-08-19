using Data.DataEntities;
using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Entrada_AlmacenController : Controller
    {
        private readonly DataEntradaAlmacen dataEntradaAlmacen = new DataEntradaAlmacen();
        public JsonResult CrearEntradaAlmacen(string IdUser, int IdProducto, string Lote, int Cantidad, int ValorUnitarioCompra, int PorcentajeIva, string FechaVencimientoProducto, string FechaIngresoAlmacen)
        {
            var resultado = dataEntradaAlmacen.CrearEntradaAlmacen(IdUser, IdProducto, Lote, Cantidad, ValorUnitarioCompra, PorcentajeIva, FechaVencimientoProducto, FechaIngresoAlmacen);

            return Json(resultado);
        }

        public JsonResult ActualizarEntradaAlmacen(string IdUser, int IdEntradaAlmacen, string Lote, int Cantidad, int ValorUnitarioCompra, int PorcentajeIva, string FechaVencimientoProducto, string FechaIngresoAlmacen, int IdEstado)
        {
            var resultado = dataEntradaAlmacen.ActualizarEntradaAlmacen(IdUser, IdEntradaAlmacen, Lote, Cantidad, ValorUnitarioCompra, PorcentajeIva, FechaVencimientoProducto, FechaIngresoAlmacen, IdEstado);

            return Json(resultado);
        }

        public JsonResult EliminarEntradaAlmacen(string IdUser, int IdEntradaAlmacen)
        {
            string resultado = dataEntradaAlmacen.EliminarEntradaAlmacen(IdUser, IdEntradaAlmacen);
            return Json(resultado);
        }

        public ActionResult GridEntradaAlmacen()
        {
            var data = dataEntradaAlmacen.GridEntradaAlmacen();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }
    }
}