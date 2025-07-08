using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.OtrosIngresosEmpleado;

namespace SistemaGcs.Data.DataEntities
{
    public class DataOtrosIngresosEmpleado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearOtrosIngresosEmpleado(string IdUser, int IdEmpleado, int Valor, string FechaPago, string Observacion)
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

                _conection.Database.ExecuteSqlCommand("SP_CrearOtrosIngresosEmpleado @IdUser, @IdEmpleado, @Valor, @FechaPago, @Observacion, @Resultado OUTPUT", varIdUser, varIdEmpleado, varValor, varFechaPago, varObservacion, varResultado);

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

        public string ActualizarOtrosIngresosEmpleado(string IdUser, int IdOtrosIngresosEmpleado, int Valor, string FechaPago, string Observacion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdOtrosIngresosEmpleado = new SqlParameter("@IdOtrosIngresosEmpleado", SqlDbType.Int) { Value = IdOtrosIngresosEmpleado };
                var varValor = new SqlParameter("@Valor", SqlDbType.Int) { Value = Valor };
                var varFechaPago = new SqlParameter("@FechaPago", SqlDbType.VarChar) { Value = FechaPago };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarOtrosIngresosEmpleado @IdUser, @IdOtrosIngresosEmpleado, @Valor, @FechaPago, @Observacion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdOtrosIngresosEmpleado, varValor, varFechaPago, varObservacion, varIdEstado, varResultado);
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

        public string EliminarOtrosIngresosEmpleado(string IdUser, int IdOtrosIngresosEmpleado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdOtrosIngresosEmpleado = new SqlParameter("@IdOtrosIngresosEmpleado", SqlDbType.Int) { Value = IdOtrosIngresosEmpleado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarOtrosIngresosEmpleado @IdUser, @IdOtrosIngresosEmpleado, @Resultado OUTPUT", varIdUser, varIdOtrosIngresosEmpleado, varResultado);

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

        public List<GridOtrosIngresosEmpleado> GridOtrosIngresosEmpleado()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridOtrosIngresosEmpleado>("SP_GridOtrosIngresosEmpleado").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
