function ModalCasinoEmpleado(tipo) {
    $("#TituloModalCasinoEmpleado").empty().val('');
    $("#LabelIdCasinoEmpleado").empty().val('');
    $("#InputCasinoEmpleadoEmpleado").empty().val('');
    $("#InputCasinoEmpleadoValor").empty().val('');
    $("#InputCasinoEmpleadoFecha").empty().val(''); 
    $("#InputCasinoEmpleadoFechaPago").empty().val(''); 
    $("#InputCasinoEmpleadoObservacion").empty().val(''); 
    $("#SelectContratoLaboralSucursalEmpleado").val(-1);
    $("#BotonesModalCasinoEmpleado").empty();
    if (tipo == 'C') {
        $("#TituloModalCasinoEmpleado").empty().append('<label>Crear Casino Empleado</label>');
        $('#ModalCasinoEmpleado').modal('show');
        $("#InputCasinoEmpleadoEmpleado").hide();
        $("#SelectContratoLaboralSucursalEmpleado").show();
        $("#SelectEstadoCasinoEmpleado").hide();
        $("#BotonesModalCasinoEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearCasinoEmpleado()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalCasinoEmpleado").empty().append('<label>Editar Casino Empleado</label>');
        $('#ModalCasinoEmpleado').modal('show');
        $("#InputCasinoEmpleadoEmpleado").show();
        $("#SelectContratoLaboralSucursalEmpleado").hide();
        $("#SelectEstadoCasinoEmpleado").show();
        $("#BotonesModalCasinoEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' +'<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarCasinoEmpleado()">Guardar Cambios</button>');
    }
}

function CrearCasinoEmpleado() {
    let IdEmpleado = $('#SelectContratoLaboralSucursalEmpleado').val();
    let Valor = $('#InputCasinoEmpleadoValor').val();
    let Fecha = $('#InputCasinoEmpleadoFecha').val();
    let FechaPago = $('#InputCasinoEmpleadoFechaPago').val();
    let Observacion = $('#InputCasinoEmpleadoObservacion').val();
    if (IdEmpleado == -1 || IdEmpleado == null || IdEmpleado == '') {
        $('#SelectContratoLaboralSucursalEmpleado').focus();
        VentanaMensaje('Seleccione el Empleado', 'info');
    } else if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputCasinoEmpleadoValor').focus();
        VentanaMensaje('Ingrese el Valor', 'info');
    } else if (Fecha == null || Fecha == '' || Fecha == undefined) {
        $('#InputCasinoEmpleadoFecha').focus();
        VentanaMensaje('Ingrese la Fecha', 'info');
    } else if (FechaPago == null || FechaPago == '' || FechaPago == undefined) {
        $('#InputCasinoEmpleadoFecha').focus();
        VentanaMensaje('Ingrese la Fecha de Pago', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Casino_Empleado/CrearCasinoEmpleado',
            data: {
                IdUser: TokenUser,
                IdEmpleado: IdEmpleado,
                Valor: Valor,
                Fecha: Fecha,
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


function ActualizarCasinoEmpleado() {
    let IdCasinoEmpleado = $('#LabelIdCasinoEmpleado').text();
    let Valor = $('#InputCasinoEmpleadoValor').val();
    let Fecha = $('#InputCasinoEmpleadoFecha').val();
    let FechaPago = $('#InputCasinoEmpleadoFechaPago').val();
    let Observacion = $('#InputCasinoEmpleadoObservacion').val();
    let IdEstado = $('#SelectEstado').val();
    if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputCasinoEmpleadoValor').focus();
        VentanaMensaje('Ingrese el Valor', 'info');
    } else if (Fecha == null || Fecha == '' || Fecha == undefined) {
        $('#InputCasinoEmpleadoFecha').focus();
        VentanaMensaje('Ingrese la Fecha', 'info');
    } else if (FechaPago == null || FechaPago == '' || FechaPago == undefined) {
        $('#InputCasinoEmpleadoFecha').focus();
        VentanaMensaje('Ingrese la Fecha de Pago', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Casino_Empleado/ActualizarCasinoEmpleado',
            data: {
                IdUser: TokenUser,
                IdCasinoEmpleado: IdCasinoEmpleado,
                Valor: Valor,
                Fecha: Fecha,
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

function EliminarCasinoEmpleado(IdCasinoEmpleado) {
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
                url: '/Casino_Empleado/EliminarCasinoEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdCasinoEmpleado: IdCasinoEmpleado
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

function GridCasinoEmpleado() {
    var tituloReporte = 'LISTADO DE CONSUMOS CASINO EMPLEADOS';
    let datatable = $('#gridCasinoEmpleado').DataTable({
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
            { targets: [8], className: 'dt-head-center' },
            { targets: [9], className: 'dt-head-center', className: 'dt-center dt-head-center' },
            { targets: [10], width: '150px', className: 'dt-center dt-head-center' },
            { targets: [11], width: '100px', className: 'dt-center dt-head-center' }
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
                    ModalCasinoEmpleado('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Casino_Empleado/GridCasinoEmpleado',
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
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.Valor);
                }
            },//3
            { "data": "TextoFecha", title: "Fecha Pedido", width: 'auto' },//4
            { "data": "TextoFechaPago", title: "Fecha Cobro", width: 'auto' },//5
            { "data": "ComprobanteNomina", title: "# Comprobante Nómina", width: 'auto' },//6
            { "data": "Observacion", title: "Observación", width: 'auto' },//7
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },//8
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },//9
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

            },//10
            {
                title: "Acciones",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<a class="EditarCasinoEmpleado btn btn-editar-dt" title="Editar Registro">Editar</a>&nbsp;&nbsp;<a class="EliminarCasinoEmpleado btn btn-eliminar-dt" title="Eliminar Registro" style="color:red">Eliminar</a>' +
                    '</div>',
                orderable: false,
                width: 'auto',
            },//11

        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
        },
        lengthMenu: [
            [10, 25, 50, -1],
            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });

    $('#gridCasinoEmpleado').on('click', '.EditarCasinoEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        ModalCasinoEmpleado('E');
        $('#LabelIdCasinoEmpleado').text(data.Id);
        $('#InputCasinoEmpleadoEmpleado').val(data.Empleado);
        $('#InputCasinoEmpleadoValor').val(data.Valor);
        $('#InputCasinoEmpleadoFecha').val(data.Fecha);
        $('#InputCasinoEmpleadoFechaPago').val(data.FechaPago);
        $('#InputCasinoEmpleadoObservacion').val(data.Observacion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridCasinoEmpleado').on('click', '.EliminarCasinoEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarCasinoEmpleado(data.Id);
    })
}

