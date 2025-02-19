using System.Web.Mvc;

namespace App.Controllers
{
    public class NegocioController : Controller
    {
        // GET: Negocio
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Empresa()
        {
            return View();
        }

        public ActionResult Sucursal()
        {
            return View();
        }

        public ActionResult Sucursal_Empleado()
        {
            return View();
        }
    }
}