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
        $("#BotonesModalNominaEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearNominaEmpleado()">Generar Nómina</button>');
    } if (tipo == 'E') {
        $("#TituloModalNominaEmpleado").empty().append('<label>Editar Nómina Empleado</label>');
        $('#ModalNominaEmpleado').modal('show');
        $("#SelectEstadoNominaEmpleado").show();
        $("#BotonesModalNominaEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarNominaEmpleado()">Guardar Cambios</button>');
    }
}



function CargarDatosEmpleadoNomina() {
    $('#datosNominaEmpleado').hide();
    let IdEmpleado = $('#SelectContratoLaboralSucursalEmpleado').val();
    let DiasaPagar = $('#InputNominaEmpleadoDiasPagar').val();
    let FechaInicio = $('#InputNominaEmpleadoFechaInicio').val();
    let FechaFin = $('#InputNominaEmpleadoFechaCorte').val();

    $('#txtEmpresaNominaEmpleado').empty().text('');
    $('#txtSueldoNominaEmpleado').empty().text('');
    $('#txtBonosNominaEmpleado').empty().text('');
    $('#txtPrestamosINominaEmpleado').empty().text('');
    $('#txtHEDiurnaNominaEmpleado').empty().text('');
    $('#txtHENocturnaNominaEmpleado').empty().text('');
    $('#txtHEDiurnaDFNominaEmpleado').empty().text('');
    $('#txtHENocturnaDFNominaEmpleado').empty().text('');
    $('#txtCasinoNominaEmpleado').empty().text('');
    $('#txtPrestamosDNominaEmpleado').empty().text('');
    $('#txtNovedadesNominaEmpleado').empty().text('');

    if (FechaInicio == null || FechaInicio == '' || FechaInicio == undefined) {
        $('#InputNominaEmpleadoFechaInicio').focus();
        $("#SelectContratoLaboralSucursalEmpleado").val(-1);
        VentanaMensaje('Ingrese Fecha Inicio', 'info');
    } else if (FechaFin == null || FechaFin == '' || FechaFin == undefined) {
        $('#InputNominaEmpleadoFechaCorte').focus();
        $("#SelectContratoLaboralSucursalEmpleado").val(-1);
        VentanaMensaje('Ingrese Fecha Fin', 'info');
    } else if (DiasaPagar == null || DiasaPagar == '' || DiasaPagar == undefined) {
        $('#InputNominaEmpleadoDiasPagar').focus();
        $("#SelectContratoLaboralSucursalEmpleado").val(-1);
        VentanaMensaje('Ingrese los días a pagar', 'info');
    } else if (IdEmpleado == null || IdEmpleado == -1 || IdEmpleado == undefined) {
        $('#SelectContratoLaboralSucursalEmpleado').focus();
        VentanaMensaje('Seleccione un Empleado', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Nomina_Empleado/CargarDatosEmpleadoNomina',
            data: {
                IdEmpleado: IdEmpleado,
                FechaInicio: FechaInicio,
                FechaFin: FechaFin,
                DiasaPagar: DiasaPagar
            },
            success: function (resultado) {
                $('#txtEmpresaNominaEmpleado').text(resultado[0].txtEmpresaNominaEmpleado);
                $('#txtSalarioNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtSalarioNominaEmpleado));
                $('#txtSueldoaPagarNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtSueldoaPagarNominaEmpleado));
                $('#txtAuxTransporteNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtAuxTransporteNominaEmpleado));
                $('#txtHEDiurnaNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtHEDiurnaNominaEmpleado));
                $('#txtHENocturnaNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtHENocturnaNominaEmpleado));
                $('#txtHEDiurnaDFNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtHEDiurnaDFNominaEmpleado));
                $('#txtHENocturnaDFNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtHENocturnaDFNominaEmpleado));
                $('#txtBonosNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtBonosNominaEmpleado));
                $('#txtPrestamosINominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtPrestamosINominaEmpleado));
                $('#txtTotalIngresosNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtTotalIngresosNominaEmpleado));

                $('#txtEpsNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtEpsNominaEmpleado));
                $('#txtPensionNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtPensionNominaEmpleado));
                $('#txtCasinoNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtCasinoNominaEmpleado));
                $('#txtPrestamosDNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtPrestamosDNominaEmpleado));
                $('#txtNovedadesNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtNovedadesNominaEmpleado));
                $('#txtTotalDescuentosNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtTotalDescuentosNominaEmpleado));

                $('#txtTotalPagoNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtTotalPagoNominaEmpleado));
                $('#datosNominaEmpleado').show();
            },
        });
    }

}
