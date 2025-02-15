using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class CiudadController : Controller
    {
        private readonly DataCiudad dataCiudad = new DataCiudad();

        // GET: Ciudad

        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ListaCiudad()
        {
            var resultado = dataCiudad.ListaCiudad();
            return Json(resultado);
        }
        public JsonResult BuscarCiudadIdDepto(int IdDepartamento)
        {
            var resultado = dataCiudad.BuscarCiudadIdDepto(IdDepartamento);
            return Json(resultado);
        }
    }
}