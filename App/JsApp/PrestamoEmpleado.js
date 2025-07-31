function ModalPrestamoEmpleado(tipo) {
    $("#TituloModalPrestamoEmpleado").empty().val('');
    $("#LabelIdPrestamoEmpleado").empty().val('');
    $("#InputPrestamoEmpleadoValor").empty().val('');
    $("#InputPrestamoEmpleadoFechaPrestamo").empty().val('');
    $("#InputPrestamoEmpleadoFechaPago").empty().val('');
    //$("#InputPrestamoEmpleadoNumeroCuotas").empty().val(''); 
    $("#InputPrestamoEmpleadoObservacion").empty().val('');    
    $("#SelectContratoLaboralSucursalEmpleado").val(-1);
    $("#BotonesModalPrestamoEmpleado").empty();
    if (tipo == 'C') {
        $("#TituloModalPrestamoEmpleado").empty().append('<label>CREAR PRESTAMO EMPLEADO</label>');
        $('#ModalPrestamoEmpleado').modal('show');
        $("#SelectContratoLaboralSucursalEmpleado").prop("disabled", false);
        $("#SelectEstadoPrestamoEmpleado").hide();
        $("#BotonesModalPrestamoEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearPrestamoEmpleado()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalPrestamoEmpleado").empty().append('<label>EDITAR PRESTAMO EMPLEADO</label>');
        $('#ModalPrestamoEmpleado').modal('show');
        $("#SelectContratoLaboralSucursalEmpleado").prop("disabled", true);
        $("#SelectEstadoPrestamoEmpleado").show();
        $("#BotonesModalPrestamoEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarPrestamoEmpleado()">Guardar Cambios</button>');
    }
}


//#region funciones guardar


function CrearPrestamoEmpleado() {
    let IdEmpleado = $('#SelectContratoLaboralSucursalEmpleado').val();
    let Valor = $('#InputPrestamoEmpleadoValor').val();
    let FechaPrestamo = $('#InputPrestamoEmpleadoFechaPrestamo').val();
    let FechaPago = $('#InputPrestamoEmpleadoFechaPago').val();
    let Cuotas = $('#InputPrestamoEmpleadoNumeroCuotas').val();
    let Observacion = $('#InputPrestamoEmpleadoObservacion').val();
    if (IdEmpleado == -1 || IdEmpleado == null || IdEmpleado == '') {
        $('#SelectContratoLaboralEmpleado').focus();
        VentanaMensaje('Seleccione el Empleado');
    } else if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputPrestamoEmpleadoValor').focus();
        VentanaMensaje('Ingrese el Valor');
    } else if (FechaPrestamo == null || FechaPrestamo == '' || FechaPrestamo == undefined) {
        $('#InputPrestamoEmpleadoFechaPrestamo').focus();
        VentanaMensaje('Ingrese la Fecha');
    } else if (FechaPago == null || FechaPago == '' || FechaPago == undefined) {
        $('#InputPrestamoEmpleadoFechaPago').focus();
        VentanaMensaje('Ingrese la Fecha de Cobro');
    } else if (Cuotas == null || Cuotas == '' || Cuotas == undefined) {
        $('#InputPrestamoEmpleadoNumeroCuotas').focus();
        VentanaMensaje('Ingrese el número de Cuotas');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Prestamo_Empleado/CrearPrestamoEmpleado',
            data: {
                IdUser: TokenUser,
                IdEmpleado: IdEmpleado,
                Valor: Valor,
                FechaPrestamo: FechaPrestamo,
                FechaPago: FechaPago,
                Cuotas: Cuotas,
                Observacion: Observacion
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
}


function ActualizarPrestamoEmpleado() {
    let IdPrestamoEmpleado = $('#LabelIdPrestamoEmpleado').text();
    let Valor = $('#InputPrestamoEmpleadoValor').val();
    let FechaPrestamo = $('#InputPrestamoEmpleadoFechaPrestamo').val();
    let FechaPago = $('#InputPrestamoEmpleadoFechaPago').val();
    let Cuotas = $('#InputPrestamoEmpleadoNumeroCuotas').val();
    let Observacion = $('#InputPrestamoEmpleadoObservacion').val();
    let IdEstado = $('#SelectEstado').val();
    if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputPrestamoEmpleadoValor').focus();
        VentanaMensaje('Ingrese el Valor');
    } else if (FechaPrestamo == null || FechaPrestamo == '' || FechaPrestamo == undefined) {
        $('#InputPrestamoEmpleadoFechaPrestamo').focus();
        VentanaMensaje('Ingrese la Fecha');
    } else if (FechaPago == null || FechaPago == '' || FechaPago == undefined) {
        $('#InputPrestamoEmpleadoFechaPago').focus();
        VentanaMensaje('Ingrese la Fecha de Cobro');
    } else if (Cuotas == null || Cuotas == '' || Cuotas == undefined) {
        $('#InputPrestamoEmpleadoNumeroCuotas').focus();
        VentanaMensaje('Ingrese el número de Cuotas');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Prestamo_Empleado/ActualizarPrestamoEmpleado',
            data: {
                IdUser: TokenUser,
                IdPrestamoEmpleado: IdPrestamoEmpleado,
                Valor: Valor,
                FechaPrestamo: FechaPrestamo,
                FechaPago: FechaPago,
                Cuotas: Cuotas,
                Observacion: Observacion,
                IdEstado: IdEstado
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
}

function EliminarPrestamoEmpleado(IdPrestamoEmpleado) {
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
                url: '/Prestamo_Empleado/EliminarPrestamoEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdPrestamoEmpleado: IdPrestamoEmpleado
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

function GridPrestamoEmpleado() {
    var tituloReporte = 'LISTADO DE PRESTAMOS EMPLEADOS';
    let datatable = $('#gridPrestamoEmpleado').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [3], className: 'dt-head-center' },
            { targets: [4], className: 'dt-head-center', className: 'dt-center dt-head-center' },
            { targets: [5], className: 'dt-head-center', className: 'dt-center dt-head-center' },
            { targets: [6], className: 'dt-head-center' },
            { targets: [7], className: 'dt-head-center' },
            { targets: [8], className: 'dt-head-center' },
            { targets: [9], className: 'dt-head-center' },
            { targets: [10], className: 'dt-head-center' },
            { targets: [11], className: 'dt-head-center', className: 'dt-center dt-head-center' },
            { targets: [12], className: 'dt-head-center' },
            { targets: [13], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [14], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', // landscape portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11],
                    search: 'applied',
                    order: 'applied',
                },
                customize: function (doc) {
                    doc.content.splice(0, 1.5);
                    doc.pageMargins = [40, 60, 20, 30];
                    doc.defaultStyle.fontSize = 6;
                    doc.styles.tableHeader.fontSize = 8;
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
                    ModalPrestamoEmpleado('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Prestamo_Empleado/GridPrestamoEmpleado',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
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
                    } else if (row.IdEstado == 4) {
                        return '<label class="label-estado-cobrado">' + data + '</label>';
                    }
                }

            },
            { "data": "Empleado", title: "Empleado", width: 'auto' },//0
            { "data": "Sucursal", title: "Sucursal", width: 'auto' },//1
            { "data": "Valor", title: "Valor", width: 'auto', visible: false },//2
            {
                "data": "null",
                title: "Valor",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.Valor); // formatter.format(date)
                }//3
            },
            { "data": "Cuotas", title: "# Cuotas", width: 'auto' },//4
            { "data": "TextoFechaPrestamo", title: "Fecha Préstamo", width: 'auto' },//5
            { "data": "TextoFechaPago", title: "Fecha Cobro", width: 'auto' },//6
            { "data": "ComprobanteNominaDesembolso", title: "# NE DP", width: 'auto' },//7
            { "data": "ComprobanteNominaCobro", title: "# NE CP", width: 'auto' },//7
            { "data": "Observacion", title: "Observación", width: 'auto' },//8
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },//9
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },//10
            {
                title: "",
                data: "Estado",
                "render": function (data, type, row) {
                    if (row.IdEstado == 1 || row.IdEstado == 2) {
                        return '<a class="EditarPrestamoEmpleado btn btn-editar-dt" title="Eliminar Registro"><i class="bi-pencil-fill"></i></a>';
                    }
                    else {
                        return '<button class="btn btn-editar-dt" title="editar Registro" disabled><i class="bi-pencil-fill"></i></button>';
                    }
                }
            },
            {
                title: "",
                data: "Estado",
                "render": function (data, type, row) {
                    if (row.IdEstado == 1 || row.IdEstado == 2) {
                        return '<a class="EliminarPrestamoEmpleado btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>';
                    }
                    else {
                        return '<button class="btn btn-eliminar-dt" title="Eliminar Registro" disabled><i class="bi-trash-fill"></i></button>';
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

    $('#gridPrestamoEmpleado').on('click', '.EditarPrestamoEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        ModalPrestamoEmpleado('E');
        $('#LabelIdPrestamoEmpleado').text(data.Id);
        $('#SelectContratoLaboralSucursalEmpleado').val(data.IdEmpleado);
        $('#InputPrestamoEmpleadoValor').val(data.Valor);
        $('#InputPrestamoEmpleadoFechaPrestamo').val(data.FechaPrestamo);
        $('#InputPrestamoEmpleadoFechaPago').val(data.FechaPago);
        $('#InputPrestamoEmpleadoNumeroCuotas').val(data.Cuotas);
        $('#InputPrestamoEmpleadoObservacion').val(data.Observacion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridPrestamoEmpleado').on('click', '.EliminarPrestamoEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarPrestamoEmpleado(data.Id);
    })
}
