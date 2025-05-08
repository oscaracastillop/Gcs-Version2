using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Unidad_MedidaController : Controller
    {
        private readonly DataUnidadMedida dataUnidadMedida = new DataUnidadMedida();
        public JsonResult ListaUnidadMedida()
        {
            var resultado = dataUnidadMedida.ListaUnidadMedida();
            return Json(resultado);
        }
    }
}