using Data.DataEntities;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Globalization;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Contrato_LaboralController : Controller
    {
        static Contrato_LaboralController()
        {
            QuestPDF.Settings.License = LicenseType.Community;
        }

        private readonly DataContratoLaboral dataContratoLaboral = new DataContratoLaboral();


        public JsonResult CrearCLE(string IdUser, int IdEmpleado, int IdSucursal, int IdCargo, int IdTipoContrato, int SalarioMensual, string FechaInicio,
                                    int IdEps, decimal PorcentajeContEps, int IdFondoPension, decimal PorcentajeContFP, int IdBanco,
                                    string NumeroCuentaPago, int SubTransporte, int IdCesantias, string Observacion)
        {
            var resultado = dataContratoLaboral.CrearCLE(IdUser, IdEmpleado, IdSucursal, IdCargo, IdTipoContrato, SalarioMensual, FechaInicio, 
                                                            IdEps, PorcentajeContEps, IdFondoPension, PorcentajeContFP, IdBanco, NumeroCuentaPago,
                                                            SubTransporte, IdCesantias, Observacion);

            return Json(resultado);
        }

        public JsonResult ActualizarCLE(string IdUser, int IdCLE, int IdCargo, int IdTipoContrato, int SalarioMensual, int IdEps,
                                        decimal PorcentajeContEps, int IdFondoPension, decimal PorcentajeContFP, int IdBanco,
                                        string NumeroCuentaPago, int SubTransporte, int IdCesantias, string Observacion, int IdEstado)
        {
            var resultado = dataContratoLaboral.ActualizarCLE(IdUser, IdCLE, IdCargo, IdTipoContrato, SalarioMensual, IdEps,
                                                                PorcentajeContEps, IdFondoPension, PorcentajeContFP, IdBanco, NumeroCuentaPago,
                                                                SubTransporte, IdCesantias, Observacion, IdEstado);
            return Json(resultado);
        }

        public JsonResult FinalizarCLE(string IdUser, int IdCLE, string FechaFin)
        {
            string resultado = dataContratoLaboral.FinalizarCLE(IdUser, IdCLE, FechaFin);
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
                        page.Margin(2, QuestPDF.Infrastructure.Unit.Centimetre);
                        page.PageColor(Colors.White);
                        page.DefaultTextStyle(x => x.FontFamily("Lato").FontSize(12));

                        page.Header().PaddingBottom(10).Row(row =>
                        {
                            row.RelativeItem().Height(60).Image(logoBytes).FitHeight();
                            row.RelativeItem().AlignMiddle().Text($"Contrato Laboral - # {consecutivocle}")
                            .FontFamily("Lato").AlignRight().FontSize(10);
                        });

                        page.Content().Column(col =>
                        {

                            col.Spacing(0);
                            // Datos generales del empleado
                            col.Item().Text($"");
                            col.Item().Text($"{d.Empresa}").FontSize(18).Bold();
                            col.Item().Text($"{d.InfoEmpresa}").FontSize(7);
                            col.Item().PaddingTop(15).Text($"CONTRATO INDIVIDUAL DE TRABAJO").AlignCenter().Bold();
                            col.Item().PaddingTop(10).Text("DATOS TRABAJADOR").FontSize(10).Bold();
                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Nombre Trabajador: ").SemiBold().FontSize(10);
                                text.Span($"{d.Empleado}").FontSize(10);
                            });
                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Documento:  ").SemiBold().FontSize(10);
                                text.Span($"{d.TipoDocumentoEmpleado}").FontSize(10);
                                text.Span($" {d.IdentificacionEmpleado} de {d.CiudadExpedicionDocumentoEmpleado}.").FontSize(10);
                            });

                            col.Item().PaddingTop(10).Text("INFORMACIÓN LABORAL").FontSize(10).Bold();
                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Salario Mensual: ").SemiBold().FontSize(10);
                                text.Span($"{SalarioMensualArreglo}").FontSize(10);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Lugar y período de pago: ").SemiBold().FontSize(10);
                                text.Span($"{d.CiudadEmpresa} - Quincenal.").FontSize(10);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Forma de pago: ").SemiBold().FontSize(10);
                                text.Span($"Cuenta Ahorros, Billetera Digital (Nequi, Daviplata, Ahorro a la Mano, etc.).").FontSize(10);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Cargo a Desempeñar: ").SemiBold().FontSize(10);
                                text.Span($"{d.Cargo}.").FontSize(10);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Fecha de inicio Contrato (aa-mm-dd): ").SemiBold().FontSize(10);
                                text.Span($"{d.FechaIngreso}").FontSize(10);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Fecha de Fin Contrato (aa-mm-dd): ").SemiBold().FontSize(10);
                                text.Span($"{d.FechaFin}").FontSize(10);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Permanencia: ").SemiBold().FontSize(10);
                                text.Span($"{d.Permanencia}").FontSize(10);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Estado Contrato: ").SemiBold().FontSize(10);
                                text.Span($"{d.Estado}").FontSize(10);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Lugar de desempeño de labores: ").SemiBold().FontSize(10);
                                text.Span($"{d.Sucursal} y/o zonas indicadas por EL EMPLEADOR.").FontSize(10);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Ciudad donde ha sido contratado el trabajador: ").SemiBold().FontSize(10);
                                text.Span($"{d.CiudadEmpresa}").FontSize(10);
                            });



                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span($"Entre los suscritos a saber ").FontSize(8);
                                text.Span($"{d.RLEmpresa}").SemiBold().FontSize(8);
                                text.Span($", identificado con ").FontSize(8);
                                text.Span($" {d.TipoDocumentoRLEmpresa}").Bold().FontSize(8);
                                text.Span($", número ").FontSize(8);
                                text.Span($" {d.IdentificacionRLEmpresa}").Bold().FontSize(8);
                                text.Span($", expedido(a) en la ciudad de ").FontSize(8);
                                text.Span($" {d.CiudadExpedicionDocumentoRLEmpresa}").SemiBold().FontSize(8);
                                text.Span($", representante legal de ").FontSize(8);
                                text.Span($" {d.Empresa}").SemiBold().FontSize(8);
                                text.Span($" con ").FontSize(8);
                                text.Span($" {d.TipoDocumentoEmpresa}").Bold().FontSize(8);
                                text.Span($", número ").FontSize(8);
                                text.Span($" {d.IdentificacionEmpresa}").Bold().FontSize(8);
                                text.Span($", con domicilio en la ciudad de ").FontSize(8);
                                text.Span($" {d.CiudadEmpresa}").SemiBold().FontSize(8);
                                text.Span($", quien en adelante y para los efectos del presente contrato se denomina como ").FontSize(8);
                                text.Span($"EL EMPLEADOR").Bold().FontSize(8);
                                text.Span($", y por el otro, ").FontSize(8);
                                text.Span($"{d.Empleado}").Bold().FontSize(8);
                                text.Span($" con ").FontSize(8);
                                text.Span($" {d.TipoDocumentoEmpleado}").Bold().FontSize(8);
                                text.Span($", número ").FontSize(8);
                                text.Span($" {d.IdentificacionEmpleado}").Bold().FontSize(8);
                                text.Span($", expedido(a) en la ciudad de ").FontSize(8);
                                text.Span($" {d.CiudadExpedicionDocumentoEmpleado}").SemiBold().FontSize(8);
                                text.Span($", quien en adelante y para los efectos del presente contrato se denomina como ").FontSize(8);
                                text.Span($"EL TRABAJADOR").Bold().FontSize(8);
                                text.Span($", ambos mayores de edad, identificados como aparece al pie de las firmas, hemos acordado suscribir este contrato de trabajo ").FontSize(8);
                                text.Span($" {d.TipoContrato}").SemiBold().FontSize(8);
                                text.Span($", el cual se regirá por las siguientes cláusulas:").FontSize(8);
                            });

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("PRIMERA - EL EMPLEADOR ").SemiBold().FontSize(8);
                                text.Span(" Contrata los servicios personales del ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" y éste se obliga a poner toda su capacidad normal de trabajo y en forma EXCLUSIVA al servicio del ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", desempeñando las funciones propias del cargo ").FontSize(8);
                                text.Span($" {d.Cargo}").Bold().FontSize(8);
                                text.Span(", comprendidas en el manual de funciones provisto por el ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                            });


                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("SEGUNDA - NORMATIVIDAD.").SemiBold().FontSize(8);
                                text.Span(" Las partes declaran que en el presente contrato se entienden incorporadas, en lo pertinente, las disposiciones legales colombianas que regulan las relaciones entre el empleador y sus trabajadores, en especial, las del contrato de trabajo para el oficio que se suscribe, fuera de las obligaciones consignadas en el manual de funciones, y reglamentos de trabajo, de higiene y seguridad industrial de la empresa.").FontSize(8);
                            });

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("TERCERA - OBLIGACIONES DEL TRABAJADOR.").SemiBold().FontSize(8);
                                text.Span(" Son obligaciones especiales del ").FontSize(8);
                                text.Span("EL TRABAJADOR:").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("1.").SemiBold().FontSize(8);
                                text.Span(" Ejecutar, aceptar y cumplir rigurosamente las normas, órdenes e instrucciones dadas por ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", sus representantes o superiores jerárquicos.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("2.").SemiBold().FontSize(8);
                                text.Span(" Guardar absoluta reserva, salvo autorización expresa de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", de la información de naturaleza reservada o cuya divulgación pueda causar perjuicios a ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", que llegare a su conocimiento por razones de su oficio sobre aspectos administrativos, operacionales, de negocios, de procedimientos, industriales, comerciales o cualquier otra referente a ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" o su actividad o la de sus clientes.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("3.").SemiBold().FontSize(8);
                                text.Span(" Dedicar la totalidad de su jornada de trabajo al cabal cumplimiento de las funciones encomendadas, con puntualidad y eficiencia.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("4.").SemiBold().FontSize(8);
                                text.Span(" Cumplir los horarios de trabajo establecidos por el ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("5.").SemiBold().FontSize(8);
                                text.Span(" Actuar con armonía y buen trato a los clientes, superiores y compañeros de trabajo en sus relaciones personales y en la ejecución de sus labores.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("6.").SemiBold().FontSize(8);
                                text.Span(" Avisar inmediatamente y por escrito a ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" todo cambio de dirección, teléfono o ciudad de residencia.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("7.").SemiBold().FontSize(8);
                                text.Span(" No retirar bienes o elementos de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" sin su autorización previa.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("8.").SemiBold().FontSize(8);
                                text.Span(" Utilizar y responder por los elementos de trabajo que ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" ponga a su disposición, así mismo debe restituir oportunamente los equipos, valores, documentos, y demás elementos de trabajo que le entregue ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" para el desempeño de su cargo, en todo caso cuando ocurran daños o pérdidas no imputables al desgaste producido por el uso natural o corriente, deberá sufragar el valor comercial del objeto dañado o perdido, el valor de su reparación o restituir uno de igual condición y características.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("9.").SemiBold().FontSize(8);
                                text.Span(" Someterse a la práctica de los exámenes médicos o sanitarios que ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" exija en cualquier momento.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("10.").SemiBold().FontSize(8);
                                text.Span(" Avisar oportunamente a su superior inmediato sobre cualquier deficiencia que tengan los vehículos, máquinas, equipos o implementos de labor con el fin de evitar accidentes, daños o costos adicionales.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("11.").SemiBold().FontSize(8);
                                text.Span(" Suministrar los documentos o informaciones que con ocasión de la relación laboral le solicite ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("12.").SemiBold().FontSize(8);
                                text.Span(" No tomar el nombre de  ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" ni la papelería, ni sus instalaciones para contraer obligaciones o utilizarlas en beneficio propio.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("13.").SemiBold().FontSize(8);
                                text.Span(" Cumplir los manuales de funciones y políticas de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", código de conducta, ética y demás que sean desarrolladas por éste, los cuales se entienden incorporados al presente contrato y que ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" declara conocer en su integridad.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("14.").SemiBold().FontSize(8);
                                text.Span(" Las demás consagradas en los artículos 56 y 58 del Código Sustantivo del Trabajo.").FontSize(8);
                            });

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("CUARTA - OBLIGACIONES ESPECIALES DEL EMPLEADOR.").SemiBold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("1.").SemiBold().FontSize(8);
                                text.Span(" Poner a disposición de los trabajadores, salvo estipulación en contrario, los instrumentos adecuados y las materias primas necesarias, para la realización de las labores.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("2.").SemiBold().FontSize(8);
                                text.Span(" Procurar a los trabajadores, locales apropiados y elementos adecuados de protección contra los accidentes y enfermedades profesionales, en forma que se garanticen razonablemente la seguridad y la salud.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("3.").SemiBold().FontSize(8);
                                text.Span(" Prestar inmediatamente los primeros auxilios en casos de accidentes o de enfermedad.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("4.").SemiBold().FontSize(8);
                                text.Span(" Pagar la remuneración pactada en las condiciones, en periodos y lugares convenidos.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("5.").SemiBold().FontSize(8);
                                text.Span("  Guardar absoluto respeto a la dignidad personal del trabajador y a sus creencias.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("6.").SemiBold().FontSize(8);
                                text.Span(" Dar al trabajador que lo solicite a la expiración del contrato, una certificación en que conste el tiempo de servicio, la índole de la labor y el salario devengado.").FontSize(8);
                            });

                            //////////////////// QUINTA

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("QUINTA - CONFIDENCIALIDAD:").SemiBold().FontSize(8);
                                text.Span(" Toda información obtenida por ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(", así como los informes o documentos que produzca relacionados con el cumplimiento de sus obligaciones, son considerados confidenciales y no pueden ser divulgados sin autorización expresa y escrita del ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                                text.Span(" Por lo tanto, el ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" se compromete a:").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("1.").SemiBold().FontSize(8);
                                text.Span(" Mantener oculto cualquier secreto comercial, “know how”, manera o forma de desarrollar negocios, que llegue a conocer gracias a la información suministrada para el ejercicio de sus funciones y se abstendrá de sacar provecho de aquella información desde cualquier punto de vista.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("2.").SemiBold().FontSize(8);
                                text.Span(" Utilizar la información confidencial única y exclusivamente con el propósito de adelantar el proyecto para el cual haya sido asignado. En consecuencia, se obligan a no divulgar la información que pueden recibir.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("3.").SemiBold().FontSize(8);
                                text.Span(" No revelar información sobre los términos contractuales o comerciales que se llegaren a acordar para la realización de los proyectos, ni sobre las condiciones económicas que se llegaren a pactar, a personas distintas de ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("4.").SemiBold().FontSize(8);
                                text.Span(" Tomar todas las precauciones para garantizar que la información confidencial no sea divulgada ni facilitada a ninguna persona no autorizada.").FontSize(8);
                            });


                            //////////////////// SEXTA

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("SEXTA - PROHIBICIONES DEL TRABAJADOR:").SemiBold().FontSize(8);
                                text.Span(" Además de las consagradas en el artículo 60 del Código Sustantivo del Trabajo y en el Reglamento Interno, son prohibiciones especiales de ").FontSize(8);
                                text.Span("EL TRABAJADOR:").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("1.").SemiBold().FontSize(8);
                                text.Span(" Solicitar préstamos especiales o ayuda económica a los clientes, empleados o proveedores de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" aprovechándose de su cargo u oficio o aceptarles donaciones o dádivas de cualquier clase.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("2.").SemiBold().FontSize(8);
                                text.Span(" Autorizar o ejecutar sin ser de su competencia, operaciones que afecten los intereses de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" o negociar bienes y/o mercancías de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" en provecho propio.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("3.").SemiBold().FontSize(8);
                                text.Span(" Retener dinero o hacer efectivos cheques recibidos para o a nombre de ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("4.").SemiBold().FontSize(8);
                                text.Span(" Presentar cuentas de gastos ficticias o reportar como cumplidas visitas o tareas no efectuadas.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("5.").SemiBold().FontSize(8);
                                text.Span(" Revelar, difundir, comentar, copiar o realizar un uso diferente para el cual se le dio acceso a la información de naturaleza reservada o utilizarla para el ejercicio de su propia actividad en beneficio propio o de terceros, o duplicarla o compartirla con terceras personas, salvo que exista autorización previa y escrita de ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("6.").SemiBold().FontSize(8);
                                text.Span(" Retardar o permitir que otros retarden injustificadamente la ejecución de las labores a su cargo.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("7.").SemiBold().FontSize(8);
                                text.Span(" La ingestión de bebidas embriagantes dentro de la empresa, la presentación a laborar en estado embriaguez o bajo la influencia de narcóticos o de drogas enervantes.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("8.").SemiBold().FontSize(8);
                                text.Span(" Realizar o intentar realizar o permitir actos de fraude en relación con el reconocimiento de salarios, prestaciones, viáticos, gastos de viaje, gastos de representación, auxilios, subsidios y, en general cualquier emolumento que por razón de su vinculación laboral con ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" deba recibir un TRABAJADOR.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("9.").SemiBold().FontSize(8);
                                text.Span(" Cualquier irrespeto en que incurra ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" durante sus labores o en desarrollo de algún tipo de actividad organizada por ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", contra cualquiera de los funcionarios de la misma o contra personas que se encuentren en las instalaciones.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("10.").SemiBold().FontSize(8);
                                text.Span(" Omitir o permitir que otras personas omitan las condiciones y requerimientos de seguridad y protección personal en las labores a su cargo.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("11.").SemiBold().FontSize(8);
                                text.Span(" Delegar a compañeros o a terceros cualquiera de las obligaciones que a ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" le corresponden.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("12.").SemiBold().FontSize(8);
                                text.Span(" Faltarle al respeto a los superiores jerárquicos o compañeros de trabajo.").FontSize(8);
                            });


                            //////////////////// SEPTIMA

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("SEPTIMA - SALARIO:").SemiBold().FontSize(8);
                                text.Span(" EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" pagará al ").FontSize(8);
                                text.Span("EL TRABAJADOR:").Bold().FontSize(8);
                                text.Span(" por la prestación de sus servicios el salario indicado, pagadero en el lugar y oportunidades también señaladas arriba. Dentro de este pago se encuentra incluida la remuneración de los descansos dominicales y festivos de que tratan los Capítulos I y II del Título VII del Código Sustantivo del Trabajo, así como los que voluntariamente otorgue ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" al ").FontSize(8);
                                text.Span("EL TRABAJADOR. EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" no suministrará clase alguna de salario en especie.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("Parágrafo 1.").SemiBold().FontSize(8);
                                text.Span(" En todos los casos en que ").FontSize(8);
                                text.Span("EL TRABAJADOR ").Bold().FontSize(8);
                                text.Span(" sea comisionado para reemplazar  otro, continuará devengando la asignación mensual del cargo que tenga al momento de la comisión, salvo orden escrita de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" en sentido contrario.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("Parágrafo 2.").SemiBold().FontSize(8);
                                text.Span(" Las partes pactan y aceptan a través del presente documento, que el hecho que ").FontSize(8);
                                text.Span("EL TRABAJADOR ").Bold().FontSize(8);
                                text.Span(" cumpla las directrices, órdenes e instrucciones impartidas por otra persona natural o jurídica o que preste servicios a favor de la misma por instrucción expresa de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", como parte de sus obligaciones laborales, no modifica el salario indicado en la presente cláusula ni lo hace beneficiario o partícipe de cualquier bonificación, beneficio, auxilio, etc., de carácter salarial o no que se otorgue a los trabajadores de la otra persona o empresa, salvo que así se haya pactado expresamente en el presente contrato laboral, en razón a que el cumplimiento de órdenes y la prestación de servicios por parte de ").FontSize(8);
                                text.Span("EL TRABAJADOR ").Bold().FontSize(8);
                                text.Span(" a otra persona natural o jurídica no generará beneficios dinerarios o extralegales adicionales a los ya existentes con ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", toda vez que su contrato de trabajo está pactado única y exclusivamente con ésta sociedad, quien es ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span("  lo cual es reconocido y aceptado por ").FontSize(8);
                                text.Span("EL TRABAJADOR ").Bold().FontSize(8);
                                text.Span(" a través del presente documento contractual.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("Parágrafo 3. Pagos no salariales.").SemiBold().FontSize(8);
                                text.Span(" Las partes pactan a través del presente documento que cualquier beneficio o auxilio bien sea habitual u ocasional (como por ejemplo alimentación, transporte, alojamiento, vestuario, las primas extralegales de servicios, de vacaciones, de navidad, etc) acordado convencional o contractualmente u otorgado en forma extralegal por ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", no constituirá salario en dinero o en especie para efectos de liquidación, es decir, podrá excluirse de la base de cómputo para la liquidación de conceptos laborales tales como prestaciones sociales, indemnizaciones, aportes a la seguridad social, etc., de conformidad a lo establecido en el artículo 128 del Código Sustantivo del Trabajo, subrogado por el artículo 15 de la Ley 50 de 1990. \r\n").FontSize(8);
                                text.Span("Adicionalmente, las partes aquí firmantes hacen constar que conocen lo dispuesto en el artículo 128 del CST según el cual no constituyen salario las sumas que ocasionalmente y por mera liberalidad recibe el trabajador del empleador, como primas, bonificaciones o gratificaciones ocasionales, participación de utilidades y lo que recibe en dinero o en especie no para su beneficio, ni para enriquecer su patrimonio, sino para desempeñar a cabalidad sus funciones, como gastos de representación, medios de transporte o de movilización, elementos de trabajo y otros semejantes. Tampoco las prestaciones sociales de que tratan los títulos VIII y IX del CST.").FontSize(8);
                            });

                            //////////////////// OCTAVA

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("OCTAVA - JORNADA DE TRABAJO:").SemiBold().FontSize(8);
                                text.Span(" EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" se obliga a laborar la jornada máxima legal en los turnos y dentro de las horas señalados por ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" pudiendo hacer éste ajustes o cambios de horario cuando lo estime conveniente. Por el acuerdo expreso o tactito de las partes, podrán repartirse las horas de la jornada ordinaria en la forma prevista en el artículo 164 del Código Sustantivo del trabajo, modificado por el artículo 23 de la Ley 50 de 1990, teniendo en cuenta que los tiempos de descanso entre las secciones de la jornada no se computan dentro de la misma, según el artículo 167 ibídem. ").FontSize(8);
                            });

                            //////////////////// NOVENA

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("NOVENA - PERIODO DE PRUEBA Y DURACIÓN:").SemiBold().FontSize(8);
                                text.Span(" EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" y ").FontSize(8);
                                text.Span(" EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" acuerdan que los dos (2) primeros meses de ejecución del presente contrato se consideran como período de prueba, término dentro del cual cualquiera de las partes podrá dar por terminado de forma unilateral y sin previo aviso este contrato.\r\nVencido el periodo de prueba, la duración del contrato será definida y tendrá vigencia mientras subsistan las causas que le dieron origen y la materia del trabajo. Con todo, ").FontSize(8);
                                text.Span(" EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" podrá dar por terminado unilateralmente este contrato, comunicando por escrito su decisión a ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(",  con una antelación no inferior a treinta (30) días para que éste lo reemplace.").FontSize(8);

                            });

                            //////////////////// DECIMA

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("DÉCIMA - JUSTAS CAUSAS DE TERMINACIÓN DEL CONTRATO:").SemiBold().FontSize(8);
                                text.Span(" Son justas causas para dar por terminado unilateralmente este contrato, las enumeradas en el artículo 62 del Código Sustantivo del trabajo, modificado por el artículo 7o. del Decreto 2351/65 y además por parte de ").FontSize(8);
                                text.Span(" EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(",  las faltas que para el efecto se califiquen como graves en reglamentaciones, órdenes, instrucciones o prohibiciones de carácter general o particular, pactos, convenciones colectivas, laudos arbitrales y las que expresamente convengan calificar así en escritos que formarán parte integral del presente contrato. Expresamente se califican en este acto como graves las siguientes faltas:").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("1.").SemiBold().FontSize(8);
                                text.Span(" La violación o incumplimiento por parte de ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" de cualquiera de las obligaciones legales, contractuales o reglamentarias.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("2.").SemiBold().FontSize(8);
                                text.Span(" La ejecución por parte de ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" de labores remuneradas al servicio de terceros sin autorización expresa de ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("3.").SemiBold().FontSize(8);
                                text.Span("  La revelación de secretos y datos reservados de ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("4.").SemiBold().FontSize(8);
                                text.Span(" El hecho de que ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" llegue embriagado al trabajo o ingiera bebidas embriagantes en el sitio de trabajo, aún por la primera vez. ").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("5.").SemiBold().FontSize(8);
                                text.Span(" La no asistencia a una jornada completa o parcial de trabajo o más sin excusa suficiente a juicio de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" salvo fuerza mayor o caso fortuito.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("6.").SemiBold().FontSize(8);
                                text.Span(" Utilizar el buen nombre de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" o valerse de las labores encomendadas por él, para emprender, respaldar o acreditar negocios o actividades comerciales de ").FontSize(8);
                                text.Span("EL TRABAJADOR.").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("7.").SemiBold().FontSize(8);
                                text.Span(" El que no cumpla con las responsabilidades y funciones asignadas a su cargo.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("8.").SemiBold().FontSize(8);
                                text.Span(" El incumplimiento a las políticas laborales, de ética y conducta de ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("9.").SemiBold().FontSize(8);
                                text.Span(" Entregar u ofrecer cualquier dádiva a un funcionario público o empleado oficial con el ánimo de comprometer la ética profesional y la honestidad del funcionario y, que de manera directa o indirecta comprometa la responsabilidad de ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("10.").SemiBold().FontSize(8);
                                text.Span(" Presentar cuentas de gastos ficticias.").FontSize(8);
                            });

                            //////////////////// DECIMA PRIMERA

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("DÉCIMA PRIMERA - AUTORIZACIÓN PARA USO, RECOLECCIÓN, TRATAMIENTO DE DATOS PERSONALES DERIVADO DE LA LEY DE HABEAS DATA:").SemiBold().FontSize(8);
                                text.Span(" En mi condición de ").FontSize(8);
                                text.Span(" EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(", por medio del presente documento autorizo de forma voluntaria, expresa e inequívoca a ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" para usar, tratar, transferir, transmitir, corregir y verificar todos los datos por mí suministrados en vigencia de la relación laboral y de forma previa a la misma. Lo anterior, para los fines, necesidades y objetivos derivados del contrato de trabajo y con el propósito de administrar y ejecutar correctamente la relación laboral por parte de la empresa en el marco del contrato de trabajo con los siguientes alcances y limitaciones: ").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("1.").SemiBold().FontSize(8);
                                text.Span(" Autorizo la circulación, tratamiento, supresión, recopilación, recolección, almacenamiento, copia, entrega, actualización, ordenamiento, clasificación, transferencia, transmisión, corrección, verificación, uso para fines estadísticos, comerciales, históricos y administrativos de la empresa, y en general la utilización (incluso con posterioridad a la terminación del contrato de trabajo) de todos los datos por mi suministrados en vigencia de la relación laboral y/o de forma previa a la misma y/o durante el proceso de selección, autorización que comprende mi información personal y de datos sensibles, contenidos o no en bases de datos. Lo anterior, con el objetivo de ser usados como información necesaria para la correcta contratación, administración y ejecución del contrato de trabajo, así como para el desarrollo del objeto social de la empresa, teniendo en cuenta que son datos pertinentes, necesarios y adecuados.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("2.").SemiBold().FontSize(8);
                                text.Span(" Autorizo el uso y tratamiento de mi información sensible que por razón del contrato de trabajo se haya obtenido, así como la relacionada con los menores de edad y datos familiares de personas incluidas en mi grupo familiar o a mi cargo, la cual fue suministrada para los efectos derivados del contrato de trabajo.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("3.").SemiBold().FontSize(8);
                                text.Span(" Autorizo el uso y tratamiento de los datos biométricos, tales como huellas dactilares, imagen en video, grabaciones, entre otros, para los fines necesarios del contrato de trabajo.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("4.").SemiBold().FontSize(8);
                                text.Span(" Autorizo el uso y tratamiento de los datos por parte de terceros que deban tener acceso a esa información por razón del contrato de trabajo, tales como administradores de personal, de nómina, contables, entidades de control, entidades de seguridad social y parafiscales y, demás terceros que deban conocer la información en cumplimiento de las obligaciones de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" en material laboral, de seguridad social y demás legalmente procedentes.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("5.").SemiBold().FontSize(8);
                                text.Span(" Entiendo y comprendo que el uso de información personal de otros trabajadores para fines diferentes de los del contrato de trabajo y asuntos derivados de éste, se encuentra completamente prohibida, por lo que en mi calidad de ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" me obligo a no utilizar la información antes descrita. Así mismo entiendo que por dato público se entiende aquellos datos relativos al estado civil de las personas, su profesión u oficio.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("6.").SemiBold().FontSize(8);
                                text.Span(" Me comprometo a verificar, rectificar, corregir o actualizar la información en tanto cambie su contenido.").FontSize(8);
                            });

                            col.Item().PaddingTop(0).Text(text =>
                            {
                                text.Justify();
                                text.Span("7.").SemiBold().FontSize(8);
                                text.Span(" Mediante la firma del presente documento, manifiesto que he sido informado por parte de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" sobre el alcance y contenido de la Ley de Habeas Data y que éste actuará en condición de responsable y podrá realizar cambios en la política de administración de datos cuando lo considere conveniente. ").FontSize(8);
                            });

                            //////////////////// DECIMA SEGUNDA

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("DÉCIMA SEGUNDA - INVENCIONES:").SemiBold().FontSize(8);
                                text.Span(" EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" expresamente manifiesta que CEDE a título gratuito a favor de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", quien acepta, los derechos patrimoniales de autor de todos aquellos descubrimientos o invenciones y las mejoras en los procedimientos, lo mismo que todos los trabajos y consiguientes resultados de las actividades de ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(", que éste desarrolle con ocasión del presente contrato de trabajo. Por consiguiente, las invenciones, descubrimientos y mejoras en los procedimientos, lo mismo que todos los trabajos y consiguientes resultados efectuados por ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" con ocasión de la ejecución del objeto contractual serán de propiedad de ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                                text.Span("  Los descubrimientos, invenciones o las mejoras en los procedimientos al igual que los trabajos y sus consiguientes resultados en las actividades mientras ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" preste sus servicios a la EMPRESA, incluso aquellos de los que trata el artículo 539 del Código de Comercio, son de la exclusiva propiedad de ésta, teniendo ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" derecho a patentar a su nombre o en el de terceros los inventos o mejoras y quedando obligado ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" a facilitar el cumplimiento oportuno de las formalidades respectivas, firmar o extender los poderes como los documentos necesarios para tal fin cuando le sean solicitados, sin que por ello se deba reconocer ni pagar compensación alguna.").FontSize(8);
                            });


                            col.Item().PaddingTop(5).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("La titularidad originaria o derivada de los derechos patrimoniales de las obras literarias, artísticas o científicas, que incluye entre otras, la determinación del artículo 4 de la Decisión 351 de la Comunidad Andina de Naciones, realizados por ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(", en cumplimiento de este contrato, se radica en cabeza de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", de conformidad con lo establecido en el artículo 10° de la misma Decisión y demás normas conexas y complementarias.").FontSize(8);
                            });

                            //////////////////// DECIMA TERCERA

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("DÉCIMA TERCERA - LUGAR Y LABORES:").SemiBold().FontSize(8);
                                text.Span(" EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" se obliga a prestar sus servicios en el lugar del territorio de la República de Colombia que indicare ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" y excepcionalmente fuera de dicho territorio cuando las necesidades del servicio así lo exigieren. En todo caso, ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" se obliga a aceptar los cambios de oficio o lugar de prestación del servicio que decida ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" dentro de su poder subordinante. ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" se reserva la facultad y ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" la acepta de trasladarlo a cualquiera de las ciudades, zonas o regiones que tengan establecidas dentro del territorio nacional. La aceptación de este traslado por parte de ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" forma parte integral de este contrato de trabajo y por quedar fijados los parámetros exigidos por el artículo 39 del CST, cualquier traslado que ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" ordene no podrá tomarse como modificación de las condiciones laborales pactadas. En todo caso de modificación, variación, cambio, adición o alteración del sitio o lugar donde ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" va inicialmente a prestar sus servicios o los cambios o modificaciones que posteriormente se hagan durante la vigencia del contrato, la hará saber ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" al ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" por escrito. Queda entendido que el traslado no implica modificación del salario, pero ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" acepta que las condiciones ambientales, tales como ciudades, costos de servicios públicos, cánones de arrendamiento, costos de educación y alimentación, vida social, etc, pueden ser diferentes, lo cual no implica por parte de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" modificación alguna de las condiciones de trabajo, pues ello corresponde a un riesgo propio de la actividad laboral o naturaleza del cargo y porque, además son circunstancias que tanto ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" como ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" prevén de buena fe, en el momento de suscribir este contrato.").FontSize(8);
                            });

                            col.Item().PaddingTop(5).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(0);
                                text.Span("En todo caso para las partes es claro y así lo convienen, que el lugar asignado inicialmente para el desarrollo de la labor por parte ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(", es la ciudad de ").FontSize(8);
                                text.Span($"{d.CiudadEmpresa}").Bold().FontSize(8);
                                text.Span(" y zonas aledañas a la misma, sobre la base que esta asignación no es definitiva en la medida que: a) el cargo requiere de la posibilidad de asignar a ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" a otra(s) zona(s) donde su labor sea necesaria en razón a la naturaleza del servicio contratado y las aptitudes de ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span("; y en que b) el negocio de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(" está disperso en varias zonas del territorio nacional, por ende, requiere de una asignación flexible y eficiente de la labor contratada, en consecuencia, ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" podrá ser reasignado para lo cual bastará la notificación oportuna y previa que haga ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                                text.Span(" Esta es una característica que las partes hacen explícita como un supuesto para el logro de los objetivos empresariales y como tal ").FontSize(8);
                                text.Span("EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" declara conocerla suficientemente y estar en disposición de adaptarse personal y familiarmente a la misma, pues dicha flexibilidad es una condición esencial para la celebración de este contrato y/o asignación del cargo que se le confía.").FontSize(8);
                            });

                            col.Item().PaddingTop(5).Text(text =>
                            {
                                text.Justify();
                                text.Span("Parágrafo.").SemiBold().FontSize(8);
                                text.Span("En el evento de que accidentalmente o en forma esporádica u ocasional, ").FontSize(8);
                                text.Span("EL TRABAJADOR ").Bold().FontSize(8);
                                text.Span(" deba desplazarse de su sede de trabajo por orden o disposición de ").FontSize(8);
                                text.Span("EL EMPLEADOR").Bold().FontSize(8);
                                text.Span(", y devengue gastos de viaje, estos NO CONSTITUYEN SALARIO, de acuerdo con la ley.").FontSize(8);
                            });

                            //////////////////// DECIMA CUARTA

                            col.Item().PaddingTop(15).Text(text =>
                            {
                                text.Justify();
                                text.ParagraphFirstLineIndentation(20);
                                text.Span("DÉCIMA CUARTA - INTEGRIDAD CONTRACTUAL:").SemiBold().FontSize(8);
                                text.Span(" EL TRABAJADOR").Bold().FontSize(8);
                                text.Span(" manifiesta conocer este contrato y estar de acuerdo con el mismo en todas sus partes. Así mismo declara que conoce en su totalidad el Reglamento de Trabajo de ").FontSize(8);
                                text.Span("EL EMPLEADOR.").Bold().FontSize(8);
                                text.Span(" El presente contrato reemplaza en su integridad y deja sin efecto cualquier otro contrato verbal o escrito celebrado entre las partes con anterioridad, no obstante, ").FontSize(8);
                                text.Span("para todos los efectos legales se reconoce la antigüedad del contrato conforme la fecha de iniciación de labores que figura en la carátula del presente documento. Las modificaciones que se acuerden al presente contrato de trabajo deberán hacerse por escrito las que formarán parte integrante de este contrato.").FontSize(8);
                            });

                            col.Item().PaddingTop(5).Text(text =>
                            {
                                text.Justify();
                                text.Span($"Para constancia y en señal de aceptación de las condiciones descritas en este documento, se firma por las partes que han intervenido en un ejemplar y copia, el dia ").FontSize(8);
                                text.Span($"{d.FechaFirmaContrato}").Bold().FontSize(8);
                                text.Span(" en la ciudad de ").FontSize(8);
                                text.Span($"{d.CiudadEmpresa}.").Bold().FontSize(8);
                            });







                            col.Item().PaddingTop(80).Row(r => { r.RelativeItem().AlignCenter().Text("Firma Trabajador").SemiBold(); r.RelativeItem().AlignCenter().Text($"Firma o Sello Empresa").SemiBold(); });
                            col.Item().PaddingTop(0).Row(r => { r.RelativeItem().AlignCenter().Text($"{d.Empleado}").SemiBold().FontSize(8); r.RelativeItem().AlignCenter().Text($"{d.Empresa}").SemiBold().FontSize(8); });

                        });

                        page.Footer()
                        .PaddingTop(5)
                            .AlignRight()
                            .Text(x =>
                            {
                                x.Span("Contrato de Trabajo generado con Sofia Software Administrativo V 1.0  - ").FontSize(6);
                                x.Span(" Página ").FontSize(8);
                                x.CurrentPageNumber().FontSize(8);
                            });


                    });
                }).GeneratePdf();

            fontStream.Dispose();

            return File(pdfBytes, "application/pdf", "Contrato de Trabajo # " + consecutivocle + " " + d.Empleado + ".pdf");
        }

    }
}