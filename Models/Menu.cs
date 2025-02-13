namespace SistemaGcs.Models
{
    public class Menu
    {
        public class ListaMenu
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public string IconoCodigoHtml { get; set; }
            public string Ruta { get; set; }
        }

        public class ListaMenuWeb
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class GridMenu
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public string IconoCodigoHtml { get; set; }
            public string Icono { get; set; }
            public string SizeIcono { get; set; }
            public string Color { get; set; }
            public string Ruta { get; set; }
            public int Orden { get; set; }
            public int IdActivo { get; set; }
            public string Estado { get; set; }
        }
    }
}
