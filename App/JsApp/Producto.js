function ModalProducto(tipo) {
    $("#TituloModalProducto").empty().val('');
    $("#LabelIdProducto").empty().val('');
    $("#SelectCategoria").val(-1);
    $("#InputNombreProducto").empty().val('');
    $("#InputMarcaProducto").empty().val('');
    $("#InputReferenciaProducto").empty().val('');
    $("#InputCodigoProducto").empty().val('');
    $("#SelectUnidadMedida").val(-1);
    $("#InputStockMinimo").empty().val('');
    $("#InputDescripcion").empty().val('');
    $("#BotonesModalProducto").empty();
    if (tipo == 'C') {
        $("#ContenedorImagenHVProducto").hide();
        $("#TituloModalProducto").empty().append('<label>Crear Producto</label>');
        $('#ModalProducto').modal('show');
        $("#SelectEstadoProducto").hide();
        $("#InputStockMinimo").val(0);
        $("#BotonesModalProducto").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearProducto()">Guardar</button>');
    } if (tipo == 'E') {
        $("#ContenedorImagenHVProducto").show();
        $("#TituloModalProducto").empty().append('<label>Editar Producto</label>');
        $('#ModalProducto').modal('show');
        $("#SelectEstadoProducto").show();
        $("#BotonesModalProducto").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarProducto()">Guardar Cambios</button>');
    }
}


