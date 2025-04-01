using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Models.Usuario;

namespace Data.DataEntities
{
    public class DataUsuario
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearUsuario(string IdUser, string Usuario, string Password, string Email, string NombreUsuarioLogin, string FechaVigencia)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varUsuario = new SqlParameter("@Usuario", SqlDbType.VarChar) { Value = Usuario };
                var varPassword = new SqlParameter("@Password", SqlDbType.VarChar) { Value = Password };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varNombreUsuarioLogin = new SqlParameter("@NombreUsuarioLogin", SqlDbType.VarChar) { Value = NombreUsuarioLogin };
                var varFechaVigencia = new SqlParameter("@FechaVigencia", SqlDbType.VarChar) { Value = FechaVigencia };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearUsuario @IdUser, @Usuario, @Password, @Email, @NombreUsuarioLogin, @FechaVigencia, @Resultado OUTPUT", varIdUser, varUsuario, varPassword, varEmail, varNombreUsuarioLogin, varFechaVigencia, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {
                var Rol = dataRol.BuscarRolUsuario(IdUser);
                if (Rol == "Administrador")
                {
                    resultado = "Error*" + ex.Message;
                }
                else
                {
                    if (ex.Message.Contains("No se puede insertar"))
                    {
                        resultado = "Error*Los datos que esta ingresando ya existe en la Base de Datos";
                    }
                    else
                    {
                        resultado = "Error*En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public string ActualizarUsuario(string IdUser, int IdUsuarioLogin, string Usuario, string Password, string Email, string NombreUsuarioLogin, string FechaVigencia, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdUsuarioLogin = new SqlParameter("@IdUsuarioLogin", SqlDbType.Int) { Value = IdUsuarioLogin };
                var varUsuario = new SqlParameter("@Usuario", SqlDbType.VarChar) { Value = Usuario };
                var varPassword = new SqlParameter("@Password", SqlDbType.VarChar) { Value = Password };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varNombreUsuarioLogin = new SqlParameter("@NombreUsuarioLogin", SqlDbType.VarChar) { Value = NombreUsuarioLogin };
                var varFechaVigencia = new SqlParameter("@FechaVigencia", SqlDbType.VarChar) { Value = FechaVigencia };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarUsuario @IdUser, @IdUsuarioLogin, @Usuario, @Password, @Email, @NombreUsuarioLogin, @FechaVigencia, @IdEstado, @Resultado OUTPUT", varIdUser, varIdUsuarioLogin, varUsuario, varPassword, varEmail, varNombreUsuarioLogin, varFechaVigencia, varIdEstado, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {
                var Rol = dataRol.BuscarRolUsuario(IdUser);
                if (Rol == "Administrador")
                {
                    resultado = "Error*" + ex.Message;
                }
                else
                {
                    resultado = "Error*En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                }
            }
            return resultado;
        }

        public string EliminarUsuario(string IdUser, int IdUsuario)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdUsuario = new SqlParameter("@IdUsuario", SqlDbType.Int) { Value = IdUsuario };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarUsuario @IdUser, @IdUsuario, @Resultado OUTPUT", varIdUser, varIdUsuario, varResultado);

                resultado = Convert.ToString(varResultado.Value);
            }
            catch (Exception ex)
            {
                var Rol = dataRol.BuscarRolUsuario(IdUser);
                if (Rol == "Administrador")
                {
                    resultado = "Error*" + ex.Message;
                }
                else
                {
                    resultado = "Error*En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                }
            }
            return resultado;
        }

        public List<ListaUsuario> ListaUsuario()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaUsuario>("SP_ListaUsuario").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<GridUsuario> GridUsuario()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridUsuario>("SP_GridUsuario").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DatosInformacionUsuario> InformacionUsuario(string IdUser)
        {
            try
            {
                return _conection.Database.SqlQuery<DatosInformacionUsuario>("SP_InformacionUsuario @IdUser", new SqlParameter("@IdUser", IdUser)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<UltimoIngresoUsuario> UltimoIngresoUsuario(string IdUser)
        {
            try
            {
                return _conection.Database.SqlQuery<UltimoIngresoUsuario>("SP_UltimoIngresoUsuario @IdUser", new SqlParameter("@IdUser", IdUser)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ModulosActivosUsuario> ModulosActivosUsuario(string IdUser)
        {
            try
            {
                return _conection.Database.SqlQuery<ModulosActivosUsuario>("SP_ModulosActivosUsuario @IdUser", new SqlParameter("@IdUser", IdUser)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
