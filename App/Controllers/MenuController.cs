using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class MenuController : Controller
    {
        private readonly DataMenu dataMenu = new DataMenu();

        // GET: Menu
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListaMenu(string Usuario)
        {
            var resultado = dataMenu.ListaMenu(Usuario);
            return Json(resultado);
        }

    }
}