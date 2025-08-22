using System.Web.Mvc;

namespace App.Controllers
{
    public class HomeController : Controller
    {
        //GET: Home
        public ActionResult Index()
        {
            return View();
        }

        //public ActionResult Index()
        //{
        //    // Crear una instancia de DocWord y llamar al método CrearDocumento
        //    DocWord docWord = new DocWord();
        //    docWord.CrearDocumento();

        //    return View();
        //}

        public ActionResult Inicio()
        {
            return View();
        }

        public ActionResult Preguntas()
        {
            return View();
        }
    }
}