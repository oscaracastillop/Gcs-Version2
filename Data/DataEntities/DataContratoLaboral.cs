using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.ContratoLaboral;
using static SistemaGcs.Models.NominaEmpleado;

namespace Data.DataEntities
{
    public class DataContratoLaboral
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearCLE( string IdUser, int IdEmpleado, int IdSucursal, int IdCargo, int IdTipoContrato, int SalarioMensual, string FechaInicio,
                                int IdEps, decimal PorcentajeContEps, int IdFondoPension, decimal PorcentajeContFP, int IdBanco,
                                string NumeroCuentaPago, int SubTransporte, int IdCesantias, string Observacion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varIdSucursal = new SqlParameter("@IdSucursal", SqlDbType.Int) { Value = IdSucursal };
                var varIdCargo = new SqlParameter("@IdCargo", SqlDbType.Int) { Value = IdCargo };
                var varIdTipoContrato = new SqlParameter("@IdTipoContrato", SqlDbType.Int) { Value = IdTipoContrato };
                var varSalarioMensual = new SqlParameter("@SalarioMensual", SqlDbType.Int) { Value = SalarioMensual };
                var varFechaInicio = new SqlParameter("@FechaIni", SqlDbType.VarChar) { Value = FechaInicio };
                var varIdEps = new SqlParameter("@IdEps", SqlDbType.Int) { Value = IdEps };
                var varPorcentajeContEps = new SqlParameter("@PorcentajeContEps", SqlDbType.Decimal) { Value = PorcentajeContEps };
                var varIdFondoPension = new SqlParameter("@IdFondoPension", SqlDbType.Int) { Value = IdFondoPension };
                var varPorcentajeContFP = new SqlParameter("@PorcentajeContFP", SqlDbType.Decimal) { Value = PorcentajeContFP };
                var varIdBanco = new SqlParameter("@IdBanco", SqlDbType.Int) { Value = IdBanco };
                var varNumeroCuentaPago = new SqlParameter("@NumeroCuentaPago", SqlDbType.VarChar) { Value = NumeroCuentaPago };
                var varSubTransporte = new SqlParameter("@SubTransporte", SqlDbType.Int) { Value = SubTransporte };
                var varIdCesantias = new SqlParameter("@IdCesantias", SqlDbType.Int) { Value = IdCesantias };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = int.MaxValue };

                _conection.Database.ExecuteSqlCommand("SP_CrearCLE  @IdUser, " +
                                                                    "@IdEmpleado, " +
                                                                    "@IdSucursal, " +
                                                                    "@IdCargo, " +
                                                                    "@IdTipoContrato, " +
                                                                    "@SalarioMensual," +
                                                                    "@FechaIni, " +
                                                                    "@IdEps, " +
                                                                    "@PorcentajeContEps, " +
                                                                    "@IdFondoPension, " +
                                                                    "@PorcentajeContFP, " +
                                                                    "@IdBanco, " +
                                                                    "@NumeroCuentaPago, " +
                                                                    "@SubTransporte, " +
                                                                    "@IdCesantias, " +
                                                                    "@Observacion, " +
                                                                    "@Resultado OUTPUT",
                                                                    varIdUser,
                                                                    varIdEmpleado,
                                                                    varIdSucursal,
                                                                    varIdCargo,
                                                                    varIdTipoContrato,
                                                                    varSalarioMensual,
                                                                    varFechaInicio,
                                                                    varIdEps,
                                                                    varPorcentajeContEps,
                                                                    varIdFondoPension,
                                                                    varPorcentajeContFP,
                                                                    varIdBanco,
                                                                    varNumeroCuentaPago,
                                                                    varSubTransporte,
                                                                    varIdCesantias,
                                                                    varObservacion,
                                                                    varResultado);

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

