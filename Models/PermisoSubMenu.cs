using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class PermisoSubMenu
    {
        public class GridPermisoSubMenu
        {
            public int Id { get; set; }
            public int IdUsuario { get; set; }
            public string Usuario { get; set; }
            public int IdMenu { get; set; }
            public string NombreMenu { get; set; }
            public int IdSubMenu { get; set; }
            public string NombreSubMenu { get; set; }
            public int Permiso { get; set; }
            public string PermisoTexto { get; set; }
            public int Crear { get; set; }
            public string CrearTexto { get; set; }
            public int Editar { get; set; }
            public string EditarTexto { get; set; }
            public int Eliminar { get; set; }
            public string EliminarTexto { get; set; }
            public string CreateBy { get; set; }
            public string DateCreate { get; set; }
        }
    }
}
