function ModalCargo(tipo) {
    $("#TituloModalCargo").empty().val('');
    $("#LabelIdCargo").empty().val('');
    $("#InputNombreCargo").empty().val('');
    $("#BotonesModalCargo").empty();
    if (tipo == 'C') {
        $("#TituloModalCargo").empty().append('<label>CREAR CARGO</label>');
        $('#ModalCargo').modal('show');
        $("#SelectEstadoCargo").hide();
        $("#BotonesModalCargo").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearCargo()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalCargo").empty().append('<label>EDITAR CARGO</label>');
        $('#ModalCargo').modal('show');
        $("#SelectEstadoCargo").show();
        $("#BotonesModalCargo").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarCargo()">Guardar Cambios</button>');
    }
}

function CrearCargo() {
    let NombreCargo = $('#InputNombreCargo').val();

    if (NombreCargo == null || NombreCargo == '' || NombreCargo == undefined) {
        $('#InputNombreCargo').focus();
        VentanaMensaje('Ingrese el nombre del Cargo');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Cargo/CrearCargo',
            data: {
                IdUser: TokenUser,
                NombreCargo: NombreCargo
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

function ActualizarCargo() {
    let IdCargo = $('#LabelIdCargo').text();
    let NombreCargo = $('#InputNombreCargo').val();
    let IdEstado = $('#SelectEstado').val();

    if (NombreCargo == null || NombreCargo == '' || NombreCargo == undefined) {
        $('#InputNombreCargo').focus();
        VentanaMensaje('Ingrese el nombre del Cargo');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Cargo/ActualizarCargo',
            data: {
                IdUser: TokenUser,
                IdCargo: IdCargo,
                NombreCargo: NombreCargo,
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

function EliminarCargo(IdCargo) {
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
                url: '/Cargo/EliminarCargo',
                data: {
                    IdUser: TokenUser,
                    IdCargo: IdCargo
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
    });
}

function GridCargo() {
    var tituloReporte = 'LISTADO DE CARGOS';
    let datatable = $('#gridCargo').DataTable({
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
                    ModalCargo('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Cargo/GridCargo',
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
            { "data": "Nombre", title: "Cargo", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarCargo btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarCargo btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridCargo').on('click', '.EditarCargo', function () {
        let data = datatable.row($(this).parents()).data();
        ModalCargo('E');
        $('#LabelIdCargo').text(data.Id);
        $('#InputNombreCargo').val(data.Nombre);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridCargo').on('click', '.EliminarCargo', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarCargo(data.Id);
    })
}

function ListaCargo() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Cargo/ListaCargo',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectCargo").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectCargo").empty().append('<option value="-1">- Escoge un Cargo -</option>');
                $.each(resultado, function () {
                    $("#SelectCargo ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}