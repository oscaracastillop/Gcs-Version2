using SistemaGcs.Data.DataEntities;
using System.Data.Entity;
using System.IO;
using System;
using System.Web.Mvc;

namespace SistemaGcs.App.Controllers
{
    public class EmpresaController : Controller
    {
        private readonly DataEmpresa dataEmpresa = new DataEmpresa();

        private static string NombreLogoEmpresa = string.Empty;
        private static int IdEmpresaLogo;
        private static string IdUser = string.Empty;
        private static string RespuestaLogoEmpresa = string.Empty;
        private static string NombreLogoActualEmpresa = string.Empty;

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



        #region Metodo Guardar Imagen

        [HttpPost]
        public ActionResult GuardarLogoEmpresa()
        {

            string result = "";

            var file = Request.Files[0];
            var fileName = Path.GetFileName(file.FileName);
            var extension = Path.GetExtension(fileName);
            var nombreImagen = NombreLogoEmpresa + extension;



            if (extension == ".png" || extension == ".jpeg" || extension == ".jpg")
            {
                try
                {
                    string Ruta = "";
                    string RutaEliminar = "";

                    if (Request.Files.Count > 0)
                    {
                        Stream stream = file.InputStream;
                        Ruta = string.Format("/Images/LogoEmpresa/{0}", nombreImagen);
                        string oPath = Server.MapPath("~" + Ruta);

                        RutaEliminar = string.Format("/Images/LogoEmpresa/{0}", NombreLogoActualEmpresa);
                        string oPathEliminar = Server.MapPath("~" + RutaEliminar);

                        if (NombreLogoActualEmpresa == "default.png")
                        {
                            file.SaveAs(oPath);
                        }
                        else
                        {
                            System.IO.File.Delete((oPathEliminar));
                            file.SaveAs(oPath);
                        }

                        GuardarUrlLogoEmpresaBaseDatos(IdUser, IdEmpresaLogo, nombreImagen);

                        result = RespuestaLogoEmpresa;
                    }

                }
                catch (Exception )
                {
                    result = "Error*No se logro guardar la imagén.";
                }
            }
            else
            {
                result = "Error*El formato de la imagén no es correcto, solo se permiten imagenes (png, jpg, jpeg).";
            }
            return Json(result);
        }

        public JsonResult DatosEmpresa(int IdEmpresa, string IdUsuario, string NombreImagen)
        {
            NombreLogoEmpresa = "Empresa_" + IdEmpresa;
            IdEmpresaLogo = IdEmpresa;
            IdUser = IdUsuario;
            NombreLogoActualEmpresa = NombreImagen;
            return Json(NombreLogoEmpresa);
        }

        public JsonResult GuardarUrlLogoEmpresaBaseDatos(string IdUser, int IdEmpresa, string UrlLogoEmpresa)
        {
            RespuestaLogoEmpresa = dataEmpresa.GuardarUrlLogoEmpresaBaseDatos(IdUser, IdEmpresa, UrlLogoEmpresa);
            return Json(RespuestaLogoEmpresa);
        }

        #endregion



    }
}