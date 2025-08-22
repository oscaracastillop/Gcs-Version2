using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Models.DetalleCotizacion;
using static Models.Producto;

namespace Data.DataEntities
{
    public class DataDetalleCotizacion
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public List<GridDetalleCotizacion> GridDetalleCotizacion()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridDetalleCotizacion>("SP_GridDetalleCotizacion").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string AgregarProductoDetCotTemporal(string IdUser, int IdProducto, int Cantidad, int PrecioUnitario, int PorcentajeIva)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdProducto = new SqlParameter("@IdProducto", SqlDbType.Int) { Value = IdProducto };
                var varCantidad = new SqlParameter("@Cantidad", SqlDbType.Int) { Value = Cantidad };
                var varPrecioUnitario = new SqlParameter("@PrecioUnitario", SqlDbType.Int) { Value = PrecioUnitario };
                var varPorcentajeIva = new SqlParameter("@PorcentajeIva", SqlDbType.Int) { Value = PorcentajeIva };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_AgregarProductoDetCotTemporal @IdUser, @IdProducto ,@Cantidad, @PrecioUnitario, @PorcentajeIva, @Resultado OUTPUT", varIdUser, varIdProducto, varCantidad, varPrecioUnitario, varPorcentajeIva, varResultado);

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


        public List<GridTDetalleCotizacion> GridTDetalleCotizacion()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridTDetalleCotizacion>("SP_GridTDetalleCotizacion").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string EliminarTDetalleCotizacion(string IdUser, int IdTDetalleCotizacion)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdTDetalleCotizacion = new SqlParameter("@IdTDetalleCotizacion", SqlDbType.Int) { Value = IdTDetalleCotizacion };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarRegistroTDetalleCotizacion @IdUser, @IdTDetalleCotizacion, @Resultado OUTPUT", varIdUser, varIdTDetalleCotizacion, varResultado);

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

        public string BorrarTProductoListaDetCot(string IdUser)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_BorrarTProductoListaDetCot @IdUser, @Resultado OUTPUT", varIdUser, varResultado);

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
