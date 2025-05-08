using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static Models.Cliente;

namespace Data.DataEntities
{
    public class DataCliente
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearCliente(string IdUser, string NombreCliente, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Celular, string Contacto, int IdCiudad, string Direccion, int IdFormaPago, int IdPlazoPago, string Descripcion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varNombreCliente = new SqlParameter("@NombreCliente", SqlDbType.VarChar) { Value = NombreCliente };
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varIdentificacion = new SqlParameter("@Identificacion", SqlDbType.VarChar) { Value = Identificacion };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varTelefono = new SqlParameter("@Telefono", SqlDbType.VarChar) { Value = Telefono };
                var varCelular = new SqlParameter("@Celular", SqlDbType.VarChar) { Value = Celular };
                var varContacto = new SqlParameter("@Contacto", SqlDbType.VarChar) { Value = Contacto };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varDireccion = new SqlParameter("@Direccion", SqlDbType.VarChar) { Value = Direccion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearCliente @IdUser, @NombreCliente, @IdTipoDocumento, @Identificacion, @Email, @Telefono, @Contacto, @IdCiudad, @Direccion, @Resultado OUTPUT", varIdUser, varNombreCliente, varIdTipoDocumento, varIdentificacion, varEmail, varTelefono, varContacto, varIdCiudad, varDireccion, varResultado);

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

        public string ActualizarCliente(string IdUser, int IdCliente, string NombreCliente, int IdTipoDocumento, string Identificacion, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCliente = new SqlParameter("@IdCliente", SqlDbType.Int) { Value = IdCliente };
                var varNombreCliente = new SqlParameter("@NombreCliente", SqlDbType.VarChar) { Value = NombreCliente };
                var varIdTipoDocumento = new SqlParameter("@IdTipoDocumento", SqlDbType.Int) { Value = IdTipoDocumento };
                var varIdentificacion = new SqlParameter("@Identificacion", SqlDbType.VarChar) { Value = Identificacion };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varTelefono = new SqlParameter("@Telefono", SqlDbType.VarChar) { Value = Telefono };
                var varContacto = new SqlParameter("@Contacto", SqlDbType.VarChar) { Value = Contacto };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varDireccion = new SqlParameter("@Direccion", SqlDbType.VarChar) { Value = Direccion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarCliente @IdUser, @IdCliente, @NombreCliente, @IdTipoDocumento, @Identificacion, @Email, @Telefono, @Contacto, @IdCiudad, @Direccion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdCliente, varNombreCliente, varIdTipoDocumento, varIdentificacion, varEmail, varTelefono, varContacto, varIdCiudad, varDireccion, varIdEstado, varResultado);

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

        public string EliminarCliente(string IdUser, int IdCliente)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCliente = new SqlParameter("@IdCliente", SqlDbType.Int) { Value = IdCliente };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarCliente @IdUser, @IdCliente, @Resultado OUTPUT", varIdUser, varIdCliente, varResultado);

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

        public List<GridCliente> GridCliente()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridCliente>("SP_GridCliente").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaCliente> ListaCliente()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaCliente>("SP_ListaCliente").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
