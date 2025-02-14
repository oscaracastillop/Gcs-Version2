using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class SubMenuController : Controller
    {

        private readonly DataSubMenu dataSubMenu = new DataSubMenu();

        // GET: SubMenu
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListaSubMenu(string Usuario, string Modulo)
        {
            var resultado = dataSubMenu.ListaSubMenu(Usuario, Modulo);
            return Json(resultado);
        }
    }
}