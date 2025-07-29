function ModalFondoPensiones(tipo) {
    $("#TituloModalFondoPensiones").empty().val('');
    $("#LabelIdFondoPensiones").empty().val('');
    $("#InputNombreFondoPensiones").empty().val('');
    $("#BotonesModalFondoPensiones").empty();
    if (tipo == 'C') {
        $("#TituloModalFondoPensiones").empty().append('<label>CREAR FONDO DE PENSIONES</label>');
        $('#ModalFondoPensiones').modal('show');
        $("#SelectEstadoFondoPensiones").hide();
        $("#BotonesModalFondoPensiones").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearFondoPensiones()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalFondoPensiones").empty().append('<label>EDITAR FONDO DE PENSIONES</label>');
        $('#ModalFondoPensiones').modal('show');
        $("#SelectEstadoFondoPensiones").show();
        $("#BotonesModalFondoPensiones").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarFondoPensiones()">Guardar Cambios</button>');
    }
}

function CrearFondoPensiones() {
    let NombreFondoPensiones = $('#InputNombreFondoPensiones').val();

    if (NombreFondoPensiones == null || NombreFondoPensiones == '' || NombreFondoPensiones == undefined) {
        $('#InputNombreFondoPensiones').focus();
        VentanaMensaje('Ingrese el nombre del Fondo de Pensiones');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Fondo_Pensiones/CrearFondoPensiones',
            data: {
                IdUser: TokenUser,
                NombreFondoPensiones: NombreFondoPensiones
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

function ActualizarFondoPensiones() {
    let IdFondoPensiones = $('#LabelIdFondoPensiones').text();
    let NombreFondoPensiones = $('#InputNombreFondoPensiones').val();
    let IdEstado = $('#SelectEstado').val();

    if (NombreFondoPensiones == null || NombreFondoPensiones == '' || NombreFondoPensiones == undefined) {
        $('#InputNombreFondoPensiones').focus();
        VentanaMensaje('Ingrese el nombre del Fondo de Pensiones');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Fondo_Pensiones/ActualizarFondoPensiones',
            data: {
                IdUser: TokenUser,
                IdFondoPensiones: IdFondoPensiones,
                NombreFondoPensiones: NombreFondoPensiones,
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

function EliminarFondoPensiones(IdFondoPensiones) {
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
                url: '/Fondo_Pensiones/EliminarFondoPensiones',
                data: {
                    IdUser: TokenUser,
                    IdFondoPensiones: IdFondoPensiones
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

function GridFondoPensiones() {
    var tituloReporte = 'LISTADO DE FONDO DE PENSIONES';
    let datatable = $('#gridFondoPensiones').DataTable({
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
                    ModalFondoPensiones('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Fondo_Pensiones/GridFondoPensiones',
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
            { "data": "Nombre", title: "Fondo Pensiones", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarFondoPensiones btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarFondoPensiones btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridFondoPensiones').on('click', '.EditarFondoPensiones', function () {
        let data = datatable.row($(this).parents()).data();
        ModalFondoPensiones('E');
        $('#LabelIdFondoPensiones').text(data.Id);
        $('#InputNombreFondoPensiones').val(data.Nombre);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridFondoPensiones').on('click', '.EliminarFondoPensiones', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarFondoPensiones(data.Id);
    })
}

function ListaFondoPensiones() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Fondo_Pensiones/ListaFondoPensiones',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectFondoPensiones").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectFondoPensiones").empty().append('<option value="-1">- Escoge un Fondo de Pensión -</option>');
                $.each(resultado, function () {
                    $("#SelectFondoPensiones ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}