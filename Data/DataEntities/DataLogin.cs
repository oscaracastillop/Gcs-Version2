using Data.DataContext;
using System;
using System.Data;
using System.Data.SqlClient;

namespace SistemaGcs.Data.DataEntities
{
    public class DataLogin
    {
        readonly GcsEntities _conection = new GcsEntities();
        public string IniciarSesion(string Usuario, string Password)
        {
            string resultado = String.Empty;
            try
            {
                var varUsuario = new SqlParameter("@Usuario", SqlDbType.VarChar) { Value = Usuario };
                var varPassword = new SqlParameter("@Password", SqlDbType.VarChar) { Value = Password };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_IniciarSesion @Usuario, @Password, @Resultado OUTPUT", varUsuario, varPassword, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {

                if (ex.Message.Contains("The underlying provider failed on Open"))
                {
                    resultado = "Error*Fallo al conectarse a la base de datos, o la base de batos no existe";
                }
                else
                {
                    resultado = "Error*" + ex.Message;
                }
            }
            return resultado;
        }
    }
}

