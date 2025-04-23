
function ModalBonoEmpleado(tipo) {
    $("#TituloModalBonoEmpleado").empty().val('');
    $("#LabelIdBonoEmpleado").empty().val('');
    $("#InputBonoEmpleadoEmpleado").empty().val('');
    $("#InputBonoEmpleadoValor").empty().val('');
    $("#InputBonoEmpleadoFechaPago").empty().val('');
    $("#InputBonoEmpleadoObservacion").empty().val('');
    $("#SelectContratoLaboralSucursalEmpleado").val(-1);
    $("#BotonesModalBonoEmpleado").empty();
    if (tipo == 'C') {
        $("#TituloModalBonoEmpleado").empty().append('<h6>Crear Bono Empleado</h6>');
        $('#ModalBonoEmpleado').modal('show');
        $("#InputBonoEmpleadoEmpleado").hide();
        $("#SelectContratoLaboralSucursalEmpleado").show();
        $("#SelectEstadoBonoEmpleado").hide();
        $("#BotonesModalBonoEmpleado").empty().append('<button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-success btn-sm" onclick="CrearBonoEmpleado()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalBonoEmpleado").empty().append('<h6>Editar Bono Empleado</h6>');
        $('#ModalBonoEmpleado').modal('show');
        $("#InputBonoEmpleadoEmpleado").show();
        $("#SelectContratoLaboralSucursalEmpleado").hide();
        $("#SelectEstadoBonoEmpleado").show();
        $("#BotonesModalBonoEmpleado").empty().append('<button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-success btn-sm" onclick="ActualizarBonoEmpleado()">Guardar Cambios</button>');
    }
}

function CrearBonoEmpleado() {
    let IdEmpleado = $('#SelectContratoLaboralSucursalEmpleado').val();
    let Valor = $('#InputBonoEmpleadoValor').val();
    let FechaPago = $('#InputBonoEmpleadoFechaPago').val();
    let Observacion = $('#InputBonoEmpleadoObservacion').val();
    if (IdEmpleado == -1 || IdEmpleado == null || IdEmpleado == '') {
        $('#SelectContratoLaboralSucursalEmpleado').focus();
        Swal.fire(TituloSwal, 'Seleccione el Empleado', 'info');
    } else if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputBonoEmpleadoValor').focus();
        Swal.fire(TituloSwal, 'Ingrese el Valor', 'info');
    } else if (FechaPago == null || FechaPago == '' || FechaPago == undefined) {
        $('#InputBonoEmpleadoFechaPago').focus();
        Swal.fire(TituloSwal, 'Ingrese la Fecha de Pago', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Bono_Empleado/CrearBonoEmpleado',
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


function ActualizarBonoEmpleado() {
    let IdBonoEmpleado = $('#LabelIdBonoEmpleado').text();
    let Valor = $('#InputBonoEmpleadoValor').val();
    let FechaPago = $('#InputBonoEmpleadoFechaPago').val();
    let Observacion = $('#InputBonoEmpleadoObservacion').val();
    let IdEstado = $('#SelectEstado').val();
    if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputBonoEmpleadoValor').focus();
        Swal.fire(TituloSwal, 'Ingrese el Valor', 'info');
    } else if (FechaPago == null || FechaPago == '' || FechaPago == undefined) {
        $('#InputBonoEmpleadoFechaPago').focus();
        Swal.fire(TituloSwal, 'Ingrese la Fecha de Pago', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Bono_Empleado/ActualizarBonoEmpleado',
            data: {
                IdUser: TokenUser,
                IdBonoEmpleado: IdBonoEmpleado,
                Valor: Valor,
                FechaPago: FechaPago,
                Observacion: Observacion,
                IdEstado: IdEstado
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


function EliminarBonoEmpleado(IdBonoEmpleado) {
    Swal.fire({
        title: TituloSwal,
        text: "Esta seguro(a)?, No podrás revertir esta acción.!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "orangered",
        cancelButtonColor: "#333",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "Cancelar",
        position: 'top'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Bono_Empleado/EliminarBonoEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdBonoEmpleado: IdBonoEmpleado
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
                            location.reload();
                        })
                    } else {
                        Swal.fire(TituloSwal, valor[1], 'info');
                    }
                }
            });
        }
    });
}


function GridBonoEmpleado() {
    var tituloReporte = 'LISTADO DE BONOS EMPLEADOS';
    let datatable = $('#gridBonoEmpleado').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], className: 'dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [3], className: 'dt-head-center' },
            { targets: [4], className: 'dt-head-center', className: 'dt-center dt-head-center' },
            { targets: [5], className: 'dt-head-center', className: 'dt-center dt-head-center' },
            { targets: [6], className: 'dt-head-center' },
            { targets: [7], className: 'dt-head-center' },
            { targets: [8], className: 'dt-head-center', className: 'dt-center dt-head-center' },
            { targets: [9], width: '150px', className: 'dt-center dt-head-center' },
            { targets: [10], width: '100px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn btn-pdf-datatable',
                text: 'Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', // landscape portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10],
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
                className: 'btn btn-nuevo-datatable',
                action: function (e, dt, node, config) {
                    ModalBonoEmpleado('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Bono_Empleado/GridBonoEmpleado',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
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
            { "data": "TextoFechaPago", title: "Fecha Cobro", width: 'auto' },//4
            { "data": "ComprobanteNomina", title: "# Comprobante Nómina", width: 'auto' },//5
            { "data": "Observacion", title: "Observación", width: 'auto' },//6
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },//7
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },//8
            {
                title: "Estado",
                data: "Estado",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.IdEstado == 1) {
                        return '<label style="background-color:green; padding:2px;border-radius:5px;font-size:11px!important; color:white">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label style="background-color:red; padding:2px;border-radius:5px;font-size:11px!important; color: white">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },//9
            {
                title: "Acciones",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<a class="EditarBonoEmpleado btn btn-editar-dt" title="Editar Registro">Editar</a>&nbsp;&nbsp;<a class="EliminarBonoEmpleado btn btn-eliminar-dt" title="Eliminar Registro" style="color:red">Eliminar</a>' +
                    '</div>',
                orderable: false,
                width: 'auto',
            },//10

        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
        },
        lengthMenu: [
            [10, 25, 50, -1],
            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });

    $('#gridBonoEmpleado').on('click', '.EditarBonoEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        ModalBonoEmpleado('E');
        $('#LabelIdBonoEmpleado').text(data.Id);
        $('#InputBonoEmpleadoEmpleado').val(data.Empleado);
        $('#InputBonoEmpleadoValor').val(data.Valor);
        $('#InputBonoEmpleadoFechaPago').val(data.FechaPago);
        $('#InputBonoEmpleadoObservacion').val(data.Observacion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridBonoEmpleado').on('click', '.EliminarBonoEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarBonoEmpleado(data.Id);
    })
}
