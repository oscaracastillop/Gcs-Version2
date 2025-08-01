using Data.DataEntities;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
using System.Web.Mvc;
using System.Globalization;


namespace App.Controllers
{
    public class Nomina_EmpleadoController : Controller
    {
        static Nomina_EmpleadoController()
        {
            QuestPDF.Settings.License = LicenseType.Community;
        }

        private readonly DataNominaEmpleado dataNominaEmpleado = new DataNominaEmpleado();

        public ActionResult DescargarComprobanteNomina(int id)
        {
            // Registrar la fuente Lato
            var fontPath = Server.MapPath("~/Content/Lato-Regular.ttf");
            var fontStream = System.IO.File.OpenRead(fontPath);
            var cultura = new CultureInfo("es-CO");
            //QuestPDF.Infrastructure.FontManager.RegisterFont(fontStream);

            // Ruta del logo
            var logoPath = Server.MapPath("~/Content/logo.png");
            byte[] logoBytes = System.IO.File.ReadAllBytes(logoPath);

            // Obtener los datos del comprobante
            var datos = dataNominaEmpleado.DatosComprobanteNomina(id);
            if (datos == null || datos.Count == 0)
                return HttpNotFound();

            var d = datos[0];

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
                        row.RelativeItem().AlignMiddle().Text($"Comprobante de Nómina - # 000{d.Id}")
                            .FontFamily("Lato").SemiBold().AlignRight().FontSize(10).FontColor(Colors.Blue.Medium);
                    });

