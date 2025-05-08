using Data.DataEntities;
using System;
using System.IO;
using System.Web.Mvc;

namespace App.Controllers
{
    public class ProductoController : Controller
    {
        private readonly DataProducto dataProducto = new DataProducto();

        private static string NombreImagenProducto = string.Empty;
        private static int IdProductoImagen;
        private static string IdUser = string.Empty;
        private static string RespuestaImagenProducto = string.Empty;
        private static string NombreImagenActualProducto = string.Empty;

        public JsonResult CrearProducto(string IdUser, int IdCategoria, string NombreProducto, string MarcaProducto, string ReferenciaProducto, string CodigoProducto, int IdUnidadMedida, int StockMinimo, string Descripcion)
        {
            var resultado = dataProducto.CrearProducto(IdUser, IdCategoria, NombreProducto, MarcaProducto, ReferenciaProducto, CodigoProducto, IdUnidadMedida, StockMinimo, Descripcion);

            return Json(resultado);
        }

        public JsonResult ActualizarProducto(string IdUser, int IdProducto, int IdCategoria, string NombreProducto, string MarcaProducto, string ReferenciaProducto, string CodigoProducto, int IdUnidadMedida, int StockMinimo, int IdEstado, string Descripcion)
        {
            var resultado = dataProducto.ActualizarProducto(IdUser, IdProducto, IdCategoria, NombreProducto, MarcaProducto, ReferenciaProducto, CodigoProducto, IdUnidadMedida, StockMinimo, IdEstado, Descripcion);

            return Json(resultado);
        }

        public JsonResult EliminarProducto(string IdUser, int IdProducto)
        {
            string resultado = dataProducto.EliminarProducto(IdUser, IdProducto);
            return Json(resultado);
        }

        [HttpPost]
        public ActionResult GuardarImagenProducto()
        {

            string result = "";

            var file = Request.Files[0];
            var fileName = Path.GetFileName(file.FileName);
            var extension = Path.GetExtension(fileName);
            var nombreImagen = NombreImagenProducto + extension;

            if (extension == ".png" || extension == ".jpeg" || extension == ".jpg")
            {
                try
                {
                    string Ruta = "";
                    string RutaEliminar = "";

                    if (Request.Files.Count > 0)
                    {
                        Stream stream = file.InputStream;
                        Ruta = string.Format("/Images/ImagenProducto/{0}", nombreImagen);
                        string oPath = Server.MapPath("~" + Ruta);

                        RutaEliminar = string.Format("/Images/ImagenProducto/{0}", NombreImagenActualProducto);
                        string oPathEliminar = Server.MapPath("~" + RutaEliminar);

                        if (NombreImagenActualProducto == "Producto.png")
                        {
                            file.SaveAs(oPath);
                        }
                        else
                        {
                            System.IO.File.Delete((oPathEliminar));
                            file.SaveAs(oPath);
                        }

                        GuardarUrlImagenBaseDatos(IdUser, IdProductoImagen, nombreImagen);

                        result = RespuestaImagenProducto;
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

        public JsonResult DatosProducto(int IdProducto, string IdUsuario, string NombreImagen)
        {
            NombreImagenProducto = "Producto_" + IdProducto;
            IdProductoImagen = IdProducto;
            IdUser = IdUsuario;
            NombreImagenActualProducto = NombreImagen;
            return Json(NombreImagenProducto);
        }

        public JsonResult GuardarUrlImagenBaseDatos(string IdUser, int IdProducto, string UrlImagenProducto)
        {
            RespuestaImagenProducto = dataProducto.GuardarUrlImagenBaseDatos(IdUser, IdProducto, UrlImagenProducto);
            return Json(RespuestaImagenProducto);
        }

        public ActionResult GridProducto()
        {
            var data = dataProducto.GridProducto();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaProducto()
        {
            var resultado = dataProducto.ListaProducto();
            return Json(resultado);
        }
        public JsonResult ListaProductoxCategoria(int IdCategoria)
        {
            var resultado = dataProducto.ListaProductoxCategoria(IdCategoria);
            return Json(resultado);
        }

    }
}