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



function CargarDatosEmpleadoNomina(IdEmpleado) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Nomina_Empleado/CargarDatosEmpleadoNomina',
        data: {
            IdEmpleado: IdEmpleado
        },
        success: function (resultado) {
            $('#txtEmpresaNominaEmpleado').val(resultado[0].txtEmpresaNominaEmpleado);
            $('#txtSueldoNominaEmpleado').val(resultado[0].txtSueldoNominaEmpleado);

            $('#txtBonosNominaEmpleado').val(resultado[0].txtBonosNominaEmpleado);
            $('#txtPrestamosINominaEmpleado').val(resultado[0].txtPrestamosINominaEmpleado);
            $('#txtHEDiurnaNominaEmpleado').val(resultado[0].txtHEDiurnaNominaEmpleado);
            $('#txtHENocturnaNominaEmpleado').val(resultado[0].txtHENocturnaNominaEmpleado);
            $('#txtHEDiurnaDFNominaEmpleado').val(resultado[0].txtHEDiurnaDFNominaEmpleado);
            $('#txtHENocturnaDFNominaEmpleado').val(resultado[0].txtHENocturnaDFNominaEmpleado);

            $('#txtCasinoNominaEmpleado').val(resultado[0].txtCasinoNominaEmpleado);
            $('#txtPrestamosDNominaEmpleado').val(resultado[0].txtPrestamosDNominaEmpleado);
            $('#txtNovedadesNominaEmpleado').val(resultado[0].txtNovedadesNominaEmpleado);
        },
    });
}
