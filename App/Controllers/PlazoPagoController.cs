using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class PlazoPagoController : Controller
    {
        private readonly DataPlazoPago dataPlazoPago = new DataPlazoPago();
        public JsonResult ListaPlazoPago()
        {
            var resultado = dataPlazoPago.ListaPlazoPago();
            return Json(resultado);
        }
    }
}