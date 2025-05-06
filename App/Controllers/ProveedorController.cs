using Data.DataEntities;
using System.Web.Mvc;

namespace App.Controllers
{
    public class ProveedorController : Controller
    {
        private readonly DataProveedor dataProveedor = new DataProveedor();

        public JsonResult CrearProveedor(string IdUser, string NombreProveedor, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion, int IdFormaPago, int IdPlazoPago, string Descripcion)
        {
            var resultado = dataProveedor.CrearProveedor(IdUser, NombreProveedor, IdTipoDocumento, Identificacion, Email, Telefono, Contacto, IdCiudad, Direccion, IdFormaPago, IdPlazoPago, Descripcion);
            return Json(resultado);
        }

        public JsonResult ActualizarProveedor(string IdUser, int IdProveedor, string NombreProveedor, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion, int IdFormaPago, int IdPlazoPago, string Descripcion, int Activo)
        {
            var resultado = dataProveedor.ActualizarProveedor(IdUser, IdProveedor, NombreProveedor, IdTipoDocumento, Identificacion, Email, Telefono, Contacto, IdCiudad, Direccion, IdFormaPago, IdPlazoPago, Descripcion, Activo);
            return Json(resultado);
        }

        public JsonResult EliminarProveedor(string IdUser, int IdProveedor)
        {
            string resultado = dataProveedor.EliminarProveedor(IdUser, IdProveedor);
            return Json(resultado);
        }

        public ActionResult GridProveedor()
        {
            var data = dataProveedor.GridProveedor();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaProveedor()
        {
            var resultado = dataProveedor.ListaProveedor();
            return Json(resultado);
        }
    }
}