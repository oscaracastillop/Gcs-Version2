using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class FondoCesantias
    {
        public class ListaFondoCesantias
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class GridFondoCesantias
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
