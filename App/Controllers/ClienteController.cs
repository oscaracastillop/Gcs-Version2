using Data.DataEntities;
using Models;
using System.Web.Mvc;

namespace App.Controllers
{
    public class ClienteController : Controller
    {
        private readonly DataCliente dataCliente = new DataCliente();

        public JsonResult CrearCliente(string IdUser, string NombreCliente, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Celular, string Contacto, int IdCiudad, string Direccion, int IdFormaPago, int IdPlazoPago, string Descripcion)
        {
            var resultado = dataCliente.CrearCliente(IdUser, NombreCliente, IdTipoDocumento, Identificacion, Email, Telefono, Celular, Contacto, IdCiudad, Direccion, IdFormaPago, IdPlazoPago, Descripcion);

            return Json(resultado);
        }

        public JsonResult ActualizarCliente(string IdUser, int IdCliente, string NombreCliente, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Celular, string Contacto, int IdCiudad, string Direccion, , int IdFormaPago, int IdPlazoPago, string Descripcion, int IdEstado)
        {
            var resultado = dataCliente.ActualizarCliente(IdUser, IdCliente, NombreCliente, IdTipoDocumento, Identificacion, Email, Telefono, Celular, Contacto, IdCiudad, Direccion, , IdFormaPago, IdPlazoPago, Descripcion, IdEstado);
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