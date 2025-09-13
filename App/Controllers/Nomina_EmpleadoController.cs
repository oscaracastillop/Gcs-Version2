using Data.DataEntities;
using Humanizer;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using SistemaGcs.Data.DataEntities;
using System;
using System.Globalization;
using System.Web.Mvc;
namespace App.Controllers
{
    public class Nomina_EmpleadoController : Controller
    {
        static Nomina_EmpleadoController()
        {
            QuestPDF.Settings.License = LicenseType.Community;
        }

        private readonly DataNominaEmpleado dataNominaEmpleado = new DataNominaEmpleado();
        private readonly DataEmpresa dataEmpresa = new DataEmpresa();


        public JsonResult CrearNominaEmpleado(string IdUser, int IdEmpleado, string FechaInicio, string FechaFin, int DiasaPagar)
        {
            var resultado = dataNominaEmpleado.CrearNominaEmpleado(IdUser, IdEmpleado, FechaInicio, FechaFin, DiasaPagar);
            return Json(resultado);
        }

        public JsonResult PagarNominaEmpleado(string IdUser, int IdNominaEmpleado)
        {
            var resultado = dataNominaEmpleado.PagarNominaEmpleado(IdUser, IdNominaEmpleado);
            return Json(resultado);
        }

        public JsonResult EliminarNominaEmpleado(string IdUser, int IdNominaEmpleado)
        {
            var resultado = dataNominaEmpleado.EliminarNominaEmpleado(IdUser, IdNominaEmpleado);
            return Json(resultado);
        }

