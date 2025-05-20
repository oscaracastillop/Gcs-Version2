using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaGcs.Models
{
    public class BonoEmpleado
    {
        public class GridBonoEmpleado
        {
            public int Id { get; set; }
            public int IdEmpleado { get; set; }
            public string Empleado { get; set; }
            public string Sucursal { get; set; }
            public int Valor { get; set; }
            public string ComprobanteNomina { get; set; }
            public string FechaPago { get; set; }
            public string TextoFechaPago { get; set; }
            public string Observacion { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
            public string Imagen { get; set; }
        }

    }
}
