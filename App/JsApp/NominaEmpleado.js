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
        $("#BotonesModalNominaEmpleado").empty().append('<button class="btn btn-sm btn-modal-guardar" onclick="CrearNominaEmpleado()">Generar Nómina</button>');
    } if (tipo == 'E') {
        $("#TituloModalNominaEmpleado").empty().append('<label>EDITAR NOMINA EMPLEADO</label>');
        $('#ModalNominaEmpleado').modal('show');
        $("#SelectEstadoNominaEmpleado").show();
        $("#BotonesModalNominaEmpleado").empty().append('<button class="btn btn-sm btn-modal-guardar" onclick="ActualizarNominaEmpleado()">Guardar Cambios</button>');
    }
}


function Limpiardatos() {
    $('#datosNominaEmpleado').hide();
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


function EliminarNominaEmpleado(IdNominaEmpleado) {
    Swal.fire({
        title: TituloSwal,
        text: "Esta seguro(a)?, No podrás revertir esta acción.!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "#333",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "Cancelar",
        position: 'top'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Nomina_Empleado/EliminarNominaEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdNominaEmpleado: IdNominaEmpleado
                },
                success: function (resultado) {
                    valor = resultado.split('*');
                    if (valor[0] == 'OK') {
                        VentanaMensajeOK(valor[1]);
                    } else {
                        VentanaMensaje(valor[1]);
                    }
                }
            });
        }
    });
}


