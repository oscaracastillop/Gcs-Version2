namespace Models
{
    public class Producto
    {
       
        public class GridProducto
        {
            public int Id { get; set; }
            public string NombreProducto { get; set; }
            public string ImagenProducto { get; set; }
            public int IdCategoria { get; set; }
            public string NombreCategoria { get; set; }
            public string MarcaProducto { get; set; }
            public string ReferenciaProducto { get; set; }
            public string CodigoProducto { get; set; }
            public int IdUnidadMedida { get; set; }
            public string UnidadMedida { get; set; }
            public int StockMinimo { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string Descripcion { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }
        public class ListaProducto
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }
        public class ListaProductoxCategoria
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }
        
    }
}
