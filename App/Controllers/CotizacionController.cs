using Data.DataEntities;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using SistemaGcs.Data.DataEntities;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;


namespace App.Controllers
{
    public class CotizacionController : Controller
    {
        static CotizacionController()
        {
            QuestPDF.Settings.License = LicenseType.Community;
        }

        private readonly DataCotizacion dataCotizacion = new DataCotizacion();
        private readonly DataDetalleCotizacion dataDetalleCotizacion = new DataDetalleCotizacion();
        private readonly DataEmpresa dataEmpresa = new DataEmpresa();

        public JsonResult CrearCotizacion(string IdUser, int IdCliente)
        {
            var resultado = dataCotizacion.CrearCotizacion(IdUser, IdCliente);

            return Json(resultado);
        }

        public ActionResult GridCotizacion()
        {
            var data = dataCotizacion.GridCotizacion();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }













        #region Plantilla Cotizacion PDF
        public ActionResult descargarCotizacion(int id)
        {
            // Registrar fuente
            var fontPath = Server.MapPath("~/Content/Lato-Regular.ttf");
            var fontStream = System.IO.File.OpenRead(fontPath);
            var cultura = new CultureInfo("es-CO");

            // Datos empresa
            var datosEmpresa = dataEmpresa.GridEmpresa();
            if (datosEmpresa == null || datosEmpresa.Count == 0)
                return HttpNotFound();
            var a = datosEmpresa[0];

            // Datos cotización
            var datos = dataCotizacion.DatosCabeceraCotizacionPdf(id);
            if (datos == null || datos.Count == 0)
                return HttpNotFound();
            var d = datos[0];

            // Detalle
            var listaProductos = dataDetalleCotizacion.GridDetalleCotizacionPdf(id);
            if (listaProductos == null || listaProductos.Count == 0)
                return HttpNotFound();

            // Logo y firma
            var logoPath = Server.MapPath($"~/Images/LogoEmpresa/{a.Logo}");
            byte[] logoBytes = System.IO.File.Exists(logoPath) ? System.IO.File.ReadAllBytes(logoPath) : null;

            var firmaRLPath = Server.MapPath($"~/Images/FirmaRepresentanteLegal/Firma RL EG.jpeg");
            byte[] firmaRLBytes = System.IO.File.Exists(firmaRLPath) ? System.IO.File.ReadAllBytes(firmaRLPath) : null;

            // Paleta
            var azul = Colors.Blue.Medium;
            

            var pdfBytes = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontFamily("Lato").FontSize(10));

                    // Header en todas las páginas, pero con contenido único
                    page.Header().BorderBottom(1).BorderColor(Colors.Grey.Lighten2).PaddingBottom(5).Row(row =>
                    {
                        // --- Logo a la izquierda ---
                        row.ConstantItem(120).Height(60).Image(logoBytes).FitHeight();

                        // --- Datos de la empresa en el centro ---
                        row.RelativeItem().Column(col =>
                        {
                            col.Item().AlignCenter().Text(a.Nombre)
                                .Bold().FontSize(14).FontColor(Colors.Blue.Darken2);

                            col.Item().AlignCenter().Text($"NIT: {a.Identificacion}")
                                .FontSize(9).FontColor(Colors.Grey.Darken2);

                            col.Item().AlignCenter().Text($"{a.Direccion}, {a.Ciudad}")
                                .FontSize(7).FontColor(Colors.Grey.Darken2);                            

                            col.Item().AlignCenter().Text($"Email: {a.Email}")
                                .FontSize(7).FontColor(Colors.Grey.Darken2);

                            col.Item().AlignCenter().Text($"Tel: {a.Telefono}")
                                .FontSize(7).FontColor(Colors.Grey.Darken2);
                        });

                        // --- Número de cotización a la derecha ---
                        row.ConstantItem(180).AlignMiddle().Background("#F0F4FF").Border(1).BorderColor(Colors.Blue.Darken1).Padding(8).Column(col =>
                        {
                            col.Item().AlignCenter().Text("COTIZACIÓN").Bold().FontSize(9).FontColor(Colors.Blue.Darken2);
                            col.Item().AlignCenter().Text($"N° {d.CodigoCotizacion}")
                                .Bold().FontSize(10).FontColor(Colors.Red.Darken2);
                            col.Item().AlignCenter().Text($"Fecha: {d.FechaCotizacion:dd/MM/yyyy}")
                                .FontSize(8).FontColor(Colors.Grey.Darken2);
                        }); // Solo en la primera página
                    });


