
function ModalCotizacion(tipo) {
    $("#TituloModalBanco").empty().val('');
    $("#LabelIdBanco").empty().val('');
    $("#InputNombreBanco").empty().val('');
    $("#BotonesModalBanco").empty();
    GridTDetalleCotizacion();
   
    if (tipo == 'C') {
        $("#TituloModalBanco").empty().append('<label>CREAR BANCO</label>');
        $('#ModalCotizacion').modal('show');
        $("#SelectEstadoBanco").hide();
        $("#BotonesModalBanco").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearBanco()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalBanco").empty().append('<label>EDITAR BANCO</label>');
        $('#ModalCotizacion').modal('show');
        $("#SelectEstadoBanco").show();
        $("#BotonesModalBanco").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarBanco()">Guardar Cambios</button>');
    }
}

function VentanaCrearCotizacion(){
    window.location.href = '/Venta/Crear_Cotizacion';
}

function CrearCotizacion() {
    let IdCliente = $('#SelectCliente').val();

    if (IdCliente == -1 || IdCliente == '' || IdCliente == undefined) {
        $('#SelectCliente').focus();
        VentanaMensaje('Seleccione el Cliente');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Cotizacion/CrearCotizacion',
            data: {
                IdUser: TokenUser,
                IdCliente: IdCliente
            },            
             success: function (resultado) {
                valor = resultado.split('*');
                if (valor[0] == 'OK') {
                    Swal.fire({
                        title: TituloSwal,
                        text: valor[1],
                        icon: 'success',
                    }).then((result) => {
                        window.location.href = '/Venta/Cotizacion';
                    })
                } else {
                    VentanaMensaje(valor[1]);
                }
            }
        });
    }
}


function GridCotizacion() {
    var tituloReporte = 'LISTADO DE COTIZACIONES';
    let datatable = $('#gridCotizacion').DataTable({
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
            { targets: [10], className: 'dt-head-center' },
            { targets: [11], className: 'dt-head-center' },
            { targets: [12], className: 'dt-head-center' },
            { targets: [13], className: 'dt-head-center' },
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
                    columns: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', //portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                    search: 'applied',
                    order: 'applied',
                },
                customize: function (doc) {
                    doc.content.splice(0, 1.5);
                    doc.pageMargins = [40, 60, 20, 30];
                    doc.defaultStyle.fontSize = 6;
                    doc.styles.tableHeader.fontSize = 6;
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
                    VentanaCrearCotizacion();
                }
            }

        ],
        destroy: true,
        "ajax": {
            "url": '/Cotizacion/GridCotizacion',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            {
                title: "",
                data: "",
                "render": function (data, type, row) {
                    return '<button class="btn btn-sm btn-pdf-grid-descarga" onclick="descargarCotizacion(' + row.Id + ')">Pdf</button>';
                }
            },
            {
                title: "",
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
            },//2

            { "data": "CodigoCotizacion", title: "Código", width: 'auto' },
            { "data": "Nombre", title: "Cliente", width: 'auto' },
            { "data": "Documento", title: "Documento", width: 'auto', visible: true },
            { "data": "Identificacion", title: "Identificación", width: 'auto', visible: true },
            { "data": "FormaPago", title: "Forma de Pago", width: 'auto' },
            { "data": "PlazoPago", title: "Plazo de Pago", width: 'auto' },
            { "data": "CantidadProductos", title: "Cant. Productos", width: 'auto' },
            {
                "data": "null",
                title: "Sub Total",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.SubTotal);
                }
            },
            {
                "data": "null",
                title: "Iva",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.ValorIva);
                }
            },
            {
                "data": "null",
                title: "Valor Total",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.ValorTotal);
                }
            },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },          
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarCliente btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridCliente').on('click', '.EditarCliente', function () {
        let data = datatable.row($(this).parents()).data();
        ModalCliente('E');
        $('#LabelIdCliente').text(data.Id);
        $('#InputNombreCliente').val(data.Nombre);
        $('#SelectTipoDocumento').val(data.IdTipoDocumento);
        $('#InputIdentificacionCliente').val(data.Identificacion);
        $('#InputEmailCliente').val(data.Email);
        $('#InputTelefonoCliente').val(data.Telefono);
        $('#InputCelularCliente').val(data.Celular);
        $('#InputContactoCliente').val(data.Contacto);
        $('#SelectFormaPago').val(data.IdFormaPago);
        $('#SelectPlazoPago').val(data.IdPlazoPago);
        $('#InputDireccionCliente').val(data.Direccion);
        $('#SelectCiudad').val(data.IdCiudad);
        $('#InputDescripcionCliente').val(data.Descripcion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridCliente').on('click', '.EliminarCliente', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarCliente(data.Id);
    })

}