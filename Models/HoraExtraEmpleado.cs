using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class HoraExtraEmpleado
    {
        public class GridHoraExtraEmpleado
        {
            public int Id { get; set; }
            public int IdEmpleado { get; set; }
            public int IdHEEmpleado { get; set; }
            public string Empleado { get; set; }
            public string Sucursal { get; set; }
            public decimal CantidadHE { get; set; }
            public string TextoCantidadHE { get; set; }
            public int Valor { get; set; }
            public string FechaHE { get; set; }
            public string TextoFechaHE { get; set; }
            public string FechaPagoHE { get; set; }
            public string TextoFechaPagoHE { get; set; }
            public string ComprobanteNomina { get; set; }            
            public string Observacion { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }
    }
}
