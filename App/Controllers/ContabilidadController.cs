using System.Web.Mvc;

namespace App.Controllers
{
    public class ContabilidadController : Controller
    {
        // GET: Contabilidad
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Nomina_Empleado()
        {
            return View();
        }

        public ActionResult Nomina_Contratista() 
        {
            return View();
        }

        public ActionResult Liquidacion_Empleado() 
        {
            return View();
}
    }
}