function ModalHoraExtraEmpleado(tipo) {
    $("#TituloModalHoraExtraEmpleado").empty().val('');
    $("#LabelIdHoraExtraEmpleado").empty().val('');
    $("#SelectContratoLaboralEmpleado").val(-1);
    $("#SelectTipoHoraExtra").val(-1);
    $("#InputCantidadHEEmpleado").empty().val('');
    $("#InputFechaHEEmpleado").empty().val('');
    $("#InputFechaPagoHEEmplado").empty().val('');
    $("#InputHEEmpleadoObservacion").empty().val('');   
    $("#BotonesModalHoraExtraEmpleado").empty();
    if (tipo == 'C') {
        $("#TituloModalHoraExtraEmpleado").empty().append('<label>Crear Hora Extra Empleado</label>');
        $('#ModalHoraExtraEmpleado').modal('show');
        $("#SelectEstadoHoraExtraEmpleado").hide();
        $("#BotonesModalHoraExtraEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearHoraExtraEmpleado()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalHoraExtraEmpleado").empty().append('<label>Editar Hora Extra Empleado</label>');
        $('#ModalHoraExtraEmpleado').modal('show');
        $("#SelectContratoLaboralSucursalEmpleado").prop("disabled", true);
        $("#SelectEstadoHoraExtraEmpleado").show();
        $("#BotonesModalHoraExtraEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarHoraExtraEmpleado()">Guardar Cambios</button>');
    }
}

function CrearHoraExtraEmpleado() {
    let IdEmpleado = $('#SelectContratoLaboralSucursalEmpleado').val();
    let IdTipoHoraExtra = $('#SelectTipoHoraExtra').val();
    let CantidadHE = $('#InputCantidadHEEmpleado').val();
    let FechaHE = $('#InputFechaHEEmpleado').val();
    let FechaPagoHE = $('#InputFechaPagoHEEmplado').val();
    let Observacion = $('#InputHEEmpleadoObservacion').val();

    if (IdEmpleado == -1 || IdEmpleado == null || IdEmpleado == '') {
        $('#SelectContratoLaboralSucursalEmpleado').focus();
        VentanaMensaje('Seleccione el Empleado', 'info');
    } else if (IdTipoHoraExtra == -1 || IdTipoHoraExtra == null || IdTipoHoraExtra == '') {
        $('#SelectTipoHoraExtra').focus();
        VentanaMensaje('Seleccione el Tipo de Hora Extra', 'info');
    } else if (CantidadHE == null || CantidadHE == '' || CantidadHE == undefined || CantidadHE == 0) {
        $('#InputCantidadHEEmpleado').focus();
        VentanaMensaje('Ingrese la cantidad de Horas Extras', 'info');
    } else if (FechaHE == null || FechaHE == '' || FechaHE == undefined) {
        $('#InputFechaHEEmpleado').focus();
        VentanaMensaje('Ingrese la Fecha de la Hora Extra', 'info');
    } else if (FechaPagoHE == null || FechaPagoHE == '' || FechaPagoHE == undefined) {
        $('#InputFechaPagoHEEmplado').focus();
        VentanaMensaje('Ingrese la Fecha de Pago', 'info');
    } else if (FechaPagoHE < FechaHE) {
        $('#InputFechaPagoHEEmplado').focus();
        VentanaMensaje('La fecha de pago no puede ser inferior a la Fecha de ejecución de la Hora Extra', 'info');
    } else {


        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Hora_Extra_Empleado/CrearHoraExtraEmpleado',
            data: {
                IdUser: TokenUser,
                IdEmpleado: IdEmpleado,
                IdTipoHoraExtra: IdTipoHoraExtra,
                CantidadHE: CantidadHE,
                FechaHE: FechaHE,
                FechaPagoHE: FechaPagoHE,
                Observacion: Observacion
            },
            success: function (resultado) {
                valor = resultado.split('*');
                if (valor[0] == 'OK') {
                    Swal.fire({
                        title: TituloSwal,
                        text: valor[1],
                        icon: 'success',
                        position: 'top',
                        confirmButtonColor: "orangered",
                    }).then((result) => {
                        window.location.reload();
                    })
                } else {
                    Swal.fire(TituloSwal, valor[1], 'info');
                }
            }
        });


    }
}
