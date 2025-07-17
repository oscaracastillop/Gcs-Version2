using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.DataContext;
using static SistemaGcs.Models.NominaEmpleado;

namespace Data.DataEntities
{
    public class DataNominaEmpleado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

       
        public string CrearNominaEmpleado(string IdUser, int IdEmpleado, string FechaInicio, string FechaFin, int DiasaPagar)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varFechaInicio = new SqlParameter("@FechaInicio", SqlDbType.VarChar) { Value = FechaInicio };
                var varFechaFin = new SqlParameter("@FechaFin", SqlDbType.VarChar) { Value = FechaFin };
                var varDiasaPagar = new SqlParameter("@DiasaPagar", SqlDbType.Int) { Value = DiasaPagar };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = int.MaxValue };

                _conection.Database.ExecuteSqlCommand("SP_CrearNominaEmpleado @IdUser, @IdEmpleado, @FechaInicio, @FechaFin, @DiasaPagar, @Resultado OUTPUT", varIdUser, varIdEmpleado, varFechaInicio, varFechaFin, varDiasaPagar, varResultado);

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

        public List<GridNominaEmpleado> GridNominaEmpleado()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridNominaEmpleado>("SP_GridNominaEmpleado").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<GridNominaEmpleado> DatosComprobanteNomina(int Id)
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridNominaEmpleado>("SP_DatosComprobanteNomina @Id", new SqlParameter("@Id", Id)).ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<GridDatosEmpleadoNomina> CargarDatosEmpleadoNomina(int IdEmpleado, string FechaInicio, string FechaFin, int DiasaPagar)
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridDatosEmpleadoNomina>("SP_GridDatosEmpleadoNomina @IdEmpleado, @FechaInicio, @FechaFin, @DiasaPagar", 
                    new SqlParameter("@IdEmpleado", IdEmpleado),
                    new SqlParameter("@FechaInicio", FechaInicio),
                    new SqlParameter("@FechaFin", FechaFin),
                    new SqlParameter("@DiasaPagar", DiasaPagar)
                    ).ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
