using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class EntradaAlmacen
    {
        public class GridEntradaAlmacen
        {
            public int Id { get; set; }
            public string OrdenCompra { get; set; }
            public string Factura { get; set; }
            public string Categoria { get; set; }
            public string Producto { get; set; }
            public string Lote { get; set; }
            public int Cantidad { get; set; }
            public int PrecioCompraUnidad { get; set; }
            public int PorcentajeIva { get; set; }
            public int PrecioTotalCompra { get; set; }
            public string FechaVencimientoProducto { get; set; }
            public string FechaIngresoAlmacen { get; set; }
            public string Estado { get; set; }
            public int IdEstado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }

    }
}
