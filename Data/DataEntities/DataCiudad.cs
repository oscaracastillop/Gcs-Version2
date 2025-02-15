using Data.DataContext;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using static SistemaGcs.Models.Ciudad;

namespace SistemaGcs.Data.DataEntities
{
    public class DataCiudad
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public List<ListaCiudad> ListaCiudad()
        {
            try
            {
                return _conection.Database.SqlQuery<ListaCiudad>("SP_ListaCiudad").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ListaCiudad> BuscarCiudadIdDepto(int IdDepartamento)
        {
            try
            {
                return _conection.Database.SqlQuery<ListaCiudad>("SP_BuscarCiudadIdDepto @IdDepartamento", new SqlParameter("@IdDepartamento", IdDepartamento)).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
