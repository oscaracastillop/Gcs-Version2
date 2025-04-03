using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Models.PermisoSubMenu;

namespace Data.DataEntities
{
    public class DataPermisoSubMenu
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearPermisoSubMenu(string IdUser, int IdUsuarioSubMenu, int IdSubMenu, int Permiso, int Crear, int Editar, int Eliminar)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdUsuarioSubMenu = new SqlParameter("@IdUsuarioSubMenu", SqlDbType.Int) { Value = IdUsuarioSubMenu };
                var varIdSubMenu = new SqlParameter("@IdSubMenu", SqlDbType.Int) { Value = IdSubMenu };
                var varPermiso = new SqlParameter("@Ver", SqlDbType.Int) { Value = Permiso };
                var varCrear = new SqlParameter("@Crear", SqlDbType.Int) { Value = Crear };
                var varEditar = new SqlParameter("@Editar", SqlDbType.Int) { Value = Editar };
                var varEliminar = new SqlParameter("@Eliminar", SqlDbType.Int) { Value = Eliminar };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearPermisoSubMenu @IdUser, @IdUsuarioSubMenu, @IdSubMenu, @Ver, @Crear, @Editar, @Eliminar, @Resultado OUTPUT", varIdUser, varIdUsuarioSubMenu, varIdSubMenu, varPermiso, varCrear, varEditar, varEliminar, varResultado);

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

        public string ActualizarPermisoSubMenu(string IdUser, int IdPermisoSubMenu, int IdUsuarioSubMenu, int IdSubMenu, int Permiso, int Crear, int Editar, int Eliminar)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdPermisoSubMenu = new SqlParameter("@IdPermisoSubMenu", SqlDbType.Int) { Value = IdPermisoSubMenu };
                var varIdUsuarioSubMenu = new SqlParameter("@IdUsuarioSubMenu", SqlDbType.Int) { Value = IdUsuarioSubMenu };
                var varIdSubMenu = new SqlParameter("@IdSubMenu", SqlDbType.Int) { Value = IdSubMenu };
                var varPermiso = new SqlParameter("@Ver", SqlDbType.Int) { Value = Permiso };
                var varCrear = new SqlParameter("@Crear", SqlDbType.Int) { Value = Crear };
                var varEditar = new SqlParameter("@Editar", SqlDbType.Int) { Value = Editar };
                var varEliminar = new SqlParameter("@Eliminar", SqlDbType.Int) { Value = Eliminar };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarPermisoSubMenu @IdUser, @IdPermisoSubMenu, @IdUsuarioSubMenu, @IdSubMenu, @Ver, @Crear, @Editar, @Eliminar, @Resultado OUTPUT", varIdUser, varIdPermisoSubMenu, varIdUsuarioSubMenu, varIdSubMenu, varPermiso, varCrear, varEditar, varEliminar, varResultado);

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

        public string EliminarPermisoSubMenu(string IdUser, int IdPermisoSubMenu)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdPermisoSubMenu = new SqlParameter("@IdPermisoSubMenu", SqlDbType.Int) { Value = IdPermisoSubMenu };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarPermisoSubMenu @IdUser, @IdPermisoSubMenu, @Resultado OUTPUT", varIdUser, varIdPermisoSubMenu, varResultado);

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

        public List<GridPermisoSubMenu> GridPermisoSubMenu()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridPermisoSubMenu>("SP_GridPermisoSubMenu").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
