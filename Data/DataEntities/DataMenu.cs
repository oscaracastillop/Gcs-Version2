using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.Menu;

namespace SistemaGcs.Data.DataEntities
{
    public class DataMenu
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();
        public string GuardarDatosMenu(string IdUser, int IdMenu, string Menu, string Icono, string SizeIcono, string Color, string Ruta, string Orden, int Activo)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdMenu = new SqlParameter("@IdMenu", SqlDbType.Int) { Value = IdMenu };
                var varMenu = new SqlParameter("@Menu", SqlDbType.VarChar) { Value = Menu };
                var varIcono = new SqlParameter("@Icono", SqlDbType.VarChar) { Value = Icono };
                var varSizeIcono = new SqlParameter("@SizeIcono", SqlDbType.VarChar) { Value = SizeIcono };
                var varColor = new SqlParameter("@Color", SqlDbType.VarChar) { Value = Color };
                var varRuta = new SqlParameter("@Ruta", SqlDbType.VarChar) { Value = Ruta };
                var varOrden = new SqlParameter("@Orden", SqlDbType.VarChar) { Value = Orden };
                var varActivo = new SqlParameter("@Activo", SqlDbType.Int) { Value = Activo };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarDatosMenu @IdUser, @IdMenu, @Menu, @Icono, @SizeIcono, @Color, @Ruta, @Orden, @Activo, @Resultado OUTPUT", varIdUser, varIdMenu, varMenu, varIcono, varSizeIcono, varColor, varRuta, varOrden, varActivo, varResultado);

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
                        resultado = "Error*No se puede insertar valores duplicados, el menu " + Menu + " ya existe";
                    }
                    else
                    {
                        resultado = "Error*En el momento no se puede realizar este proceso, por favor comuniquese con el Administrador";
                    }
                }
            }
            return resultado;
        }

        public string EliminarMenu(string IdUser, int IdMenu)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdMenu = new SqlParameter("@IdMenu", SqlDbType.Int) { Value = IdMenu };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarMenu @IdUser, @IdMenu, @Resultado OUTPUT", varIdUser, varIdMenu, varResultado);

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

        public List<ListaMenu> ListaMenu(string Usuario)
        {
            try
            {
                var response = _conection.Database.SqlQuery<ListaMenu>("SP_Listamenu @IdUsuario", new SqlParameter("@IdUsuario", Usuario)).ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaMenuWeb> ListaMenuWeb()
        {
            try
            {
                var response = _conection.Database.SqlQuery<ListaMenuWeb>("SP_ListaMenuWeb").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<GridMenu> GridMenu()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridMenu>("SP_GridMenu").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
