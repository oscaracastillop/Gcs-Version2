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
        }
       
    }
}
