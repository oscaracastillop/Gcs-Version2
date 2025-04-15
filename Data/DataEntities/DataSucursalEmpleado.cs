using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.SucursalEmpleado;

namespace SistemaGcs.Data.DataEntities
{
    public class DataSucursalEmpleado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();
               
        public string CrearSucursalEmpleado(string IdUser, int IdEmpleado, int IdSucursal, string FechaInicio, string FechaFin, string Observacion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varIdSucursal = new SqlParameter("@IdSucursal", SqlDbType.Int) { Value = IdSucursal };
                var varFechaInicio = new SqlParameter("@FechaIni", SqlDbType.VarChar) { Value = FechaInicio };
                var varFechaFin = new SqlParameter("@FechaEnd", SqlDbType.VarChar) { Value = FechaFin };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = int.MaxValue };

                _conection.Database.ExecuteSqlCommand("SP_CrearSucursalEmpleado @IdUser, @IdEmpleado, @IdSucursal, @FechaIni, @FechaEnd, @Observacion, @Resultado OUTPUT", varIdUser, varIdEmpleado, varIdSucursal, varFechaInicio, varFechaFin, varObservacion, varResultado);

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

        public string ActualizarSucursalEmpleado(string IdUser, int IdSucursalEmpleado, string FechaFin, string Observacion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdSucursalEmpleado = new SqlParameter("@IdSucursalEmpleado", SqlDbType.Int) { Value = IdSucursalEmpleado };
                var varFechaFin = new SqlParameter("@FechaEnd", SqlDbType.VarChar) { Value = FechaFin };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarSucursalEmpleado @IdUser, @IdSucursalEmpleado, @FechaEnd, @Observacion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdSucursalEmpleado, varFechaFin, varObservacion, varIdEstado, varResultado);

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

        public string EliminarSucursalEmpleado(string IdUser, int IdSucursalEmpleado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdSucursalEmpleado = new SqlParameter("@IdSucursalEmpleado", SqlDbType.Int) { Value = IdSucursalEmpleado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarSucursalEmpleado @IdUser, @IdSucursalEmpleado, @Resultado OUTPUT", varIdUser, varIdSucursalEmpleado, varResultado);

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


        public List<GridSucursalEmpleado> GridSucursalEmpleado()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridSucursalEmpleado>("SP_GridSucursalEmpleado").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
