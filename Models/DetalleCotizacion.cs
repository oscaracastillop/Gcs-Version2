using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class DetalleCotizacion
    {

        public class GridTDetalleCotizacion
        {
            public int Id { get; set; }
            public int Idproducto { get; set; }
            public string NombreProducto { get; set; }
            public string UnidadMedida { get; set; }
            public int Cantidad { get; set; }
            public int PrecioUnitario { get; set; }
            public int SubTotal { get; set; }
            public int PorcentajeIva { get; set; }
            public int ValorIva { get; set; }
            public int Total { get; set; }


        }
    }
}
