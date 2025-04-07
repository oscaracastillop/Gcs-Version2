using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class Tipo_ContratoController : Controller
    {
        private readonly DataTipoContrato dataTipoContrato = new DataTipoContrato();
               
        public JsonResult ListaTipoContrato()
        {
            var resultado = dataTipoContrato.ListaTipoContrato();
            return Json(resultado);
        }
        
    }
}