function GridNominaEmpleado() {
    var tituloReporte = 'LISTADO NOMINA EMPLEADOS';
    let datatable = $('#gridNominaEmpleado').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [1], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [2], className: 'dt-head-center' },
            { targets: [3], className: 'dt-head-center' },
            { targets: [4], className: 'dt-head-center' },
            { targets: [5], className: 'dt-head-center' },
            { targets: [6], className: 'dt-head-center' },
            { targets: [7], className: 'dt-head-center' },
            { targets: [8], className: 'dt-head-center' },
            { targets: [9], className: 'dt-head-center' },
            { targets: [10], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [11], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'portrait', // landscape
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 3],
                    search: 'applied',
                    order: 'applied',
                },
                customize: function (doc) {
                    doc.content.splice(0, 1.5);
                    doc.pageMargins = [40, 60, 20, 30];
                    doc.defaultStyle.fontSize = 6;
                    doc.styles.tableHeader.fontSize = 7;
                    doc['header'] = (function () {
                        return {
                            columns: [
                                {
                                    italics: true,
                                    fontSize: 10,
                                    text: tituloReporte,
                                    margin: [30, 18]
                                }
                            ],
                            margin: 20
                        }
                    });
                    doc['footer'] = (function (page, pages) {
                        return {
                            columns: [
                                {
                                    fontSize: 5,
                                    alignment: 'left',
                                    text: ' ' + now
                                },
                                {
                                    fontSize: 5,
                                    alignment: 'right',
                                    text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
                                }
                            ],
                            margin: 20
                        }
                    });
                    var objLayout = {};
                    objLayout['hLineWidth'] = function (i) { return .5; };
                    objLayout['vLineWidth'] = function (i) { return .5; };
                    objLayout['hLineColor'] = function (i) { return '#aaa'; };
                    objLayout['vLineColor'] = function (i) { return '#aaa'; };
                    objLayout['paddingLeft'] = function (i) { return 4; };
                    objLayout['paddingRight'] = function (i) { return 4; };
                    doc.content[0].layout = objLayout;
                }
            },
            {
                text: 'Nuevo',
                className: 'btn-nuevo-datatable',
                action: function (e, dt, node, config) {
                    ModalNominaEmpleado('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Nomina_Empleado/GridNominaEmpleado',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            {
                title: "",
                data: "Estado",
                "render": function (data, type, row) {

                    if (row.IdEstado !== 1) {
                        return '<button class="btn btn-sm btn-pagar" disabled>Pagar</button>';
                    }
                    else {
                        return '<button class="btn btn-sm btn-pagar PagarNominaEmpleado">Pagar</button>';
                    }
                }

            },
            {
                title: "Estado",
                data: "Estado",
                "render": function (data, type, row) {

                    if (row.IdEstado == 1) {
                        return '<label class="label-estado-activo">' + data + '</label>';
                    }
                    else if (row.IdEstado == 2) {
                        return '<label class="label-estado-inactivo">' + data + '</label>';
                    } else if (row.IdEstado == 3) {
                        return '<label class="label-estado-pagado">' + data + '</label>';
                    } 
                }

            },
            { "data": "Empleado", title: "Empleado", width: 'auto' },
            { "data": "Empresa", title: "Empresa", width: 'auto' },
            {
                "data": "null",
                title: "Salario Mensual",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.SalarioMensual);
                }
            },
            {
                "data": "null",
                title: "Sub-Transporte Mes",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.SubTransporteMes);
                }
            },
            { "data": "PeriodoLiquidado", title: "Periodo Liquidado", width: 'auto' },
            { "data": "DiasPagar", title: "Dias a Pagar", width: 'auto' },
            
            {
                "data": "null",
                title: "Sueldo",
                "render": function (data, type, row, meta) {
                    return '<label style="color:green">$ ' + new Intl.NumberFormat('en-US').format(row.Sueldo) + '</label>';
                }
            },

            {
                "data": "null",
                title: "Sub Transporte",
                "render": function (data, type, row, meta) {
                    return '<label style="color:green">$ ' + new Intl.NumberFormat('en-US').format(row.SubTransporte) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Total HE",
                "render": function (data, type, row, meta) {
                    return '<label style="color:green">$ ' + new Intl.NumberFormat('en-US').format(row.TotalHE) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Desembolso Préstamo",
                "render": function (data, type, row, meta) {
                    return '<label style="color:green">$ ' + new Intl.NumberFormat('en-US').format(row.DesembolsoPrestamo) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Otros Ingresos",
                "render": function (data, type, row, meta) {
                    return '<label style="color:green">$ ' + new Intl.NumberFormat('en-US').format(row.OtrosIngresos) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Total Ingresos",
                "render": function (data, type, row, meta) {
                    return '<label style="color:green; font-weight:bold">$ ' + new Intl.NumberFormat('en-US').format(row.TotalIngresos) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Eps",
                "render": function (data, type, row, meta) {
                    return '<label style="color:orangered">$ ' + new Intl.NumberFormat('en-US').format(row.Eps) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Pension",
                "render": function (data, type, row, meta) {
                    return '<label style="color:orangered">$ ' + new Intl.NumberFormat('en-US').format(row.Pension) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Casino",
                "render": function (data, type, row, meta) {
                    return '<label style="color:orangered">$ ' + new Intl.NumberFormat('en-US').format(row.Casino) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Cobro Préstamo",
                "render": function (data, type, row, meta) {
                    return '<label style="color:orangered">$ ' + new Intl.NumberFormat('en-US').format(row.CobroPrestamo) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Otros Descuentos",
                "render": function (data, type, row, meta) {
                    return '<label style="color:orangered">$ ' + new Intl.NumberFormat('en-US').format(row.OtrosDescuentos) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Total Descuentos",
                "render": function (data, type, row, meta) {
                    return '<label style="color:orangered; font-weight:bold">$ ' + new Intl.NumberFormat('en-US').format(row.TotalDescuentos) + '</label>';
                }
            },
            {
                "data": "null",
                title: "Total a Pagar",
                "render": function (data, type, row, meta) {
                    return '<label style="color:blue; font-weight:bold">$ ' + new Intl.NumberFormat('en-US').format(row.TotalPagar)+'</label>';
                }
            },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            //{
            //    title: "",
            //    data: null,
            //    defaultContent:
            //        '<a class="EditarNominaEmpleado btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
            //    orderable: false,
            //},
            {
                title: "",
                data: "Estado",
                "render": function (data, type, row) {
                    if (row.IdEstado !== 1) {
                        return '<button class="btn btn-eliminar-dt" title="Eliminar Registro" disabled><i class="bi-trash-fill"></i></button>';
                    }
                    else {
                        return '<a class="EliminarNominaEmpleado btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>';
                    }
                }

            },

        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
        },
        lengthMenu: [
            [10, 25, 50, -1],
            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });

    $('#gridNominaEmpleado').on('click', '.EditarNominaEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        ModalNominaEmpleado('E');
        $('#LabelIdNominaEmpleado').text(data.Id);
       
    })

    $('#gridNominaEmpleado').on('click', '.EliminarNominaEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarNominaEmpleado(data.Id);
    })

    $('#gridNominaEmpleado').on('click', '.PagarNominaEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        PagarNominaEmpleado(data.Id);
    })

}


function PagarNominaEmpleado(IdNominaEmpleado) {
    Swal.fire({
        title: TituloSwal,
        text: "Esta seguro(a) de cambiar el estado de la Nómina del empleado a Pagada?, No podrás revertir esta acción.!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#333",
        confirmButtonText: "Si, pagar!",
        cancelButtonText: "Cancelar",
        position: 'top'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Nomina_Empleado/PagarNominaEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdNominaEmpleado: IdNominaEmpleado,
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
    });
   
}