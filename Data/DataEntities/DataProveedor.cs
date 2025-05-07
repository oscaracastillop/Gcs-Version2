using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static Models.Proveedor;

namespace Data.DataEntities
{
    public class DataProveedor
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearProveedor(string IdUser, string NombreProveedor, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Celular, string Contacto, int IdCiudad, string Direccion, int IdFormaPago, int IdPlazoPago, string Descripcion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varNombreProveedor = new SqlParameter("@NombreProveedor", SqlDbType.VarChar) { Value = NombreProveedor };
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varIdentificacion = new SqlParameter("@Identificacion", SqlDbType.VarChar) { Value = Identificacion };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varTelefono = new SqlParameter("@Telefono", SqlDbType.VarChar) { Value = Telefono };
                var varCelular = new SqlParameter("@Celular", SqlDbType.VarChar) { Value = Celular };
                var varContacto = new SqlParameter("@Contacto", SqlDbType.VarChar) { Value = Contacto };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varDireccion = new SqlParameter("@Direccion", SqlDbType.VarChar) { Value = Direccion };
                var varIdFormaPago = new SqlParameter("@IdFormaPago", SqlDbType.Int) { Value = IdFormaPago };
                var varIdPlazoPago = new SqlParameter("@IdPlazoPago", SqlDbType.Int) { Value = IdPlazoPago };
                var varDescripcion = new SqlParameter("@Descripcion", SqlDbType.VarChar) { Value = Descripcion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearProveedor @IdUser, @NombreProveedor, @IdTipoDocumento, @Identificacion, @Email, @Telefono, @Celular, @Contacto, @IdCiudad, @Direccion, @IdFormaPago, @IdPlazoPago, @Descripcion, @Resultado OUTPUT", varIdUser, varNombreProveedor, varIdTipoDocumento, varIdentificacion, varEmail, varTelefono, varCelular, varContacto, varIdCiudad, varDireccion, varIdFormaPago, varIdPlazoPago, varDescripcion, varResultado);

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

        public string ActualizarProveedor(string IdUser, int IdProveedor, string NombreProveedor, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Celular, string Contacto, int IdCiudad, string Direccion, int IdFormaPago, int IdPlazoPago, string Descripcion, int Activo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdProveedor = new SqlParameter("@IdProveedor", SqlDbType.Int) { Value = IdProveedor };
                var varNombreProveedor = new SqlParameter("@NombreProveedor", SqlDbType.VarChar) { Value = NombreProveedor };
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varIdentificacion = new SqlParameter("@Identificacion", SqlDbType.VarChar) { Value = Identificacion };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varTelefono = new SqlParameter("@Telefono", SqlDbType.VarChar) { Value = Telefono };
                var varCelular = new SqlParameter("@Celular", SqlDbType.VarChar) { Value = Celular };
                var varContacto = new SqlParameter("@Contacto", SqlDbType.VarChar) { Value = Contacto };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varDireccion = new SqlParameter("@Direccion", SqlDbType.VarChar) { Value = Direccion };
                var varIdFormaPago = new SqlParameter("@IdFormaPago", SqlDbType.Int) { Value = IdFormaPago };
                var varIdPlazoPago = new SqlParameter("@IdPlazoPago", SqlDbType.Int) { Value = IdPlazoPago };
                var varDescripcion = new SqlParameter("@Descripcion", SqlDbType.VarChar) { Value = Descripcion };
                var varActivo = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = Activo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarProveedor @IdUser, @IdProveedor, @NombreProveedor, @IdTipoDocumento, @Identificacion, @Email, @Telefono, @Celular, @Contacto, @IdCiudad, @Direccion, @IdFormaPago, @IdPlazoPago, @Descripcion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdProveedor, varNombreProveedor, varIdTipoDocumento, varIdentificacion, varEmail, varTelefono, varCelular, varContacto, varIdCiudad, varDireccion, varIdFormaPago, varIdPlazoPago, varDescripcion, varActivo, varResultado);

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

        public string EliminarProveedor(string IdUser, int IdProveedor)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdProveedor = new SqlParameter("@IdProveedor", SqlDbType.Int) { Value = IdProveedor };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarProveedor @IdUser, @IdProveedor, @Resultado OUTPUT", varIdUser, varIdProveedor, varResultado);

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

        public List<GridProveedor> GridProveedor()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridProveedor>("SP_GridProveedor").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaProveedor> ListaProveedor()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaProveedor>("SP_ListaProveedor").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
