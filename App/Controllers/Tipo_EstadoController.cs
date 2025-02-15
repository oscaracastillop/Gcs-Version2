using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class Tipo_EstadoController : Controller
    {
        private readonly DataTipoEstado dataTipoEstado = new DataTipoEstado();

        #region Metodos listar/buscar
        public JsonResult ListaTipoEstado(int Tipo)
        {
            var resultado = dataTipoEstado.ListaTipoEstado(Tipo);
            return Json(resultado);
        }
        #endregion
    }
}