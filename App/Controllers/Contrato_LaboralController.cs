using Data.DataEntities;
using Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using SistemaGcs.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using System.Web.Razor.Parser.SyntaxTree;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

namespace App.Controllers
{
    public class Contrato_LaboralController : Controller
    {
        static Contrato_LaboralController()
        {
            QuestPDF.Settings.License = LicenseType.Community;
        }

        private readonly DataContratoLaboral dataContratoLaboral = new DataContratoLaboral();
                      

        public JsonResult CrearCLE( string IdUser, int IdEmpleado, int IdEmpresa, int IdCargo, int IdTipoContrato, int SalarioMensual, string FechaInicio,
                                    string FechaFin, int IdEps, decimal PorcentajeContEps, int IdFondoPension, decimal PorcentajeContFP, int IdBanco,
                                    string NumeroCuentaPago, int SubTransporte, int IdCesantias, string Observacion)
        {
            var resultado = dataContratoLaboral.CrearCLE(   IdUser, IdEmpleado, IdEmpresa, IdCargo, IdTipoContrato, SalarioMensual, FechaInicio, FechaFin,
                                                            IdEps, PorcentajeContEps, IdFondoPension, PorcentajeContFP, IdBanco, NumeroCuentaPago,
                                                            SubTransporte, IdCesantias, Observacion);

            return Json(resultado);
        }

