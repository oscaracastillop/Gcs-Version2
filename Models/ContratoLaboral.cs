namespace SistemaGcs.Models
{
    public class ContratoLaboral
    {
        public class GridCLE
        {
            public int Id { get; set; }
            public int IdEmpleado { get; set; }
            public string Empleado { get; set; }
            public int IdEmpresa { get; set; }
            public string Empresa { get; set; }
            public int IdCargo { get; set; }
            public string Cargo { get; set; }
            public int IdTipoContrato { get; set; }
            public string Contrato { get; set; }
            public int SalarioMensual { get; set; }
            public string TextoSalarioMensual { get; set; }
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
            public int IdEps { get; set; }
            public int IdFondoPension { get; set; }
            public int IdFondoCesantias { get; set; }
            public int IdBanco { get; set; }
            public decimal PorcentajeEps { get; set; }
            public decimal PorcentajeFondoPension { get; set; }
            public string NumeroCuenta { get; set; }
            public decimal SubTransporte { get; set; }
            
        }    

        public class ListaContratoLaboral
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

    }
}
