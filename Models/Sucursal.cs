namespace SistemaGcs.Models
{
    public class Sucursal
    {
        public class GridSucursal
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public string Email { get; set; }
            public string Telefono { get; set; }
            public string Celular { get; set; }
            public string Contacto { get; set; }
            public string Direccion { get; set; }
            public int IdCiudad { get; set; }
            public string Ciudad { get; set; }
            public string Descripcion { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }

        public class ListaSucursal
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

    }
}
