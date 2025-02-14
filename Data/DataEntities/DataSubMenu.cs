using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.SubMenu;

namespace SistemaGcs.Data.DataEntities
{
    public class DataSubMenu
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public List<ListaSubMenu> ListaSubMenu(string Usuario, string Modulo)
        {
            try
            {
                var response = _conection.Database.SqlQuery<ListaSubMenu>("SP_ListaSubMenu @IdUsuario, @Modulo", new SqlParameter("@IdUsuario", Usuario), new SqlParameter("@Modulo", Modulo)).ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
