using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Empleado
    {
        public class GridEmpleado
        {
            public int Id { get; set; }
            public string Imagen { get; set; }
            public string Nombre { get; set; }
            public string Apellidos { get; set; }
            public int IdTipoDocumento { get; set; }
            public string TipoDocumento { get; set; }
            public string Identificacion { get; set; }
            public int IdCiudadExpedicion { get; set; }
            public string CiudadExpedicion { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }


        public class ListaEmpleado
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class BuscarImagenEmpleado
        {
            public string Imagen { get; set; }
        }

    }
}