        public ActionResult GridNominaEmpleado()
        {
            var data = dataNominaEmpleado.GridNominaEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DatosComprobanteNomina(int Id)
        {
            var data = dataNominaEmpleado.DatosComprobanteNomina(Id);
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CargarDatosEmpleadoNomina(int IdEmpleado, string FechaInicio, string FechaFin, int DiasaPagar)
        {
            var resultado = dataNominaEmpleado.CargarDatosEmpleadoNomina(IdEmpleado, FechaInicio, FechaFin, DiasaPagar);
            return Json(resultado);
        }

        #region Plantilla Comprobante Nomina







        public ActionResult DescargarComprobanteNomina(int id)
        {
            // Registrar la fuente Lato
            var fontPath = Server.MapPath("~/Content/Lato-Regular.ttf");
            var fontStream = System.IO.File.OpenRead(fontPath);
            var cultura = new CultureInfo("es-CO");

            // Datos empresa
            var datosEmpresa = dataEmpresa.GridEmpresa();
            if (datosEmpresa == null || datosEmpresa.Count == 0)
                return HttpNotFound();
            var a = datosEmpresa[0];

            // Obtener los datos del comprobante
            var datos = dataNominaEmpleado.DatosComprobanteNomina(id);
            if (datos == null || datos.Count == 0)
                return HttpNotFound();

            var d = datos[0];

            // Ruta del logo
            var logoPath = Server.MapPath($"~/Images/LogoEmpresa/{d.Logo}");
            byte[] logoBytes = System.IO.File.ReadAllBytes(logoPath);

            var firmaRLPath = Server.MapPath($"~/Images/FirmaRepresentanteLegal/Firma RL EG.jpeg");
            byte[] firmaRLBytes = System.IO.File.ReadAllBytes(firmaRLPath);

            // Conversión de montos a formato moneda
            decimal.TryParse(d.SalarioMensual, out var SalarioMensualDecimal);
            decimal.TryParse(d.SubTransporteMes, out var SubTransporteMesDecimal);
            decimal.TryParse(d.ValorHED, out var ValorHEDDecimal);
            decimal.TryParse(d.ValorHEN, out var ValorHENDecimal);
            decimal.TryParse(d.ValorHEDDF, out var ValorHEDDFDecimal);
            decimal.TryParse(d.ValorHENDF, out var ValorHENDFDecimal);
            decimal.TryParse(d.TotalPagar, out var TotalPagarDecimal);

            string TotalPagarFormateado = TotalPagarDecimal.ToString("C0", cultura);

            // Convertir Total a Pagar a letras
            long totalEntero = (long)Math.Floor(TotalPagarDecimal);
            int centavos = (int)((TotalPagarDecimal - totalEntero) * 100);
            string TotalPagarLetras = totalEntero.ToWords(new CultureInfo("es")).ToUpperInvariant() + " PESOS";
            if (centavos > 0)
                TotalPagarLetras += $" CON {centavos}/100";

            // Consecutivo del comprobante
            string consecutivocle = d.Id.ToString("D6");

            // Generación del PDF
            var pdfBytes = Document.Create(container =>
            {
                container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(2, Unit.Centimetre);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontFamily("Lato").FontSize(12));

                // Header en todas las páginas, pero con contenido único
                page.Header().BorderBottom(0).BorderColor(Colors.Grey.Lighten2).PaddingBottom(5).Row(row =>
                {
                    // --- Logo a la izquierda ---
                    row.ConstantItem(100).Height(60).Image(logoBytes).FitHeight();

                    // --- Datos de la empresa en el centro ---
                    row.RelativeItem().Column(col =>
                    {
                        col.Item().AlignLeft().Text(a.Nombre)
                            .Bold().FontSize(14);

                        col.Item().AlignLeft().Text($"NIT: {a.Identificacion}")
                            .FontSize(9).FontColor(Colors.Grey.Darken2);

                        col.Item().AlignLeft().Text($"{a.Direccion}, {a.Ciudad}")
                            .FontSize(7).FontColor(Colors.Grey.Darken2);

                        col.Item().AlignLeft().Text($"Email: {a.Email}")
                            .FontSize(7).FontColor(Colors.Grey.Darken2);

                        col.Item().AlignLeft().Text($"Tel: {a.Telefono} | Cel: {a.Celular}")
                            .FontSize(7).FontColor(Colors.Grey.Darken2);
                    });

                    // --- Número de cotización a la derecha ---
                    row.ConstantItem(180).AlignTop().Column(col =>
                    {
                        col.Item().AlignRight().Text($"COMPROBANTE DE NÓMINA N° {d.Id}").FontSize(8).FontColor(Colors.Grey.Darken2);
                        //col.Item().AlignCenter().Text($"N° {d.Id}").Bold().FontSize(10).FontColor(Colors.Red.Darken2);
                        col.Item().AlignRight().Text($"Periodo: {d.PeriodoLiquidado:dd/MM/yyyy}")
                            .FontSize(8).FontColor(Colors.Grey.Darken2);
                    }); // Solo en la primera página
                });

                // --- Contenido principal ---
                page.Content().PaddingTop(10).Column(col =>
                {

                    col.Item().Background("#FAFAFA") // Fondo gris muy suave
                     .Border(1).BorderColor(Colors.Grey.Lighten1)
                     .Padding(10).Column(c =>
                     {
                         // Título centrado con color
                         c.Item().AlignCenter().Text("DATOS EMPLEADO")
                         .Bold().FontSize(11).FontColor(Colors.Blue.Darken2);
                     });

                    col.Item().PaddingTop(5);
                    // Bloque cliente en columnas
                    col.Item().Background("#FAFAFA") // Fondo gris muy suave
                        .Border(1).BorderColor(Colors.Grey.Lighten1)
                        .Padding(10).Column(c =>
                        {

                            //c.Item().PaddingBottom(4);

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

                                    InfoIzq("Empleado:", d.Empleado);
                                    InfoIzq("Tipo Contrato:", d.TipoContrato);
                                    InfoIzq("Fecha Ingreso:", $"{d.FechaDiaIngreso} de {d.FechaMesIngreso} del {d.FechaYearIngreso}");
                                    InfoIzq("Salario Mensual:", SalarioMensualDecimal.ToString("C0", cultura));
                                    InfoIzq("Banco:", d.NombreBanco);
                                    InfoIzq("Sucursal Empleado:", d.Sucursal);
                                    InfoIzq("Fondo Cesantías:", d.NombreFondoCesantias);



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

                                    InfoDer("Identificación:", d.Identificacion);
                                    InfoDer("Cargo:", d.Cargo);
                                    InfoDer("Permanencia:", d.Permanencia);
                                    InfoDer("Sub Trans Mensual:", SubTransporteMesDecimal.ToString("C0", cultura));
                                    InfoDer("# Cuenta:", d.NumeroCuenta);
                                    InfoDer("Eps:", d.NombreEps);
                                    InfoDer("Fondo Pensión:", d.NombreFondoPension);
                                });
                            });
                        });
                    col.Item().PaddingTop(20);
                    // Bloque cliente en columnas
                    col.Item().Background("#FAFAFA") // Fondo gris muy suave
                        .Border(1).BorderColor(Colors.Grey.Lighten1)
                        .Padding(10).Column(c =>
                        {
                            // Título centrado con color
                            c.Item().AlignCenter().Text("DATOS NÓMINA")
                            .Bold().FontSize(11).FontColor(Colors.Blue.Darken2);
                        });


                    // --- Tabla de Ingresos y Descuentos con padding horizontal y totales resaltados ---
                    col.Item().PaddingTop(5).Row(row =>
                    {
                        // INGRESOS
                        row.RelativeItem().Column(ing =>
                        {
                            ing.Item().Background(Colors.Grey.Lighten3).Padding(5).Text("INGRESOS").Bold().FontSize(9).AlignCenter();
                            ing.Item().LineHorizontal(1).LineColor(Colors.Grey.Darken1);

                            void IngresoFila(string concepto, decimal valor)
                            {
                                ing.Item().PaddingLeft(5).PaddingRight(5) // padding vertical, padding horizontal
                                   .Row(r =>
                                   {
                                       r.RelativeItem().Text(concepto).FontSize(8).FontColor(Colors.Grey.Darken2);
                                       r.RelativeItem().AlignRight().Text(valor.ToString("C0", cultura)).FontSize(8).FontColor(Colors.Black);
                                   });
                            }

                            IngresoFila("Sueldo:", decimal.Parse(d.Sueldo));
                            IngresoFila("Auxilio transporte:", decimal.Parse(d.SubTransporte));
                            IngresoFila("HE Diurna:", decimal.Parse(d.ValorTotalHED));
                            IngresoFila("HE Nocturna:", decimal.Parse(d.ValorTotalHEN));
                            IngresoFila("HE Diurna D/F:", decimal.Parse(d.ValorTotalHEDDF));
                            IngresoFila("HE Nocturna D/F:", decimal.Parse(d.ValorHENDF));
                            IngresoFila("Desembolso Préstamo:", decimal.Parse(d.DesembolsoPrestamo));
                            IngresoFila("Otros Ingresos *:", decimal.Parse(d.OtrosIngresos));

                            // Total Ingresos resaltado
                            //ing.Item().LineHorizontal(1).LineColor(Colors.Grey.Darken1);
                            ing.Item().PaddingBottom(3);
                            ing.Item().Background(Colors.Grey.Darken2).PaddingLeft(5).PaddingRight(5).Row(r =>
                            {
                                r.RelativeItem().Text("Total Ingresos:").Bold().FontSize(9).FontColor(Colors.White);
                                r.RelativeItem().AlignRight().Text(decimal.Parse(d.TotalIngresos).ToString("C0", cultura)).Bold().FontSize(9).FontColor(Colors.White);
                            });
                        });

                        // Separador visual
                        row.ConstantItem(20).BorderLeft(0).BorderColor(Colors.Grey.Lighten2);

                        // DESCUENTOS
                        row.RelativeItem().Column(desc =>
                        {
                            desc.Item().Background(Colors.Grey.Lighten3).Padding(5).Text("DESCUENTOS").Bold().FontSize(9).AlignCenter();
                            desc.Item().LineHorizontal(1).LineColor(Colors.Grey.Darken1);

                            void DescuentoFila(string concepto, decimal valor)
                            {
                                desc.Item().PaddingLeft(5).PaddingRight(5) // padding vertical, horizontal
                                   .Row(r =>
                                   {
                                       r.RelativeItem().Text(concepto).FontSize(8).FontColor(Colors.Grey.Darken2);
                                       r.RelativeItem().AlignRight().Text(valor.ToString("C0", cultura)).FontSize(8).FontColor(Colors.Black);
                                   });
                            }

                            DescuentoFila($"EPS {d.PorcentajeEps}%:", decimal.Parse(d.Eps));
                            DescuentoFila($"Pensión {d.PorcentajePension}%:", decimal.Parse(d.Pension));
                            DescuentoFila("Casino:", decimal.Parse(d.Casino));
                            DescuentoFila("Cobro Préstamo:", decimal.Parse(d.CobroPrestamo));
                            DescuentoFila("Otros Descuentos **:", decimal.Parse(d.OtrosDescuentos));

                            // Total Descuentos resaltado
                            //desc.Item().LineHorizontal(1).LineColor(Colors.Grey.Darken1);
                            desc.Item().PaddingBottom(3);
                            desc.Item().Background(Colors.Grey.Darken2).PaddingLeft(5).PaddingRight(5).Row(r =>
                            {
                                r.RelativeItem().Text("Total Descuentos:").Bold().FontSize(9).FontColor(Colors.White);
                                r.RelativeItem().AlignRight().Text(decimal.Parse(d.TotalDescuentos).ToString("C0", cultura)).Bold().FontSize(9).FontColor(Colors.White);
                            });
                        });
                    });

                    // --- Total a Pagar con enfoque destacado ---
                    col.Item()
                        .PaddingVertical(8) // más separación vertical
                        //.Background(Colors.Grey.Lighten2) // fondo más visible
                        .Row(r =>
                        {
                            r.RelativeItem()
                                .Text("TOTAL A PAGAR:")
                                .SemiBold()           // estilo título
                                .FontSize(13)         // más grande
                                .FontColor(Colors.Black);
                            r.RelativeItem()
                                .AlignRight()
                                .Text(TotalPagarFormateado)
                                .SemiBold()
                                .FontSize(13)         // más grande
                                .FontColor(Colors.Black);
                        });

                    // Total en letras con más enfoque
                    col.Item()
                        .PaddingTop(3)
                        .Text($"({TotalPagarLetras} COLOMBIANOS (COP))")
                        .FontSize(10)
                        .Italic()
                        .FontColor(Colors.Black)
                        .AlignRight();

                    // Línea separadora reforzada
                    col.Item()
                        .PaddingTop(5)
                        .LineHorizontal(1.5f) // línea un poco más gruesa
                        .LineColor(Colors.Grey.Darken1);




                    col.Item()
     .Column(colHE =>
     {
         // Título de la sección
         colHE.Item()
             .Padding(5)
             .Text("HORAS EXTRAS Y OTROS CONCEPTOS")
             .Bold()
             .FontSize(9)
             .FontColor(Colors.Blue.Darken2);

         // Cantidad de horas extras
         colHE.Item()
             .PaddingVertical(2)
             .PaddingHorizontal(10)
             .Text($"1. Realizadas: Hora Extra Diurna {d.CantHED}, Hora Extra Nocturna {d.CantHEN}, Hora Extra Diurna Domical/Festiva {d.CantHEDDF}, Hora Extra Nocturna Domical/Festiva {d.CantHENDF}.")
             .FontSize(8)
             .Justify();

        

         // Valores correspondientes de horas extras
         colHE.Item()
             .PaddingVertical(2)
             .PaddingHorizontal(10)
             .Text($"2. Valores: Hora Extra Diurna {ValorHEDDecimal.ToString("C0", cultura)}, Hora Extra Nocturna {ValorHENDecimal.ToString("C0", cultura)}, Hora Extra Diurna Domical/Festiva {ValorHEDDFDecimal.ToString("C0", cultura)}, Hora Extra Nocturna Domical/Festiva {ValorHENDFDecimal.ToString("C0", cultura)}.")
             .FontSize(8)
             .Justify();

         // Otros ingresos
         colHE.Item()
             .PaddingVertical(2)
             .PaddingHorizontal(10)
             .Text($"3. *Otros Ingresos: {d.ConceptoIngresosAdicionales}")
             .Justify()
             .FontSize(8);

         // Otros descuentos
         colHE.Item()
             .PaddingVertical(2)
             .PaddingHorizontal(10)
             .Text($"4. **Otros Descuentos: {d.ConceptoDescuentosAdicionales}")
             .Justify()
             .FontSize(8);
     });






                    // --- Firmas ---
                    col.Item().PaddingTop(50).Row(r =>
                    {
                        r.RelativeItem().AlignCenter().Text("").SemiBold();
                        r.RelativeItem().AlignCenter().Height(50).Image(firmaRLBytes).FitHeight();
                    });
                    col.Item().Row(r =>
                    {
                        r.RelativeItem().AlignCenter().Text("Firma Trabajador").SemiBold();
                        r.RelativeItem().AlignCenter().Text("Firma o Sello Empresa").SemiBold();
                    });
                    col.Item().Row(r =>
                    {
                        r.RelativeItem().AlignCenter().Text(d.Empleado).SemiBold().FontSize(8);
                        r.RelativeItem().AlignCenter().Text(d.RLEmpresa).SemiBold().FontSize(8);
                    });
                    col.Item().Row(r =>
                    {
                        r.RelativeItem().AlignCenter().Text("").SemiBold().FontSize(8);
                        r.RelativeItem().AlignCenter().Text("Representante Legal").SemiBold().FontSize(8);
                    });
                    col.Item().Row(r =>
                    {
                        r.RelativeItem().AlignCenter().Text("").SemiBold().FontSize(8);
                        r.RelativeItem().AlignCenter().Text(d.Empresa).SemiBold().FontSize(8);
                    });
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
            return File(pdfBytes, "application/pdf", $"Comprobante Nomina # {consecutivocle} {d.Empleado}.pdf");
        }










        #endregion

    }


}