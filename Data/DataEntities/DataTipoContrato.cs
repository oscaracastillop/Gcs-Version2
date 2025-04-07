using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using static SistemaGcs.Models.TipoContrato;

namespace SistemaGcs.Data.DataEntities
{
    public class DataTipoContrato
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public List<ListaTipoContrato> ListaTipoContrato()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaTipoContrato>("SP_ListaTipoContrato").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
