

function GridDetalleCotizacion() {
    var tituloReporte = 'LISTADO DETALLES COTIZACONES';
    let datatable = $('#gridDetalleCotizacion').DataTable({
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
            { targets: [4], className: 'dt-head-center' },
            { targets: [5], className: 'dt-head-center' },
            { targets: [6], className: 'dt-head-center' },
            { targets: [7], className: 'dt-head-center' },
            { targets: [8], width: '10px', className: 'dt-center dt-head-center' },
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
                    ModalBanco('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Detalle_Cotizacion/GridDetalleCotizacion',
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
            { "data": "CodigoCotizacion", title: "Cotización" },
            { "data": "NombreProducto", title: "Producto" },
            { "data": "Cantidad", title: "Cantidad", visible: true },
            { "data": "UnidadMedida", title: "Unidad Medida", visible: true },
            {
                "data": "null",
                title: "Precio Unitario",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.PrecioUnitario);
                }
            },
            {
                "data": "null",
                title: "Sub Total",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.SubTotal);
                }
            },
            { "data": "PorcentajeIva", title: "% IVA", width: 'auto', visible: true },
            {
                "data": "null",
                title: "Valor IVA",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.ValorIva);
                }
            },

            {
                "data": "null",
                title: "Total",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.Total);
                }
            },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarDetalleCotizacion btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarDetalleCotizacion btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridDetalleCotizacio').on('click', '.EditarDetalleCotizacion', function () {
        let data = datatable.row($(this).parents()).data();
        ModalDetalleCotizacio('E');
        $('#LabelIdDetalleCotizacio').text(data.Id);
        //$('#InputNombreBanco').val(data.Nombre);
        //$('#SelectEstado').val(data.IdEstado);
    })

    $('#gridDetalleCotizacio').on('click', '.EliminarDetalleCotizacion', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarDetalleCotizacion(data.Id);
    })
}




function AgregarTProductoListaDetCot() {
    let Idproducto = $('#SelectProductoxIdCategoria').val();
    let Cantidad = $('#InputTCantidadProdDetCot').val();
    let PrecioUnitario = $('#InputTPrecioUnitarioProdDetCot').val();
    let PorcentajeIva = $('#InputTPorcIvaProdDetCot').val();


    if (Idproducto == -1 || Idproducto == '' || Idproducto == undefined) {
        $('#SelectProductoxIdCategoria').focus();
        VentanaMensaje('seleccione el Producto y/o Servicio');
    } else if (Cantidad == null || Cantidad == '' || Cantidad == undefined) {
        $('#InputTCantidadProdDetCot').focus();
        VentanaMensaje('Ingrese la Cantidad');
    } else if (PrecioUnitario == null || PrecioUnitario == '' || PrecioUnitario == undefined) {
        $('#InputTPrecioUnitarioProdDetCot').focus();
        VentanaMensaje('Ingrese el Precio Unitario');
    } else if (PorcentajeIva == null || PorcentajeIva == '' || PorcentajeIva == undefined) {
        $('#InputTPorcIvaProdDetCot').focus();
        VentanaMensaje('Ingrese el % de IVA');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Detalle_Cotizacion/AgregarProductoDetCotTemporal',
            data: {
                IdUser: TokenUser,
                Idproducto: Idproducto,
                Cantidad: Cantidad,
                PrecioUnitario: PrecioUnitario,
                PorcentajeIva: PorcentajeIva
            },
            success: function (resultado) {
                valor = resultado.split('*');
                if (valor[0] == 'OK') {
                    Swal.fire({
                        title: TituloSwal,
                        text: valor[1],
                        icon: 'success',
                    }).then((result) => {
                        $('#gridTemporalDetalleCotizacion').DataTable().ajax.reload();
                    })
                } else {
                    Swal.fire(TituloSwal, valor[1], 'info');
                }
            }
        });
    }

}

function GridTDetalleCotizacion() {   ;
    let datatable = $('#gridTemporalDetalleCotizacion').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        searching: false,
        bLengthChange: false,
        bInfo: true,
        columnDefs: [
            { targets: [0], width: '200px', className: 'dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [2], className: 'dt-head-center' },
            { targets: [3], className: 'dt-head-center' },
            { targets: [4], className: 'dt-head-center' },
            { targets: [5], className: 'dt-head-center' },
            { targets: [6], className: 'dt-head-center' },
            { targets: [7], className: 'dt-head-center' },
            { targets: [8], width: '10px', className: 'dt-center dt-head-center' },
        ],       
        destroy: true,
        "ajax": {
            "url": '/Detalle_Cotizacion/GridTDetalleCotizacion',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "NombreProducto", title: "Producto" },
            { "data": "Cantidad", title: "Cantidad", visible: true },
            { "data": "UnidadMedida", title: "Unidad Medida", visible: true },
            {
                "data": "null",
                title: "Precio Unitario",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.PrecioUnitario);
                }
            },
            {
                "data": "null",
                title: "Sub Total",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.SubTotal);
                }
            },
            { "data": "PorcentajeIva", title: "% IVA", width: 'auto', visible: true },
            {
                "data": "null",
                title: "Valor IVA",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.ValorIva);
                }
            },
           
            {
                "data": "null",
                title: "Total",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.Total);
                }
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarTDetalleCotizacion btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
                orderable: false,
            },
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
        },
        lengthMenu: [
            [5],
        ],
    });

    $('#gridTemporalDetalleCotizacion').on('click', '.EliminarTDetalleCotizacion', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarRegistroTemporalDetalleCotizacion(data.Id);
    })
}


function EliminarRegistroTemporalDetalleCotizacion(IdTDetalleCotizacion) {
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
                url: '/Detalle_Cotizacion/EliminarTDetalleCotizacion',
                data: {
                    IdUser: TokenUser,
                    IdTDetalleCotizacion: IdTDetalleCotizacion
                },
                success: function (resultado) {
                    valor = resultado.split('*');
                    if (valor[0] == 'OK') {
                        Swal.fire({
                            title: TituloSwal,
                            text: valor[1],
                            icon: 'success',
                        }).then((result) => {
                            $('#gridTemporalDetalleCotizacion').DataTable().ajax.reload();
                        })
                    } else {
                        Swal.fire(TituloSwal, valor[1], 'info');
                    }
                }
            });
        }
    });
}


function BorrarTProductoListaDetCot(){
    Swal.fire({
        title: TituloSwal,
        text: "Esta seguro(a)?, No podrás revertir esta acción.! Se borraran todos los registros del detalle de la cotización",
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
                url: '/Detalle_Cotizacion/BorrarTProductoListaDetCot',
                data: {
                    IdUser: TokenUser,
                },
                success: function (resultado) {
                    valor = resultado.split('*');
                    if (valor[0] == 'OK') {
                        Swal.fire({
                            title: TituloSwal,
                            text: valor[1],
                            icon: 'success',
                        }).then((result) => {
                            $('#gridTemporalDetalleCotizacion').DataTable().ajax.reload();
                        })
                    } else {
                        Swal.fire(TituloSwal, valor[1], 'info');
                    }
                }
            });
        }
    });
}