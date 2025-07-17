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
            public string Empleado { get; set; }
            public string EmpresaSucursal { get; set; }
            public decimal ValorHoraOrdinaria { get; set; }
            public string FechaHoraExtra { get; set; }
            public string TextoFechaHoraExtra { get; set; }
            public string TipoHoraExtra { get; set; }
            public decimal PorcentajeHoraExtra { get; set; }
            public decimal ValorHoraExtra { get; set; }
            public decimal Cantidad { get; set; }
            public decimal TotalHorasExtras { get; set; }
            public string FechaPagoHoraExtra { get; set; }
            public string TextoFechaPagoHoraExtra { get; set; }
            public string ComprobanteNomina { get; set; }            
            public string Observacion { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }
    }
}
