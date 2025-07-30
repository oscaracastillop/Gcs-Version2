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
        $("#TituloModalNominaEmpleado").empty().append('<label>CREAR NOMINA EMPLEADO</label>');
        $('#ModalNominaEmpleado').modal('show');
        $("#SelectEstadoNominaEmpleado").hide();
        $("#BotonesModalNominaEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearNominaEmpleado()">Generar Nómina</button>');
    } if (tipo == 'E') {
        $("#TituloModalNominaEmpleado").empty().append('<label>EDITAR NOMINA EMPLEADO</label>');
        $('#ModalNominaEmpleado').modal('show');
        $("#SelectEstadoNominaEmpleado").show();
        $("#BotonesModalNominaEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarNominaEmpleado()">Guardar Cambios</button>');
    }
}



function CargarDatosEmpleadoNomina() {
   
    let IdEmpleado = $('#SelectContratoLaboralSucursalEmpleado').val();
    let DiasaPagar = $('#InputNominaEmpleadoDiasPagar').val();
    let FechaInicio = $('#InputNominaEmpleadoFechaInicio').val();
    let FechaFin = $('#InputNominaEmpleadoFechaCorte').val();

    $('#txtEmpresaNominaEmpleado').text('');
    $('#txtSalarioNominaEmpleado').text('');
    $('#txtSueldoaPagarNominaEmpleado').text('');
    $('#txtAuxTransporteNominaEmpleado').text('');
    $('#txtHEDiurnaNominaEmpleado').text('');
    $('#txtHENocturnaNominaEmpleado').text('');
    $('#txtHEDiurnaDFNominaEmpleado').text('');
    $('#txtHENocturnaDFNominaEmpleado').text('');
    $('#txtOtrosIngresosNominaEmpleado').text('');
    $('#txtDesembolsoPrestamoNominaEmpleado').text('');
    $('#txtTotalIngresosNominaEmpleado').text('');

    $('#txtEpsNominaEmpleado').text('');
    $('#txtPensionNominaEmpleado').text('');
    $('#txtCasinoNominaEmpleado').text('');
    $('#txtCobroPrestamoNominaEmpleado').text('');
    $('#txtOtrosDescuentosNominaEmpleado').text('');
    $('#txtTotalDescuentosNominaEmpleado').text('');

    $('#txtTotalPagoNominaEmpleado').text('');

    
        if (FechaInicio == null || FechaInicio == '' || FechaInicio == undefined) {
            $('#InputNominaEmpleadoFechaInicio').focus();
            $("#SelectContratoLaboralSucursalEmpleado").val(-1);
            VentanaMensaje('Ingrese Fecha Inicio');
        } else if (FechaFin == null || FechaFin == '' || FechaFin == undefined) {
            $('#InputNominaEmpleadoFechaCorte').focus();
            $("#SelectContratoLaboralSucursalEmpleado").val(-1);
            VentanaMensaje('Ingrese Fecha Fin');
        } else if (FechaFin < FechaInicio) {
            $('#InputNominaEmpleadoFechaCorte').focus();
            $("#SelectContratoLaboralSucursalEmpleado").val(-1);
            VentanaMensaje('La fecha fin no puede ser inferior a la fecha de Inicio');
        } else if (DiasaPagar == null || DiasaPagar == '' || DiasaPagar == undefined) {
            $('#InputNominaEmpleadoDiasPagar').focus();
            $("#SelectContratoLaboralSucursalEmpleado").val(-1);
            VentanaMensaje('Ingrese los días a pagar');
        } else if (IdEmpleado == null || IdEmpleado == -1 || IdEmpleado == undefined) {
            $('#SelectContratoLaboralSucursalEmpleado').focus();
            VentanaMensaje('Seleccione un Empleado');
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
                    $('#txtOtrosIngresosNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtOtrosIngresosNominaEmpleado));
                    $('#txtDesembolsoPrestamoNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtDesembolsoPrestamoNominaEmpleado));
                    $('#txtTotalIngresosNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtTotalIngresosNominaEmpleado));

                    $('#txtEpsNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtEpsNominaEmpleado));
                    $('#txtPensionNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtPensionNominaEmpleado));
                    $('#txtCasinoNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtCasinoNominaEmpleado));
                    $('#txtCobroPrestamoNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtCobroPrestamoNominaEmpleado));
                    $('#txtOtrosDescuentosNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtOtrosDescuentosNominaEmpleado));
                    $('#txtTotalDescuentosNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtTotalDescuentosNominaEmpleado));

                    $('#txtTotalPagoNominaEmpleado').text('$ ' + new Intl.NumberFormat('en-US').format(resultado[0].txtTotalPagoNominaEmpleado));
                    $('#datosNominaEmpleado').show();
                },
            });
        }
    
}


function CrearNominaEmpleado() {
    let IdEmpleado = $('#SelectContratoLaboralSucursalEmpleado').val();
    let DiasaPagar = $('#InputNominaEmpleadoDiasPagar').val();
    let FechaInicio = $('#InputNominaEmpleadoFechaInicio').val();
    let FechaFin = $('#InputNominaEmpleadoFechaCorte').val();

    if (FechaInicio == null || FechaInicio == '' || FechaInicio == undefined) {
        $('#InputNominaEmpleadoFechaInicio').focus();
        VentanaMensaje('Ingrese Fecha Inicio');
    } else if (FechaFin == null || FechaFin == '' || FechaFin == undefined) {
        $('#InputNominaEmpleadoFechaCorte').focus();
        VentanaMensaje('Ingrese Fecha Fin');
    } else if (FechaFin < FechaInicio) {
        $('#InputNominaEmpleadoFechaCorte').focus();
        VentanaMensaje('La fecha fin no puede ser inferior a la fecha de Inicio');
    } else if (DiasaPagar == null || DiasaPagar == '' || DiasaPagar == undefined) {
        $('#InputNominaEmpleadoDiasPagar').focus();
        VentanaMensaje('Ingrese los días a pagar');
    } else if (IdEmpleado == null || IdEmpleado == -1 || IdEmpleado == undefined) {
        $('#SelectContratoLaboralSucursalEmpleado').focus();
        VentanaMensaje('Seleccione un Empleado');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Nomina_Empleado/CrearNominaEmpleado',
            data: {
                IdUser: TokenUser,
                IdEmpleado: IdEmpleado,
                FechaInicio: FechaInicio,
                FechaFin: FechaFin,
                DiasaPagar: DiasaPagar
            },
            success: function (resultado) {
                valor = resultado.split('*');
                if (valor[0] == 'OK') {
                    VentanaMensajeOK(valor[1]);
                } else {
                    VentanaMensaje(valor[1]);
                }
            },
        });
    }
}