using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.PrestamoEmpleado;

namespace SistemaGcs.Data.DataEntities
{
    public class DataPrestamoEmpleado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearPrestamoEmpleado(string IdUser, int IdEmpleado, int Valor, string FechaPrestamo, string FechaPago, int Cuotas, string Observacion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varValor = new SqlParameter("@Valor", SqlDbType.Int) { Value = Valor };
                var varFechaPrestamo = new SqlParameter("@FechaPrestamo", SqlDbType.VarChar) { Value = FechaPrestamo };
                var varFechaPago = new SqlParameter("@FechaPago", SqlDbType.VarChar) { Value = FechaPago };
                var varCuotas = new SqlParameter("@Cuotas", SqlDbType.VarChar) { Value = Cuotas };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = int.MaxValue };

                _conection.Database.ExecuteSqlCommand("SP_CrearPrestamoEmpleado @IdUser, @IdEmpleado, @Valor, @FechaPrestamo, @FechaPago, @Cuotas, @Observacion, @Resultado OUTPUT", varIdUser, varIdEmpleado, varValor, varFechaPrestamo, varFechaPago, varCuotas, varObservacion, varResultado);

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

        public string ActualizarPrestamoEmpleado(string IdUser, int IdPrestamoEmpleado, int Valor, string FechaPrestamo, string FechaPago, int Cuotas, string Observacion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdPrestamoEmpleado = new SqlParameter("@IdPrestamoEmpleado", SqlDbType.Int) { Value = IdPrestamoEmpleado };
                var varValor = new SqlParameter("@Valor", SqlDbType.Int) { Value = Valor };
                var varFechaPrestamo = new SqlParameter("@FechaPrestamo", SqlDbType.VarChar) { Value = FechaPrestamo };
                var varFechaPago = new SqlParameter("@FechaPago", SqlDbType.VarChar) { Value = FechaPago };
                var varCuotas = new SqlParameter("@Cuotas", SqlDbType.VarChar) { Value = Cuotas };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarPrestamoEmpleado @IdUser, @IdPrestamoEmpleado, @Valor, @FechaPrestamo, @FechaPago, @Cuotas, @Observacion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdPrestamoEmpleado, varValor, varFechaPrestamo, varFechaPago, varCuotas, varObservacion, varIdEstado, varResultado);

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

        public string EliminarPrestamoEmpleado(string IdUser, int IdPrestamoEmpleado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdPrestamoEmpleado = new SqlParameter("@IdPrestamoEmpleado", SqlDbType.Int) { Value = IdPrestamoEmpleado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };
                _conection.Database.ExecuteSqlCommand("SP_EliminarPrestamoEmpleado @IdUser, @IdPrestamoEmpleado, @Resultado OUTPUT", varIdUser, varIdPrestamoEmpleado, varResultado);
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

        public List<GridPrestamoEmpleado> GridPrestamoEmpleado()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridPrestamoEmpleado>("SP_GridPrestamoEmpleado").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
