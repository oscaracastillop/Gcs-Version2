using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using static Models.EntradaAlmacen;
using static Models.Eps;

namespace Data.DataEntities
{
    public class DataEntradaAlmacen
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearEntradaAlmacen(string IdUser, int IdProducto, string Lote, int Cantidad, int ValorUnitarioCompra, int PorcentajeIva, string FechaVencimientoProducto, string FechaIngresoAlmacen)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdProducto = new SqlParameter("@IdProducto", SqlDbType.Int) { Value = IdProducto };
                var varLote = new SqlParameter("@Lote", SqlDbType.VarChar) { Value = Lote };
                var varCantidad = new SqlParameter("@Cantidad", SqlDbType.Int) { Value = Cantidad };
                var varValorUnitarioCompra = new SqlParameter("@ValorUnitarioCompra", SqlDbType.Int) { Value = ValorUnitarioCompra };
                var varPorcentajeIva = new SqlParameter("@PorcentajeIva", SqlDbType.Int) { Value = PorcentajeIva };
                var varFechaVencimientoProducto = new SqlParameter("@FechaVencimientoProducto", SqlDbType.VarChar) { Value = FechaVencimientoProducto };
                var varFechaIngresoAlmacen = new SqlParameter("@FechaIngresoAlmacen", SqlDbType.VarChar) { Value = FechaIngresoAlmacen };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_CrearEntradaAlmacen @IdUser, @IdProducto, @Lote, @Cantidad, @ValorUnitarioCompra, @PorcentajeIva, @FechaVencimientoProducto, @FechaIngresoAlmacen, @Resultado OUTPUT", varIdUser, varIdProducto, varLote, varCantidad, varValorUnitarioCompra, varPorcentajeIva, varFechaVencimientoProducto, varFechaIngresoAlmacen, varResultado);

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

        public string ActualizarEntradaAlmacen(string IdUser, int IdEntradaAlmacen, string Lote, int Cantidad, int ValorUnitarioCompra, int PorcentajeIva, string FechaVencimientoProducto, string FechaIngresoAlmacen, int IdEstado)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEntradaAlmacen = new SqlParameter("@IdEntradaAlmacen", SqlDbType.Int) { Value = IdEntradaAlmacen };
                var varLote = new SqlParameter("@Lote", SqlDbType.VarChar) { Value = Lote };
                var varCantidad = new SqlParameter("@Cantidad", SqlDbType.Int) { Value = Cantidad };
                var varValorUnitarioCompra = new SqlParameter("@ValorUnitarioCompra", SqlDbType.Int) { Value = ValorUnitarioCompra };
                var varPorcentajeIva = new SqlParameter("@PorcentajeIva", SqlDbType.Int) { Value = PorcentajeIva };
                var varFechaVencimientoProducto = new SqlParameter("@FechaVencimientoProducto", SqlDbType.VarChar) { Value = FechaVencimientoProducto };
                var varFechaIngresoAlmacen = new SqlParameter("@FechaIngresoAlmacen", SqlDbType.VarChar) { Value = FechaIngresoAlmacen };
                var varIdEstado = new SqlParameter("@IdEstado", SqlDbType.Int) { Value = IdEstado };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_ActualizarEntradaAlmacen @IdUser, @IdEntradaAlmacen, @Lote, @Cantidad, @ValorUnitarioCompra, @PorcentajeIva, @FechaVencimientoProducto, @FechaIngresoAlmacen, @IdEstado, @Resultado OUTPUT", varIdUser, varIdEntradaAlmacen, varLote, varCantidad, varValorUnitarioCompra, varPorcentajeIva, varFechaVencimientoProducto, varFechaIngresoAlmacen, varResultado, varIdEstado);

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

        public string EliminarEntradaAlmacen(string IdUser, int IdEntradaAlmacen)
        {
            string resultado = String.Empty;
            try
            {
                var varIdUser = new SqlParameter("@IdUser", SqlDbType.VarChar) { Value = IdUser };
                var varIdEntradaAlmacen = new SqlParameter("@IdEntradaAlmacen", SqlDbType.Int) { Value = IdEntradaAlmacen };
                var varResultado = new SqlParameter("@Resultado", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Size = 255 };

                _conection.Database.ExecuteSqlCommand("SP_EliminarEntradaAlmacen @IdUser, @IdEntradaAlmacen, @Resultado OUTPUT", varIdUser, varIdEntradaAlmacen, varResultado);

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

        public List<GridEntradaAlmacen> GridEntradaAlmacen()
        {
            try
            {
                var response = _conection.Database.SqlQuery<GridEntradaAlmacen>("SP_GridEntradaAlmacen").ToList();
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
