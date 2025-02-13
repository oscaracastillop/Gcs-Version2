using Data.DataContext;
using System;
using System.Data;
using System.Data.SqlClient;

namespace SistemaGcs.Data.DataEntities
{
    public class DataRol
    {
        readonly GcsEntities _conection = new GcsEntities();

        public string BuscarRolUsuario(string IdUser)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_BuscarRolUsuario @IdUser, @Resultado OUTPUT", varIdUser, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {
                resultado = "Error*" + ex.Message;
            }
            return resultado;
        }
    }
}
