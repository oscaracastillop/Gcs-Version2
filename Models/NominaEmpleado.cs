using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaGcs.Models
{
    public class NominaEmpleado
    {
        public class GridNominaEmpleado
        {
            public int Id { get; set; }
            public string Consecutivo { get; set; }
            public string Empleado { get; set; }
            public string Documento { get; set; }
            public string Identificacion { get; set; }
            public string Empresa { get; set; }
            public string TipoDocumentoEmpresa { get; set; }
            public string IdentificacionEmpresa { get; set; }
            public string TelefonoEmpresa { get; set; }
            public string CorreoEmpresa { get; set; } 
            public string Cargo { get; set; }
            public string SalarioMensual { get; set; }
            public string FechaIngresoEmpleado { get; set; }
            public string PeriodoLiquidado { get; set; }
            public string DiasPagar { get; set; }
            public string Sueldo { get; set; }
            public string CantHoraED { get; set; }
            public string ValorHoraED { get; set; }
            public string TotalHoraED { get; set; }
            public string CantHoraEN { get; set; }
            public string ValorHoraEN { get; set; }
            public string TotalHoraEN { get; set; }
            public string CantHoraEDD { get; set; }
            public string ValorHoraEDD { get; set; }
            public string TotalHoraEDD { get; set; }
            public string CantHoraEND { get; set; }
            public string ValorHoraEND { get; set; }
            public string TotalHoraEND { get; set; }
            public string SubTransporte { get; set; }           
            public string Bonos { get; set; }
            public string Eps { get; set; }
            public string PorcentajeEps { get; set; }
            public string ValorEPS { get; set; }
            public string FondoPension { get; set; }
            public string PorcentajePension { get; set; }
            public string ValorPension { get; set; }
            public string Casino { get; set; }
            public string Prestamo { get; set; }
            public string DiasAcumuladosVacaciones { get; set; }
            public string ValorVacacionesAcumuladas { get; set; }
            public string DiasAcumuladosPrima { get; set; }
            public string ValorPrimaAcumulada { get; set; }
            public string Banco { get; set; }
            public string NumeroCuenta { get; set; }
            public string TotalIngresos { get; set; }
            public string TotalDescuentos { get; set; }
            public string TotalPagar { get; set; }    
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }

    }
}
