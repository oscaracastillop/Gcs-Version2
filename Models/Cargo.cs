namespace Models
{
    public class Cargo
    {
        public class ListaCargo
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class GridCargo
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }
    }
}
