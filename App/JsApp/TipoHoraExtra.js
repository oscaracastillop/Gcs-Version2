function ModalTipoHoraExtra(tipo) {
    $("#TituloModalTipoHoraExtra").empty().val('');
    $("#LabelIdTipoHoraExtra").empty().val('');
    $("#InputNombreTipoHoraExtra").empty().val('');
    $("#InputPorcentajeTipoHoraExtra").empty().val('');
    $("#BotonesModalTipoHoraExtra").empty();
    if (tipo == 'C') {
        $("#TituloModalTipoHoraExtra").empty().append('<label>Crear Tipo Hora Extra</label>');
        $('#ModalTipoHoraExtra').modal('show');
        $("#SelectEstadoTipoHoraExtra").hide();
        $("#BotonesModalTipoHoraExtra").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearTipoHoraExtra()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalTipoHoraExtra").empty().append('<label>Editar Tipo Hora Extra</label>');
        $('#ModalTipoHoraExtra').modal('show');
        $("#SelectEstadoTipoHoraExtra").show();
        $("#BotonesModalTipoHoraExtra").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarTipoHoraExtra()">Guardar Cambios</button>');
    }
}

function CrearTipoHoraExtra() {
    let NombreTipoHoraExtra = $('#InputNombreTipoHoraExtra').val();
    let Porcentaje = $('#InputPorcentajeTipoHoraExtra').val();

    if (NombreTipoHoraExtra == null || NombreTipoHoraExtra == '' || NombreTipoHoraExtra == undefined) {
        $('#InputNombreTipoHoraExtra').focus();
        VentanaMensaje('Ingrese el nombre del Tipo de Hora Extra', 'info');
    } else if (Porcentaje == null || Porcentaje == '' || Porcentaje == undefined) {
        $('#InputPorcentajeTipoHoraExtra').focus();
        VentanaMensaje('Ingrese el Porcentaje de recargo de la Hora Extra', 'info');
    }  else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Tipo_Hora_Extra/CrearTipoHoraExtra',
            data: {
                IdUser: TokenUser,
                NombreTipoHoraExtra: NombreTipoHoraExtra,
                Porcentaje: Porcentaje
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

function ActualizarTipoHoraExtra() {
    let IdTipoHoraExtra = $('#LabelIdTipoHoraExtra').text();
    let NombreTipoHoraExtra = $('#InputNombreTipoHoraExtra').val();
    let Porcentaje = $('#InputPorcentajeTipoHoraExtra').val();
    let IdEstado = $('#SelectEstado').val();

    if (NombreTipoHoraExtra == null || NombreTipoHoraExtra == '' || NombreTipoHoraExtra == undefined) {
        $('#InputNombreTipoHoraExtra').focus();
        VentanaMensaje('Ingrese el nombre del Tipo de Hora Extra', 'info');
    } else if (Porcentaje == null || Porcentaje == '' || Porcentaje == undefined) {
        $('#InputPorcentajeTipoHoraExtra').focus();
        VentanaMensaje('Ingrese el Porcentaje de recargo de la Hora Extra', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Tipo_Hora_Extra/ActualizarTipoHoraExtra',
            data: {
                IdUser: TokenUser,
                IdTipoHoraExtra: IdTipoHoraExtra,
                NombreTipoHoraExtra: NombreTipoHoraExtra,
                Porcentaje: Porcentaje,
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

function EliminarTipoHoraExtra(IdTipoHoraExtra) {
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
                url: '/Tipo_Hora_Extra/EliminarTipoHoraExtra',
                data: {
                    IdUser: TokenUser,
                    IdTipoHoraExtra: IdTipoHoraExtra
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

function GridTipoHoraExtra() {
    var tituloReporte = 'LISTADO DE TIPOS HORAS EXTRAS';
    let datatable = $('#gridTipoHoraExtra').DataTable({
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
            { targets: [5], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [6], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'portrait', // landscape
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 3, 4],
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
                    ModalTipoHoraExtra('C');
                }
            }

        ],
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Tipo_Hora_Extra/GridTipoHoraExtra',
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
            { "data": "Nombre", title: "Tipo Hora Extra", width: 'auto' },
            { "data": "Porcentaje", title: "Porcentaje", width: 'auto', visible: true },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarTipoHoraExtra btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarTipoHoraExtra btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridTipoHoraExtra').on('click', '.EditarTipoHoraExtra', function () {
        let data = datatable.row($(this).parents()).data();
        ModalTipoHoraExtra('E');
        $('#LabelIdTipoHoraExtra').text(data.Id);
        $('#InputNombreTipoHoraExtra').val(data.Nombre);
        $('#InputPorcentajeTipoHoraExtra').val(data.Porcentaje);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridTipoHoraExtra').on('click', '.EliminarTipoHoraExtra', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarTipoHoraExtra(data.Id);
    })
}

function ListaTipoHoraExtra() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Tipo_Hora_Extra/ListaTipoHoraExtra',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectTipoHoraExtra").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectTipoHoraExtra").empty().append('<option value="-1">- Escoge un Tipo HE -</option>');
                $.each(resultado, function () {
                    $("#SelectTipoHoraExtra ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}