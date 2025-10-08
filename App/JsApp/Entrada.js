function ModalEntradaAlmacen(tipo) {
    $("#TituloModalEntrada").empty().val('');
    $("#LabelIdEntrada").empty().text('');
    $("#SelectCategoria").val(-1);
    $("#SelectProductoxIdCategoria").val();
    $("#SelectProductoxIdCategoria").prop("disabled", true);
    $("#InputLoteProducto").empty().val('');
    $("#InputCantidadProducto").empty().val('');
    $("#InputValorUnitarioProducto").empty().val('');
    $("#InputPorcentajeIvaProducto").empty().val('');
    $("#InputFechaVencimientoProducto").empty().val('');
    $("#InputFechaIngresoAlmacen").empty().val('');
    $("#BotonesModalEntrada").empty();
    $("#Categoria").hide();
    $("#Producto").hide();
    $("#Categoria").empty().val('');
    $("#Producto").empty().val('');
   
    if (tipo == 'C') {
        $("#TituloModalEntrada").empty().append('<label>CREAR ENTRADA ALMACEN</label>');
        $('#ModalEntradaAlmacen').modal('show');
        $("#SelectEstadoEntrada").hide();
        $("#SelectCategoria").show();
        $("#SelectProductoxIdCategoria").show();
        $("#Categoria").hide();
        $("#Producto").hide();
        $("#BotonesModalEntrada").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearEntrada()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalEntrada").empty().append('<label>EDITAR ENTRADA ALMACEN</label>');
        $('#ModalEntradaAlmacen').modal('show');
        $("#SelectEstadoEntrada").show();
        $("#Categoria").show();
        $("#Producto").show();
        $("#SelectCategoria").hide();
        $("#SelectProductoxIdCategoria").hide();
        $("#BotonesModalEntrada").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarEntrada()">Guardar Cambios</button>');
    }
}


