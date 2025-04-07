using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class ClienteController : Controller
    {
        private readonly DataCliente dataCliente = new DataCliente();

        public JsonResult CrearCliente(string IdUser, string NombreCliente, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion)
        {
            var resultado = dataCliente.CrearCliente(IdUser, NombreCliente, IdTipoDocumento, Identificacion, Email, Telefono, Contacto, IdCiudad, Direccion);

            return Json(resultado);
        }

        public JsonResult ActualizarCliente(string IdUser, int IdCliente, string NombreCliente, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion, int IdEstado)
        {
            var resultado = dataCliente.ActualizarCliente(IdUser, IdCliente, NombreCliente, IdTipoDocumento, Identificacion, Email, Telefono, Contacto, IdCiudad, Direccion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarCliente(string IdUser, int IdCliente)
        {
            string resultado = dataCliente.EliminarCliente(IdUser, IdCliente);
            return Json(resultado);
        }

        public ActionResult GridCliente()
        {
            var data = dataCliente.GridCliente();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaCliente()
        {
            var resultado = dataCliente.ListaCliente();
            return Json(resultado);
        }
    }
}