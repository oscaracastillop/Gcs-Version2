using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Prestamo_EmpleadoController : Controller
    {
        private readonly DataPrestamoEmpleado dataPrestamoEmpleado = new DataPrestamoEmpleado();

        public JsonResult CrearPrestamoEmpleado(string IdUser, int IdEmpleado, int Valor, string FechaPrestamo, string FechaPago, int Cuotas, string Observacion)
        {
            var resultado = dataPrestamoEmpleado.CrearPrestamoEmpleado(IdUser, IdEmpleado, Valor, FechaPrestamo, FechaPago, Cuotas, Observacion);
            return Json(resultado);
        }

        public JsonResult ActualizarPrestamoEmpleado(string IdUser, int IdPrestamoEmpleado, int Valor, string FechaPrestamo, string FechaPago, int Cuotas, string Observacion, int IdEstado)
        {
            var resultado = dataPrestamoEmpleado.ActualizarPrestamoEmpleado(IdUser, IdPrestamoEmpleado, Valor, FechaPrestamo, FechaPago, Cuotas, Observacion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarPrestamoEmpleado(string IdUser, int IdPrestamoEmpleado)
        {
            string resultado = dataPrestamoEmpleado.EliminarPrestamoEmpleado(IdUser, IdPrestamoEmpleado);
            return Json(resultado);
        }

        public ActionResult GridPrestamoEmpleado()
        {
            var data = dataPrestamoEmpleado.GridPrestamoEmpleado();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }
    }
}