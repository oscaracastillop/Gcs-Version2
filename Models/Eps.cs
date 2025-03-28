namespace Models
{
    public class Eps
    {
        public class ListaEps
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class GridEps
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
