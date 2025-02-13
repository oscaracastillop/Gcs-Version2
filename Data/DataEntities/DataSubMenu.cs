using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.SubMenu;

namespace SistemaGcs.Data.DataEntities
{
    public class DataSubMenu
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();
        public string GuardarDatosSubMenu(string IdUser, int IdSubMenu, int IdMenu, string SubMenu, string Icono, string SizeIcono, string Color, string Ruta, int Activo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdSubMenu = new SqlParameter("@IdSubMenu", SqlDbType.Int) { Value = IdSubMenu };
                var varIdMenu = new SqlParameter("@IdMenu", SqlDbType.Int) { Value = IdMenu };
                var varSubMenu = new SqlParameter("@SubMenu", SqlDbType.VarChar) { Value = SubMenu };
                var varIcono = new SqlParameter("@Icono", SqlDbType.VarChar) { Value = Icono };
                var varSizeIcono = new SqlParameter("@SizeIcono", SqlDbType.VarChar) { Value = SizeIcono };
                var varColor = new SqlParameter("@Color", SqlDbType.VarChar) { Value = Color };
                var varRuta = new SqlParameter("@Ruta", SqlDbType.VarChar) { Value = Ruta };
                var varActivo = new SqlParameter("@Activo", SqlDbType.Int) { Value = Activo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarDatosSubMenu @IdUser, @IdSubMenu, @IdMenu, @SubMenu, @Icono, @SizeIcono, @Color, @Ruta, @Activo, @Resultado OUTPUT", varIdUser, varIdSubMenu, varIdMenu, varSubMenu, varIcono, varSizeIcono, varColor, varRuta, varActivo, varResultado);

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
                        resultado = "Error*No se puede insertar valores duplicados, el submenu " + SubMenu + " ya existe";
                    }
                    else
                    {
                        resultado = "Error*En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public string EliminarSubMenu(string IdUser, int IdSubMenu)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdSubMenu = new SqlParameter("@IdSubMenu", SqlDbType.Int) { Value = IdSubMenu };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarSubMenu @IdUser, @IdSubMenu, @Resultado OUTPUT", varIdUser, varIdSubMenu, varResultado);

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

        public List<ListaSubMenu> ListaSubMenu(string Usuario, string Modulo)
        {
            try
            {
                var response = _conection.Database.SqlQuery<ListaSubMenu>("SP_ListaSubMenu @IdUsuario, @Modulo", new SqlParameter("@IdUsuario", Usuario), new SqlParameter("@Modulo", Modulo)).ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaSubMenuWeb> ListaSubMenuWeb()
        {
            try
            {
                var response = _conection.Database.SqlQuery<ListaSubMenuWeb>("SP_ListaSubMenuWeb").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<GridSubMenu> GridSubMenu()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridSubMenu>("SP_GridSubMenu").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
