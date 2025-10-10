using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using static Models.Inventario;

namespace Data.DataEntities
{
    public class DataInventario
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public List<GridInventario> GridInventario()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridInventario>("SP_GridInventario").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
