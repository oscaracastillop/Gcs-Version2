using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class PermisoMenu
    {
        public class GridPermisoMenu
        {
            public int Id { get; set; }
            public int IdUsuario { get; set; }
            public string Usuario { get; set; }
            public int IdMenu { get; set; }
            public string NombreMenu { get; set; }
            public int Permiso { get; set; }
            public string PermisoTexto { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }
    }
}