function CrearProducto() {
    let IdCategoria = $('#SelectCategoria').val();
    let NombreProducto = $('#InputNombreProducto').val();
    let MarcaProducto = $('#InputMarcaProducto').val();
    let ReferenciaProducto = $('#InputReferenciaProducto').val();
    let CodigoProducto = $('#InputCodigoProducto').val();
    let IdUnidadMedida = $('#SelectUnidadMedida').val();
    let StockMinimo = $('#InputStockMinimo').val();
    let Descripcion = $('#InputDescripcionProducto').val();

    if (IdCategoria == -1 || IdCategoria == null || IdCategoria == '') {
        $('#SelectCategoria').focus();
        VentanaMensaje('Seleccione la Categoría', 'info');
    } else if (NombreProducto == null || NombreProducto == '' || NombreProducto == undefined) {
        $('#InputNombreProducto').focus();
        VentanaMensaje('Ingrese nombre del Producto', 'info');
    } else if (IdUnidadMedida == -1 || IdUnidadMedida == null || IdUnidadMedida == '') {
        $('#SelectUnidadMedida').focus();
        VentanaMensaje('Seleccione la Unidad de Medida', 'info');
    } else if (StockMinimo == -1 || StockMinimo == null || StockMinimo == '') {
        $('#InputStockMinimo').focus();
        VentanaMensaje('Ingrese la cantidad Mínima de Inventario', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Producto/CrearProducto',
            data: {
                IdUser: TokenUser,
                IdCategoria: IdCategoria,
                NombreProducto: NombreProducto,
                MarcaProducto: MarcaProducto,
                ReferenciaProducto: ReferenciaProducto,
                CodigoProducto: CodigoProducto,
                IdUnidadMedida: IdUnidadMedida,
                StockMinimo: StockMinimo,
                Descripcion: Descripcion
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

function ActualizarProducto() {
    let IdProducto = $('#LabelIdProducto').text();
    let IdCategoria = $('#SelectCategoria').val();
    let NombreProducto = $('#InputNombreProducto').val();
    let MarcaProducto = $('#InputMarcaProducto').val();
    let ReferenciaProducto = $('#InputReferenciaProducto').val();
    let CodigoProducto = $('#InputCodigoProducto').val();
    let IdUnidadMedida = $('#SelectUnidadMedida').val();
    let StockMinimo = $('#InputStockMinimo').val();
    let IdEstado = $('#SelectEstado').val();
    let Descripcion = $('#InputDescripcionProducto').val();

    if (IdCategoria == -1 || IdCategoria == null || IdCategoria == '') {
        $('#SelectCategoria').focus();
        VentanaMensaje('Seleccione la Categoría', 'info');
    } else if (NombreProducto == null || NombreProducto == '' || NombreProducto == undefined) {
        $('#InputNombreProducto').focus();
        VentanaMensaje('Ingrese nombre del Producto', 'info');
    } else if (IdUnidadMedida == -1 || IdUnidadMedida == null || IdUnidadMedida == '') {
        $('#SelectUnidadMedida').focus();
        VentanaMensaje('Seleccione la Unidad de Medida', 'info');
    } else if (StockMinimo == -1 || StockMinimo == null || StockMinimo == '') {
        $('#SelectUnidadMedida').focus();
        VentanaMensaje('Ingrese la cantidad Mínima de Inventario', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Producto/ActualizarProducto',
            data: {
                IdUser: TokenUser,
                IdProducto: IdProducto,
                IdCategoria: IdCategoria,
                NombreProducto: NombreProducto,
                MarcaProducto: MarcaProducto,
                ReferenciaProducto: ReferenciaProducto,
                CodigoProducto: CodigoProducto,
                IdUnidadMedida: IdUnidadMedida,
                StockMinimo: StockMinimo,
                IdEstado: IdEstado,
                Descripcion: Descripcion
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

function EliminarProducto(IdProducto) {
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
                url: '/Producto/EliminarProducto',
                data: {
                    IdUser: TokenUser,
                    IdProducto: IdProducto
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



function GuardarImagenProducto() {
    var IdProducto = $('#IdProductoImagen').text();
    var NombreImagen = $('#NombreImagenActualProducto').text();
    var photo = new Array();
    var formData = new FormData();

    var Imagen = $('#inPhoto').val();

    if (Imagen == null || Imagen == '' || Imagen == undefined) {
        $('#inPhoto').focus();
        VentanaMensaje('El campo de imagén esta vacío', 'info');
    } else {
        if ($('#inPhoto')[0].files.length > 0) {
            formData.append('Files', $('#inPhoto')[0].files[0], $('#inPhoto')[0].files[0].name);
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Producto/DatosProducto',
            data: {
                IdProducto: IdProducto,
                IdUsuario: TokenUser,
                NombreImagen: NombreImagen
            }
        });
        photo.push(formData);
        $.ajax({
            type: 'POST',
            data: photo[0],
            url: '/Producto/GuardarImagenProducto',
            contentType: false,
            processData: false,
            success: function (result) {
                valor = result.split('*');
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
}

function GridProducto() {
    var tituloReporte = 'REPORTE PRODUCTOS';
    let datatable = $('#gridProducto').DataTable({
        responsive:false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], className: 'dt-center dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [2], className: 'dt-head-center' },
            { targets: [4], className: 'dt-head-center' },
            { targets: [5], className: 'dt-head-center' },
            { targets: [6], className: 'dt-center dt-head-center' },
            { targets: [7], className: 'dt-head-center' },
            { targets: [8], className: 'dt-head-center' },
            { targets: [9], className: 'dt-head-center' },
            { targets: [10], className: 'dt-head-center' },
            { targets: [11], width: '50px', className: 'dt-center dt-head-center' },
            { targets: [12], width: '50px', className: 'dt-center dt-head-center' },
            { targets: [13], width: '50px', className: 'dt-center dt-head-center' },
        ],
        buttons: [{
            extend: 'excel', className: 'btn btn-excel-datatable',
            footer: true,
            title: tituloReporte + ' ' + NameApp,
            filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
            text: 'Excel',
            exportOptions: {
                columns: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11]
            },
        },
        {
            //download: 'open',
            extend: 'pdfHtml5', className: 'btn btn-pdf-datatable',
            text: 'Pdf',
            filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
            orientation: 'landscape', //portrait landscape
            pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
            exportOptions: {
                columns: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11],
                search: 'applied',
                order: 'applied',
            },
            customize: function (doc) {
                doc.content.splice(0, 1.5);
                doc.pageMargins = [40, 60, 20, 30];
                doc.defaultStyle.fontSize = 7;
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
            className: 'btn btn-nuevo-datatable',
            action: function (e, dt, node, config) {
                ModalProducto('C');
            }
        }
        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Producto/GridProducto',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            {
                title: "Imagén",
                "data": 'ImagenProducto',
                "render": function (data, type, row, meta) {
                    return '<div class="contimg-grid">' +
                            '<img class="imagen-escalada-grid btn CambiarImagenProducto" src="/Images/ImagenProducto/' + data + '"/>' +
                        '</div>';
                }
            },
            { "data": "NombreProducto", title: "Producto", width: 'auto' },
            { "data": "MarcaProducto", title: "Marca", width: 'auto' },
            { "data": "ReferenciaProducto", title: "Referencia", width: 'auto' },
            { "data": "CodigoProducto", title: "Código", width: 'auto' },
            { "data": "UnidadMedida", title: "Und Medida", width: 'auto' },
            { "data": "StockMinimo", title: "Stock Mínimo", width: 'auto' },
            { "data": "NombreCategoria", title: "Categoría", width: 'auto' },
            { "data": "Descripcion", title: "Descripción", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto' },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto' },
            {
                title: "Estado",
                data: "Estado",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.IdEstado == 1) {
                        return '<label class="label-estado-activo">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label class="label-estado-inactivo">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<a class="EditarProducto btn btn-editar-dt" title="Editar Registro">Editar</a>' +
                    '</div>',
                orderable: false,
                width: 'auto',
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<a class="EliminarProducto btn btn-eliminar-dt" title="Eliminar Registro">Eliminar</a>' +
                    '</div>',
                orderable: false,
                width: 'auto',
            },

        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
        },
        lengthMenu: [
            [10, 25, 50, -1],
            [ '10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });


    $('#gridProducto').on('click', '.EditarProducto', function () {
        let data = datatable.row($(this).parents()).data();
        ModalProducto('E');
        $('#LabelIdProducto').text(data.Id);
        $('#SelectCategoria').val(data.IdCategoria);
        $('#InputNombreProducto').val(data.NombreProducto);
        $('#InputMarcaProducto').val(data.MarcaProducto);
        $('#InputReferenciaProducto').val(data.ReferenciaProducto);
        $('#InputCodigoProducto').val(data.CodigoProducto);
        $('#SelectUnidadMedida').val(data.IdUnidadMedida);
        $('#InputStockMinimo').val(data.StockMinimo);
        $('#InputDescripcion').val(data.Descripcion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridProducto').on('click', '.CambiarImagenProducto', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalImagenProducto').modal('show');
        $('#IdProductoImagen').text(data.Id);
        $('#NombreImagenActualProducto').text(data.ImagenProducto);
        $('#NombreProductoImagen').text(data.NombreProducto);
        $('#ImagenProducto').empty().append(
            '<img class="imagen-escalada-cambiar" src="/Images/ImagenProducto/' + data.ImagenProducto + '"/>'
        );
    })

    $('#gridProducto').on('click', '.EliminarProducto', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarProducto(data.Id);
    })

}

function ListaProducto() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Producto/ListaProducto',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectProducto").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectProducto").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectProducto").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}