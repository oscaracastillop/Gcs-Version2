using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class FondoPensiones
    {
        public class ListaFondoPensiones
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class GridFondoPensiones
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
