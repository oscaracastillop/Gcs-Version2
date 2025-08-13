
function ModalOtrosIngresosEmpleado(tipo) {
    $("#TituloModalOtrosIngresosEmpleado").empty().val('');
    $("#LabelIdOtrosIngresosEmpleado").empty().val('');
    $("#SelectContratoLaboralEmpleado").val(-1);
    $("#InputOtrosIngresosEmpleadoValor").empty().val('');
    $("#InputOtrosIngresosEmpleadoFechaPago").empty().val('');
    $("#InputOtrosIngresosEmpleadoObservacion").empty().val('');
    $("#BotonesModalOtrosIngresosEmpleado").empty();
    if (tipo == 'C') {
        $("#TituloModalOtrosIngresosEmpleado").empty().append('<label>CREAR OTROS INGRESOS EMPLEADO</label>');
        $('#ModalOtrosIngresosEmpleado').modal('show');
        $("#SelectContratoLaboralEmpleado").prop("disabled", false);
        $("#SelectEstadoOtrosIngresosEmpleado").hide();
        $("#BotonesModalOtrosIngresosEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearOtrosIngresosEmpleado()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalOtrosIngresosEmpleado").empty().append('<label>EDITAR OTROS INGRESOS EMPLEADO</label>');
        $('#ModalOtrosIngresosEmpleado').modal('show');
        $("#SelectContratoLaboralEmpleado").prop("disabled", true);
        $("#SelectEstadoOtrosIngresosEmpleado").show();
        $("#BotonesModalOtrosIngresosEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarOtrosIngresosEmpleado()">Guardar Cambios</button>');
    }
}

function CrearOtrosIngresosEmpleado() {
    let IdEmpleado = $('#SelectContratoLaboralEmpleado').val();
    let Valor = $('#InputOtrosIngresosEmpleadoValor').val();
    let FechaPago = $('#InputOtrosIngresosEmpleadoFechaPago').val();
    let Observacion = $('#InputOtrosIngresosEmpleadoObservacion').val();
    if (IdEmpleado == -1 || IdEmpleado == null || IdEmpleado == '') {
        $('#SelectContratoLaboralEmpleado').focus();
        VentanaMensaje('Seleccione el Empleado');
    } else if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputOtrosIngresosEmpleadoValor').focus();
        VentanaMensaje('Ingrese el Valor');
    } else if (FechaPago == null || FechaPago == '' || FechaPago == undefined) {
        $('#InputOtrosIngresosEmpleadoFechaPago').focus();
        VentanaMensaje('Ingrese la Fecha de Pago');
    } else if (Observacion == null || Observacion == '' || Observacion == undefined) {
        $('#InputOtrosIngresosEmpleadoObservacion').focus();
        VentanaMensaje('Ingrese el concepto del Ingreso Adicional');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Otros_Ingresos_Empleado/CrearOtrosIngresosEmpleado',
            data: {
                IdUser: TokenUser,
                IdEmpleado: IdEmpleado,
                Valor: Valor,
                FechaPago: FechaPago,
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


function ActualizarOtrosIngresosEmpleado() {
    let IdOtrosIngresosEmpleado = $('#LabelIdOtrosIngresosEmpleado').text();
    let Valor = $('#InputOtrosIngresosEmpleadoValor').val();
    let FechaPago = $('#InputOtrosIngresosEmpleadoFechaPago').val();
    let Observacion = $('#InputOtrosIngresosEmpleadoObservacion').val();
    let IdEstado = $('#SelectEstado').val();
    if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputOtrosIngresosEmpleadoValor').focus();
        VentanaMensaje('Ingrese el Valor');
    } else if (FechaPago == null || FechaPago == '' || FechaPago == undefined) {
        $('#InputOtrosIngresosEmpleadoFechaPago').focus();
        VentanaMensaje('Ingrese la Fecha de Pago');
    } else if (Observacion == null || Observacion == '' || Observacion == undefined) {
        $('#InputOtrosIngresosEmpleadoObservacion').focus();
        VentanaMensaje('Ingrese el concepto del Ingreso Adicional');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Otros_Ingresos_Empleado/ActualizarOtrosIngresosEmpleado',
            data: {
                IdUser: TokenUser,
                IdOtrosIngresosEmpleado: IdOtrosIngresosEmpleado,
                Valor: Valor,
                FechaPago: FechaPago,
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


function EliminarOtrosIngresosEmpleado(IdOtrosIngresosEmpleado) {
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
                url: '/Otros_Ingresos_Empleado/EliminarOtrosIngresosEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdOtrosIngresosEmpleado: IdOtrosIngresosEmpleado
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


function GridOtrosIngresosEmpleado() {
    var tituloReporte = 'LISTADO DE OTROS INGRESOS EMPLEADOS';
    let datatable = $('#gridOtrosIngresosEmpleado').DataTable({
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
            { targets: [8], className: 'dt-head-center', className: 'dt-center dt-head-center' },
            { targets: [9], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [10], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 5, 6, 7, 8, 9],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', // landscape portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 4, 5, 6, 7, 8, 9],
                    search: 'applied',
                    order: 'applied',
                },
                customize: function (doc) {
                    doc.content.splice(0, 1.5);
                    doc.pageMargins = [40, 60, 20, 30];
                    doc.defaultStyle.fontSize = 7;
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
                    ModalOtrosIngresosEmpleado('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Otros_Ingresos_Empleado/GridOtrosIngresosEmpleado',
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
                    } else if(row.IdEstado == 4) {
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
            { "data": "TextoFechaPago", title: "Fecha Pago", width: 'auto' },//4
            { "data": "ComprobanteNomina", title: "# NE", width: 'auto' },//5
            { "data": "Observacion", title: "Concepto", width: 'auto' },//6
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },//7
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },//8
            {
                title: "",
                data: "Estado",
                "render": function (data, type, row) {
                    if (row.IdEstado !== 3) {
                        return '<a class="EditarOtrosIngresosEmpleado btn btn-editar-dt" title="Eliminar Registro"><i class="bi-pencil-fill"></i></a>';
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
                    if (row.IdEstado !== 3) {
                        return '<a class="EliminarOtrosIngresosEmpleado btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>';
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

    $('#gridOtrosIngresosEmpleado').on('click', '.EditarOtrosIngresosEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        ModalOtrosIngresosEmpleado('E');
        $('#LabelIdOtrosIngresosEmpleado').text(data.Id);
        $('#SelectContratoLaboralEmpleado').val(data.IdEmpleado);
        $('#InputOtrosIngresosEmpleadoValor').val(data.Valor);
        $('#InputOtrosIngresosEmpleadoFechaPago').val(data.FechaPago);
        $('#InputOtrosIngresosEmpleadoObservacion').val(data.Observacion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridOtrosIngresosEmpleado').on('click', '.EliminarOtrosIngresosEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarOtrosIngresosEmpleado(data.Id);
    })
}
