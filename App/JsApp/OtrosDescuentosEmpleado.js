
function ModalOtrosDescuentosEmpleado(tipo) {
    $("#TituloModalOtrosDescuentosEmpleado").empty().val('');
    $("#LabelIdOtrosDescuentosEmpleado").empty().val('');
    $("#SelectContratoLaboralEmpleado").val(-1);
    $("#InputOtrosDescuentosEmpleadoValor").empty().val('');
    $("#InputOtrosDescuentosEmpleadoFechaCobro").empty().val('');
    $("#InputOtrosDescuentosEmpleadoObservacion").empty().val('');
    $("#BotonesModalOtrosDescuentosEmpleado").empty();
    if (tipo == 'C') {
        $("#TituloModalOtrosDescuentosEmpleado").empty().append('<label>CREAR OTROS DESCUENTOS EMPLEADO</label>');
        $('#ModalOtrosDescuentosEmpleado').modal('show');
        $("#SelectContratoLaboralEmpleado").prop("disabled", false);
        $("#SelectEstadoOtrosDescuentosEmpleado").hide();
        $("#BotonesModalOtrosDescuentosEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearOtrosDescuentosEmpleado()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalOtrosDescuentosEmpleado").empty().append('<label>EDITAR OTROS DESCUENTOS EMPLEADO</label>');
        $('#ModalOtrosDescuentosEmpleado').modal('show');
        $("#SelectContratoLaboralEmpleado").prop("disabled", true);
        $("#SelectEstadoOtrosDescuentosEmpleado").show();
        $("#BotonesModalOtrosDescuentosEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarOtrosDescuentosEmpleado()">Guardar Cambios</button>');
    }
}

function CrearOtrosDescuentosEmpleado() {
    let IdEmpleado = $('#SelectContratoLaboralEmpleado').val();
    let Valor = $('#InputOtrosDescuentosEmpleadoValor').val();
    let FechaCobro = $('#InputOtrosDescuentosEmpleadoFechaCobro').val();
    let Observacion = $('#InputOtrosDescuentosEmpleadoObservacion').val();
    if (IdEmpleado == -1 || IdEmpleado == null || IdEmpleado == '') {
        $('#SelectContratoLaboralEmpleado').focus();
        VentanaMensaje('Seleccione el Empleado');
    } else if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputOtrosDescuentosEmpleadoValor').focus();
        VentanaMensaje('Ingrese el Valor');
    } else if (FechaCobro == null || FechaCobro == '' || FechaCobro == undefined) {
        $('#InputOtrosDescuentosEmpleadoFechaCobro').focus();
        VentanaMensaje('Ingrese la Fecha de Cobro');
    } else if (Observacion == null || Observacion == '' || Observacion == undefined) {
        $('#InputOtrosDescuentosEmpleadoObservacion').focus();
        VentanaMensaje('Ingrese el concepto del Descuento Adicional');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Otros_Descuentos_Empleado/CrearOtrosDescuentosEmpleado',
            data: {
                IdUser: TokenUser,
                IdEmpleado: IdEmpleado,
                Valor: Valor,
                FechaCobro: FechaCobro,
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


function ActualizarOtrosDescuentosEmpleado() {
    let IdOtrosDescuentosEmpleado = $('#LabelIdOtrosDescuentosEmpleado').text();
    let Valor = $('#InputOtrosDescuentosEmpleadoValor').val();
    let FechaCobro = $('#InputOtrosDescuentosEmpleadoFechaCobro').val();
    let Observacion = $('#InputOtrosDescuentosEmpleadoObservacion').val();
    let IdEstado = $('#SelectEstado').val();
    if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputOtrosDescuentosEmpleadoValor').focus();
        VentanaMensaje('Ingrese el Valor');
    } else if (FechaCobro == null || FechaCobro == '' || FechaCobro == undefined) {
        $('#InputOtrosDescuentosEmpleadoFechaCobro').focus();
        VentanaMensaje('Ingrese la Fecha de Cobro');
    } else if (Observacion == null || Observacion == '' || Observacion == undefined) {
        $('#InputOtrosDescuentosEmpleadoObservacion').focus();
        VentanaMensaje('Ingrese el concepto del Descuento Adicional');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Otros_Descuentos_Empleado/ActualizarOtrosDescuentosEmpleado',
            data: {
                IdUser: TokenUser,
                IdOtrosDescuentosEmpleado: IdOtrosDescuentosEmpleado,
                Valor: Valor,
                FechaCobro: FechaCobro,
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

function EliminarOtrosDescuentosEmpleado(IdOtrosDescuentosEmpleado) {
    Swal.fire({
        title: `<span style="font-size:18px; font-weight:bold; color:#d9534f;">${TituloSwal}</span>`,
        html: `<p style="font-size:14px; color:#444; margin-top:8px;">
                  ¿Está seguro(a)? <br> <strong>No podrás revertir esta acción.</strong>
               </p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d9534f",
        cancelButtonColor: "#6c757d",
        confirmButtonText: '<i class="bi bi-trash-fill"></i> Sí, eliminar',
        cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar',
        position: 'top',
        background: '#f9f9f9',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'rounded-4 shadow-lg',
            confirmButton: 'px-3 py-1 rounded-pill fw-semibold',
            cancelButton: 'px-3 py-1 rounded-pill fw-semibold'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Otros_Descuentos_Empleado/EliminarOtrosDescuentosEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdOtrosDescuentosEmpleado: IdOtrosDescuentosEmpleado
                },
                success: function (resultado) {
                    valor = resultado.split('*');
                    if (valor[0] === 'OK') {
                        VentanaMensajeOK(valor[1]);
                    } else {
                        VentanaMensaje(valor[1]);
                    }
                }
            });
        }
    });
}

function GridOtrosDescuentosEmpleado() {
    var tituloReporte = 'LISTADO DE OTROS DESCUENTOS EMPLEADOS';
    let datatable = $('#gridOtrosDescuentosEmpleado').DataTable({
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
                    ModalOtrosDescuentosEmpleado('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Otros_Descuentos_Empleado/GridOtrosDescuentosEmpleado',
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
            { "data": "TextoFechaCobro", title: "Fecha Cobro", width: 'auto' },//4
            { "data": "ComprobanteNomina", title: "# NE", width: 'auto' },//5
            { "data": "Observacion", title: "Concepto", width: 'auto' },//6
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },//7
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },//8
            {
                title: "",
                data: "Estado",
                "render": function (data, type, row) {
                    if (row.IdEstado !== 4) {
                        return '<a class="EditarOtrosDescuentosEmpleado btn btn-editar-dt" title="Eliminar Registro"><i class="bi-pencil-fill"></i></a>';
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
                    if (row.IdEstado !== 4) {
                        return '<a class="EliminarOtrosDescuentosEmpleado btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>';
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

    $('#gridOtrosDescuentosEmpleado').on('click', '.EditarOtrosDescuentosEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        ModalOtrosDescuentosEmpleado('E');
        $('#LabelIdOtrosDescuentosEmpleado').text(data.Id);
        $('#SelectContratoLaboralEmpleado').val(data.IdEmpleado);
        $('#InputOtrosDescuentosEmpleadoValor').val(data.Valor);
        $('#InputOtrosDescuentosEmpleadoFechaCobro').val(data.FechaCobro);
        $('#InputOtrosDescuentosEmpleadoObservacion').val(data.Observacion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridOtrosDescuentosEmpleado').on('click', '.EliminarOtrosDescuentosEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarOtrosDescuentosEmpleado(data.Id);
    })
}
