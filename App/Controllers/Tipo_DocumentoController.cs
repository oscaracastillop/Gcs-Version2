using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class Tipo_DocumentoController : Controller
    {
        private readonly DataTipoDocumento dataTipoDocumento = new DataTipoDocumento();
                
        public JsonResult ListaTipoDocumento(int Tipo)
        {
            var resultado = dataTipoDocumento.ListaTipoDocumento(Tipo);
            return Json(resultado);
        }
    
    }
}