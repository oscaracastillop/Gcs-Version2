using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Inventario
    {
        public class GridInventario
        {
            public int Id { get; set; }
            public string NombreProducto { get; set; }
            public string UnidadMedida { get; set; }
            public int StockMinimo { get; set; }
            public int Cantidad { get; set; }
            public decimal CostoPromedioCompra { get; set; }
            public string FechaUltimoMovimiento { get; set; }
            public int DiasSinMovimiento { get; set; }

        }
    }
}
