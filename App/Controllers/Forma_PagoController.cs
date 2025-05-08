using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Forma_PagoController : Controller
    {
        private readonly DataFormaPago dataFormaPago = new DataFormaPago();
        public JsonResult ListaFormaPago()
        {
            var resultado = dataFormaPago.ListaFormaPago();
            return Json(resultado);
        }
    }
}