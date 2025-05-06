using Data.DataContext;
using static Models.FormaPago;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Data.DataEntities
{
    public class DataFormaPago
    {
        readonly GcsEntities _conection = new GcsEntities();
        public List<ListaFormaPago> ListaFormaPago()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaFormaPago>("SP_ListaFormaPago").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
