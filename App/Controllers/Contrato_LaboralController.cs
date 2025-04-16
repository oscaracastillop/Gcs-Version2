using Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Contrato_LaboralController : Controller
    {
        private readonly DataContratoLaboral dataContratoLaboral = new DataContratoLaboral();
                      

        public JsonResult CrearCLE( string IdUser, int IdEmpleado, int IdEmpresa, int IdCargo, int IdTipoContrato, int SalarioMensual, string FechaInicio,
                                    string FechaFin, int IdEps, decimal PorcentajeContEps, int IdFondoPension, decimal PorcentajeContFP, int IdBanco,
                                    string NumeroCuentaPago, int SubTransporte, int IdCesantias, string Observacion)
        {
            var resultado = dataContratoLaboral.CrearCLE(   IdUser, IdEmpleado, IdEmpresa, IdCargo, IdTipoContrato, SalarioMensual, FechaInicio, FechaFin,
                                                            IdEps, PorcentajeContEps, IdFondoPension, PorcentajeContFP, IdBanco, NumeroCuentaPago,
                                                            SubTransporte, IdCesantias, Observacion);

            return Json(resultado);
        }

        public JsonResult ActualizarCLE(string IdUser, int IdCLE, int IdCargo, int IdTipoContrato, int SalarioMensual, string FechaFin, int IdEps,
                                        decimal PorcentajeContEps, int IdFondoPension, decimal PorcentajeContFP, int IdBanco,
                                        string NumeroCuentaPago, int SubTransporte, int IdCesantias, string Observacion, int IdEstado)
        {
            var resultado = dataContratoLaboral.ActualizarCLE(  IdUser, IdCLE, IdCargo, IdTipoContrato, SalarioMensual, FechaFin, IdEps,
                                                                PorcentajeContEps, IdFondoPension, PorcentajeContFP, IdBanco, NumeroCuentaPago,
                                                                SubTransporte, IdCesantias, Observacion, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarCLE(string IdUser, int IdCLE)
        {
            string resultado = dataContratoLaboral.EliminarCLE(IdUser, IdCLE);
            return Json(resultado);
        }

        public ActionResult GridCLE()
        {
            var data = dataContratoLaboral.GridCLE();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        
        public JsonResult ListaContratoLaboralEmpleado()
        {
            var resultado = dataContratoLaboral.ListaContratoLaboral();
            return Json(resultado);
        }

        public JsonResult ListaContratoLaboralSucursalEmpleado()
        {
            var resultado = dataContratoLaboral.ListaContratoLaboralSucursalEmpleado();
            return Json(resultado);
        }

    }
}