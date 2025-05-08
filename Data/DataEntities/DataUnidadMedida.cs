using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using static SistemaGcs.Models.UnidadMedida;

namespace Data.DataEntities
{
    public class DataUnidadMedida
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();
        public List<ListaUnidadMedida> ListaUnidadMedida()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaUnidadMedida>("SP_ListaUnidadMedida").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
