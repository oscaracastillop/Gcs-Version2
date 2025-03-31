using Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Permiso_MenuController : Controller
    {
        private readonly DataPermisoMenu dataPermisoMenu = new DataPermisoMenu();
        public ActionResult GridPermisoMenu()
        {
            var data = dataPermisoMenu.GridPermisoMenu();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CrearPermisoMenu(string IdUser, int IdUsuarioMenu, int IdMenu, int Permiso)
        {
            var resultado = dataPermisoMenu.CrearPermisoMenu(IdUser, IdUsuarioMenu, IdMenu, Permiso);
            return Json(resultado);
        }

        //public JsonResult ActualizarPermisoMenu(string IdUser, int IdPermisoMenu, int IdUsuarioMenu, int IdMenu, int Permiso)
        //{
        //    var resultado = dataPermisoMenu.ActualizarPermisoMenu(IdUser, IdPermisoMenu, IdUsuarioMenu, IdMenu, Permiso);
        //    return Json(resultado);
        //}

        //public JsonResult EliminarPermisoMenu(string IdUser, int IdPermisoMenu)
        //{
        //    string resultado = dataPermisoMenu.EliminarPermisoMenu(IdUser, IdPermisoMenu);
        //    return Json(resultado);
        //}
    }
}