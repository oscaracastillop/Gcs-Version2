using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class ProduccionController : Controller
    {
        // GET: Produccion
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Mipe_Programa_Aspersion()
        {
            return View();
        }
       
        public ActionResult Mirfe_Programa_Fertilizacion()
        {
            return View();
        }

        public ActionResult Siembra()
        {
            return View();
        }

        public ActionResult Cosecha()
        {
            return View();
        }

        public ActionResult PostCosecha()
        {
            return View();
        }
    }
}