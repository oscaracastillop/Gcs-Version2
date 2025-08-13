using Data.DataEntities;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
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












        public ActionResult DescargarComprobanteNomina(int id)
        {
            // Registrar la fuente Lato
            var fontPath = Server.MapPath("~/Content/Lato-Regular.ttf");
            var fontStream = System.IO.File.OpenRead(fontPath);
            var cultura = new CultureInfo("es-CO");
            //QuestPDF.Infrastructure.FontManager.RegisterFont(fontStream);

            // Obtener los datos del comprobante
            var datos = dataNominaEmpleado.DatosComprobanteNomina(id);
            if (datos == null || datos.Count == 0)
                return HttpNotFound();

            var d = datos[0];

            // Ruta del logo
            var logoPath = Server.MapPath($"~/Images/LogoEmpresa/{d.Logo}");
            byte[] logoBytes = System.IO.File.ReadAllBytes(logoPath);


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

                    page.Header().Row(row =>
                    {
                        row.RelativeItem().Height(80).Image(logoBytes).FitHeight();
                        row.RelativeItem().AlignMiddle().Text($"Comprobante de Nómina - # {consecutivocle}")
                        .FontFamily("Lato").AlignRight().FontSize(10);
                        //.FontFamily("Lato").SemiBold().AlignRight().FontSize(10).FontColor(Colors.Blue.Darken1);
                    });

                    page.Content().Column(col =>
                    {

                        col.Spacing(0);



                        // Datos generales del empleado
                        col.Item().Text($"");
                        col.Item().Text($"{d.Empresa}").FontSize(18).Bold();
                        col.Item().Text($"{d.InfoEmpresa}").FontSize(7);
                        col.Item().Text($"");
                        col.Item().LineHorizontal(1).LineColor(Colors.Black);
                        col.Item().Text($"");
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Empleado:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.Empleado).FontSize(9);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Identificación:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.Identificacion).FontSize(9);
                        });

                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Cargo:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.Cargo).FontSize(9);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Tipo de Contrato:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.TipoContrato).FontSize(9);
                        });
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Fecha de Ingreso:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.FechaIngreso).FontSize(9);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Permanencia:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.Permanencia).FontSize(9);
                        });
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Salario Mensual:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(SalarioMensualArreglo).FontSize(9);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Sub Transporte Mensual:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(SubTransporteMesArreglo).FontSize(9);
                        });
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Periodo Nómina:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.PeriodoLiquidado).FontSize(9);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Días a Pagar:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.DiasPagar).FontSize(9);
                        });
                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Banco:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.NombreBanco).FontSize(9);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Numero Cuenta:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.NumeroCuenta).FontSize(9);
                        });

                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Sucursal Empleado:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.Sucursal).FontSize(9);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Eps:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.NombreEps).FontSize(9);
                        });

                        col.Item().Row(row =>
                        {
                            row.RelativeItem().Text("Fondo Cesantías:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.NombreFondoCesantias).FontSize(9);
                            row.ConstantItem(20).PaddingHorizontal(5);
                            row.RelativeItem().Text("Fondo Pensión:").SemiBold().FontSize(9);
                            row.RelativeItem().Text(d.NombreFondoPension).FontSize(9);
                        });


                        col.Item().Text($"");

                        // Ejemplo: insertar una línea horizontal para separar secciones
                        col.Item().LineHorizontal(1).LineColor(Colors.Black);
                        col.Item().Text("");
                        // Tabla de ingresos y descuentos
                        col.Item().Row(row =>
                        {
                            // Ingresos: conceptos y valores
                            row.RelativeItem().Column(ing =>
                            {
                                ing.Item().Text("INGRESOS").SemiBold().FontSize(10).AlignCenter();
                                ing.Item().Text("");
                                ing.Item().LineHorizontal(1).LineColor(Colors.Black);
                                ing.Item().Text("").SemiBold();
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Sueldo:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Sueldo, out var SueldoDecimal)
                                        ? SueldoDecimal.ToString("C0", cultura)
                                        : d.Sueldo
                                        ).FontSize(10);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Auxilio transporte:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.SubTransporte, out var auxTransporteDecimal)
                                        ? auxTransporteDecimal.ToString("C0", cultura)
                                        : d.SubTransporte
                                        ).FontSize(10);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text($"HE Diurna:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHED, out var ValorTotalHEDDecimal)
                                        ? ValorTotalHEDDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHED
                                        ).FontSize(10);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("HE Nocturna:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHEN, out var ValorTotalHENDecimal)
                                        ? ValorTotalHENDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHEN
                                        ).FontSize(10);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("HE Diurna D/F:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHEDDF, out var ValorTotalHEDDFDecimal)
                                        ? ValorTotalHEDDFDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHEDDF
                                        ).FontSize(10);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("HE Nocturna D/F:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHENDF, out var ValorTotalHENDFDecimal)
                                        ? ValorTotalHENDFDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHENDF
                                        ).FontSize(10);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Desembolso Préstamo:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                   decimal.TryParse(d.DesembolsoPrestamo, out var desembolsoDecimal)
                                       ? desembolsoDecimal.ToString("C0", cultura)
                                       : d.DesembolsoPrestamo
                                       ).FontSize(10);
                                });
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Otros ingresos *:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.OtrosIngresos, out var otrosIngresosDecimal)
                                        ? otrosIngresosDecimal.ToString("C0", cultura)
                                        : d.OtrosIngresos
                                        ).FontSize(10);
                                });
                                ing.Item().Text("").SemiBold();
                                ing.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Total ingresos:").SemiBold(); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.TotalIngresos, out var totalIngresosDecimal)
                                        ? totalIngresosDecimal.ToString("C0", cultura)
                                        : d.TotalIngresos).SemiBold();
                                });
                            });

                            // Separador visual (línea vertical y espacio)
                            row.ConstantItem(20).PaddingHorizontal(10).BorderLeft(1).BorderColor(Colors.Grey.Lighten2);

                            // Descuentos: conceptos y valores
                            row.RelativeItem().Column(desc =>
                            {
                                desc.Item().Text("DESCUENTOS").SemiBold().FontSize(10).AlignCenter();
                                desc.Item().Text("").SemiBold();
                                desc.Item().LineHorizontal(1).LineColor(Colors.Black);
                                desc.Item().Text("").SemiBold();
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text($"Eps {d.PorcentajeEps}%:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Eps, out var epsDecimal)
                                        ? epsDecimal.ToString("C0", cultura)
                                        : d.Eps)
                                        .FontSize(10);
                                });
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text($"Pensión {d.PorcentajePension}%:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Pension, out var pensionDecimal)
                                        ? pensionDecimal.ToString("C0", cultura)
                                        : d.Pension)
                                        .FontSize(10);
                                });
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Casino:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Casino, out var casinoDecimal)
                                        ? casinoDecimal.ToString("C0", cultura)
                                        : d.Casino)
                                    .FontSize(10);
                                });
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Cobro Préstamo:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.CobroPrestamo, out var cobroPrestamoDecimal)
                                        ? cobroPrestamoDecimal.ToString("C0", cultura)
                                        : d.CobroPrestamo)
                                    .FontSize(10);
                                });
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Otros descuentos **:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.OtrosDescuentos, out var otrosDescuentosDecimal)
                                        ? otrosDescuentosDecimal.ToString("C0", cultura)
                                        : d.OtrosDescuentos)
                                    .FontSize(10);
                                });
                                desc.Item().Text("");
                                desc.Item().Text("");
                                desc.Item().Row(r =>
                                {
                                    r.RelativeItem().Text("Total descuentos:").SemiBold(); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.TotalDescuentos, out var totalDescuentosDecimal)
                                        ? totalDescuentosDecimal.ToString("C0", cultura)
                                        : d.TotalDescuentos).SemiBold();
                                });
                            });
                        });

                        col.Item().PaddingTop(12).Text($"Total a Pagar: {TotalPagarArreglo}").FontFamily("Lato").Bold().FontSize(14).AlignRight();
                        col.Item().Text("");
                        col.Item().LineHorizontal(1).LineColor(Colors.Black);


                        col.Item().PaddingTop(5).Text($"CANTIDAD HORAS EXTRAS REALIZADAS: Hora Extra Diurna {d.CantHED}, Hora Extra Nocturna {d.CantHEN}, Hora Extra Diurna Domical/Festiva {d.CantHEDDF}, Hora Extra Nocturna Domical/Festiva {d.CantHENDF}.").FontSize(7).Justify();
                        col.Item().PaddingTop(2).Text($"HORAS EXTRAS: Los siguientes son los correspondientes valores para el cálculo de las horas extras. Hora Extra Diurna {ValorHEDArreglo}, Hora Extra Nocturna {ValorHENArreglo}, Hora Extra Diurna Domical/Festiva {ValorHEDDFArreglo}, Hora Extra Nocturna Domical/Festiva {ValorHENDFArreglo}.").FontSize(7).Justify();
                        col.Item().PaddingTop(2).Text($"* OTROS INGRESOS: {d.ConceptoIngresosAdicionales}").FontSize(6).Justify();
                        col.Item().PaddingTop(2).Text($"** OTROS DESCUENTOS: {d.ConceptoDescuentosAdicionales}").FontSize(6).Justify();

                        col.Item().PaddingTop(80).Row(r => { r.RelativeItem().AlignCenter().Text("Firma Empleado").SemiBold(); r.RelativeItem().AlignCenter().Text($"Firma o Sello Empresa").SemiBold(); });
                        col.Item().PaddingTop(0).Row(r => { r.RelativeItem().AlignCenter().Text($"{d.Empleado}").SemiBold().FontSize(8); r.RelativeItem().AlignCenter().Text($"{d.Empresa}").SemiBold().FontSize(8); });

                        //col.Item().PaddingTop(10).Text("Comprobante de Nómina generado con Sofia Software Administrativo V 1.0").FontSize(6);
                    });

                    page.Footer()
                        .AlignRight()
                        .Text("Comprobante de Nómina generado con Sofia Software Administrativo V 1.0").FontSize(6);

                    //page.Footer()
                    //    .AlignRight()
                    //    .Text(x =>
                    //    {
                    //        x.Span("Página ");
                    //        x.CurrentPageNumber();
                    //    });

                });
            }).GeneratePdf();

            fontStream.Dispose();

            return File(pdfBytes, "application/pdf", "Comprobante Nomina # " + consecutivocle + ".pdf");
        }

    }

}