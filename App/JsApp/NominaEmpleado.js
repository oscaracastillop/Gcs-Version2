function ModalNominaEmpleado(tipo) {
    $("#TituloModalNominaEmpleado").empty().val('');
    $("#LabelIdNominaEmpleado").empty().val('');
    $("#InputNominaEmpleadoEmpleado").empty().val('');
    $("#InputNominaEmpleadoFechaInicio").empty().val('');
    $("#InputNominaEmpleadoFechaCorte").empty().val('');
    $("#InputNominaEmpleadoDiasPagar").empty().val('');
    $("#SelectContratoLaboralEmpleado").val(-1);
    $("#BotonesModalNominaEmpleado").empty();
    if (tipo == 'C') {
        $("#TituloModalNominaEmpleado").empty().append('<label>Crear Nómina Empleado</label>');
        $('#ModalNominaEmpleado').modal('show');
        $("#SelectEstadoNominaEmpleado").hide();
        $("#BotonesModalNominaEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearNominaEmpleado()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalNominaEmpleado").empty().append('<label>Editar Nómina Empleado</label>');
        $('#ModalNominaEmpleado').modal('show');
        $("#SelectEstadoNominaEmpleado").show();
        $("#BotonesModalNominaEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarNominaEmpleado()">Guardar Cambios</button>');
    }
}