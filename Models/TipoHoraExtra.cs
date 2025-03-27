namespace Models
{
    public class TipoHoraExtra
    {
        public class ListaTipoHoraExtra
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class GridTipoHoraExtra
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public decimal Porcentaje { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }
    }
}
