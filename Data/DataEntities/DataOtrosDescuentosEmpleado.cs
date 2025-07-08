using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.OtrosDescuentosEmpleado;

namespace SistemaGcs.Data.DataEntities
{
    public class DataOtrosDescuentosEmpleado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearOtrosDescuentosEmpleado(string IdUser, int IdEmpleado, int Valor, string FechaCobro, string Observacion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varValor = new SqlParameter("@Valor", SqlDbType.Int) { Value = Valor };
                var varFechaCobro = new SqlParameter("@FechaCobro", SqlDbType.VarChar) { Value = FechaCobro };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = int.MaxValue };

                _conection.Database.ExecuteSqlCommand("SP_CrearOtrosDescuentosEmpleado @IdUser, @IdEmpleado, @Valor, @FechaCobro, @Observacion, @Resultado OUTPUT", varIdUser, varIdEmpleado, varValor, varFechaCobro, varObservacion, varResultado);

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

        public string ActualizarOtrosDescuentosEmpleado(string IdUser, int IdOtrosDescuentosEmpleado, int Valor, string FechaCobro, string Observacion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdOtrosDescuentosEmpleado = new SqlParameter("@IdOtrosDescuentosEmpleado", SqlDbType.Int) { Value = IdOtrosDescuentosEmpleado };
                var varValor = new SqlParameter("@Valor", SqlDbType.Int) { Value = Valor };
                var varFechaCobro = new SqlParameter("@FechaCobro", SqlDbType.VarChar) { Value = FechaCobro };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarOtrosDescuentosEmpleado @IdUser, @IdOtrosDescuentosEmpleado, @Valor, @FechaCobro, @Observacion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdOtrosDescuentosEmpleado, varValor, varFechaCobro, varObservacion, varIdEstado, varResultado);
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

        public string EliminarOtrosDescuentosEmpleado(string IdUser, int IdOtrosDescuentosEmpleado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdOtrosDescuentosEmpleado = new SqlParameter("@IdOtrosDescuentosEmpleado", SqlDbType.Int) { Value = IdOtrosDescuentosEmpleado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarOtrosDescuentosEmpleado @IdUser, @IdOtrosDescuentosEmpleado, @Resultado OUTPUT", varIdUser, varIdOtrosDescuentosEmpleado, varResultado);

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

        public List<GridOtrosDescuentosEmpleado> GridOtrosDescuentosEmpleado()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridOtrosDescuentosEmpleado>("SP_GridOtrosDescuentosEmpleado").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
