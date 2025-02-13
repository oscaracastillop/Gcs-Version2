using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        private readonly DataLogin dataLogin = new DataLogin();
        // GET: Login          

        public JsonResult IniciarSesion(string Usuario, string Password)
        {
            string resultado = dataLogin.IniciarSesion(Usuario, Password);
            return Json(resultado);
        }
    }
}