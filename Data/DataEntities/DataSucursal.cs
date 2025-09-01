using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.Sucursal;

namespace SistemaGcs.Data.DataEntities
{
    public class DataSucursal
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();
               
        public string CrearSucursal(string IdUser, string NombreSucursal, string Email, string Telefono, string Celular, string Contacto, int IdCiudad, string Direccion, string Descripcion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };                
                var varNombreSucursal = new SqlParameter("@NombreSucursal", SqlDbType.VarChar) { Value = NombreSucursal };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varTelefono = new SqlParameter("@Telefono", SqlDbType.VarChar) { Value = Telefono };
                var varCelular = new SqlParameter("@Celular", SqlDbType.VarChar) { Value = Celular };
                var varContacto = new SqlParameter("@Contacto", SqlDbType.VarChar) { Value = Contacto };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varDireccion = new SqlParameter("@Direccion", SqlDbType.VarChar) { Value = Direccion };
                var varDescripcion = new SqlParameter("@Descripcion", SqlDbType.VarChar) { Value = Descripcion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearSucursal @IdUser, @NombreSucursal, @Email, @Telefono, @Celular, @Contacto, @IdCiudad, @Direccion, @Descripcion, @Resultado OUTPUT", varIdUser, varNombreSucursal, varEmail, varTelefono, varCelular, varContacto, varIdCiudad, varDireccion, varDescripcion, varResultado);

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

        public string ActualizarSucursal(string IdUser, int IdSucursal, string NombreSucursal, string Email, string Telefono, string Celular, string Contacto, int IdCiudad, string Direccion, string Descripcion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdSucursal = new SqlParameter("@IdSucursal", SqlDbType.Int) { Value = IdSucursal };                
                var varNombreSucursal = new SqlParameter("@NombreSucursal", SqlDbType.VarChar) { Value = NombreSucursal };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varTelefono = new SqlParameter("@Telefono", SqlDbType.VarChar) { Value = Telefono };
                var varCelular = new SqlParameter("@Celular", SqlDbType.VarChar) { Value = Celular };
                var varContacto = new SqlParameter("@Contacto", SqlDbType.VarChar) { Value = Contacto };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varDireccion = new SqlParameter("@Direccion", SqlDbType.VarChar) { Value = Direccion };
                var varDescripcion = new SqlParameter("@Descripcion", SqlDbType.VarChar) { Value = Descripcion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarSucursal @IdUser, @IdSucursal, @NombreSucursal, @Email, @Telefono, @Celular, @Contacto, @IdCiudad, @Direccion, @Descripcion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdSucursal, varNombreSucursal, varEmail, varTelefono, varCelular, varContacto, varIdCiudad, varDireccion, varDescripcion, varIdEstado, varResultado);

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

        public string EliminarSucursal(string IdUser, int IdSucursal)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdSucursal = new SqlParameter("@IdSucursal", SqlDbType.Int) { Value = IdSucursal };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarSucursal @IdUser, @IdSucursal, @Resultado OUTPUT", varIdUser, varIdSucursal, varResultado);

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

        public List<GridSucursal> GridSucursal()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridSucursal>("SP_GridSucursal").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaSucursal> ListaSucursal()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaSucursal>("SP_ListaSucursal").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaSucursal> ListaSucursalXIdEmpresa(int Id)
        {
            try
            {
                return _conection.Database.SqlQuery<ListaSucursal>("SP_ListaSucursalXIdEmpresa @Id",
                    new SqlParameter("@Id", Id)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaSucursal> ListaSucursalXIdEmpresaXIdEmpleado(int IdEmpleado)
        {
            try
            {
                return _conection.Database.SqlQuery<ListaSucursal>("SP_ListaSucursalXIdEmpresaXIdEmpleado @IdEmpleado",
                    new SqlParameter("@IdEmpleado", IdEmpleado)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
