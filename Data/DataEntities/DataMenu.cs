using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.Menu;

namespace SistemaGcs.Data.DataEntities
{
    public class DataMenu
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();
       
        public List<ListaMenu> ListaMenu(string Usuario)
        {
            try
            {
                var response = _conection.Database.SqlQuery<ListaMenu>("SP_Listamenu @IdUsuario", new SqlParameter("@IdUsuario", Usuario)).ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       
    }
}
