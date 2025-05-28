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
    $('#txtEmpresaNominaEmpleado').empty().val('');
    $('#txtSueldoNominaEmpleado').empty().val('');
    $('#txtBonosNominaEmpleado').empty().val('');
    $('#txtPrestamosINominaEmpleado').empty().val('');
    $('#txtHEDiurnaNominaEmpleado').empty().val('');
    $('#txtHENocturnaNominaEmpleado').empty().val('');
    $('#txtHEDiurnaDFNominaEmpleado').empty().val('');
    $('#txtHENocturnaDFNominaEmpleado').empty().val('');
    $('#txtCasinoNominaEmpleado').empty().val('');
    $('#txtPrestamosDNominaEmpleado').empty().val('');
    $('#txtNovedadesNominaEmpleado').empty().val('');

    if (IdEmpleado > 0) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Nomina_Empleado/CargarDatosEmpleadoNomina',
            data: {
                IdEmpleado: IdEmpleado
            },
            success: function (resultado) {
                $('#txtEmpresaNominaEmpleado').val(resultado[0].txtEmpresaNominaEmpleado);
                $('#txtSalarioNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtSalarioNominaEmpleado));
                $('#txtSueldoaPagarNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtSueldoaPagarNominaEmpleado));
                $('#txtAuxTransporteNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtAuxTransporteNominaEmpleado));                
                $('#txtHEDiurnaNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtHEDiurnaNominaEmpleado));
                $('#txtHENocturnaNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtHENocturnaNominaEmpleado));
                $('#txtHEDiurnaDFNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtHEDiurnaDFNominaEmpleado));
                $('#txtHENocturnaDFNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtHENocturnaDFNominaEmpleado));
                $('#txtBonosNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtBonosNominaEmpleado));
                $('#txtPrestamosINominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtPrestamosINominaEmpleado));
                $('#txtTotalIngresos').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtTotalIngresosNominaEmpleado));

                $('#txtEpsNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtEpsNominaEmpleado));
                $('#txtPensionNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtPensionNominaEmpleado));
                $('#txtCasinoNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtCasinoNominaEmpleado));
                $('#txtPrestamosDNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtPrestamosDNominaEmpleado));
                $('#txtNovedadesNominaEmpleado').val('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtNovedadesNominaEmpleado));
                $('#txtTotalDescuentos').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtTotalDescuentos));

                $('#txtTotalPagoNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtTotalPagoNominaEmpleado));
                
            },
        });
    }     
}
