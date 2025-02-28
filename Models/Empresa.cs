namespace SistemaGcs.Models
{
    public class Empresa
    {
        public class GridEmpresa
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public int IdTipoDocumento { get; set; }
            public string TipoDocumento { get; set; }
            public string Identificacion { get; set; }
            public string Email { get; set; }
            public string Telefono { get; set; }
            public string Contacto { get; set; }
            public string Direccion { get; set; }
            public string Ciudad { get; set; }
            public int IdCiudad { get; set; }
            public string Logo { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }

        public class ListaEmpresa
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }        

    }
}
