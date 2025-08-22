

function GridDetalleCotizacion() {
    ;
    let datatable = $('#gridDetalleCotizacion').DataTable({
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
            "url": '/Detalle_Cotizacion/GridDetalleCotizacion',
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
                    '<a class="EliminarDetalleCotizacion btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridDetalleCotizacion').on('click', '.EliminarDetalleCotizacion', function () {
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