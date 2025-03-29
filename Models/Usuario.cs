using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Usuario
    {
        public class GridUsuario
        {
            public int Id { get; set; }
            public string Usuario { get; set; }
            public string Password { get; set; }
            public string NombreUsuario { get; set; }
            public string Email { get; set; }
            public string FechaVigencia { get; set; }
            public string TextoFechaVigencia { get; set; }
            public int IdEstado { get; set; }
            public string Estado { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }
        public class ListaUsuario
        {
            public int Id { get; set; }
            public string Usuario { get; set; }
        }
    }
}
