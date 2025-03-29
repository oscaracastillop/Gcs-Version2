using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Models.CCFamiliar;

namespace Data.DataEntities
{
    public class DataCCFamiliar
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearCCFamiliar(string IdUser, string NombreCCFamiliar)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varNombreCCFamiliar = new SqlParameter("@Nombre", SqlDbType.VarChar) { Value = NombreCCFamiliar };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearCCFamiliar @IdUser, @Nombre, @Resultado OUTPUT", varIdUser, varNombreCCFamiliar, varResultado);

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

        public string ActualizarCCFamiliar(string IdUser, int IdCCFamiliar, string NombreCCFamiliar, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCCFamiliar = new SqlParameter("@IdCCFamiliar", SqlDbType.Int) { Value = IdCCFamiliar };
                var varNombreCCFamiliar = new SqlParameter("@NombreCCFamiliar", SqlDbType.VarChar) { Value = NombreCCFamiliar };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarCCFamiliar @IdUser, @IdCCFamiliar, @NombreCCFamiliar, @IdEstado, @Resultado OUTPUT", varIdUser, varIdCCFamiliar, varNombreCCFamiliar, varIdEstado, varResultado);

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

        public string EliminarCCFamiliar(string IdUser, int IdCCFamiliar)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCCFamiliar = new SqlParameter("@IdCCFamiliar", SqlDbType.Int) { Value = IdCCFamiliar };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarCCFamiliar @IdUser, @IdCCFamiliar, @Resultado OUTPUT", varIdUser, varIdCCFamiliar, varResultado);

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

        public List<GridCCFamiliar> GridCCFamiliar()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridCCFamiliar>("SP_GridCCFamiliar").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaCCFamiliar> ListaCCFamiliar()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaCCFamiliar>("SP_ListaCCFamiliar").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
