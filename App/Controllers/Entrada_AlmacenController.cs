using Data.DataEntities;
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
    }
}