using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.TipoEstado;

namespace SistemaGcs.Data.DataEntities
{
    public class DataTipoEstado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public List<ListaTipoEstado> ListaTipoEstado(int Tipo)
        {
            try
            {
                return _conection.Database.SqlQuery<ListaTipoEstado>("SP_ListaTipoEstado @Tipo",
                    new SqlParameter("@Tipo", Tipo)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
