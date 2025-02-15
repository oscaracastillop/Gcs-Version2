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
               
        public string CrearSucursal(string IdUser, int IdEmpresa, string NombreSucursal, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEmpresa = new SqlParameter("@IdEmpresa", SqlDbType.Int) { Value = IdEmpresa };
                var varNombreSucursal = new SqlParameter("@NombreSucursal", SqlDbType.VarChar) { Value = NombreSucursal };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varTelefono = new SqlParameter("@Telefono", SqlDbType.VarChar) { Value = Telefono };
                var varContacto = new SqlParameter("@Contacto", SqlDbType.VarChar) { Value = Contacto };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varDireccion = new SqlParameter("@Direccion", SqlDbType.VarChar) { Value = Direccion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearSucursal @IdUser, @IdEmpresa, @NombreSucursal, @Email, @Telefono, @Contacto, @IdCiudad, @Direccion, @Resultado OUTPUT", varIdUser, varIdEmpresa, varNombreSucursal, varEmail, varTelefono, varContacto, varIdCiudad, varDireccion, varResultado);

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

        public string ActualizarSucursal(string IdUser, int IdSucursal, int IdEmpresa, string NombreSucursal, string Email, string Telefono, string Contacto, int IdCiudad, string Direccion, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdSucursal = new SqlParameter("@IdSucursal", SqlDbType.Int) { Value = IdSucursal };
                var varIdEmpresa = new SqlParameter("@IdEmpresa", SqlDbType.Int) { Value = IdEmpresa };
                var varNombreSucursal = new SqlParameter("@NombreSucursal", SqlDbType.VarChar) { Value = NombreSucursal };
                var varEmail = new SqlParameter("@Email", SqlDbType.VarChar) { Value = Email };
                var varTelefono = new SqlParameter("@Telefono", SqlDbType.VarChar) { Value = Telefono };
                var varContacto = new SqlParameter("@Contacto", SqlDbType.VarChar) { Value = Contacto };
                var varIdCiudad = new SqlParameter("@IdCiudad", SqlDbType.Int) { Value = IdCiudad };
                var varDireccion = new SqlParameter("@Direccion", SqlDbType.VarChar) { Value = Direccion };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarSucursal @IdUser, @IdSucursal, @IdEmpresa, @NombreSucursal, @Email, @Telefono, @Contacto, @IdCiudad, @Direccion, @IdEstado, @Resultado OUTPUT", varIdUser, varIdSucursal, varIdEmpresa, varNombreSucursal, varEmail, varTelefono, varContacto, varIdCiudad, varDireccion, varIdEstado, varResultado);

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
