function ModalHoraExtraEmpleado(tipo) {
    $("#TituloModalHoraExtraEmpleado").empty().val('');
    $("#LabelIdHoraExtraEmpleado").empty().val('');
    $("#SelectContratoLaboralEmpleado").val(-1);
    $("#SelectTipoHoraExtra").val(-1);
    $("#InputCantidadHEEmpleado").empty().val('');
    $("#InputFechaHEEmpleado").empty().val('');
    $("#InputFechaPagoHEEmplado").empty().val('');
    $("#InputHEEmpleadoObservacion").empty().val('');   
    $("#BotonesModalHoraExtraEmpleado").empty();
    if (tipo == 'C') {
        $("#TituloModalHoraExtraEmpleado").empty().append('<label>Crear Hora Extra Empleado</label>');
        $('#ModalHoraExtraEmpleado').modal('show');
        $("#SelectContratoLaboralSucursalEmpleado").prop("disabled", false);
        $("#SelectEstadoHoraExtraEmpleado").hide();
        $("#BotonesModalHoraExtraEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearHoraExtraEmpleado()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalHoraExtraEmpleado").empty().append('<label>Editar Hora Extra Empleado</label>');
        $('#ModalHoraExtraEmpleado').modal('show');
        $("#SelectContratoLaboralSucursalEmpleado").prop("disabled", true);
        $("#SelectEstadoHoraExtraEmpleado").show();
        $("#BotonesModalHoraExtraEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarHoraExtraEmpleado()">Guardar Cambios</button>');
    }
}

function CrearHoraExtraEmpleado() {
    let IdEmpleado = $('#SelectContratoLaboralSucursalEmpleado').val();
    let IdTipoHoraExtra = $('#SelectTipoHoraExtra').val();
    let CantidadHE = $('#InputCantidadHEEmpleado').val();
    let FechaHE = $('#InputFechaHEEmpleado').val();
    let FechaPagoHE = $('#InputFechaPagoHEEmplado').val();
    let Observacion = $('#InputHEEmpleadoObservacion').val();

    if (IdEmpleado == -1 || IdEmpleado == null || IdEmpleado == '') {
        $('#SelectContratoLaboralSucursalEmpleado').focus();
        VentanaMensaje('Seleccione el Empleado', 'info');
    } else if (IdTipoHoraExtra == -1 || IdTipoHoraExtra == null || IdTipoHoraExtra == '') {
        $('#SelectTipoHoraExtra').focus();
        VentanaMensaje('Seleccione el Tipo de Hora Extra', 'info');
    } else if (CantidadHE == null || CantidadHE == '' || CantidadHE == undefined || CantidadHE == 0) {
        $('#InputCantidadHEEmpleado').focus();
        VentanaMensaje('Ingrese la cantidad de Horas Extras', 'info');
    } else if (FechaHE == null || FechaHE == '' || FechaHE == undefined) {
        $('#InputFechaHEEmpleado').focus();
        VentanaMensaje('Ingrese la Fecha de la Hora Extra', 'info');
    } else if (FechaPagoHE == null || FechaPagoHE == '' || FechaPagoHE == undefined) {
        $('#InputFechaPagoHEEmplado').focus();
        VentanaMensaje('Ingrese la Fecha de Pago', 'info');
    } else if (FechaPagoHE < FechaHE) {
        $('#InputFechaPagoHEEmplado').focus();
        VentanaMensaje('La fecha de pago no puede ser inferior a la Fecha de ejecución de la Hora Extra', 'info');
    } else {


        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Hora_Extra_Empleado/CrearHoraExtraEmpleado',
            data: {
                IdUser: TokenUser,
                IdEmpleado: IdEmpleado,
                IdTipoHoraExtra: IdTipoHoraExtra,
                CantidadHE: CantidadHE,
                FechaHE: FechaHE,
                FechaPagoHE: FechaPagoHE,
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

function EliminarHoraExtraEmpleado(IdHoraExtra) {
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
                url: '/Hora_Extra_Empleado/EliminarHoraExtraEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdHoraExtra: IdHoraExtra
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


function GridHoraExtraEmpleado() {
    var tituloReporte = 'LISTADO DE HORAS EXTRAS EMPLEADOS';
    let datatable = $('#gridHoraExtraEmpleado').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [2], className: 'dt-head-center' },
            { targets: [3], className: 'dt-head-center' },
            { targets: [5], className: 'dt-head-center' },
            { targets: [6], className: 'dt-head-center' },
            { targets: [7], className: 'dt-center dt-head-center' },
            { targets: [8], className: 'dt-head-center' },
            { targets: [10], className: 'dt-center dt-head-center' },
            { targets: [11], className: 'dt-head-center' },
            { targets: [13], className: 'dt-head-center' },
            { targets: [14], className: 'dt-head-center' },
            { targets: [15], className: 'dt-head-center' },
            { targets: [16], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [17], width: '10px', className: 'dt-center dt-head-center' }
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
                    ModalHoraExtraEmpleado('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Hora_Extra_Empleado/GridHoraExtraEmpleado',
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
                    }
                }

            },
            { "data": "Empleado", title: "Empleado", width: 'auto' },
            { "data": "EmpresaSucursal", title: "Empresa - Sucursal", width: 'auto' },
            {
                "data": "null",
                title: "Valor HO",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.ValorHoraOrdinaria);
                }
            },
            { "data": "ValorHoraOrdinaria", title: "Valor HO", width: 'auto', visible: false },//4
            { "data": "TextoFechaHoraExtra", title: "Fecha HE", width: 'auto' },
            { "data": "TipoHoraExtra", title: "Tipo HE", width: 'auto' },
            { "data": "PorcentajeHoraExtra", title: "% HE", width: 'auto' },
            {
                "data": "null",
                title: "Valor HE",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.ValorHoraExtra);
                }
            },
            { "data": "ValorHoraExtra", title: "Valor HE", width: 'auto', visible: false },//9
            { "data": "Cantidad", title: "Cantidad", width: 'auto' },
            {
                "data": "null",
                title: "Valor Total",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.TotalHorasExtras);
                }
            },
            { "data": "TotalHorasExtras", title: "Total a Pagar", width: 'auto', visible: false },//12
            { "data": "FechaPagoHoraExtra", title: "Fecha Pago HE", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarHoraExtraEmpleado btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarHoraExtraEmpleado btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
                orderable: false,
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

    $('#gridHoraExtraEmpleado').on('click', '.EditarHoraExtraEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        ModalHoraExtraEmpleado('E');
        $('#LabelHoraExtraEmpleado').text(data.Id);
        $('#SelectContratoLaboralSucursalEmpleado').val(data.IdEmpleado);
        $('#SelectTipoHoraExtra').val(data.IdTipoHoraExtra);
        $('#InputCantidadHEEmpleado').val(data.Cantidad);
        $('#InputFechaHEEmpleado').val(data.FechaHoraExtra);
        $('#InputFechaPagoHEEmplado').val(data.FechaPagoHoraExtra);
        $('#InputHEEmpleadoObservacion').val(data.Observacion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridHoraExtraEmpleado').on('click', '.EliminarHoraExtraEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarHoraExtraEmpleado(data.Id);
    })
}

