using Data.DataContext;
using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class VentaController : Controller
    {

        private readonly DataCotizacion datacotizacion = new DataCotizacion();
        // GET: Venta
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Cliente()
        {
            return View();
        }

        public ActionResult Cotizacion()
        {
            return View();
        }

        public ActionResult Crear_Cotizacion()
        {
            return View();
        }

        public ActionResult Detalle_Cotizacion()
        {
            return View();
        }

        
    }
}