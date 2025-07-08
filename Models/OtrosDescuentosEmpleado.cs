namespace SistemaGcs.Models
{
    public class OtrosDescuentosEmpleado
    {
        public class GridOtrosDescuentosEmpleado
        {
            public int Id { get; set; }
            public int IdEmpleado { get; set; }
            public string Empleado { get; set; }
            public string Sucursal { get; set; }
            public int Valor { get; set; }
            public string ComprobanteNomina { get; set; }
            public string FechaCobro { get; set; }
            public string TextoFechaCobro { get; set; }
            public string Observacion { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }

    }
}
