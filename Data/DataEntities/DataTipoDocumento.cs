using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.TipoDocumento;

namespace SistemaGcs.Data.DataEntities
{
    public class DataTipoDocumento
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public List<ListaTipoDocumento> ListaTipoDocumento(int Tipo)
        {
            try
            {
                return _conection.Database.SqlQuery<ListaTipoDocumento>("SP_ListaTipoDocumento @Tipo",
                    new SqlParameter("@Tipo", Tipo)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