        public string ActualizarCLE(string IdUser, int IdCLE, int IdCargo, int IdTipoContrato, int SalarioMensual, int IdEps, decimal PorcentajeContEps,
                                    int IdFondoPension, decimal PorcentajeContFP, int IdBanco, string NumeroCuentaPago, int SubTransporte,
                                    int IdCesantias, string Observacion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCLE = new SqlParameter("@IdCLE", SqlDbType.Int) { Value = IdCLE };
                var varIdCargo = new SqlParameter("@IdCargo", SqlDbType.Int) { Value = IdCargo };
                var varIdTipoContrato = new SqlParameter("@IdTipoContrato", SqlDbType.Int) { Value = IdTipoContrato };
                var varSalarioMensual = new SqlParameter("@SalarioMensual", SqlDbType.Int) { Value = SalarioMensual };
                var varIdEps = new SqlParameter("@IdEps", SqlDbType.Int) { Value = IdEps };
                var varPorcentajeContEps = new SqlParameter("@PorcentajeContEps", SqlDbType.Decimal) { Value = PorcentajeContEps };
                var varIdFondoPension = new SqlParameter("@IdFondoPension", SqlDbType.Int) { Value = IdFondoPension };
                var varPorcentajeContFP = new SqlParameter("@PorcentajeContFP", SqlDbType.Decimal) { Value = PorcentajeContFP };
                var varIdBanco = new SqlParameter("@IdBanco", SqlDbType.Int) { Value = IdBanco };
                var varNumeroCuentaPago = new SqlParameter("@NumeroCuentaPago", SqlDbType.VarChar) { Value = NumeroCuentaPago };
                var varSubTransporte = new SqlParameter("@SubTransporte", SqlDbType.Int) { Value = SubTransporte };
                var varIdCesantias = new SqlParameter("@IdCesantias", SqlDbType.Int) { Value = IdCesantias };
                var varObservacion = new SqlParameter("@Observacion", SqlDbType.VarChar) { Value = Observacion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarCLE @IdUser, @IdCLE, @IdCargo, @IdTipoContrato, @SalarioMensual, @IdEps," +
                                                        "@PorcentajeContEps,@IdFondoPension, @PorcentajeContFP,@IdBanco,@NumeroCuentaPago," +
                                                        "@SubTransporte,@IdCesantias,@Observacion, @IdEstado, @Resultado OUTPUT", 
                                                        varIdUser, varIdCLE, varIdCargo, varIdTipoContrato, varSalarioMensual, varIdEps, 
                                                        varPorcentajeContEps, varIdFondoPension, varPorcentajeContFP, varIdBanco, varNumeroCuentaPago, 
                                                        varSubTransporte, varIdCesantias, varObservacion, varIdEstado, varResultado);

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


        public string EliminarCLE(string IdUser, int IdCLE)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCLE = new SqlParameter("@IdCLE", SqlDbType.Int) { Value = IdCLE };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };
                _conection.Database.ExecuteSqlCommand("SP_EliminarCLE @IdUser, @IdCLE, @Resultado OUTPUT", varIdUser, varIdCLE, varResultado);
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

        public string FinalizarCLE(string IdUser, int IdCLE, string FechaFin)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCLE = new SqlParameter("@IdCLE", SqlDbType.Int) { Value = IdCLE };
                var varFechaFin = new SqlParameter("@FechaFin", SqlDbType.VarChar) { Value = FechaFin };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };
                _conection.Database.ExecuteSqlCommand("SP_EliminarCLE @IdUser, @IdCLE, @FechaFin, @Resultado OUTPUT", varIdUser, varIdCLE, varFechaFin, varResultado);
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


        public List<GridCLE> GridCLE()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridCLE>("SP_GridCLE").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaContratoLaboral> ListaContratoLaboral()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaContratoLaboral>("SP_ListaContratoLaboral").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaContratoLaboral> ListaContratoLaboralSucursalEmpleado()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaContratoLaboral>("SP_ListaContratoLaboralSucursalEmpleado").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DatosContratoLaboral> DatosContratoLaboral(int Id)
        {
            try
            {
                var response = _conection.Database.SqlQuery<DatosContratoLaboral>("SP_DatosContratoLaboral @Id", new SqlParameter("@Id", Id)).ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
