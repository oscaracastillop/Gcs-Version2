using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.Empresa;

namespace SistemaGcs.Data.DataEntities
{
    public class DataEmpresa
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearEmpresa(string IdUser, string NombreEmpresa, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Celular, string Contacto, int IdTipoDocumentoRL, string IdentificacionRL, string CiudadExpedicion, int IdCiudad, string Direccion, string Descripcion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varNombreEmpresa = new SqlParameter("@NombreEmpresa", SqlDbType.VarChar) { Value = NombreEmpresa };
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varIdentificacion = new SqlParameter("@Identificacion", SqlDbType.VarChar) { Value = Identificacion };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varTelefono = new SqlParameter("@Telefono", SqlDbType.VarChar) { Value = Telefono };
                var varCelular = new SqlParameter("@Celular", SqlDbType.VarChar) { Value = Celular };
                var varContacto = new SqlParameter("@Contacto", SqlDbType.VarChar) { Value = Contacto };
                var varIdTipoDocumentoRL = new SqlParameter("@IdTipoDocumentoRL", SqlDbType.Int) { Value = IdTipoDocumentoRL };
                var varIdentificacionRL = new SqlParameter("@IdentificacionRL", SqlDbType.VarChar) { Value = IdentificacionRL };
                var varCiudadExpedicion = new SqlParameter("@CiudadExpedicion", SqlDbType.VarChar) { Value = CiudadExpedicion };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varDireccion = new SqlParameter("@Direccion", SqlDbType.VarChar) { Value = Direccion };
                var varDescripcion = new SqlParameter("@Descripcion", SqlDbType.VarChar) { Value = Descripcion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearEmpresa @IdUser, @NombreEmpresa, @IdTipoDocumento, @Identificacion, @Email, @Telefono, @Celular, @Contacto, @IdTipoDocumentoRL, @IdentificacionRL, @CiudadExpedicion, @IdCiudad, @Direccion, @Descripcion, @Resultado OUTPUT", varIdUser, varNombreEmpresa, varIdTipoDocumento, varIdentificacion, varEmail, varTelefono, varCelular, varContacto, varIdTipoDocumentoRL, varIdentificacionRL, varCiudadExpedicion, varIdCiudad, varDireccion, varDescripcion, varResultado);

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

        public string ActualizarEmpresa(string IdUser, int IdEmpresa, string NombreEmpresa, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Celular, string Contacto, int IdTipoDocumentoRL, string IdentificacionRL, string CiudadExpedicion, int IdCiudad, string Direccion, string Descripcion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpresa = new SqlParameter("@IdEmpresa", SqlDbType.Int) { Value = IdEmpresa };
                var varNombreEmpresa = new SqlParameter("@NombreEmpresa", SqlDbType.VarChar) { Value = NombreEmpresa };
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varIdentificacion = new SqlParameter("@Identificacion", SqlDbType.VarChar) { Value = Identificacion };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varTelefono = new SqlParameter("@Telefono", SqlDbType.VarChar) { Value = Telefono };
                var varCelular = new SqlParameter("@Celular", SqlDbType.VarChar) { Value = Celular };
                var varContacto = new SqlParameter("@Contacto", SqlDbType.VarChar) { Value = Contacto };
                var varIdTipoDocumentoRL = new SqlParameter("@IdTipoDocumentoRL", SqlDbType.Int) { Value = IdTipoDocumentoRL };
                var varIdentificacionRL = new SqlParameter("@IdentificacionRL", SqlDbType.VarChar) { Value = IdentificacionRL };
                var varCiudadExpedicion = new SqlParameter("@CiudadExpedicion", SqlDbType.VarChar) { Value = CiudadExpedicion };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varDireccion = new SqlParameter("@Direccion", SqlDbType.VarChar) { Value = Direccion };
                var varDescripcion = new SqlParameter("@Descripcion", SqlDbType.VarChar) { Value = Descripcion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarEmpresa @IdUser, @IdEmpresa, @NombreEmpresa, @IdTipoDocumento, @Identificacion, @Email, @Telefono, @Celular, @Contacto, @IdTipoDocumentoRL, @IdentificacionRL, @CiudadExpedicion, @IdCiudad, @Direccion, @Descripcion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdEmpresa, varNombreEmpresa, varIdTipoDocumento, varIdentificacion, varEmail, varTelefono, varCelular, varContacto, varIdTipoDocumentoRL, varIdentificacionRL, varCiudadExpedicion, varIdCiudad, varDireccion, varDescripcion, varIdEstado, varResultado);

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

        public string EliminarEmpresa(string IdUser, int IdEmpresa)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpresa = new SqlParameter("@IdEmpresa", SqlDbType.Int) { Value = IdEmpresa };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarEmpresa @IdUser, @IdEmpresa, @Resultado OUTPUT", varIdUser, varIdEmpresa, varResultado);

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

        public List<GridEmpresa> GridEmpresa()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridEmpresa>("SP_GridEmpresa").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaEmpresa> ListaEmpresa()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaEmpresa>("SP_ListaEmpresa").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaEmpresa> ListaIdEmpresaXIdEmpleado(int IdEmpleado)
        {
            try
            {
                return _conection.Database.SqlQuery<ListaEmpresa>("SP_ListaIdEmpresaXIdEmpleado @IdEmpleado",
                    new SqlParameter("@IdEmpleado", IdEmpleado)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GuardarUrlLogoEmpresaBaseDatos(string IdUser, int IdEmpresa, string UrlLogoEmpresa)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpresa = new SqlParameter("@IdEmpresa", SqlDbType.Int) { Value = IdEmpresa };
                var varUrlLogoEmpresa = new SqlParameter("@UrlLogoEmpresa", SqlDbType.VarChar) { Value = UrlLogoEmpresa };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarUrlLogoEmpresaBaseDatos @IdUser, @IdEmpresa, @UrlLogoEmpresa, @Resultado OUTPUT", varIdUser, varIdEmpresa, varUrlLogoEmpresa, varResultado);

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
    }
}
