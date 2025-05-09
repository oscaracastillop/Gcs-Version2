using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Cliente
    {
        public class GridCliente
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
            public int IdTipoDocumento { get; set; }
            public string TipoDocumento { get; set; }
            public string Identificacion { get; set; }
            public string Email { get; set; }
            public string Telefono { get; set; }
            public string Celular { get; set; }
            public string Contacto { get; set; }
            public int IdFormaPago { get; set; }
            public string TextoFormaPago { get; set; }
            public int IdPlazoPago { get; set; }
            public string TextoPlazoPago { get; set; }
            public string Direccion { get; set; }
            public string Ciudad { get; set; }
            public int IdCiudad { get; set; }
            public string Descripcion { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }

        public class ListaCliente
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }
    }
}
