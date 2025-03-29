using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Models.FondoCesantias;

namespace Data.DataEntities
{
    public class DataFondoCesantias
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearFondoCesantias(string IdUser, string NombreFondoCesantias)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varNombreFondoCesantias = new SqlParameter("@Nombre", SqlDbType.VarChar) { Value = NombreFondoCesantias };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearFondoCesantias @IdUser, @Nombre, @Resultado OUTPUT", varIdUser, varNombreFondoCesantias, varResultado);

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

        public string ActualizarFondoCesantias(string IdUser, int IdFondoCesantias, string NombreFondoCesantias, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdFondoCesantias = new SqlParameter("@IdFondoCesantias", SqlDbType.Int) { Value = IdFondoCesantias };
                var varNombreFondoCesantias = new SqlParameter("@NombreFondoCesantias", SqlDbType.VarChar) { Value = NombreFondoCesantias };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarFondoCesantias @IdUser, @IdFondoCesantias, @NombreFondoCesantias, @IdEstado, @Resultado OUTPUT", varIdUser, varIdFondoCesantias, varNombreFondoCesantias, varIdEstado, varResultado);

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

        public string EliminarFondoCesantias(string IdUser, int IdFondoCesantias)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdFondoCesantias = new SqlParameter("@IdFondoCesantias", SqlDbType.Int) { Value = IdFondoCesantias };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarFondoCesantias @IdUser, @IdFondoCesantias, @Resultado OUTPUT", varIdUser, varIdFondoCesantias, varResultado);

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

        public List<GridFondoCesantias> GridFondoCesantias()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridFondoCesantias>("SP_GridFondoCesantias").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaFondoCesantias> ListaFondoCesantias()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaFondoCesantias>("SP_ListaFondoCesantias").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
