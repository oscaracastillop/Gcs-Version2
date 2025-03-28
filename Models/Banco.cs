using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Banco
    {
        public class ListaBanco
        {
            public int Id { get; set; }
            public string Nombre { get; set; }
        }

        public class GridBanco
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
