using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class InventarioController : Controller
    {
        private readonly DataInventario dataInventario = new DataInventario();

        public ActionResult GridInventario()
        {
            var data = dataInventario.GridInventario();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }
    }
}