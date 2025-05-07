namespace Models
{
    public class Categoria
    {
        public class ListaCategoria
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class GridCategoria
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
