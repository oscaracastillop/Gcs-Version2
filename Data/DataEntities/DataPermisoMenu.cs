using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Models.PermisoMenu;
using SistemaGcs.Models;

namespace Data.DataEntities
{
    public class DataPermisoMenu
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearPermisoMenu(string IdUser, int IdUsuarioMenu, int IdMenu, int Permiso)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdUsuarioMenu = new SqlParameter("@IdUsuarioMenu", SqlDbType.Int) { Value = IdUsuarioMenu };
                var varIdMenu = new SqlParameter("@IdMenu", SqlDbType.Int) { Value = IdMenu };
                var varPermiso = new SqlParameter("@PermisoMenu", SqlDbType.Int) { Value = Permiso };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearPermisoMenu @IdUser, @IdUsuarioMenu, @IdMenu, @PermisoMenu, @Resultado OUTPUT", varIdUser, varIdUsuarioMenu, varIdMenu, varPermiso, varResultado);

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

        public string ActualizarPermisoMenu(string IdUser, int IdPermisoMenu, int IdUsuarioMenu, int IdMenu, int Permiso)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdPermisoMenu = new SqlParameter("@IdPermisoMenu", SqlDbType.Int) { Value = IdPermisoMenu };
                var varIdUsuarioMenu = new SqlParameter("@IdUsuarioMenu", SqlDbType.Int) { Value = IdUsuarioMenu };
                var varIdMenu = new SqlParameter("@IdMenu", SqlDbType.Int) { Value = IdMenu };
                var varPermiso = new SqlParameter("@PermisoMenu", SqlDbType.Int) { Value = Permiso };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarPermisoMenu @IdUser, @IdPermisoMenu, @IdUsuarioMenu, @IdMenu, @PermisoMenu, @Resultado OUTPUT", varIdUser, varIdPermisoMenu, varIdUsuarioMenu, varIdMenu, varPermiso, varResultado);

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

        public string EliminarPermisoMenu(string IdUser, int IdPermisoMenu)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdPermisoMenu = new SqlParameter("@IdPermisoMenu", SqlDbType.Int) { Value = IdPermisoMenu };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarPermisoMenu @IdUser, @IdPermisoMenu, @Resultado OUTPUT", varIdUser, varIdPermisoMenu, varResultado);

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

        public List<GridPermisoMenu> GridPermisoMenu()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridPermisoMenu>("SP_GridPermisoMenu").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
