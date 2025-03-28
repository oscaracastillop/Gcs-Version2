using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static Models.FondoPensiones;

namespace Data.DataEntities
{
    public class DataFondoPensiones
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearFondoPensiones(string IdUser, string NombreFondoPensiones)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varNombreFondoPensiones = new SqlParameter("@Nombre", SqlDbType.VarChar) { Value = NombreFondoPensiones };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearFondoPensiones @IdUser, @Nombre, @Resultado OUTPUT", varIdUser, varNombreFondoPensiones, varResultado);

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

        public string ActualizarFondoPensiones(string IdUser, int IdFondoPensiones, string NombreFondoPensiones, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdFondoPensiones = new SqlParameter("@IdFondoPensiones", SqlDbType.Int) { Value = IdFondoPensiones };
                var varNombreFondoPensiones = new SqlParameter("@NombreFondoPensiones", SqlDbType.VarChar) { Value = NombreFondoPensiones };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarFondoPensiones @IdUser, @IdFondoPensiones, @NombreFondoPensiones, @IdEstado, @Resultado OUTPUT", varIdUser, varIdFondoPensiones, varNombreFondoPensiones, varIdEstado, varResultado);

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

        public string EliminarFondoPensiones(string IdUser, int IdFondoPensiones)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdFondoPensiones = new SqlParameter("@IdFondoPensiones", SqlDbType.Int) { Value = IdFondoPensiones };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarFondoPensiones @IdUser, @IdFondoPensiones, @Resultado OUTPUT", varIdUser, varIdFondoPensiones, varResultado);

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

        public List<GridFondoPensiones> GridFondoPensiones()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridFondoPensiones>("SP_GridFondoPensiones").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ListaFondoPensiones> ListaFondoPensiones()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaFondoPensiones>("SP_ListaFondoPensiones").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
