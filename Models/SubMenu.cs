namespace SistemaGcs.Models
{
    public class SubMenu
    {
        public class ListaSubMenu
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public string IconoCodigoHtml { get; set; }
            public string Ruta { get; set; }

        }

        public class ListaSubMenuWeb
        {
            public int Id { get; set; }
            public string Nombre { get; set; }

        }

        public class GridSubMenu
        {
            public int Id { get; set; }
            public int IdMenu { get; set; }
            public string NombreMenu { get; set; }
            public string IconoCodigoHtml { get; set; }
            public string Icono { get; set; }
            public string SizeIcono { get; set; }
            public string Color { get; set; }
            public string NombreSubMenu { get; set; }
            public string Ruta { get; set; }
            public int IdActivo { get; set; }
            public string Estado { get; set; }
        }
    }
}
