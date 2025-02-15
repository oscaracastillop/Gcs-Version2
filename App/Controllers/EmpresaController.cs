using SistemaGcs.Data.DataEntities;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class EmpresaController : Controller
    {
        private readonly DataEmpresa dataEmpresa = new DataEmpresa();
               
        // GET: Empresa
        public ActionResult Index()
        {
            return View();
        }
             
        public JsonResult CrearEmpresa(string IdUser, string NombreEmpresa, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion)
        {
            var resultado = dataEmpresa.CrearEmpresa(IdUser, NombreEmpresa, IdTipoDocumento, Identificacion, Email, Telefono, Contacto, IdCiudad, Direccion);

            return Json(resultado);
        }

        public JsonResult ActualizarEmpresa(string IdUser, int IdEmpresa, string NombreEmpresa, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion, int IdEstado)
        {
            var resultado = dataEmpresa.ActualizarEmpresa(IdUser, IdEmpresa, NombreEmpresa, IdTipoDocumento, Identificacion, Email, Telefono, Contacto, IdCiudad, Direccion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarEmpresa(string IdUser, int IdEmpresa)
        {
            string resultado = dataEmpresa.EliminarEmpresa(IdUser, IdEmpresa);
            return Json(resultado);
        }

        public ActionResult GridEmpresa()
        {
            var data = dataEmpresa.GridEmpresa();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }
       
        public JsonResult ListaEmpresa()
        {
            var resultado = dataEmpresa.ListaEmpresa();
            return Json(resultado);
        }
       
        public ActionResult ListaIdEmpresaXIdEmpleado(int IdEmpleado)
        {
            var resultado = dataEmpresa.ListaIdEmpresaXIdEmpleado(IdEmpleado);
            return Json(resultado);
        }              
    }
}