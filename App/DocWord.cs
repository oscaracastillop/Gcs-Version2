using Microsoft.Office.Interop.Word;
using System;
using System.Data.SqlClient;
using System.Globalization;

namespace App
{
    public class DocWord
    {

        public void CrearDocumento()
        {
            // Cadena de conexión a la base de datos
            string connectionString = "data source=LPAGIOSCASTILLO;initial catalog=GcsV2;persist security info=True;user id=sa;password=Oscar1982;trustservercertificate=True;MultipleActiveResultSets=True;";

            // Consulta SQL para obtener los datos
            string query = "SELECT Nombre FROM Usuario";

            // Crear una instancia de la aplicación de Word
            Application wordApp = new Application();
            Document doc = wordApp.Documents.Add();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand(query, connection);
                    SqlDataReader reader = command.ExecuteReader();
                    //string nombre = reader["Nombre"].ToString();

                    //// Escribir los datos en el documento de Word
                    //Paragraph para = doc.Content.Paragraphs.Add();
                    //para.Range.Text = "Lista de Ciudad:";
                    //para.Range.InsertParagraphAfter();

                    //while (reader.Read())
                    //{
                    //    string nombre = reader["Nombre"].ToString();
                    //    string ciudad = "Funza, Cundinamarca";
                    //    //string apellido = reader["Usuario"].ToString();
                    //    //para.Range.Text = $"{nombre} {apellido}";
                    //    para.Range.Text = $"{ciudad}";
                    //    para.Range.Text = $"{nombre}";
                    //    para.Range.InsertParagraphAfter();
                    //}


                    // Ruta de la imagen del logo
                    //string logoPath = @"~/Images/LogoEmpresa/default.png";

                    // Agregar el logo al documento
                    Paragraph para = doc.Content.Paragraphs.Add();
                    //InlineShape logo = para.Range.InlineShapes.AddPicture(logoPath);
                    //logo.Width = 100; // Ajustar el ancho del logo
                    //logo.Height = 100; // Ajustar la altura del logo
                    //para.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    //para.Range.InsertParagraphAfter();

                    //// Agregar un espacio
                    //para.Range.InsertParagraphAfter();

                    // Agregar el título del documento y centrar el texto
                    para.Range.Text = "CONTRATO LABORAL DE TRABAJO";
                    para.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                    para.Range.Font.Bold = 1;
                    para.Range.Font.Size = 16;
                    para.Range.InsertParagraphAfter();

                    // Agregar un espacio
                    para.Range.InsertParagraphAfter();

                    // Agregar la introducción del contrato
                    para.Range.Text = "Entre las partes, [Nombre del Empleador], con domicilio en [Dirección del Empleador], " +
                                      "y [Nombre del Empleado], con domicilio en [Dirección del Empleado], se celebra el presente " +
                                      "contrato laboral de trabajo, conforme a las siguientes cláusulas:";
                    para.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    para.Range.Font.Bold = 0;
                    para.Range.Font.Size = 12;
                    para.Range.InsertParagraphAfter();

                    // Agregar un espacio
                    para.Range.InsertParagraphAfter();

                    // Agregar la primera cláusula
                    para.Range.Text = "1. Objeto del Contrato";
                    para.Range.Font.Bold = 1;
                    para.Range.InsertParagraphAfter();

                    para.Range.Text = "El empleado se compromete a desempeñar las funciones de [Puesto de Trabajo] " +
                                      "en las instalaciones del empleador, cumpliendo con las tareas y responsabilidades " +
                                      "propias del puesto.";
                    para.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    para.Range.Font.Bold = 0;
                    para.Range.InsertParagraphAfter();

                    // Agregar un espacio
                    para.Range.InsertParagraphAfter();

                    // Agregar la segunda cláusula
                    para.Range.Text = "2. Duración del Contrato";
                    para.Range.Font.Bold = 1;
                    para.Range.InsertParagraphAfter();

                    para.Range.Text = "El presente contrato tendrá una duración de [Duración del Contrato], " +
                                      "iniciando el [Fecha de Inicio] y finalizando el [Fecha de Finalización], " +
                                      "salvo que se acuerde una prórroga por escrito entre ambas partes.";
                    para.Range.Font.Bold = 0;
                    para.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    para.Range.InsertParagraphAfter();

                    // Agregar un espacio
                    para.Range.InsertParagraphAfter();

                    // Agregar la tercera cláusula
                    para.Range.Text = "3. Remuneración";
                    para.Range.Font.Bold = 1;
                    para.Range.InsertParagraphAfter();

                    para.Range.Text = "El empleado recibirá una remuneración mensual de [Monto de la Remuneración], " +
                                      "pagadera en [Forma de Pago] y sujeta a las deducciones legales correspondientes.";
                    para.Range.Font.Bold = 0;
                    para.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    para.Range.InsertParagraphAfter();

                    // Agregar un espacio
                    para.Range.InsertParagraphAfter();

                    // Agregar la cuarta cláusula
                    para.Range.Text = "4. Jornada Laboral";
                    para.Range.Font.Bold = 1;
                    para.Range.InsertParagraphAfter();

                    para.Range.Text = "El empleado cumplirá una jornada laboral de [Horas de Trabajo] horas diarias, " +
                                      "de [Día de Inicio] a [Día de Fin], con un horario de [Horario de Trabajo].";
                    para.Range.Font.Bold = 0;
                    para.Alignment = WdParagraphAlignment.wdAlignParagraphJustify;
                    para.Range.InsertParagraphAfter();

                    // Agregar un espacio
                    para.Range.InsertParagraphAfter();

                    // Agregar la firma del empleador
                    para.Range.Text = "______________________________";
                    para.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    para.Range.InsertParagraphAfter();

                    para.Range.Text = "Firma del Empleador";
                    para.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    para.Range.InsertParagraphAfter();

                    // Agregar un espacio
                    para.Range.InsertParagraphAfter();

                    // Agregar la firma del empleado
                    para.Range.Text = "______________________________";
                    para.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    para.Range.InsertParagraphAfter();

                    para.Range.Text = "Firma del Empleado";
                    para.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                    para.Range.InsertParagraphAfter();

                    // Guardar el documento de Word
                    string filePath = @"C:\Users\oscar.castillo\Documents\Usuarios.docx";
                    doc.SaveAs2(filePath);
                    Console.WriteLine($"Documento guardado en {filePath}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            finally
            {
                // Cerrar la aplicación de Word
                wordApp.Quit();
            }
        }

    }
}