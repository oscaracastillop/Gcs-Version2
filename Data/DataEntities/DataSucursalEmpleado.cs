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

        public string CambiarSucursalEmpleado(string IdUser, int IdSucursalEmpleado, int IdSucursal, string Observacion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdSucursalEmpleado = new SqlParameter("@IdSucursalEmpleado", SqlDbType.Int) { Value = IdSucursalEmpleado };
                var varIdSucursal = new SqlParameter("@IdSucursal", SqlDbType.Int) { Value = IdSucursal };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = int.MaxValue };

                _conection.Database.ExecuteSqlCommand("SP_CambiarSucursalEmpleado @IdUser, @IdSucursalEmpleado, @IdSucursal, @Observacion, @Resultado OUTPUT", varIdUser, varIdSucursalEmpleado, varIdSucursal, varObservacion, varResultado);

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