                    // CONTENIDO
                    page.Content().PaddingTop(12).Column(col =>
                    {
                        // Bloque cliente en columnas
                        col.Item().Background("#FAFAFA") // Fondo gris muy suave
                            .Border(1).BorderColor(Colors.Grey.Lighten1)
                            .Padding(6).Column(c =>
                            {
                                // Título centrado con color
                                c.Item().AlignCenter().Text("INFORMACIÓN DEL CLIENTE")
                                .Bold().FontSize(11).FontColor(Colors.Blue.Darken2);

                                c.Item().PaddingBottom(4);

                                // Dividimos en 2 columnas
                                c.Item().Row(r =>
                                {
                                    // Columna izquierda
                                    r.RelativeItem().Column(colIzq =>
                                    {
                                        void InfoIzq(string etiqueta, string valor) =>
                                        colIzq.Item().Row(rr =>
                                        {
                                            rr.RelativeItem(1)
                                                .Background("#EAEAEA")
                                                .Border(0.5f).BorderColor(Colors.Grey.Lighten2)
                                                .Padding(3).Text(etiqueta).SemiBold().FontSize(7).FontColor(Colors.Black);

                                            rr.RelativeItem(2)
                                                .Border(0.5f).BorderColor(Colors.Grey.Lighten2)
                                                .Padding(3).Text(valor).FontSize(7).FontColor(Colors.Grey.Darken3);
                                        });

                                        InfoIzq("Cliente:", d.NombreCliente);
                                        InfoIzq("Identificación:", d.IdentificacionCliente);
                                        InfoIzq("Email:", d.EmailCliente);
                                        InfoIzq("Contacto:", d.ContactoCliente);
                                        InfoIzq("Dirección:", d.DireccionCiente);
                                    });

                                    // Columna derecha
                                    r.RelativeItem().Column(colDer =>
                                    {
                                        void InfoDer(string etiqueta, string valor) =>
                    colDer.Item().Row(rr =>
                                        {
                                            rr.RelativeItem(1)
                                                .Background("#EAEAEA")
                                                .Border(0.5f).BorderColor(Colors.Grey.Lighten2)
                                                .Padding(3).Text(etiqueta).SemiBold().FontSize(7).FontColor(Colors.Black);

                                            rr.RelativeItem(2)
                                                .Border(0.5f).BorderColor(Colors.Grey.Lighten2)
                                                .Padding(3).Text(valor).FontSize(7).FontColor(Colors.Grey.Darken3);
                                        });

                                        InfoDer("Teléfono:", d.TelefonoCliente);
                                        InfoDer("Celular:", d.CelularCliente);
                                        InfoDer("Forma de Pago:", d.FormaPagoCiente);
                                        InfoDer("Plazo de Pago:", d.PlazoPagoCliente);                                        
                                        InfoDer("Ciudad:", d.CiudadCliente);
                                    });
                                });
                            });



                        // Texto introductorio ampliado y estilizado
                        col.Item().PaddingTop(12).Text(text =>
                        {
                            text.Justify();

                            text.Span("A continuación, nos permitimos presentar la cotización solicitada por ").FontSize(8);
                            text.Span($"{d.NombreCliente}").Bold().FontSize(8).FontColor(Colors.Blue.Darken2);
                            text.Span(" a nuestra compañía ").FontSize(8);
                            text.Span($"{d.NombreEmpresa}").Bold().FontSize(8).FontColor(Colors.Blue.Darken2);
                            text.Span(", por lo anterior, anexamos los valores correspondientes a los servicios y/o productos solicitados. ").FontSize(8);
                            text.Span("Nuestra empresa se compromete a ofrecer productos de alta calidad, cumplimiento en los tiempos de entrega y un servicio al cliente personalizado, asegurando que todas las necesidades de su empresa sean atendidas con la mayor eficiencia y responsabilidad. ").FontSize(8);
                            text.Span("Agradecemos la confianza depositada en nosotros y quedamos atentos a cualquier consulta o aclaración adicional que requiera. ").FontSize(8);
                            text.Span("Estamos seguros de que nuestra propuesta será de su interés y contribuirá al éxito de sus proyectos.").FontSize(8);
                        });


                        // Título Detalle
                        col.Item().PaddingTop(12)
                            .Background("#E3F2FD")        // Fondo azul muy suave
                            .Border(0.5f).BorderColor(Colors.Blue.Lighten3)
                            .Padding(6).AlignCenter()
                            .Text("DETALLE DE LA COTIZACIÓN")
                            .Bold().FontSize(12).FontColor(Colors.Blue.Darken2);

                        // Tabla de productos
                        col.Item().PaddingTop(5).Border(1).BorderColor(Colors.Grey.Lighten2).Column(prod =>
                        {
                            // Encabezado con fondo azul claro
                            prod.Item().Background("#BBDEFB").Row(r =>
                            {
                                r.RelativeItem(0.5f).Padding(3).Text("N°").FontSize(8).Bold().AlignCenter();
                                r.RelativeItem(1.2f).Padding(3).Text("Código").FontSize(8).Bold().AlignCenter();
                                r.RelativeItem(2f).Padding(3).Text("Nombre").FontSize(8).Bold().AlignCenter();
                                r.RelativeItem(1f).Padding(3).Text("Cant.").FontSize(8).Bold().AlignCenter();
                                r.RelativeItem(1.2f).Padding(3).Text("Precio Unid").FontSize(8).Bold().AlignCenter();
                                r.RelativeItem(1f).Padding(3).Text("% IVA").FontSize(8).Bold().AlignCenter();
                                r.RelativeItem(1.2f).Padding(3).Text("Valor IVA").FontSize(8).Bold().AlignCenter();
                                r.RelativeItem(1.2f).Padding(3).Text("Total").FontSize(8).Bold().AlignCenter();
                            });

                            // Filas de productos con zebra suave
                            int cont = 1;
                            foreach (var b in listaProductos)
                            {
                                var bg = cont % 2 == 0 ? Colors.White : Color.FromHex("#F1F8E9");

                                prod.Item().Row(r =>
                                {
                                    r.RelativeItem(0.5f).Background(bg).Padding(3).Text($"{cont}").FontSize(7).AlignCenter();
                                    r.RelativeItem(1.2f).Background(bg).Padding(3).Text(b.CodigoProducto).FontSize(7).AlignCenter();
                                    r.RelativeItem(2f).Background(bg).Padding(3).Text(b.Nombre).FontSize(7);
                                    r.RelativeItem(1f).Background(bg).Padding(3).Text($"{b.Cantidad:N0}").FontSize(7).AlignRight();
                                    r.RelativeItem(1.2f).Background(bg).Padding(3).Text($"$ {b.PrecioUnitario:N0}").FontSize(7).AlignRight();
                                    r.RelativeItem(1f).Background(bg).Padding(3).Text($"{b.PorcentajeIva}%").FontSize(7).AlignCenter();
                                    r.RelativeItem(1.2f).Background(bg).Padding(3).Text($"$ {b.ValorIva:N0}").FontSize(7).AlignRight();
                                    r.RelativeItem(1.2f).Background(bg).Padding(3).Text($"$ {b.Total:N0}").FontSize(7).AlignRight();
                                });

                                cont++;
                            }

                            // Totales destacados con fondo azul muy suave
                            prod.Item().PaddingTop(5).Background("#E3F2FD").Row(r =>
                            {
                                r.RelativeItem(0.5f);
                                r.RelativeItem(1f);
                                r.RelativeItem(2f).Padding(3).Text("TOTAL:").FontSize(8).Bold().AlignRight();
                                r.RelativeItem(1f).Padding(3).Text($"{listaProductos.Sum(p => p.Cantidad):N0}").FontSize(8).Bold().AlignRight();
                                r.RelativeItem(1.2f);
                                r.RelativeItem(1f);
                                r.RelativeItem(1.2f).Padding(3).Text($"$ {listaProductos.Sum(p => p.ValorIva):N0}").FontSize(8).Bold().AlignRight();
                                r.RelativeItem(1.2f).Padding(3).Text($"$ {listaProductos.Sum(p => p.Total):N0}").FontSize(8).Bold().AlignRight();
                            });
                        });


                        /// --- Políticas y condiciones ---
                        col.Item()
                           .PaddingTop(20)
                           .Background("#F9F9F9")
                           .Padding(10) // Solo padding interno, sin borde
                           .Column(p =>
                           {
                               p.Spacing(4); // Espaciado vertical uniforme entre items

                               // Políticas de cotización
                               p.Item().Text("POLÍTICAS DE COTIZACIÓN")
                                .Bold().FontSize(10).FontColor(Colors.Blue.Darken2);

                               p.Item().Text("1. La presente cotización tiene una validez de 30 días calendario a partir de la fecha de emisión.").FontSize(8);
                               p.Item().Text("2. Los precios están expresados en pesos colombianos (COP) e incluyen los impuestos de ley.").FontSize(8);
                               p.Item().Text("3. La disponibilidad de productos está sujeta a inventario en el momento de la aceptación.").FontSize(8);
                               p.Item().Text("4. El tiempo de entrega será confirmado con el cliente una vez recibida la orden de compra.").FontSize(8);
                               p.Item().Text("5. Cualquier modificación en cantidades o referencias generará una nueva cotización.").FontSize(8);

                               // Condiciones de pago
                               p.Item().Height(6);
                               p.Item().Text("CONDICIONES DE PAGO").Bold().FontSize(10).FontColor(Colors.Blue.Darken2);
                               p.Item().Text("1. Se podrá solicitar un anticipo mínimo del 50% para dar inicio al pedido.").FontSize(8);
                               p.Item().Text("2. El saldo deberá ser cancelado contra entrega o según acuerdo comercial.").FontSize(8);
                               p.Item().Text("3. En caso de mora en los pagos, se podrán generar intereses de financiación.").FontSize(8);

                               // Entregas y garantías
                               p.Item().Height(6);
                               p.Item().Text("ENTREGAS Y GARANTÍAS").Bold().FontSize(10).FontColor(Colors.Blue.Darken2);
                               p.Item().Text("1. Los tiempos de entrega empezarán a contarse a partir de la confirmación del pedido y el anticipo.").FontSize(8);
                               p.Item().Text("2. La garantía de los productos será la establecida por el fabricante o la empresa.").FontSize(8);
                               p.Item().Text("3. La garantía no cubre daños ocasionados por mal uso o instalación inadecuada.").FontSize(8);

                               // Términos y condiciones generales
                               p.Item().Height(6);
                               p.Item().Text("TÉRMINOS Y CONDICIONES GENERALES").Bold().FontSize(10).FontColor(Colors.Blue.Darken2);
                               p.Item().Text("1. Esta cotización no constituye un contrato hasta ser aceptada por el cliente y confirmada por la empresa.").FontSize(8);
                               p.Item().Text("2. La empresa no se hace responsable por retrasos ocasionados por fuerza mayor.").FontSize(8);
                               p.Item().Text("3. Cualquier reclamo deberá presentarse por escrito dentro de los 5 días hábiles siguientes a la entrega.").FontSize(8);
                               p.Item().Text("4. Para efectos legales, ambas partes se someten a las leyes de la República de Colombia.").FontSize(8);

                               // Notas finales
                               p.Item().Height(6);
                               p.Item().Text("NOTAS FINALES").Bold().FontSize(10).FontColor(Colors.Blue.Darken2);
                               p.Item().Text($"Para dudas o aclaraciones comuníquese por medio del correo o el teléfono indicados en esta cotización.").FontSize(8);
                           });




                        // Firma
                        if (firmaRLBytes != null)
                        {
                            col.Item().PaddingTop(25).Row(r =>
                            {
                                r.RelativeItem().AlignCenter().Column(c =>
                                {
                                    c.Item().Height(50).Image(firmaRLBytes).FitHeight();
                                    c.Item().Text("Firma Representante Legal").FontSize(8).AlignCenter();
                                });
                            });
                        }
                    });
                    page.Footer().PaddingTop(5).Row(row =>
                    {
                        // Texto institucional a la izquierda
                        row.RelativeItem().AlignLeft().Text("Documento generado con Sofia Software Administrativo V 1.0")
                            .FontSize(7).FontColor(Colors.Grey.Medium);

                        // Numeración de páginas a la derecha
                        row.ConstantItem(120).AlignRight().Text(txt =>
                        {
                            txt.Span("Página ").FontSize(7).FontColor(Colors.Grey.Darken2);
                            txt.CurrentPageNumber().FontSize(7).FontColor(Colors.Grey.Darken2);
                            txt.Span(" de ").FontSize(7).FontColor(Colors.Grey.Darken2);
                            txt.TotalPages().FontSize(7).FontColor(Colors.Grey.Darken2);
                        });
                    });


                });
            }).GeneratePdf();

            fontStream.Dispose();
            return File(pdfBytes, "application/pdf", $"Cotizacion_{d.CodigoCotizacion}.pdf");
        }

        #endregion


    }
}