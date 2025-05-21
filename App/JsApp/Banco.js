function ModalBanco(tipo) {
    $("#TituloModalBanco").empty().val('');
    $("#LabelIdBanco").empty().val('');
    $("#InputNombreBanco").empty().val('');
    $("#BotonesModalBanco").empty();
    if (tipo == 'C') {
        $("#TituloModalBanco").empty().append('<label>Crear Banco</label>');
        $('#ModalBanco').modal('show');
        $("#SelectEstadoBanco").hide();
        $("#BotonesModalBanco").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearBanco()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalBanco").empty().append('<label>Editar Banco</label>');
        $('#ModalBanco').modal('show');
        $("#SelectEstadoBanco").show();
        $("#BotonesModalBanco").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarBanco()">Guardar Cambios</button>');
    }
}

function CrearBanco() {
    let NombreBanco = $('#InputNombreBanco').val();

    if (NombreBanco == null || NombreBanco == '' || NombreBanco == undefined) {
        $('#InputNombreBanco').focus();
        VentanaMensaje('Ingrese el nombre del Banco', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Banco/CrearBanco',
            data: {
                IdUser: TokenUser,
                NombreBanco: NombreBanco
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

function ActualizarBanco() {
    let IdBanco = $('#LabelIdBanco').text();
    let NombreBanco = $('#InputNombreBanco').val();
    let IdEstado = $('#SelectEstado').val();

    if (NombreBanco == null || NombreBanco == '' || NombreBanco == undefined) {
        $('#InputNombreBanco').focus();
        VentanaMensaje('Ingrese el nombre del Banco', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Banco/ActualizarBanco',
            data: {
                IdUser: TokenUser,
                IdBanco: IdBanco,
                NombreBanco: NombreBanco,
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

function EliminarBanco(IdBanco) {
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
                url: '/Banco/EliminarBanco',
                data: {
                    IdUser: TokenUser,
                    IdBanco: IdBanco
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

function GridBanco() {
    var tituloReporte = 'LISTADO DE BANCOS';
    let datatable = $('#gridBanco').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], className: 'dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [2], className: 'dt-head-center' },
            { targets: [3], width: '50px', className: 'dt-center dt-head-center' },
            { targets: [4], width: '30px', className: 'dt-center dt-head-center' },
            { targets: [5], width: '30px', className: 'dt-center dt-head-center' }
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
                    ModalBanco('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Banco/GridBanco',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Nombre", title: "Banco", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
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
                    '<a class="EditarBanco btn btn-editar-dt" title="Editar Registro">Editar</a>' +
                    '</div>',
                orderable: false,
                width: 'auto',
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<a class="EliminarBanco btn btn-eliminar-dt" title="Eliminar Registro">Eliminar</a>' +
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
            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });

    $('#gridBanco').on('click', '.EditarBanco', function () {
        let data = datatable.row($(this).parents()).data();
        ModalBanco('E');
        $('#LabelIdBanco').text(data.Id);
        $('#InputNombreBanco').val(data.Nombre);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridBanco').on('click', '.EliminarBanco', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarBanco(data.Id);
    })
}

function ListaBanco() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Banco/ListaBanco',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectBanco").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectBanco").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectBanco ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}