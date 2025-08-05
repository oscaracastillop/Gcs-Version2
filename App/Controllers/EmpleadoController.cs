using Data.DataEntities;
using SistemaGcs.Data.DataEntities;
using System;
using System.IO;
using System.Web.Mvc;

namespace App.Controllers
{
    public class EmpleadoController : Controller
    {
        private readonly DataEmpleado dataEmpleado = new DataEmpleado();

        private static string NombreImagenHVEmpleado = string.Empty;
        private static int IdHVEmpleadoImagen;
        private static string IdUser = string.Empty;
        private static string RespuestaImagenHVEmpleado = string.Empty;
        private static string NombreImagenActualEmpleado = string.Empty;


        public ActionResult Index()
        {
            return View();
        }

        public JsonResult CrearEmpleado(string IdUser, string Nombre, string Apellidos, int IdTipoDocumento, string Identificacion, string CiudadExpedicion)
        {
            var resultado = dataEmpleado.CrearEmpleado(IdUser, Nombre, Apellidos, IdTipoDocumento, Identificacion, CiudadExpedicion);

            return Json(resultado);
        }

        public JsonResult ActualizarEmpleado(string IdUser, int IdEmpleado, string Nombre, string Apellidos, int IdTipoDocumento, string Identificacion, string CiudadExpedicion, int IdEstado)
        {
            var resultado = dataEmpleado.ActualizarEmpleado(IdUser, IdEmpleado, Nombre, Apellidos, IdTipoDocumento, Identificacion, CiudadExpedicion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarEmpleado(string IdUser, int IdEmpleado)
        {
            string resultado = dataEmpleado.EliminarEmpleado(IdUser, IdEmpleado);
            return Json(resultado);
        }

        [HttpPost]
        public ActionResult GuardarImagenHVEmpleado()
        {

            string result = "";

            var file = Request.Files[0];
            var fileName = Path.GetFileName(file.FileName);
            var extension = Path.GetExtension(fileName);
            var nombreImagen = NombreImagenHVEmpleado + extension;



            if (extension == ".png" || extension == ".jpeg" || extension == ".jpg")
            {
                try
                {
                    string Ruta = "";
                    string RutaEliminar = "";

                    if (Request.Files.Count > 0)
                    {
                        Stream stream = file.InputStream;
                        Ruta = string.Format("/Images/ImagenHVEmpleado/{0}", nombreImagen);
                        string oPath = Server.MapPath("~" + Ruta);

                        RutaEliminar = string.Format("/Images/ImagenHVEmpleado/{0}", NombreImagenActualEmpleado);
                        string oPathEliminar = Server.MapPath("~" + RutaEliminar);

                        if (NombreImagenActualEmpleado == "Empleado.png")
                        {
                            file.SaveAs(oPath);
                        }
                        else
                        {
                            System.IO.File.Delete((oPathEliminar));
                            file.SaveAs(oPath);
                        }

                        GuardarUrlImagenHVEmpleadoBaseDatos(IdUser, IdHVEmpleadoImagen, nombreImagen);

                        result = RespuestaImagenHVEmpleado;
                    }

                }
                catch (Exception)
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

        public JsonResult DatosEmpleado(int IdEmpleado, string IdUsuario, string NombreImagen)
        {
            NombreImagenHVEmpleado = "Empleado_" + IdEmpleado;
            IdHVEmpleadoImagen = IdEmpleado;
            IdUser = IdUsuario;
            NombreImagenActualEmpleado = NombreImagen;
            return Json(NombreImagenHVEmpleado);
        }

        public JsonResult GuardarUrlImagenHVEmpleadoBaseDatos(string IdUser, int IdEmpleado, string UrlImagenHVEmpleado)
        {
            RespuestaImagenHVEmpleado = dataEmpleado.GuardarUrlImagenHVEmpleadoBaseDatos(IdUser, IdEmpleado, UrlImagenHVEmpleado);
            return Json(RespuestaImagenHVEmpleado);
        }


        public ActionResult GridEmpleado()
        {
            var data = dataEmpleado.GridEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaEmpleado()
        {
            var resultado = dataEmpleado.ListaEmpleado();
            return Json(resultado);
        }
        public ActionResult BuscarImagenEmpleado(int IdEmpleado)
        {
            var resultado = dataEmpleado.BuscarImagenEmpleado(IdEmpleado);
            return Json(resultado);
        }

    }
}