using Data.DataEntities;
using SistemaGcs.Data.DataEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Controllers
{
    public class Tipo_Hora_ExtraController : Controller
    {
        private readonly DataTipoHoraExtra dataTipoHoraExtra = new DataTipoHoraExtra();

        public JsonResult CrearTipoHoraExtra(string IdUser, string NombreTipoHoraExtra, decimal Porcentaje)
        {
            var resultado = dataTipoHoraExtra.CrearTipoHoraExtra(IdUser, NombreTipoHoraExtra, Porcentaje);

            return Json(resultado);
        }

        public JsonResult ActualizarTipoHoraExtra(string IdUser, int IdTipoHoraExtra, string NombreTipoHoraExtra, decimal Porcentaje, int IdEstado)
        {
            var resultado = dataTipoHoraExtra.ActualizarTipoHoraExtra(IdUser, IdTipoHoraExtra, NombreTipoHoraExtra, Porcentaje, IdEstado);
            return Json(resultado);
        }

        public JsonResult EliminarTipoHoraExtra(string IdUser, int IdTipoHoraExtra)
        {
            string resultado = dataTipoHoraExtra.EliminarTipoHoraExtra(IdUser, IdTipoHoraExtra);
            return Json(resultado);
        }

        public ActionResult GridTipoHoraExtra()
        {
            var data = dataTipoHoraExtra.GridTipoHoraExtra();
            return Json(new { data = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaTipoHoraExtra()
        {
            var resultado = dataTipoHoraExtra.ListaTipoHoraExtra();
            return Json(resultado);
        }
    }
}