                    page.Content().Column(col =>
                    {

                        col.Spacing(5);

                     

                        // Datos generales del empleado
                        col.Item().Text($"");
                        col.Item().Text($"Empresa: {d.Empresa}");
                        col.Item().Text($"Empleado: {d.Empleado}");
                        col.Item().Text($"Salario Mensual: {d.SalarioMensual}");
                        col.Item().Text($"Sub Transporte Mensual: {d.SubTransporteMes}");
                        col.Item().Text($"Periodo : {d.PeriodoLiquidado}").FontSize(8);
                        col.Item().Text($"Días a Pagar: {d.DiasPagar}").FontSize(8);
                        col.Item().Text($"Estado: {d.Estado}").FontSize(8);
                        col.Item().Text($"");

                        //col.Item().Row(row =>
                        //{
                        //    row.ConstantItem(160).Text($"Periodo: {d.PeriodoLiquidado}").FontSize(8).AlignCenter();
                        //    row.ConstantItem(160).Text($"Días a Pagar: {d.DiasPagar}").FontSize(8);
                        //    row.ConstantItem(160).Text($"Estado: {d.Estado}").FontSize(8);
                        //});





                        // Tabla de ingresos y descuentos
                        col.Item().Row(row =>
                        {
                            // Ingresos: conceptos y valores
                            row.RelativeItem().Column(ing =>
                            {
                                ing.Item().Text("Ingresos").SemiBold().FontSize(13);
                                ing.Item().Text("").SemiBold();
                                ing.Item().Row(r => { r.RelativeItem().Text("Sueldo:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Sueldo, out var SueldoDecimal)
                                        ? SueldoDecimal.ToString("C0", cultura)
                                        : d.Sueldo
                                        ).FontSize(10); 
                                });
                                ing.Item().Row(r => { r.RelativeItem().Text("Auxilio transporte:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.SubTransporte, out var auxTransporteDecimal)
                                        ? auxTransporteDecimal.ToString("C0", cultura)
                                        : d.SubTransporte
                                        ).FontSize(10); 
                                });
                                ing.Item().Row(r => { r.RelativeItem().Text("HE Diurna:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHED, out var ValorTotalHEDDecimal)
                                        ? ValorTotalHEDDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHED
                                        ).FontSize(10); 
                                });
                                ing.Item().Row(r => {
                                    r.RelativeItem().Text("HE Nocturna:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHEN, out var ValorTotalHENDecimal)
                                        ? ValorTotalHENDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHEN
                                        ).FontSize(10);
                                });
                                ing.Item().Row(r => {
                                    r.RelativeItem().Text("HE Diurna D/F:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHEDDF, out var ValorTotalHEDDFDecimal)
                                        ? ValorTotalHEDDFDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHEDDF
                                        ).FontSize(10);
                                });
                                ing.Item().Row(r => {
                                    r.RelativeItem().Text("HE Nocturna D/F:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.ValorTotalHENDF, out var ValorTotalHENDFDecimal)
                                        ? ValorTotalHENDFDecimal.ToString("C0", cultura)
                                        : d.ValorTotalHENDF
                                        ).FontSize(10);
                                });
                                ing.Item().Row(r => {
                                    r.RelativeItem().Text("Desembolso Préstamo:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                   decimal.TryParse(d.DesembolsoPrestamo, out var desembolsoDecimal)
                                       ? desembolsoDecimal.ToString("C0", cultura)
                                       : d.DesembolsoPrestamo
                                       ).FontSize(10);
                                });
                                ing.Item().Row(r => { r.RelativeItem().Text("Otros ingresos:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.OtrosIngresos, out var otrosIngresosDecimal)
                                        ? otrosIngresosDecimal.ToString("C0", cultura)                                        
                                        :d.OtrosIngresos
                                        ).FontSize(10); 
                                });                               
                                ing.Item().Text("").SemiBold();
                                ing.Item().Row(r => { r.RelativeItem().Text("Total ingresos:").SemiBold(); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.TotalIngresos, out var totalIngresosDecimal)
                                        ? totalIngresosDecimal.ToString("C0", cultura)
                                        :d.TotalIngresos).SemiBold(); 
                                });
                            });

                            // Separador visual (línea vertical y espacio)
                            row.ConstantItem(20).PaddingHorizontal(10).BorderLeft(1).BorderColor(Colors.Grey.Lighten2);

                            // Descuentos: conceptos y valores
                            row.RelativeItem().Column(desc =>
                            {
                                desc.Item().Text("Descuentos").SemiBold().FontSize(13);
                                desc.Item().Text("").SemiBold();
                                desc.Item().Row(r => { r.RelativeItem().Text("EPS:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Eps, out var epsDecimal)
                                        ? epsDecimal.ToString("C0", cultura)
                                        : d.Eps)
                                        .FontSize(10); 
                                });
                                desc.Item().Row(r => { r.RelativeItem().Text("Pensión:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Pension, out var pensionDecimal)
                                        ? pensionDecimal.ToString("C0", cultura)
                                        : d.Pension)
                                        .FontSize(10);
                                 });
                                desc.Item().Row(r => { r.RelativeItem().Text("Casino:").FontSize(10) ; r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.Casino, out var casinoDecimal)
                                        ? casinoDecimal.ToString("C0", cultura)
                                        : d.Casino)
                                    .FontSize(10);   
                                });
                                desc.Item().Row(r => { r.RelativeItem().Text("Cobro préstamo:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.CobroPrestamo, out var cobroPrestamoDecimal)
                                        ? cobroPrestamoDecimal.ToString("C0", cultura)
                                        :d.CobroPrestamo)
                                    .FontSize(10); 
                                });
                                desc.Item().Row(r => { r.RelativeItem().Text("Otros descuentos:").FontSize(10); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.OtrosDescuentos, out var otrosDescuentosDecimal)
                                        ? otrosDescuentosDecimal.ToString("C0", cultura)
                                        :d.OtrosDescuentos)
                                    .FontSize(10);
                                });
                                desc.Item().Text("").SemiBold();
                                desc.Item().Row(r => { r.RelativeItem().Text("Total descuentos:").SemiBold(); r.RelativeItem().AlignRight().Text(
                                    decimal.TryParse(d.TotalDescuentos, out var totalDescuentosDecimal)
                                        ? totalDescuentosDecimal.ToString("C0", cultura)
                                        :d.TotalDescuentos).SemiBold(); 
                                });
                            });
                        });

                        col.Item().PaddingTop(12).Text($"Total a pagar: {d.TotalPagar}")
                            .FontFamily("Lato").SemiBold().FontSize(14).FontColor(Colors.Green.Darken2);
                    });

                    page.Footer()
                        .AlignCenter()
                        .Text(x =>
                        {
                            x.Span("Página ");
                            x.CurrentPageNumber();
                        });
                });
            }).GeneratePdf();

            fontStream.Dispose();

            return File(pdfBytes, "application/pdf", "ComprobanteNomina" + id + ".pdf");
        }

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

    }

}