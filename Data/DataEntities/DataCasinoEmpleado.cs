using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.CasinoEmpleado;

namespace SistemaGcs.Data.DataEntities
{
    public class DataCasinoEmpleado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearCasinoEmpleado(string IdUser, int IdEmpleado, int Valor, string Fecha, string FechaPago, string Observacion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varValor = new SqlParameter("@Valor", SqlDbType.Int) { Value = Valor };
                var varFecha = new SqlParameter("@Fecha", SqlDbType.VarChar) { Value = Fecha };
                var varFechaPago = new SqlParameter("@FechaPago", SqlDbType.VarChar) { Value = FechaPago };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = int.MaxValue };

                _conection.Database.ExecuteSqlCommand("SP_CrearCasinoEmpleado @IdUser, @IdEmpleado, @Valor, @Fecha, @FechaPago, @Observacion, @Resultado OUTPUT", varIdUser, varIdEmpleado, varValor, varFecha, varFechaPago, varObservacion, varResultado);

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

        public string ActualizarCasinoEmpleado(string IdUser, int IdCasinoEmpleado, int Valor, string Fecha, string FechaPago, string Observacion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCasinoEmpleado = new SqlParameter("@IdCasinoEmpleado", SqlDbType.Int) { Value = IdCasinoEmpleado };
                var varValor = new SqlParameter("@Valor", SqlDbType.Int) { Value = Valor };
                var varFecha = new SqlParameter("@Fecha", SqlDbType.VarChar) { Value = Fecha };
                var varFechaPago = new SqlParameter("@FechaPago", SqlDbType.VarChar) { Value = FechaPago };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarCasinoEmpleado @IdUser, @IdCasinoEmpleado, @Valor, @Fecha, @FechaPago, @Observacion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdCasinoEmpleado, varValor, varFecha, varFechaPago, varObservacion, varIdEstado, varResultado);

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

        public string EliminarCasinoEmpleado(string IdUser, int IdCasinoEmpleado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCasinoEmpleado = new SqlParameter("@IdCasinoEmpleado", SqlDbType.Int) { Value = IdCasinoEmpleado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };
                _conection.Database.ExecuteSqlCommand("SP_EliminarCasinoEmpleado @IdUser, @IdCasinoEmpleado, @Resultado OUTPUT", varIdUser, varIdCasinoEmpleado, varResultado);
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

        public List<GridCasinoEmpleado> GridCasinoEmpleado()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridCasinoEmpleado>("SP_GridCasinoEmpleado").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
