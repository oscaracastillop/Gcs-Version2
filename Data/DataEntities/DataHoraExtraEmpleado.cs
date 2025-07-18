using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static SistemaGcs.Models.CasinoEmpleado;
using static Models.HoraExtraEmpleado;

namespace Data.DataEntities
{
    public class DataHoraExtraEmpleado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearHoraExtraEmpleado(string IdUser, int IdEmpleado, int IdTipoHoraExtra, decimal CantidadHE, string FechaHE, string FechaPagoHE, string Observacion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varIdTipoHoraExtra = new SqlParameter("@IdTipoHoraExtra", SqlDbType.Int) { Value = IdTipoHoraExtra };
                var varCantidadHE = new SqlParameter("@CantidadHE", SqlDbType.Decimal) { Value = CantidadHE };
                var varFechaHE = new SqlParameter("@FechaHE", SqlDbType.VarChar) { Value = FechaHE };
                var varFechaPagoHE = new SqlParameter("@FechaPagoHE", SqlDbType.VarChar) { Value = FechaPagoHE };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = int.MaxValue };

                _conection.Database.ExecuteSqlCommand("SP_CrearHoraExtraEmpleado @IdUser, @IdEmpleado, @IdTipoHoraExtra, @CantidadHE, @FechaHE, @FechaPagoHE, @Observacion, @Resultado OUTPUT", varIdUser, varIdEmpleado, varIdTipoHoraExtra, varCantidadHE, varFechaHE, varFechaPagoHE, varObservacion, varResultado);

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
        public string ActualizarHoraExtraEmpleado(string IdUser, int IdHoraExtra, int IdTipoHoraExtra, decimal CantidadHE, string FechaHE, string FechaPagoHE, string Observacion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdTipoHoraExtra = new SqlParameter("@IdTipoHoraExtra", SqlDbType.Int) { Value = IdTipoHoraExtra };
                var varCantidadHE = new SqlParameter("@CantidadHE", SqlDbType.Decimal) { Value = CantidadHE };
                var varFechaHE = new SqlParameter("@FechaHE", SqlDbType.VarChar) { Value = FechaHE };
                var varFechaPagoHE = new SqlParameter("@FechaPagoHE", SqlDbType.VarChar) { Value = FechaPagoHE };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = int.MaxValue };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarHoraExtraEmpleado @IdUser, @IdTipoHoraExtra, @varCantidadHE, @FechaHE, @FechaPagoHE, @Observacion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdTipoHoraExtra, varCantidadHE, varFechaHE, varFechaPagoHE, varObservacion, varIdEstado, varResultado);

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

        public string EliminarHoraExtraEmpleado(string IdUser, int IdHoraExtra)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdHoraExtra = new SqlParameter("@IdHoraExtra", SqlDbType.Int) { Value = IdHoraExtra };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };
                _conection.Database.ExecuteSqlCommand("SP_EliminarHoraExtraEmpleado @IdUser, @IdHoraExtra, @Resultado OUTPUT", varIdUser, varIdHoraExtra, varResultado);
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
        public List<GridHoraExtraEmpleado> GridHoraExtraEmpleado()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridHoraExtraEmpleado>("SP_GridHoraExtraEmpleado").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
