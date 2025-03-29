function ModalCCFamiliar(tipo) {
    $("#TituloModalCCFamiliar").empty().val('');
    $("#LabelIdCCFamiliar").empty().val('');
    $("#InputNombreCCFamiliar").empty().val('');
    $("#BotonesModalCCFamiliar").empty();
    if (tipo == 'C') {
        $("#TituloModalCCFamiliar").empty().append('<label>Crear CC Familiar</label>');
        $('#ModalCCFamiliar').modal('show');
        $("#SelectEstadoCCFamiliar").hide();
        $("#BotonesModalCCFamiliar").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearCCFamiliar()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalCCFamiliar").empty().append('<label>Editar CC Familiar</label>');
        $('#ModalCCFamiliar').modal('show');
        $("#SelectEstadoCCFamiliar").show();
        $("#BotonesModalCCFamiliar").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarCCFamiliar()">Guardar Cambios</button>');
    }
}

function CrearCCFamiliar() {
    let NombreCCFamiliar = $('#InputNombreCCFamiliar').val();

    if (NombreCCFamiliar == null || NombreCCFamiliar == '' || NombreCCFamiliar == undefined) {
        $('#InputNombreCCFamiliar').focus();
        VentanaMensaje('Ingrese el nombre de la Caja de Compensación Familiar', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/CC_Familiar/CrearCCFamiliar',
            data: {
                IdUser: TokenUser,
                NombreCCFamiliar: NombreCCFamiliar
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

function ActualizarCCFamiliar() {
    let IdCCFamiliar = $('#LabelIdCCFamiliar').text();
    let NombreCCFamiliar = $('#InputNombreCCFamiliar').val();
    let IdEstado = $('#SelectEstado').val();

    if (NombreCCFamiliar == null || NombreCCFamiliar == '' || NombreCCFamiliar == undefined) {
        $('#InputNombreCCFamiliar').focus();
        VentanaMensaje('Ingrese el nombre de la Caja de Compensación Familiar', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/CC_Familiar/ActualizarCCFamiliar',
            data: {
                IdUser: TokenUser,
                IdCCFamiliar: IdCCFamiliar,
                NombreCCFamiliar: NombreCCFamiliar,
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

function EliminarCCFamiliar(IdCCFamiliar) {
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
                url: '/CC_Familiar/EliminarCCFamiliar',
                data: {
                    IdUser: TokenUser,
                    IdCCFamiliar: IdCCFamiliar
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

function GridCCFamiliar() {
    var tituloReporte = 'LISTADO DE CC FAMILIAR';
    let datatable = $('#gridCCFamiliar').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], className: 'dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [2], className: 'dt-head-center' },
            { targets: [3], width: '150px', className: 'dt-center dt-head-center' },
            { targets: [4], width: '100px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn btn-pdf-datatable',
                text: 'Pdf',
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
                className: 'btn btn-nuevo-datatable',
                action: function (e, dt, node, config) {
                    ModalCCFamiliar('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/CC_Familiar/GridCCFamiliar',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Nombre", title: "CC Familiar", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "Estado",
                data: "Estado",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.IdEstado == 1) {
                        return '<label style="background-color:green; padding:2px;border-radius:5px;font-size:11px!important; color:white">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label style="background-color:red; padding:2px;border-radius:5px;font-size:11px!important; color: white">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            {
                title: "Acciones",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<a class="EditarCCFamiliar btn btn-editar-dt" title="Editar Registro">Editar</a>&nbsp;&nbsp;<a class="EliminarCCFamiliar btn btn-eliminar-dt" title="Eliminar Registro" style="color:red">Eliminar</a>' +
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

    $('#gridCCFamiliar').on('click', '.EditarCCFamiliar', function () {
        let data = datatable.row($(this).parents()).data();
        ModalCCFamiliar('E');
        $('#LabelIdCCFamiliar').text(data.Id);
        $('#InputNombreCCFamiliar').val(data.Nombre);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridCCFamiliar').on('click', '.EliminarCCFamiliar', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarCCFamiliar(data.Id);
    })
}

function ListaCCFamiliar() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/CC_Familiar/ListaCCFamiliar',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectCCFamiliar").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectCCFamiliar").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectCCFamiliar ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}