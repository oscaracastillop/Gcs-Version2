using App;
using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class SucursalController : Controller
    {

        private readonly DataSucursal dataSucursal = new DataSucursal();
               
        // GET: Sucursal
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult CrearSucursal(string IdUser, string NombreSucursal, string Email, string Telefono, string Celular, string Contacto, int IdCiudad, string Direccion, string Descripcion)
        {
            var resultado = dataSucursal.CrearSucursal(IdUser, NombreSucursal, Email, Telefono, Celular, Contacto, IdCiudad, Direccion, Descripcion);

            return Json(resultado);
        }

        public JsonResult ActualizarSucursal(string IdUser, int IdSucursal, string NombreSucursal, string Email, string Telefono, string Celular, string Contacto, int IdCiudad, string Direccion, string Descripcion, int IdEstado)
        {
            var resultado = dataSucursal.ActualizarSucursal(IdUser, IdSucursal, NombreSucursal, Email, Telefono, Celular, Contacto, IdCiudad, Direccion, Descripcion, IdEstado);
            return Json(resultado);
        }


        public JsonResult EliminarSucursal(string IdUser, int IdSucursal)
        {
            string resultado = dataSucursal.EliminarSucursal(IdUser, IdSucursal);
            return Json(resultado);
        }

        public ActionResult GridSucursal()
        {
            var data = dataSucursal.GridSucursal();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult ListaSucursal()
        {
            var resultado = dataSucursal.ListaSucursal();
            return Json(resultado);
        }
        public JsonResult ListaSucursalXIdEmpresa(int Id)
        {
            var resultado = dataSucursal.ListaSucursalXIdEmpresa(Id);
            return Json(resultado);
        }

        public JsonResult ListaSucursalXIdEmpresaXIdEmpleado(int IdEmpleado)
        {
            var resultado = dataSucursal.ListaSucursalXIdEmpresaXIdEmpleado(IdEmpleado);
            return Json(resultado);
        }             

    }
}