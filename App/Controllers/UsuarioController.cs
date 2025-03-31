using Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly DataUsuario dataUsuario = new DataUsuario();

        public JsonResult CrearUsuario(string IdUser, string Usuario, string Password, string Email, string NombreUsuarioLogin, string FechaVigencia)
        {
            var resultado = dataUsuario.CrearUsuario(IdUser, Usuario, Password, Email, NombreUsuarioLogin, FechaVigencia);

            return Json(resultado);
        }

        public JsonResult ActualizarUsuario(string IdUser, int IdUsuarioLogin, string Usuario, string Password, string Email, string NombreUsuarioLogin, string FechaVigencia, int IdEstado)
        {
            var resultado = dataUsuario.ActualizarUsuario(IdUser, IdUsuarioLogin, Usuario, Password, Email, NombreUsuarioLogin, FechaVigencia, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarUsuario(string IdUser, int IdUsuario)
        {
            string resultado = dataUsuario.EliminarUsuario(IdUser, IdUsuario);
            return Json(resultado);
        }

        public ActionResult GridUsuario()
        {
            var data = dataUsuario.GridUsuario();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaUsuario()
        {
            var resultado = dataUsuario.ListaUsuario();
            return Json(resultado);
        }       
    }
}