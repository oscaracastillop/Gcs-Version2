using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.BonoEmpleado;

namespace SistemaGcs.Data.DataEntities
{
    public class DataBonoEmpleado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearBonoEmpleado(string IdUser, int IdEmpleado, int Valor, string FechaPago, string Observacion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varValor = new SqlParameter("@Valor", SqlDbType.Int) { Value = Valor };
                var varFechaPago = new SqlParameter("@FechaPago", SqlDbType.VarChar) { Value = FechaPago };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = int.MaxValue };

                _conection.Database.ExecuteSqlCommand("SP_CrearBonoEmpleado @IdUser, @IdEmpleado, @Valor, @FechaPago, @Observacion, @Resultado OUTPUT", varIdUser, varIdEmpleado, varValor, varFechaPago, varObservacion, varResultado);

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

        public string ActualizarBonoEmpleado(string IdUser, int IdBonoEmpleado, int Valor, string FechaPago, string Observacion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdBonoEmpleado = new SqlParameter("@IdBonoEmpleado", SqlDbType.Int) { Value = IdBonoEmpleado };
                var varValor = new SqlParameter("@Valor", SqlDbType.Int) { Value = Valor };
                var varFechaPago = new SqlParameter("@FechaPago", SqlDbType.VarChar) { Value = FechaPago };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarBonoEmpleado @IdUser, @IdBonoEmpleado, @Valor, @FechaPago, @Observacion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdBonoEmpleado, varValor, varFechaPago, varObservacion, varIdEstado, varResultado);
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

        public string EliminarBonoEmpleado(string IdUser, int IdBonoEmpleado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdBonoEmpleado = new SqlParameter("@IdBonoEmpleado", SqlDbType.Int) { Value = IdBonoEmpleado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarBonoEmpleado @IdUser, @IdBonoEmpleado, @Resultado OUTPUT", varIdUser, varIdBonoEmpleado, varResultado);

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

        public List<GridBonoEmpleado> GridBonoEmpleado()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridBonoEmpleado>("SP_GridBonoEmpleado").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
