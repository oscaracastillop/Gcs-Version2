using Data.DataEntities;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Globalization;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
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
            return Json(resultado);    }










        #region Plantilla Comprobante Nomina
        public ActionResult DescargarComprobanteNomina(int id)
        {
            // Registrar la fuente Lato
            var fontPath = Server.MapPath("~/Content/Lato-Regular.ttf");
            var fontStream = System.IO.File.OpenRead(fontPath);
            var cultura = new CultureInfo("es-CO");

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

            var SalarioMensualArreglo = decimal.TryParse(d.SalarioMensual, out var SalarioMensualArregloDecimal)
                                        ? SalarioMensualArregloDecimal.ToString("C0", cultura)
                                        : d.SalarioMensual;

            var SubTransporteMesArreglo = decimal.TryParse(d.SubTransporteMes, out var SubTransporteMesDecimal)
                                        ? SubTransporteMesDecimal.ToString("C0", cultura)
                                        : d.SubTransporteMes;

            var ValorHEDArreglo = decimal.TryParse(d.ValorHED, out var ValorHEDDecimal)
                                        ? ValorHEDDecimal.ToString("C0", cultura)
                                        : d.ValorHED;

            var ValorHENArreglo = decimal.TryParse(d.ValorHEN, out var ValorHENDecimal)
                                        ? ValorHENDecimal.ToString("C0", cultura)
                                        : d.ValorHEN;

            var ValorHEDDFArreglo = decimal.TryParse(d.ValorHEDDF, out var ValorHEDDFDecimal)
                                      ? ValorHEDDFDecimal.ToString("C0", cultura)
                                      : d.ValorHEDDF;

            var ValorHENDFArreglo = decimal.TryParse(d.ValorHENDF, out var ValorHENDFDecimal)
                                        ? ValorHENDFDecimal.ToString("C0", cultura)
                                        : d.ValorHENDF;

            var TotalPagarArreglo = decimal.TryParse(d.TotalPagar, out var TotalPagarDecimal)
                                       ? TotalPagarDecimal.ToString("C0", cultura)
                                       : d.TotalPagar;

            var count = 0;
            var consecutivocle = "";
            count = (d.Id).ToString().Length;

            if (count == 1)
            {
                consecutivocle = "00000" + d.Id;
            }
            else if (count == 2)
            {
                consecutivocle = "0000" + d.Id;
            }
            else if (count == 3)
            {
                consecutivocle = "000" + d.Id;
            }
            else if (count == 4)
            {
                consecutivocle = "00" + d.Id;
            }
            else if (count == 5)
            {
                consecutivocle = "0" + d.Id;
            }
            else if (count == 6)
            {
                consecutivocle = "" + d.Id;
            }


            var pdfBytes = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontFamily("Lato").FontSize(12));

                    page.Header().PaddingTop(-20).Row(row =>
                    {
                        row.RelativeItem().Height(60).Image(logoBytes).FitHeight();
                        row.RelativeItem().AlignTop().Text($"Comprobante de Nómina - # {consecutivocle}")
                        .FontFamily("Lato").AlignRight().FontSize(10);
                        //.FontFamily("Lato").SemiBold().AlignRight().FontSize(10).FontColor(Colors.Blue.Darken1);
                    });

                    page.Content().PaddingTop(0).Column(col =>
                    {
                        col.Spacing(0);
                        // Datos generales del empleado
                        col.Item().Text($"{d.Empresa}").FontSize(15).Bold().AlignLeft();
                        col.Item().Text($"{d.TipoDocumentoEmpresa}: {d.IdentificacionEmpresa}").FontSize(6).AlignLeft();
                        col.Item().Text($"Email: {d.EmailEmpresa}").FontSize(6).AlignLeft();
                        col.Item().Text($"Telefono: {d.TelefonoEmpresa}").FontSize(6).AlignLeft();
                        col.Item().Text($"Celular: {d.CelularEmpresa}").FontSize(6).AlignLeft();
                        col.Item().PaddingBottom(30).Text("");

                        col.Item().PaddingTop(0).Text("INFORMACION EMPLEADO").Bold().FontSize(10);


                        col.Item().PaddingTop(5).Text(text =>
                        {
                            text.Justify();
                            text.Span("Nombre: ").SemiBold().FontSize(9);
                            text.Span($"{d.Empleado}").FontSize(9);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("Identificación: ").SemiBold().FontSize(9);
                            text.Span($"{d.Identificacion}").FontSize(9);
                        });

                        col.Item().PaddingTop(5).Row(row =>
                        {
                            row.RelativeItem().Text("Cargo:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.Cargo).FontSize(7);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Tipo de Contrato:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.TipoContrato).FontSize(7);
                        });
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Fecha de Ingreso:").SemiBold().FontSize(8);
                            row.RelativeItem().Text($"{d.FechaDiaIngreso} de {d.FechaMesIngreso} del {d.FechaYearIngreso}").FontSize(7);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Permanencia:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.Permanencia).FontSize(7);
                        });
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Salario Mensual:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(SalarioMensualArreglo).FontSize(7);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Sub Transporte Mensual:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(SubTransporteMesArreglo).FontSize(7);
                        });
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Periodo Nómina:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.PeriodoLiquidado).FontSize(7);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Días a Pagar:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.DiasPagar).FontSize(7);
                        });
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Banco:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.NombreBanco).FontSize(7);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Numero Cuenta:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.NumeroCuenta).FontSize(7);
                        });

                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Sucursal Empleado:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.Sucursal).FontSize(7);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Eps:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.NombreEps).FontSize(7);
                        });

                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Fondo Cesantías:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.NombreFondoCesantias).FontSize(7);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Fondo Pensión:").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.NombreFondoPension).FontSize(7);
                        });

                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Estado Nómina: ").SemiBold().FontSize(8);
                            row.RelativeItem().Text(d.Estado).FontSize(7);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("").SemiBold().FontSize(8);
                            row.RelativeItem().Text("").FontSize(7);
                        });

                        // Tabla de ingresos y descuentos
                        col.Item().PaddingTop(5).Row(row =>
                        {
                            // Ingresos: conceptos y valores
                            row.RelativeItem().Column(ing =>
                            {
                                ing.Item().PaddingTop(10).PaddingBottom(5).LineHorizontal(1).LineColor(Colors.Black);
                                ing.Item().Text("INGRESOS").SemiBold().FontSize(10).AlignCenter();
                                ing.Item().PaddingTop(5).PaddingBottom(10).LineHorizontal(1).LineColor(Colors.Black);
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Sueldo:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Sueldo, out var SueldoDecimal)
                                        ? SueldoDecimal.ToString("C0", cultura)
                                        : d.Sueldo
                                        ).FontSize(9);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Auxilio transporte:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.SubTransporte, out var auxTransporteDecimal)
                                        ? auxTransporteDecimal.ToString("C0", cultura)
                                        : d.SubTransporte
                                        ).FontSize(9);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text($"HE Diurna:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHED, out var ValorTotalHEDDecimal)
                                        ? ValorTotalHEDDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHED
                                        ).FontSize(9);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("HE Nocturna:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHEN, out var ValorTotalHENDecimal)
                                        ? ValorTotalHENDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHEN
                                        ).FontSize(9);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("HE Diurna D/F:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHEDDF, out var ValorTotalHEDDFDecimal)
                                        ? ValorTotalHEDDFDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHEDDF
                                        ).FontSize(9);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("HE Nocturna D/F:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHENDF, out var ValorTotalHENDFDecimal)
                                        ? ValorTotalHENDFDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHENDF
                                        ).FontSize(9);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Desembolso Préstamo:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                   decimal.TryParse(d.DesembolsoPrestamo, out var desembolsoDecimal)
                                       ? desembolsoDecimal.ToString("C0", cultura)
                                       : d.DesembolsoPrestamo
                                       ).FontSize(9);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Otros Ingresos *:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.OtrosIngresos, out var otrosIngresosDecimal)
                                        ? otrosIngresosDecimal.ToString("C0", cultura)
                                        : d.OtrosIngresos
                                        ).FontSize(9);
                                });
                                ing.Item().Text("").SemiBold();
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Total Ingresos:").SemiBold().FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.TotalIngresos, out var totalIngresosDecimal)
                                        ? totalIngresosDecimal.ToString("C0", cultura)
                                        : d.TotalIngresos).SemiBold().FontSize(10);
                                });
                            });

                            // Separador visual (línea vertical y espacio)
                            row.ConstantItem(20).PaddingHorizontal(10).BorderLeft(1).BorderColor(Colors.Grey.Lighten2);

                            // Descuentos: conceptos y valores
                            row.RelativeItem().Column(desc =>
                            {
                                desc.Item().PaddingTop(10).PaddingBottom(5).LineHorizontal(1).LineColor(Colors.Black);
                                desc.Item().Text("DESCUENTOS").SemiBold().FontSize(10).AlignCenter();
                                desc.Item().PaddingTop(5).PaddingBottom(10).LineHorizontal(1).LineColor(Colors.Black);
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text($"Eps {d.PorcentajeEps}%:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Eps, out var epsDecimal)
                                        ? epsDecimal.ToString("C0", cultura)
                                        : d.Eps)
                                        .FontSize(9);
                                });
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text($"Pensión {d.PorcentajePension}%:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Pension, out var pensionDecimal)
                                        ? pensionDecimal.ToString("C0", cultura)
                                        : d.Pension)
                                        .FontSize(9);
                                });
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Casino:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Casino, out var casinoDecimal)
                                        ? casinoDecimal.ToString("C0", cultura)
                                        : d.Casino)
                                    .FontSize(9);
                                });
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Cobro Préstamo:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.CobroPrestamo, out var cobroPrestamoDecimal)
                                        ? cobroPrestamoDecimal.ToString("C0", cultura)
                                        : d.CobroPrestamo)
                                    .FontSize(9);
                                });
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Otros Descuentos **:").FontSize(9); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.OtrosDescuentos, out var otrosDescuentosDecimal)
                                        ? otrosDescuentosDecimal.ToString("C0", cultura)
                                        : d.OtrosDescuentos)
                                    .FontSize(9);
                                });
                                desc.Item().Text("");
                                desc.Item().Text("");
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Total Descuentos:").SemiBold().FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.TotalDescuentos, out var totalDescuentosDecimal)
                                        ? totalDescuentosDecimal.ToString("C0", cultura)
                                        : d.TotalDescuentos).SemiBold().FontSize(10);
                                });
                            });
                        });

                        col.Item().PaddingTop(12).Text($"Total a Pagar: {TotalPagarArreglo}").FontFamily("Lato").Bold().FontSize(11).AlignRight();
                        col.Item().Text("");
                        col.Item().LineHorizontal(1).LineColor(Colors.Black);


                        col.Item().PaddingTop(5).Text($"CANTIDAD HORAS EXTRAS REALIZADAS: Hora Extra Diurna {d.CantHED}, Hora Extra Nocturna {d.CantHEN}, Hora Extra Diurna Domical/Festiva {d.CantHEDDF}, Hora Extra Nocturna Domical/Festiva {d.CantHENDF}.").FontSize(7).Justify();
                        col.Item().PaddingTop(5).Text($"HORAS EXTRAS: Los siguientes son los correspondientes valores para el cálculo de las horas extras. Hora Extra Diurna {ValorHEDArreglo}, Hora Extra Nocturna {ValorHENArreglo}, Hora Extra Diurna Domical/Festiva {ValorHEDDFArreglo}, Hora Extra Nocturna Domical/Festiva {ValorHENDFArreglo}.").FontSize(7).Justify();
                        col.Item().PaddingTop(5).Text($"* OTROS INGRESOS: {d.ConceptoIngresosAdicionales}").FontSize(7).Justify();
                        col.Item().PaddingTop(5).Text($"** OTROS DESCUENTOS: {d.ConceptoDescuentosAdicionales}").FontSize(7).Justify();

                        col.Item().PaddingTop(50).Row(r => { r.RelativeItem().AlignCenter().Text("").SemiBold(); r.RelativeItem().AlignCenter().Height(50).Image(firmaRLBytes).FitHeight(); });
                        col.Item().PaddingTop(0).Row(r => { r.RelativeItem().AlignCenter().Text("Firma Trabajador").SemiBold(); r.RelativeItem().AlignCenter().Text($"Firma o Sello Empresa").SemiBold(); });
                        col.Item().PaddingTop(0).Row(r => { r.RelativeItem().AlignCenter().Text($"{d.Empleado}").SemiBold().FontSize(8); r.RelativeItem().AlignCenter().Text($"{d.RLEmpresa}").SemiBold().FontSize(8); });
                        col.Item().PaddingTop(0).Row(r => { r.RelativeItem().AlignCenter().Text("").SemiBold().FontSize(8); r.RelativeItem().AlignCenter().Text($"Representante Legal").SemiBold().FontSize(8); });
                        col.Item().PaddingTop(0).Row(r => { r.RelativeItem().AlignCenter().Text("").SemiBold().FontSize(8); r.RelativeItem().AlignCenter().Text($"{d.Empresa}").SemiBold().FontSize(8); });

                    });

                    page.Footer()
                        .AlignRight()
                        .Text("Documento generado con Sofia Software Administrativo V 1.0").FontSize(6);
                });
            }).GeneratePdf();
            fontStream.Dispose();
            return File(pdfBytes, "application/pdf", "Comprobante Nomina # " + consecutivocle + " " + d.Empleado + ".pdf");
        }
        #endregion

    }

}