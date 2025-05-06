using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using static Models.PlazoPago;

namespace Data.DataEntities
{
    public class DataPlazoPago
    {
        readonly GcsEntities _conection = new GcsEntities();
        public List<ListaPlazoPago> ListaPlazoPago()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaPlazoPago>("SP_ListaPlazoPago").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
