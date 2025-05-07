using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static Models.Categoria;

namespace Data.DataEntities
{
    public class DataCategoria
    {

        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();


        public string CrearCategoria(string IdUser, string NombreCategoria)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varNombreCategoria = new SqlParameter("@NombreCategoria", SqlDbType.VarChar) { Value = NombreCategoria };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearCategoria @IdUser, @NombreCategoria, @Resultado OUTPUT", varIdUser, varNombreCategoria, varResultado);

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

        public string ActualizarCategoria(string IdUser, int IdCategoria, string NombreCategoria, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCategoria = new SqlParameter("@IdCategoria", SqlDbType.Int) { Value = IdCategoria };
                var varNombreCategoria = new SqlParameter("@NombreCategoria", SqlDbType.VarChar) { Value = NombreCategoria };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarCategoria @IdUser, @IdCategoria, @NombreCategoria, @IdEstado, @Resultado OUTPUT", varIdUser, varIdCategoria, varNombreCategoria, varIdEstado, varResultado);

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

        public string EliminarCategoria(string IdUser, int IdCategoria)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCategoria = new SqlParameter("@IdCategoria", SqlDbType.Int) { Value = IdCategoria };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarCategoria @IdUser, @IdCategoria, @Resultado OUTPUT", varIdUser, varIdCategoria, varResultado);

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

        public List<GridCategoria> GridCategoria()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridCategoria>("SP_GridCategoria").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaCategoria> ListaCategoria()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaCategoria>("SP_ListaCategoria").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
