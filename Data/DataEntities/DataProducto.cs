using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.DataContext;
using static Models.Producto;

namespace Data.DataEntities
{
    public class DataProducto
    {

        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

      
        public string CrearProducto(string IdUser, int IdCategoria, string NombreProducto, string MarcaProducto, string ReferenciaProducto, string CodigoProducto, int IdUnidadMedida, int StockMinimo, string Descripcion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdCategoria = new SqlParameter("@IdCategoria", SqlDbType.Int) { Value = IdCategoria };
                var varNombreProducto = new SqlParameter("@NombreProducto", SqlDbType.VarChar) { Value = NombreProducto };
                var varMarcaProducto = new SqlParameter("@MarcaProducto", SqlDbType.VarChar) { Value = MarcaProducto };
                var varReferenciaProducto = new SqlParameter("@ReferenciaProducto", SqlDbType.VarChar) { Value = ReferenciaProducto };
                var varCodigoProducto = new SqlParameter("@CodigoProducto", SqlDbType.VarChar) { Value = CodigoProducto };
                var varIdUnidadMedida = new SqlParameter("@IdUnidadMedida", SqlDbType.Int) { Value = IdUnidadMedida };
                var varStockMinimo = new SqlParameter("@StockMinimo", SqlDbType.Int) { Value = StockMinimo };
                var varDescripcion = new SqlParameter("@Descripcion", SqlDbType.VarChar) { Value = Descripcion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearProducto @IdUser, @IdCategoria, @NombreProducto, @MarcaProducto,@ReferenciaProducto,@CodigoProducto,@IdUnidadMedida, @StockMinimo,@Descripcion, @Resultado OUTPUT", varIdUser, varIdCategoria, varNombreProducto, varMarcaProducto, varReferenciaProducto, varCodigoProducto, varIdUnidadMedida, varStockMinimo, varDescripcion, varResultado);

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

        public string ActualizarProducto(string IdUser, int IdProducto, int IdCategoria, string NombreProducto, string MarcaProducto, string ReferenciaProducto, string CodigoProducto, int IdUnidadMedida, int StockMinimo, int IdEstado, string Descripcion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdProducto = new SqlParameter("@IdProducto", SqlDbType.Int) { Value = IdProducto };
                var varIdCategoria = new SqlParameter("@IdCategoria", SqlDbType.Int) { Value = IdCategoria };
                var varNombreProducto = new SqlParameter("@NombreProducto", SqlDbType.VarChar) { Value = NombreProducto };
                var varMarcaProducto = new SqlParameter("@MarcaProducto", SqlDbType.VarChar) { Value = MarcaProducto };
                var varReferenciaProducto = new SqlParameter("@ReferenciaProducto", SqlDbType.VarChar) { Value = ReferenciaProducto };
                var varCodigoProducto = new SqlParameter("@CodigoProducto", SqlDbType.VarChar) { Value = CodigoProducto };
                var varIdUnidadMedida = new SqlParameter("@IdUnidadMedida", SqlDbType.Int) { Value = IdUnidadMedida };
                var varStockMinimo = new SqlParameter("@StockMinimo", SqlDbType.Int) { Value = StockMinimo };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varDescripcion = new SqlParameter("@Descripcion", SqlDbType.VarChar) { Value = Descripcion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarProducto @IdUser, @IdProducto, @IdCategoria, @NombreProducto, @MarcaProducto,@ReferenciaProducto,@CodigoProducto,@IdUnidadMedida, @StockMinimo, @IdEstado, @Descripcion, @Resultado OUTPUT", varIdUser, varIdProducto, varIdCategoria, varNombreProducto, varMarcaProducto, varReferenciaProducto, varCodigoProducto, varIdUnidadMedida, varStockMinimo, varIdEstado, varDescripcion, varResultado);

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

        public string EliminarProducto(string IdUser, int IdProducto)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdProducto = new SqlParameter("@IdProducto", SqlDbType.Int) { Value = IdProducto };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarProducto @IdUser, @IdProducto, @Resultado OUTPUT", varIdUser, varIdProducto, varResultado);

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

        public string GuardarUrlImagenBaseDatos(string IdUser, int IdProducto, string UrlImagenProducto)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdProducto = new SqlParameter("@IdProducto", SqlDbType.Int) { Value = IdProducto };
                var varUrlImagenProducto = new SqlParameter("@UrlImagenProducto", SqlDbType.VarChar) { Value = UrlImagenProducto };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_GuardarUrlImagenProductoBaseDatos @IdUser, @IdProducto, @UrlImagenProducto, @Resultado OUTPUT", varIdUser, varIdProducto, varUrlImagenProducto, varResultado);

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
       
        public List<GridProducto> GridProducto()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridProducto>("SP_GridProducto").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ListaProducto> ListaProducto()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaProducto>("SP_ListaProducto").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ListaProductoxCategoria> ListaProductoxCategoria(int IdCategoria)
        {
            try
            {
                return _conection.Database.SqlQuery<ListaProductoxCategoria>("SP_ListaProductoxCategoria @IdCategoria",
                    new SqlParameter("@IdCategoria", IdCategoria)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
