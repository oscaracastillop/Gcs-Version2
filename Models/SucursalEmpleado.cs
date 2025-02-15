namespace SistemaGcs.Models
{
    public class SucursalEmpleado
    {
        public class GridSucursalEmpleado
        {
            public int Id { get; set; }
            public int IdEmpresa { get; set; }
            public string Empresa { get; set; }
            public int IdSucursal { get; set; }
            public string Sucursal { get; set; }
            public int IdEmpleado { get; set; }
            public string Empleado { get; set; }
            public string FechaInicio { get; set; }
            public string TextoFechaInicio { get; set; }
            public string FechaFin { get; set; }
            public string TextoFechaFin { get; set; }
            public string Permanencia { get; set; }
            public string Observacion { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
            public string Imagen { get; set; }
        }
    }
}