function CrearEntrada() {
    let IdProducto = $('#SelectProductoxIdCategoria').val();
    let Lote = $('#InputLoteProducto').val();
    let Cantidad = $('#InputCantidadProducto').val();
    let ValorUnitarioCompra = $('#InputValorUnitarioCompraProducto').val();
    let PorcentajeIva = $('#InputPorcentajeIvaProducto').val();
    let FechaVencimientoProducto = $('#InputFechaVencimientoProducto').val();
    let FechaIngresoAlmacen = $('#InputFechaIngresoAlmacen').val();


    if (IdProducto == -1 || IdProducto == null || IdProducto == '') {
        $('#SelectProductoxIdCategoria').focus();
        VentanaMensaje('Seleccione el Producto', 'info');
    }
    else if (Cantidad == null || Cantidad == '' || Cantidad == undefined) {
        $('#InputCantidadProducto').focus();
        VentanaMensaje('Ingrese la Cantidad', 'info');
    }
    else if (ValorUnitarioCompra == null || ValorUnitarioCompra == '' || ValorUnitarioCompra == undefined) {
        $('#InputValorUnitarioCompraProducto').focus();
        VentanaMensaje('Ingrese el precio unitario de compra del producto', 'info');
    }
    else if (FechaIngresoAlmacen == null || FechaIngresoAlmacen == '' || FechaIngresoAlmacen == undefined) {
        $('#InputFechaIngresoAlmacen').focus();
        VentanaMensaje('Ingrese la fecha de ingreso al Almacén', 'info');
    }
    else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Entrada_Almacen/CrearEntradaAlmacen',
            data: {
                IdUser: TokenUser,
                IdProducto: IdProducto,
                Lote: Lote,
                Cantidad: Cantidad,
                ValorUnitarioCompra: ValorUnitarioCompra,
                PorcentajeIva: PorcentajeIva,
                FechaVencimientoProducto: FechaVencimientoProducto,
                FechaIngresoAlmacen: FechaIngresoAlmacen
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


function ActualizarEntrada() {
    let IdEntradaAlmacen = $('#LabelIdEntrada').text();
    let Lote = $('#InputLoteProducto').val();
    let Cantidad = $('#InputCantidadProducto').val();
    let ValorUnitarioCompra = $('#InputValorUnitarioCompraProducto').val();
    let PorcentajeIva = $('#InputPorcentajeIvaProducto').val();
    let FechaVencimientoProducto = $('#InputFechaVencimientoProducto').val();
    let FechaIngresoAlmacen = $('#InputFechaIngresoAlmacen').val();
    let IdEstado = $('#SelectEstado').val();

     if (Cantidad == null || Cantidad == '' || Cantidad == undefined) {
        $('#InputCantidadProducto').focus();
        VentanaMensaje('Ingrese la Cantidad', 'info');
    }
    else if (ValorUnitarioCompra == null || ValorUnitarioCompra == '' || ValorUnitarioCompra == undefined) {
        $('#InputValorUnitarioCompraProducto').focus();
        VentanaMensaje('Ingrese el precio unitario de compra del producto', 'info');
    }
    else if (FechaIngresoAlmacen == null || FechaIngresoAlmacen == '' || FechaIngresoAlmacen == undefined) {
        $('#InputFechaIngresoAlmacen').focus();
        VentanaMensaje('Ingrese la fecha de ingreso al Almacén', 'info');
    }
    else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Entrada_Almacen/ActualizarEntradaAlmacen',
            data: {
                IdUser: TokenUser,
                IdEntradaAlmacen: IdEntradaAlmacen,
                Lote: Lote,
                Cantidad: Cantidad,
                ValorUnitarioCompra: ValorUnitarioCompra,
                PorcentajeIva: PorcentajeIva,
                FechaVencimientoProducto: FechaVencimientoProducto,
                FechaIngresoAlmacen: FechaIngresoAlmacen,
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
function EliminarEntradaAlmacen(IdEntradaAlmacen) {
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
                url: '/Entrada_Almacen/EliminarEntradaAlmacen',
                data: {
                    IdUser: TokenUser,
                    IdEntradaAlmacen: IdEntradaAlmacen
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

function GridEntradaAlmacen() {
    var tituloReporte = 'LISTADO DE PRODUCTOS INGRESADOS AL ALMACEN ';
    let datatable = $('#gridEntradaAlmacen').DataTable({
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
            { targets: [8], className: 'dt-head-center' },
            { targets: [9], className: 'dt-head-center' },
            { targets: [10], className: 'dt-head-center' },
            { targets: [11], className: 'dt-head-center' },
            { targets: [12], className: 'dt-head-center' },
            { targets: [13], className: 'dt-head-center' },
            { targets: [14], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [15], width: '10px', className: 'dt-center dt-head-center' }
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
                                //{
                                //    image: logoClientebase64,
                                //    width: 180,
                                //    height: 30,
                                //    margin: [20, 0]
                                //},
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
                    ModalEntradaAlmacen('C');
                }
            }

        ],
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Entrada_Almacen/GridEntradaAlmacen',
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
            { "data": "OrdenCompra", title: "# OC", width: 'auto' },
            { "data": "Factura", title: "# Factura", width: 'auto', visible: true },
            { "data": "Categoria", title: "Categoría", width: 'auto', visible: true },
            { "data": "Producto", title: "Producto", width: 'auto' },
            { "data": "Lote", title: "Lote", width: 'auto' },
            { "data": "Cantidad", title: "Cantidad", width: 'auto' },
            { "data": "PrecioCompraUnidad", width: 'auto', visible: false },
            {
                "data": "null",
                title: "Precio Compra",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.PrecioCompraUnidad);
                }
            },
            { "data": "PorcentajeIva", title: "% Iva", width: 'auto' },
            { "data": "PrecioTotalCompra", width: 'auto', visible: false },
            {
                "data": "null",
                title: "Valor Total",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.PrecioTotalCompra);
                }
            },
            { "data": "FechaVencimientoProducto", title: "Fecha Vencimiento", width: 'auto' },
            { "data": "FechaIngresoAlmacen", title: "Fecha Ingreso", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarEntradaAlmacen btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarEntradaAlmacen btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridEntradaAlmacen').on('click', '.EditarEntradaAlmacen', function () {
        let data = datatable.row($(this).parents()).data();
        ModalEntradaAlmacen('E');
        $('#LabelIdEntrada').text(data.Id);
        $('#Categoria').val(data.Categoria);
        $('#Producto').val(data.Producto);
        $('#InputLoteProducto').val(data.lote);        
        $('#InputCantidadProducto').val(data.Cantidad);
        $('#InputValorUnitarioCompraProducto').val(data.PrecioCompraUnidad);
        $('#InputPorcentajeIvaProducto').val(data.PorcentajeIva);
        $('#InputFechaVencimientoProducto').val(data.FechaVencimientoProducto);
        $('#InputFechaIngresoAlmacen').val(data.FechaIngresoAlmacen);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridEntradaAlmacen').on('click', '.EliminarEntradaAlmacen', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarEntradaAlmacen(data.Id);
    })

}