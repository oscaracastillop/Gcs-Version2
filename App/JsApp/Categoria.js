
function ModalCategoria(tipo) {
    $("#TituloModalCategoria").empty().val('');
    $("#LabelIdCategoria").empty().val('');
    $("#InputNombreCategoria").empty().val('');
    $("#BotonesModalCategoria").empty();
    if (tipo == 'C') {
        $("#TituloModalCategoria").empty().append('<label>Crear Categoria</label>');
        $('#ModalCategoria').modal('show');
        $("#SelectEstadoCategoria").hide();
        $("#BotonesModalCategoria").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearCategoria()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalCategoria").empty().append('<label>Editar Categoria</label>');
        $('#ModalCategoria').modal('show');
        $("#SelectEstadoCategoria").show();
        $("#BotonesModalCategoria").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarCategoria()">Guardar Cambios</button>');
    }
}


function CrearCategoria() {
    let NombreCategoria = $('#InputNombreCategoria').val();

    if (NombreCategoria == null || NombreCategoria == '' || NombreCategoria == undefined) {
        $('#InputNombreCategoria').focus();
        VentanaMensaje('Ingrese el nombre del Categoria', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Categoria/CrearCategoria',
            data: {
                IdUser: TokenUser,
                NombreCategoria: NombreCategoria
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

function ActualizarCategoria() {
    let IdCategoria = $('#LabelIdCategoria').text();
    let NombreCategoria = $('#InputNombreCategoria').val();
    let IdEstado = $('#SelectEstado').val();

    if (NombreCategoria == null || NombreCategoria == '' || NombreCategoria == undefined) {
        $('#InputNombreCategoria').focus();
        VentanaMensaje('Ingrese el nombre del Categoria', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Categoria/ActualizarCategoria',
            data: {
                IdUser: TokenUser,
                IdCategoria: IdCategoria,
                NombreCategoria: NombreCategoria,
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

function EliminarCategoria(IdCategoria) {
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
                url: '/Categoria/EliminarCategoria',
                data: {
                    IdUser: TokenUser,
                    IdCategoria: IdCategoria
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

function GridCategoria() {
    var tituloReporte = 'LISTADO DE CATEGORIAS';
    let datatable = $('#gridCategoria').DataTable({
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
            { targets: [4], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [5], width: '10px', className: 'dt-center dt-head-center' }
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
                    doc.styles.tableHeader.fontSize = 12;
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
                    ModalCategoria('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Categoria/GridCategoria',
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
            { "data": "Nombre", title: "Categoria", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarCategoria btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarCategoria btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridCategoria').on('click', '.EditarCategoria', function () {
        let data = datatable.row($(this).parents()).data();
        ModalCategoria('E');
        $('#LabelIdCategoria').text(data.Id);
        $('#InputNombreCategoria').val(data.Nombre);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridCategoria').on('click', '.EliminarCategoria', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarCategoria(data.Id);
    })
}

function ListaCategoria() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Categoria/ListaCategoria',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectCategoria").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectCategoria").empty().append('<option value="-1">- Escoge una Categoría -</option>');
                $.each(resultado, function () {
                    $("#SelectCategoria ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}