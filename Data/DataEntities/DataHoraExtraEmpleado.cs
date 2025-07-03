using Data.DataContext;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DataEntities
{
    public class DataHoraExtraEmpleado
    {
        readonly GcsEntities _conection = new GcsEntities();
        private readonly DataRol dataRol = new DataRol();

        public string CrearHoraExtraEmpleado(string IdUser, int IdEmpleado, int IdTipoHoraExtra, decimal CantidadHE, string FechaHE, string FechaPagoHE, string Observacion)
        {
            // Implementación de la lógica para crear una hora extra de empleado
            return "Hora extra creada exitosamente.";
        }
        public string ActualizarHoraExtraEmpleado(string IdUser, int IdHoraExtra, int IdTipoHoraExtra, decimal CantidadHE, string FechaHE, string FechaPagoHE, string Observacion, int IdEstado)
        {
            // Implementación de la lógica para actualizar una hora extra de empleado
            return "Hora extra actualizada exitosamente.";
        }
        public string EliminarHoraExtraEmpleado(string IdUser, int IdCasinoEmpleado)
        {
            // Implementación de la lógica para eliminar una hora extra de empleado
            return "Hora extra eliminada exitosamente.";
        }
        public List<object> GridHoraExtraEmpleado()
        {
            // Implementación de la lógica para obtener las horas extras de empleados
            return new List<object>();
        }
    }
}
