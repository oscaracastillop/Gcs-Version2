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

        public JsonResult CrearSucursal(string IdUser, int IdEmpresa, string NombreSucursal, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion)
        {
            var resultado = dataSucursal.CrearSucursal(IdUser, IdEmpresa, NombreSucursal, Email, Telefono, Contacto, IdCiudad, Direccion);

            return Json(resultado);
        }

        public JsonResult ActualizarSucursal(string IdUser, int IdSucursal, int IdEmpresa, string NombreSucursal, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion, int IdEstado)
        {
            var resultado = dataSucursal.ActualizarSucursal(IdUser, IdSucursal, IdEmpresa, NombreSucursal, Email, Telefono, Contacto, IdCiudad, Direccion, IdEstado);
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