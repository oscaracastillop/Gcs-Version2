using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.DataContext;
using static Models.Empleado;

namespace Data.DataEntities
{
    public class DataEmpleado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        #region Metodos Guardar

        public string CrearEmpleado(string IdUser, string Nombre, string Apellidos, int IdTipoDocumento, string Identificacion, int IdCiudadExpedicion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varNombre = new SqlParameter("@Nombre", SqlDbType.VarChar) { Value = Nombre };
                var varApellidos = new SqlParameter("@Apellidos", SqlDbType.VarChar) { Value = Apellidos };
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varIdentificacion = new SqlParameter("@Identificacion", SqlDbType.VarChar) { Value = Identificacion };
                var varIdCiudadExpedicion = new SqlParameter("@IdCiudadExpedicion", SqlDbType.Int) { Value = IdCiudadExpedicion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearEmpleado @IdUser, @Nombre, @Apellidos, @IdTipoDocumento, @Identificacion, @IdCiudadExpedicion, @Resultado OUTPUT", varIdUser, varNombre, varApellidos, varIdTipoDocumento, varIdentificacion, varIdCiudadExpedicion, varResultado);

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

        public string ActualizarEmpleado(string IdUser, int IdEmpleado, string Nombre, string Apellidos, int IdTipoDocumento, string Identificacion, int IdCiudadExpedicion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varNombre = new SqlParameter("@Nombre", SqlDbType.VarChar) { Value = Nombre };
                var varApellidos = new SqlParameter("@Apellidos", SqlDbType.VarChar) { Value = Apellidos };
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varIdentificacion = new SqlParameter("@Identificacion", SqlDbType.VarChar) { Value = Identificacion };
                var varIdCiudadExpedicion = new SqlParameter("@IdCiudadExpedicion", SqlDbType.Int) { Value = IdCiudadExpedicion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarEmpleado @IdUser, @IdEmpleado, @Nombre, @Apellidos, @IdTipoDocumento, @Identificacion, @IdCiudadExpedicion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdEmpleado, varNombre, varApellidos, varIdTipoDocumento, varIdentificacion, varIdCiudadExpedicion, varIdEstado, varResultado);

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

        public string EliminarEmpleado(string IdUser, int IdEmpleado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarEmpleado @IdUser, @IdEmpleado, @Resultado OUTPUT", varIdUser, varIdEmpleado, varResultado);

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

        public string GuardarUrlImagenHVEmpleadoBaseDatos(string IdUser, int IdEmpleado, string UrlImagenHVEmpleado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpleado = new SqlParameter("@IdEmpleado", SqlDbType.Int) { Value = IdEmpleado };
                var varUrlImagenHVEmpleado = new SqlParameter("@UrlImagenHVEmpleado", SqlDbType.VarChar) { Value = UrlImagenHVEmpleado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarUrlImagenHVEmpleadoBaseDatos @IdUser, @IdEmpleado, @UrlImagenHVEmpleado, @Resultado OUTPUT", varIdUser, varIdEmpleado, varUrlImagenHVEmpleado, varResultado);

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

        #endregion

        #region Metodos Grid
        public List<GridEmpleado> GridEmpleado()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridEmpleado>("SP_GridEmpleado").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        public List<BuscarImagenEmpleado> BuscarImagenEmpleado(int IdEmpleado)
        {
            try
            {
                return _conection.Database.SqlQuery<BuscarImagenEmpleado>("SP_BuscarImagenEmpleado @IdEmpleado",
                    new SqlParameter("@IdEmpleado", IdEmpleado)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ListaEmpleado> ListaEmpleado()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaEmpleado>("SP_ListaEmpleado").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
                
    }
}