        public JsonResult ActualizarCLE(string IdUser, int IdCLE, int IdCargo, int IdTipoContrato, int SalarioMensual, string FechaFin, int IdEps,
                                        decimal PorcentajeContEps, int IdFondoPension, decimal PorcentajeContFP, int IdBanco,
                                        string NumeroCuentaPago, int SubTransporte, int IdCesantias, string Observacion, int IdEstado)
        {
            var resultado = dataContratoLaboral.ActualizarCLE(  IdUser, IdCLE, IdCargo, IdTipoContrato, SalarioMensual, FechaFin, IdEps,
                                                                PorcentajeContEps, IdFondoPension, PorcentajeContFP, IdBanco, NumeroCuentaPago,
                                                                SubTransporte, IdCesantias, Observacion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarCLE(string IdUser, int IdCLE)
        {
            string resultado = dataContratoLaboral.EliminarCLE(IdUser, IdCLE);
            return Json(resultado);
        }

        public ActionResult GridCLE()
        {
            var data = dataContratoLaboral.GridCLE();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        
        public JsonResult ListaContratoLaboralEmpleado()
        {
            var resultado = dataContratoLaboral.ListaContratoLaboral();
            return Json(resultado);
        }

        public JsonResult ListaContratoLaboralSucursalEmpleado()
        {
            var resultado = dataContratoLaboral.ListaContratoLaboralSucursalEmpleado();
            return Json(resultado);
        }


        public ActionResult DatosContratoLaboral(int Id)
        {
            var data = dataContratoLaboral.DatosContratoLaboral(Id);
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }










        public ActionResult DescargarContratoLaboral(int id)
        {
            // Registrar la fuente Lato
            var fontPath = Server.MapPath("~/Content/Lato-Regular.ttf");
            var fontStream = System.IO.File.OpenRead(fontPath);
            var cultura = new CultureInfo("es-CO");
            //QuestPDF.Infrastructure.FontManager.RegisterFont(fontStream);

            // Obtener los datos del comprobante
            var datos = dataContratoLaboral.DatosContratoLaboral(id);
            if (datos == null || datos.Count == 0)
                return HttpNotFound();

            var d = datos[0];

            // Ruta del logo
            var logoPath = Server.MapPath($"~/Images/LogoEmpresa/{d.Logo}");
            byte[] logoBytes = System.IO.File.ReadAllBytes(logoPath);


            var SalarioMensualArreglo = decimal.TryParse(d.SalarioMensual, out var SalarioMensualArregloDecimal)
                                        ? SalarioMensualArregloDecimal.ToString("C0", cultura)
                                        : d.SalarioMensual;


            var pdfBytes = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, QuestPDF.Infrastructure.Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontFamily("Lato").FontSize(12));

                    page.Header().PaddingBottom(10).Row(row =>
                    {
                        row.RelativeItem().Height(80).Image(logoBytes).FitHeight();
                        row.RelativeItem().AlignMiddle().Text($"Contrato Laboral - # {d.Id}")
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
                        //col.Item().LineHorizontal(1).LineColor(Colors.Black);
                        col.Item().Text($"");
                        col.Item().PaddingTop(8).Text($"CONTRATO DE TRABAJO A TERMINO FIJO").AlignCenter().Bold();
                        col.Item().PaddingTop(5).Text("");

                        //col.Item().Row(row =>
                        //{
                        //    row.RelativeItem().Text("Empleado:").SemiBold().FontSize(9);
                        //    row.RelativeItem().Text(d.Empleado).FontSize(9);
                        //    row.ConstantItem(20).PaddingHorizontal(5);
                        //    row.RelativeItem().Text("Identificación:").SemiBold().FontSize(9);
                        //    row.RelativeItem().Text(d.Identificacion).FontSize(9);
                        //});

                        //col.Item().Row(row =>
                        //{
                        //    row.RelativeItem().Text("Cargo:").SemiBold().FontSize(9);
                        //    row.RelativeItem().Text(d.Cargo).FontSize(9);
                        //    row.ConstantItem(20).PaddingHorizontal(5);
                        //    row.RelativeItem().Text("Tipo de Contrato:").SemiBold().FontSize(9);
                        //    row.RelativeItem().Text(d.TipoContrato).FontSize(9);
                        //});
                        //col.Item().Row(row =>
                        //{
                        //    row.RelativeItem().Text("Fecha de Ingreso:").SemiBold().FontSize(9);
                        //    row.RelativeItem().Text(d.FechaIngreso).FontSize(9);
                        //    row.ConstantItem(20).PaddingHorizontal(5);
                        //    row.RelativeItem().Text("Salario Mensual").SemiBold().FontSize(9);
                        //    row.RelativeItem().Text(SalarioMensualArreglo).FontSize(9);
                        //});

                        
                        // Ejemplo: insertar una línea horizontal para separar secciones
                        //col.Item().LineHorizontal(1).LineColor(Colors.Black);
                        //col.Item().Text($"Entre las partes, por un lado {d.RLEmpresa}, domiciliado en la ciudad de {d.CiudadEmpresa}, representante legal de {d.Empresa}, con {d.TipoDocumentoEmpresa} número {d.IdentificacionEmpresa}, quien en adelante y para los efectos del presente contrato se denomina como EL EMPLEADOR, y por el otro, ").Justify().FontSize(10).ParagraphFirstLineIndentation(20); 
                        col.Item().PaddingTop(5).Text(text => 
                        {                            
                            text.Justify();
                            text.ParagraphFirstLineIndentation(20);
                            text.Span($"Entre los suscritos a saber ").FontSize(10);
                            text.Span($"{d.RLEmpresa}").SemiBold().FontSize(10);
                            text.Span($", identificado con ").FontSize(10);
                            text.Span($" {d.TipoDocumentoRLEmpresa}").Bold().FontSize(10);
                            text.Span($", número ").FontSize(10);
                            text.Span($" {d.IdentificacionRLEmpresa}").Bold().FontSize(10);
                            text.Span($", expedido(a) en la ciudad de ").FontSize(10);
                            text.Span($" {d.CiudadExpedicionDocumentoRLEmpresa}").SemiBold().FontSize(10);
                            text.Span($", representante legal de ").FontSize(10);
                            text.Span($" {d.Empresa}").SemiBold().FontSize(10);
                            text.Span($" con ").FontSize(10);
                            text.Span($" {d.TipoDocumentoEmpresa}").Bold().FontSize(10);
                            text.Span($", número ").FontSize(10);
                            text.Span($" {d.IdentificacionEmpresa}").Bold().FontSize(10);
                            text.Span($", con domicilio en la ciudad de ").FontSize(10);
                            text.Span($" {d.CiudadEmpresa}").SemiBold().FontSize(10);
                            text.Span($", quien en adelante y para los efectos del presente contrato se denomina como ").FontSize(10);
                            text.Span($"EL EMPLEADOR").Bold().FontSize(10);
                            text.Span($", y por el otro, ").FontSize(10);
                            text.Span($"{d.Empleado}").Bold().FontSize(10);
                            text.Span($", domiciliado(a) en la ciudad de ").FontSize(10);
                            text.Span($"{d.CiudadEmpleado}").Bold().FontSize(10);
                            text.Span($" con ").FontSize(10);
                            text.Span($" {d.TipoDocumentoEmpleado}").Bold().FontSize(10);
                            text.Span($", número ").FontSize(10);
                            text.Span($" {d.IdentificacionEmpleado}").Bold().FontSize(10);
                            text.Span($", expedido(a) en la ciudad de ").FontSize(10);
                            text.Span($" {d.CiudadExpedicionDocumentoEmpleado}").SemiBold().FontSize(10);
                            text.Span($", quien en adelante y para los efectos del presente contrato se denomina como ").FontSize(10);
                            text.Span($"EL TRABAJADOR").Bold().FontSize(10);
                            text.Span($", ambos mayores de edad, identificados como aparece al pie de las firmas, hemos acordado suscribir este contrato de trabajo ").FontSize(10);
                            text.Span($"A TÉRMINO FIJO A DOCE (12) MESES PRORROGABLES").Bold().FontSize(10);
                            text.Span($", el cual se regirá por las siguientes cláusulas:").FontSize(10);
                        });

                        col.Item().PaddingTop(15).Text(text =>
                        {
                            text.Justify();
                            text.ParagraphFirstLineIndentation(20);
                            text.Span("PRIMERA - EL EMPLEADOR ").SemiBold().FontSize(10);
                            text.Span(" Contrata los servicios personales del ").FontSize(10);
                            text.Span("EL TRABAJADOR").Bold().FontSize(10);
                            text.Span(" y éste se obliga a poner toda su capacidad normal de trabajo y en forma EXCLUSIVA al servicio del ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(", desempeñando las funciones propias del cargo ").FontSize(10);
                            text.Span($" {d.Cargo}").Bold().FontSize(10);
                            text.Span(", comprendidas en el manual de cargo provisto por el ").FontSize(10);
                            text.Span("EL EMPLEADOR.").Bold().FontSize(10);
                        });

                       
                        col.Item().PaddingTop(15).Text(text =>
                        {
                            text.Justify();
                            text.ParagraphFirstLineIndentation(20);
                            text.Span("SEGUNDA - NORMATIVIDAD.").SemiBold().FontSize(10);
                            text.Span(" Las partes declaran que en el presente contrato se entienden incorporadas, en lo pertinente, las disposiciones legales colombianas que regulan las relaciones entre el empleador y sus trabajadores, en especial, las del contrato de trabajo para el oficio que se suscribe, fuera de las obligaciones consignadas en el manual de funciones, y reglamentos de trabajo, de higiene y seguridad industrial de la empresa.").FontSize(10);
                        });

                        col.Item().PaddingTop(15).Text(text =>
                        {
                            text.Justify();
                            text.ParagraphFirstLineIndentation(20);
                            text.Span("TERCERA - OBLIGACIONES DEL TRABAJADOR.").SemiBold().FontSize(10);
                            text.Span(" Son obligaciones especiales del ").FontSize(10);
                            text.Span("EL TRABAJADOR:").Bold().FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("1.").SemiBold().FontSize(10);
                            text.Span(" Ejecutar, aceptar y cumplir rigurosamente las normas, órdenes e instrucciones dadas por ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(", sus representantes o superiores jerárquicos.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("2.").SemiBold().FontSize(10);
                            text.Span(" Guardar absoluta reserva, salvo autorización expresa de ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(", de la información de naturaleza reservada o cuya divulgación pueda causar perjuicios a ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(", que llegare a su conocimiento por razones de su oficio sobre aspectos administrativos, operacionales, de negocios, de procedimientos, industriales, comerciales o cualquier otra referente a ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" o su actividad o la de sus clientes.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("3.").SemiBold().FontSize(10);
                            text.Span(" Dedicar la totalidad de su jornada de trabajo al cabal cumplimiento de las funciones encomendadas, con puntualidad y eficiencia.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("4.").SemiBold().FontSize(10);
                            text.Span(" Cumplir los horarios de trabajo establecidos por el ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("5.").SemiBold().FontSize(10);
                            text.Span(" Actuar con armonía y buen trato a los clientes, superiores y compañeros de trabajo en sus relaciones personales y en la ejecución de sus labores.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("6.").SemiBold().FontSize(10);
                            text.Span(" Avisar inmediatamente y por escrito a ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" todo cambio de dirección, teléfono o ciudad de residencia.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("7.").SemiBold().FontSize(10);
                            text.Span(" No retirar bienes o elementos de ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" sin su autorización previa.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("8.").SemiBold().FontSize(10);
                            text.Span(" Utilizar y responder por los elementos de trabajo que ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" ponga a su disposición, así mismo debe restituir oportunamente los equipos, valores, documentos, y demás elementos de trabajo que le entregue ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" para el desempeño de su cargo, en todo caso cuando ocurran daños o pérdidas no imputables al desgaste producido por el uso natural o corriente, deberá sufragar el valor comercial del objeto dañado o perdido, el valor de su reparación o restituir uno de igual condición y características.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("9.").SemiBold().FontSize(10);
                            text.Span(" Someterse a la práctica de los exámenes médicos o sanitarios que ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" exija en cualquier momento.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("10.").SemiBold().FontSize(10);
                            text.Span(" Avisar oportunamente a su superior inmediato sobre cualquier deficiencia que tengan los vehículos, máquinas, equipos o implementos de labor con el fin de evitar accidentes, daños o costos adicionales.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("11.").SemiBold().FontSize(10);
                            text.Span(" Suministrar los documentos o informaciones que con ocasión de la relación laboral le solicite ").FontSize(10);
                            text.Span("EL EMPLEADOR.").Bold().FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("12.").SemiBold().FontSize(10);
                            text.Span(" No tomar el nombre de  ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" ni la papelería, ni sus instalaciones para contraer obligaciones o utilizarlas en beneficio propio.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("13.").SemiBold().FontSize(10);
                            text.Span(" Cumplir los manuales de funciones y políticas de ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(", código de conducta, ética y demás que sean desarrolladas por éste, los cuales se entienden incorporados al presente contrato y que ").FontSize(10);
                            text.Span("EL TRABAJADOR").Bold().FontSize(10);
                            text.Span(" declara conocer en su integridad.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("14.").SemiBold().FontSize(10);
                            text.Span(" Las demás consagradas en los artículos 56 y 58 del Código Sustantivo del Trabajo.").FontSize(10);
                        });

                        col.Item().PaddingTop(15).Text(text =>
                        {
                            text.Justify();
                            text.ParagraphFirstLineIndentation(20);
                            text.Span("CUARTA - OBLIGACIONES ESPECIALES DEL EMPLEADOR.").SemiBold().FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("1.").SemiBold().FontSize(10);
                            text.Span(" Poner a disposición de los trabajadores, salvo estipulación en contrario, los instrumentos adecuados y las materias primas necesarias, para la realización de las labores.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("2.").SemiBold().FontSize(10);
                            text.Span(" Procurar a los trabajadores, locales apropiados y elementos adecuados de protección contra los accidentes y enfermedades profesionales, en forma que se garanticen razonablemente la seguridad y la salud.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("3.").SemiBold().FontSize(10);
                            text.Span(" Prestar inmediatamente los primeros auxilios en casos de accidentes o de enfermedad.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("4.").SemiBold().FontSize(10);
                            text.Span(" Pagar la remuneración pactada en las condiciones, en periodos y lugares convenidos.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("5.").SemiBold().FontSize(10);
                            text.Span("  Guardar absoluto respeto a la dignidad personal del trabajador y a sus creencias.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("6.").SemiBold().FontSize(10);
                            text.Span(" Dar al trabajador que lo solicite a la expiración del contrato, una certificación en que conste el tiempo de servicio, la índole de la labor y el salario devengado.").FontSize(10);
                        });

                        col.Item().PaddingTop(15).Text(text =>
                        {
                            text.Justify();
                            text.ParagraphFirstLineIndentation(20);
                            text.Span("QUINTA - CONFIDENCIALIDAD:").SemiBold().FontSize(10);
                            text.Span(" Toda información obtenida por ").FontSize(10);
                            text.Span("EL TRABAJADOR").Bold().FontSize(10);
                            text.Span(", así como los informes o documentos que produzca relacionados con el cumplimiento de sus obligaciones, son considerados confidenciales y no pueden ser divulgados sin autorización expresa y escrita del ").FontSize(10);
                            text.Span("EL EMPLEADOR.").Bold().FontSize(10);
                            text.Span(" Por lo tanto, el ").FontSize(10);
                            text.Span("EL TRABAJADOR").Bold().FontSize(10);
                            text.Span(" se compromete a:").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("1.").SemiBold().FontSize(10);
                            text.Span(" Mantener oculto cualquier secreto comercial, “know how”, manera o forma de desarrollar negocios, que llegue a conocer gracias a la información suministrada para el ejercicio de sus funciones y se abstendrá de sacar provecho de aquella información desde cualquier punto de vista.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("2.").SemiBold().FontSize(10);
                            text.Span(" Utilizar la información confidencial única y exclusivamente con el propósito de adelantar el proyecto para el cual haya sido asignado. En consecuencia, se obligan a no divulgar la información que pueden recibir.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("3.").SemiBold().FontSize(10);
                            text.Span(" No revelar información sobre los términos contractuales o comerciales que se llegaren a acordar para la realización de los proyectos, ni sobre las condiciones económicas que se llegaren a pactar, a personas distintas de ").FontSize(10);
                            text.Span("EL EMPLEADOR.").Bold().FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("4.").SemiBold().FontSize(10);
                            text.Span(" Tomar todas las precauciones para garantizar que la información confidencial no sea divulgada ni facilitada a ninguna persona no autorizada.").FontSize(10);
                        });


                        col.Item().PaddingTop(15).Text(text =>
                        {
                            text.Justify();
                            text.ParagraphFirstLineIndentation(20);
                            text.Span("SEXTA - PROHIBICIONES DEL TRABAJADOR:").SemiBold().FontSize(10);
                            text.Span(" Además de las consagradas en el artículo 60 del Código Sustantivo del Trabajo y en el Reglamento Interno, son prohibiciones especiales de ").FontSize(10);
                            text.Span("EL TRABAJADOR:").Bold().FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("1.").SemiBold().FontSize(10);
                            text.Span(" Solicitar préstamos especiales o ayuda económica a los clientes, empleados o proveedores de ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" aprovechándose de su cargo u oficio o aceptarles donaciones o dádivas de cualquier clase").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("2.").SemiBold().FontSize(10);
                            text.Span(" Autorizar o ejecutar sin ser de su competencia, operaciones que afecten los intereses de ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" o negociar bienes y/o mercancías de ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" en provecho propio.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("3.").SemiBold().FontSize(10);
                            text.Span(" Retener dinero o hacer efectivos cheques recibidos para o a nombre de ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("4.").SemiBold().FontSize(10);
                            text.Span(" Presentar cuentas de gastos ficticias o reportar como cumplidas visitas o tareas no efectuadas.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("5.").SemiBold().FontSize(10);
                            text.Span(" Revelar, difundir, comentar, copiar o realizar un uso diferente para el cual se le dio acceso a la información de naturaleza reservada o utilizarla para el ejercicio de su propia actividad en beneficio propio o de terceros, o duplicarla o compartirla con terceras personas, salvo que exista autorización previa y escrita de ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("6.").SemiBold().FontSize(10);
                            text.Span(" Retardar o permitir que otros retarden injustificadamente la ejecución de las labores a su cargo.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("7.").SemiBold().FontSize(10);
                            text.Span(" La ingestión de bebidas embriagantes dentro de la empresa, la presentación a laborar en estado embriaguez o bajo la influencia de narcóticos o de drogas enervantes.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("8.").SemiBold().FontSize(10);
                            text.Span(" Realizar o intentar realizar o permitir actos de fraude en relación con el reconocimiento de salarios, prestaciones, viáticos, gastos de viaje, gastos de representación, auxilios, subsidios y, en general cualquier emolumento que por razón de su vinculación laboral con ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" deba recibir un TRABAJADOR.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("9.").SemiBold().FontSize(10);
                            text.Span(" Cualquier irrespeto en que incurra ").FontSize(10);
                            text.Span("EL TRABAJADOR").Bold().FontSize(10);
                            text.Span(" durante sus labores o en desarrollo de algún tipo de actividad organizada por ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(", contra cualquiera de los funcionarios de la misma o contra personas que se encuentren en las instalaciones.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("10.").SemiBold().FontSize(10);
                            text.Span(" Omitir o permitir que otras personas omitan las condiciones y requerimientos de seguridad y protección personal en las labores a su cargo.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("11.").SemiBold().FontSize(10);
                            text.Span(" Delegar a compañeros o a terceros cualquiera de las obligaciones que a ").FontSize(10);
                            text.Span("EL TRABAJADOR").Bold().FontSize(10);
                            text.Span(" le corresponden.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("12.").SemiBold().FontSize(10);
                            text.Span(" Faltarle al respeto a los superiores jerárquicos o compañeros de trabajo.").FontSize(10);
                        });

                        col.Item().PaddingTop(15).Text(text =>
                        {
                            text.Justify();
                            text.ParagraphFirstLineIndentation(20);
                            text.Span("SEXTA - SALARIO:").SemiBold().FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" pagará al ").FontSize(10);
                            text.Span("EL TRABAJADOR:").Bold().FontSize(10);
                            text.Span(" por la prestación de sus servicios el salario indicado, pagadero en el lugar y oportunidades también señaladas arriba. Dentro de este pago se encuentra incluida la remuneración de los descansos dominicales y festivos de que tratan los Capítulos I y II del Título VII del Código Sustantivo del Trabajo, así como los que voluntariamente otorgue ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" al ").FontSize(10);
                            text.Span("EL TRABAJADOR. EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" no suministrará clase alguna de salario en especie.").FontSize(10);
                        });

                        col.Item().PaddingTop(0).Text(text =>
                        {
                            text.Justify();
                            text.Span("Parágrafo 1.").SemiBold().FontSize(10);
                            text.Span(" En todos los casos en que ").FontSize(10);
                            text.Span("EL TRABAJADOR ").Bold().FontSize(10);
                            text.Span(" sea comisionado para reemplazar  otro, continuará devengando la asignación mensual del cargo que tenga al momento de la comisión, salvo orden escrita de ").FontSize(10);
                            text.Span("EL EMPLEADOR").Bold().FontSize(10);
                            text.Span(" en sentido contrario.").FontSize(10);
                        });







                        //col.Item().PaddingTop(5).Text($"PRIMERA: OBJETO DEL CONTRATO. El trabajador se obliga a prestar sus servicios personales a favor del empleador, en el cargo de {d.Cargo}, bajo la modalidad de contrato a término fijo, con una duración de {d.Permanencia} meses, iniciando el {d.FechaInicio} y finalizando el {d.FechaFin}.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"SEGUNDA: JORNADA DE TRABAJO. La jornada de trabajo será de lunes a viernes, con un horario de 7:00 am a 5:oo pm.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"TERCERA: SALARIO. El empleador pagará al trabajador un salario mensual de {SalarioMensualArreglo}, el cual será cancelado en forma quincenal, los días 15 y último de cada mes, mediante consignación en la cuenta bancaria del trabajador.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"CUARTA: OBLIGACIONES DEL TRABAJADOR. El trabajador se compromete a cumplir con las siguientes obligaciones:").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"1. Cumplir con las funciones asignadas en el cargo de {d.Cargo}.");
                        //col.Item().PaddingTop(5).Text($"2. Cumplir con las normas y procedimientos establecidos por el empleador.");
                        //col.Item().PaddingTop(5).Text($"3. Asistir puntualmente a su lugar de trabajo y cumplir con la jornada laboral establecida.");
                        //col.Item().PaddingTop(5).Text($"4. Informar oportunamente al empleador sobre cualquier situación que afecte su desempeño laboral.");
                        //col.Item().PaddingTop(5).Text($"QUINTA: OBLIGACIONES DEL EMPLEADOR. El empleador se compromete a cumplir con las siguientes obligaciones:").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"1. Pagar puntualmente el salario acordado al trabajador.");
                        //col.Item().PaddingTop(5).Text($"2. Proporcionar al trabajador las herramientas y recursos necesarios para el desempeño de sus funciones.");
                        //col.Item().PaddingTop(5).Text($"3. Cumplir con las normas laborales y de seguridad social vigentes.");
                        //col.Item().PaddingTop(5).Text($"SEXTA: TERMINACIÓN DEL CONTRATO. El contrato podrá ser terminado por cualquiera de las partes, previo aviso con una antelación de {d.Permanencia} días, o en los casos previstos por la ley.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"SÉPTIMA: CLÁUSULA DE CONFIDENCIALIDAD. El trabajador se compromete a mantener la confidencialidad de la información a la que tenga acceso en virtud de su relación laboral con el empleador, incluso después de la terminación del contrato.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"OCTAVA: LEGISLACIÓN APLICABLE. El presente contrato se regirá por las disposiciones del Código Sustantivo del Trabajo y demás normas laborales vigentes en Colombia.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"NOVENA: FIRMA DEL CONTRATO. El presente contrato se firma en dos ejemplares, uno para cada parte, en la ciudad de {d.CiudadEmpresa}, a los {DateTime.Now.Day} días del mes de {DateTime.Now.ToString("MMMM", cultura)} del año {DateTime.Now.Year}.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"DÉCIMA: ACEPTACIÓN. El trabajador declara haber leído y comprendido el contenido del presente contrato, así como las condiciones laborales y de seguridad social que le son aplicables.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"DÉCIMA PRIMERA: OTROS ACUERDOS. Las partes podrán acordar otras condiciones laborales que no se encuentren expresamente contempladas en el presente contrato, siempre y cuando no contravengan las disposiciones legales vigentes.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"DÉCIMA SEGUNDA: ACEPTACIÓN DE LAS PARTES. Las partes declaran que han leído y comprendido el contenido del presente contrato, y que lo aceptan en su totalidad.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(5).Text($"DÉCIMA TERCERA: FIRMA DEL CONTRATO. En señal de aceptación, las partes firman el presente contrato en dos ejemplares, en la ciudad de {d.CiudadEmpresa}, a los {DateTime.Now.Day} días del mes de {DateTime.Now.ToString("MMMM", cultura)} del año {DateTime.Now.Year}.").Justify().FontSize(10).ParagraphFirstLineIndentation(20);
                        //col.Item().PaddingTop(10).Text("Firmas:").Bold().FontSize(10);



                        // Tabla de ingresos y descuentos


                        //col.Item().PaddingTop(12).Text($"Total a Pagar: {TotalPagarArreglo}").FontFamily("Lato").Bold().FontSize(14).AlignRight();
                        //col.Item().Text("");
                        //col.Item().LineHorizontal(1).LineColor(Colors.Black);


                        //col.Item().PaddingTop(5).Text($"CANTIDAD HORAS EXTRAS REALIZADAS: Hora Extra Diurna {d.CantHED}, Hora Extra Nocturna {d.CantHEN}, Hora Extra Diurna Domical/Festiva {d.CantHEDDF}, Hora Extra Nocturna Domical/Festiva {d.CantHENDF}.").FontSize(7).Justify();
                        //col.Item().PaddingTop(2).Text($"HORAS EXTRAS: Los siguientes son los correspondientes valores para el cálculo de las horas extras. Hora Extra Diurna {ValorHEDArreglo}, Hora Extra Nocturna {ValorHENArreglo}, Hora Extra Diurna Domical/Festiva {ValorHEDDFArreglo}, Hora Extra Nocturna Domical/Festiva {ValorHENDFArreglo}.").FontSize(7).Justify();
                        //col.Item().PaddingTop(2).Text($"* OTROS INGRESOS: {d.ConceptoIngresosAdicionales}").FontSize(6).Justify();
                        //col.Item().PaddingTop(2).Text($"** OTROS DESCUENTOS: {d.ConceptoDescuentosAdicionales}").FontSize(6).Justify();

                        col.Item().PaddingTop(80).Row(r => { r.RelativeItem().AlignCenter().Text("Firma Trabajador").SemiBold(); r.RelativeItem().AlignCenter().Text($"Firma o Sello Empresa").SemiBold(); });
                        col.Item().PaddingTop(0).Row(r => { r.RelativeItem().AlignCenter().Text($"{d.Empleado}").SemiBold().FontSize(8); r.RelativeItem().AlignCenter().Text($"{d.Empresa}").SemiBold().FontSize(8); });

                        //col.Item().PaddingTop(10).Text("Comprobante de Nómina generado con Sofia Software Administrativo V 1.0").FontSize(6);
                    });

                    page.Footer()
                    .PaddingTop(5)
                        .AlignRight()
                        .Text("Contrato de Trabajo generado con Sofia Software Administrativo V 1.0").FontSize(6);

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

            return File(pdfBytes, "application/pdf", "Contrato de Trabajo # " + id + ".pdf");
        }

    }
}