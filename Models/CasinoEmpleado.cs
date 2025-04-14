namespace SistemaGcs.Models
{
    public class CasinoEmpleado
    {
        public class GridCasinoEmpleado
        {
            public int Id { get; set; }
            public string Empleado { get; set; }
            public string Sucursal { get; set; }
            public int Valor { get; set; }
            public string Fecha { get; set; }
            public string TextoFecha { get; set; }
            public string FechaPago { get; set; }
            public string ComprobanteNomina { get; set; }
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
