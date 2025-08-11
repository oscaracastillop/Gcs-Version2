function CambiarSucursalEmpleado() {
    let IdSucursalEmpleado = $('#LabelIdSucursalEmpleadoCambiarSucursal').text();
    let IdSucursal = $('#SelectSucursalXIdEmpresaXIdEmpleado').val();
    let Observacion = $('#InputObservacionSE').val();

    if (IdSucursal == -1 || IdSucursal == null || IdSucursal == '') {
        $('#SelectSucursalXIdEmpresaXIdEmpleado').focus();
        VentanaMensaje('Seleccione la Nueva Sucursal');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Sucursal_Empleado/CambiarSucursalEmpleado',
            data: {
                IdUser: TokenUser,
                IdSucursalEmpleado: IdSucursalEmpleado,
                IdSucursal: IdSucursal,
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


function GridSucursalEmpleado() {
    var tituloReporte = 'LISTADO DE SUCURSAL EMPLEADOS';
    let datatable = $('#gridSucursalEmpleado').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [1], className: 'dt-head-center' },//Nombre
            { targets: [2], className: 'dt-head-center' },//Empresa
            { targets: [3], className: 'dt-head-center' },//Sucursal
            { targets: [4], className: 'dt-center dt-head-center' },//# Contrato Laboral
            { targets: [5], className: 'dt-head-center' },//Fecha Inicio
            { targets: [6], className: 'dt-head-center' },//Fecha Fin
            { targets: [7], className: 'dt-head-center' },//Permanencia
            { targets: [8], className: 'dt-head-center' },//Observacion
            { targets: [9], className: 'dt-head-center' },//Observacion            
            { targets: [10], className: 'dt-head-center' },
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', // landscape portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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

        ],
        destroy: true,
        "ajax": {
            "url": '/Sucursal_Empleado/GridSucursalEmpleado',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            {
                title: "",
                data: "Estado",
                "render": function (data, type, row) {

                    if (row.IdEstado !== 1) {
                        return '<button class="btn btn-sm btn-fin-contrato" disabled>Finalizar Contrato</button>';
                    }
                    else {
                        return '<button class="btn btn-sm btn-fin-contrato ModalCambiarSucursal">Cambiar Sucursal</button>';
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
                    }
                    else if (row.IdEstado == 5) {
                        return '<label class="label-estado-finalizado">' + data + '</label>';
                    }
                }

            },
            { "data": "Empleado", title: "Empleado", width: 'auto' },
            { "data": "Empresa", title: "Empresa", width: 'auto' },
            { "data": "Sucursal", title: "Sucursal", width: 'auto' },
            { "data": "NumeroCLE", title: "# Contrato Laboral", width: 'auto' },
            { "data": "TextoFechaInicio", title: "Fecha Inicio", width: 'auto' },
            { "data": "TextoFechaFin", title: "Fecha Fin", width: 'auto' },
            { "data": "Permanencia", title: "Permanencia", width: 'auto' },
            { "data": "Observacion", title: "Observación", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
        },
        lengthMenu: [
            [10, 25, 50, -1],
            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });

    $('#gridSucursalEmpleado').on('click', '.ModalCambiarSucursal', function () {
        let data = datatable.row($(this).parents()).data();
        $("#InputObservacionSE").empty().val('');
        ListaSucursalXIdEmpresa(data.IdEmpresa);
        $('#ModalCambiarSucursalEmpleado').modal('show');
        $('#LabelIdSucursalEmpleadoCambiarSucursal').text(data.Id);
        $("#InputCambiarSucursalNombreEmpleado").val(data.Empleado);
        $("#InputCambiarSucursalEmpresaActual").val(data.Empresa);
        $("#InputCambiarSucursalSucursalActual").val(data.Sucursal);
        $("#InputObservacionSE").val(data.Observacion);
    })
}

function CambiarSucursalEmpleado() {
    let IdSucursalEmpleado = $('#LabelIdSucursalEmpleadoCambiarSucursal').text();
    let IdSucursal = $('#SelectSucursalXIdEmpresa').val();
    let Observacion = $('#InputObservacionSE').val();

    if (IdSucursal == -1 || IdSucursal == null || IdSucursal == '') {
        $('#SelectSucursalXIdEmpresaXIdEmpleado').focus();
        VentanaMensaje('Seleccione la Nueva Sucursal');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Sucursal_Empleado/CambiarSucursalEmpleado',
            data: {
                IdUser: TokenUser,
                IdSucursalEmpleado: IdSucursalEmpleado,
                IdSucursal: IdSucursal,
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

function BuscarDatosEmpleado(IdEmpleado) {
    if (IdEmpleado == -1) {
        $('#InputEmpresa').val('');
        $('#SelectSucursalXIdEmpresaXIdEmpleado').empty();
        $('#SelectSucursalXIdEmpresaXIdEmpleado').prop("disabled", true);
        BuscarImagenEmpleado(IdEmpleado);
    } else {
        $('#SelectSucursalXIdEmpresaXIdEmpleado').prop("disabled", false);
        BuscarImagenEmpleado(IdEmpleado);
        ListaIdEmpresaXIdEmpleado(IdEmpleado);
        ListaSucursalXIdEmpresaXIdEmpleado(IdEmpleado);
    }
    
}


