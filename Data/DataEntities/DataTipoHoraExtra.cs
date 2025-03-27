using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Models.TipoHoraExtra;

namespace Data.DataEntities
{
    public class DataTipoHoraExtra
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearTipoHoraExtra(string IdUser, string NombreTipoHoraExtra, decimal Porcentaje)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varNombreTipoHoraExtra = new SqlParameter("@Nombre", SqlDbType.VarChar) { Value = NombreTipoHoraExtra };
                var varPorcentaje = new SqlParameter("@Porcentaje", SqlDbType.Decimal) { Value = Porcentaje };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearTipoHoraExtra @IdUser, @Nombre, @Porcentaje, @Resultado OUTPUT", varIdUser, varNombreTipoHoraExtra, varPorcentaje, varResultado);

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
                    else if (ex.Message.Contains("converting data type decimal to decimal"))
                    {
                        resultado = "Error*El valor ingresado en el campo de procentaje supera el valor permitido";
                    }
                    else 
                    {
                        resultado = "Error*En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }                   
                }
            }
            return resultado;
        }

        public string ActualizarTipoHoraExtra(string IdUser, int IdTipoHoraExtra, string NombreTipoHoraExtra, decimal Porcentaje, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdTipoHoraExtra = new SqlParameter("@IdTipoHoraExtra", SqlDbType.Int) { Value = IdTipoHoraExtra };
                var varNombreTipoHoraExtra = new SqlParameter("@NombreTipoHoraExtra", SqlDbType.VarChar) { Value = NombreTipoHoraExtra };
                var varPorcentaje = new SqlParameter("@Porcentaje", SqlDbType.Decimal) { Value = Porcentaje };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarTipoHoraExtra @IdUser, @IdTipoHoraExtra, @NombreTipoHoraExtra, @Porcentaje, @IdEstado, @Resultado OUTPUT", varIdUser, varIdTipoHoraExtra, varNombreTipoHoraExtra, varPorcentaje, varIdEstado, varResultado);

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

        public string EliminarTipoHoraExtra(string IdUser, int IdTipoHoraExtra)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdTipoHoraExtra = new SqlParameter("@IdTipoHoraExtra", SqlDbType.Int) { Value = IdTipoHoraExtra };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarTipoHoraExtra @IdUser, @IdTipoHoraExtra, @Resultado OUTPUT", varIdUser, varIdTipoHoraExtra, varResultado);

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

        public List<GridTipoHoraExtra> GridTipoHoraExtra()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridTipoHoraExtra>("SP_GridTipoHoraExtra").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaTipoHoraExtra> ListaTipoHoraExtra()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaTipoHoraExtra>("SP_ListaTipoHoraExtra").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
