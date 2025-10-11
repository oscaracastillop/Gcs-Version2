using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Cotizacion
    {
        public class GridCotizacion
        {
            public int Id { get; set; }
            public string CodigoCotizacion { get; set; }
            public string Nombre { get; set; }
            public string Documento { get; set; }
            public string Identificacion { get; set; }
            public string FormaPago { get; set; }
            public string PlazoPago { get; set; }
            public int CantidadProductos { get; set; }
            public int SubTotal { get; set; }
            public int ValorIva { get; set; }
            public int ValorTotal { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
            public string Fecha { get; set; }
            public string FechaChart { get; set; }
        }



        public class DatosCabeceraCotizacionPdf
        {
            public int Idcotizacion { get; set; }
            public string CodigoCotizacion { get; set; } 
            public string NombreEmpresa { get; set; }
            public string TipoDocumentoEmpresa { get; set; }
            public string IdentificacionEmpresa { get; set; }
            public string EmailEmpresa { get; set; }
            public string TelefonoEmpresa { get; set; }
            public string CelularEmpresa { get; set; }
            public string NombreCliente { get; set; }
            public string TipoDocumentoCliente { get; set; }
            public string IdentificacionCliente { get; set; }
            public string TelefonoCliente { get; set; }
            public string EmailCliente { get; set; }
            public string ContactoCliente { get; set; }
            public string CelularCliente { get; set; }
            public string FormaPagoCiente { get; set; }
            public string PlazoPagoCliente { get; set; }
            public string DireccionCiente { get; set; }
            public string CiudadCliente { get; set; }
            public int SubTotal { get; set; }
            public int ValorIva { get; set; }
            public int ValorTotal { get; set; }
            public int IdEstadoCotizacion { get; set; }
            public string EstadoCotizacion { get; set; }
            public string FechaCotizacion { get; set; }
            public string LogoEmpresa { get; set; }
        }

       

    }
}
