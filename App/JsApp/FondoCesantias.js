function ModalFondoCesantias(tipo) {
    $("#TituloModalFondoCesantias").empty().val('');
    $("#LabelIdFondoCesantias").empty().val('');
    $("#InputNombreFondoCesantias").empty().val('');
    $("#BotonesModalFondoCesantias").empty();
    if (tipo == 'C') {
        $("#TituloModalFondoCesantias").empty().append('<label>CREAR FONDO CESANTIAS</label>');
        $('#ModalFondoCesantias').modal('show');
        $("#SelectEstadoFondoCesantias").hide();
        $("#BotonesModalFondoCesantias").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearFondoCesantias()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalFondoCesantias").empty().append('<label>EDITAR FONDO CESANTIAS</label>');
        $('#ModalFondoCesantias').modal('show');
        $("#SelectEstadoFondoCesantias").show();
        $("#BotonesModalFondoCesantias").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarFondoCesantias()">Guardar Cambios</button>');
    }
}

function CrearFondoCesantias() {
    let NombreFondoCesantias = $('#InputNombreFondoCesantias').val();

    if (NombreFondoCesantias == null || NombreFondoCesantias == '' || NombreFondoCesantias == undefined) {
        $('#InputNombreFondoCesantias').focus();
        VentanaMensaje('Ingrese el nombre del Fondo de Cesantias');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Fondo_Cesantias/CrearFondoCesantias',
            data: {
                IdUser: TokenUser,
                NombreFondoCesantias: NombreFondoCesantias
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

function ActualizarFondoCesantias() {
    let IdFondoCesantias = $('#LabelIdFondoCesantias').text();
    let NombreFondoCesantias = $('#InputNombreFondoCesantias').val();
    let IdEstado = $('#SelectEstado').val();

    if (NombreFondoCesantias == null || NombreFondoCesantias == '' || NombreFondoCesantias == undefined) {
        $('#InputNombreFondoCesantias').focus();
        VentanaMensaje('Ingrese el nombre del Fondo de Cesantias');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Fondo_Cesantias/ActualizarFondoCesantias',
            data: {
                IdUser: TokenUser,
                IdFondoCesantias: IdFondoCesantias,
                NombreFondoCesantias: NombreFondoCesantias,
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


function EliminarFondoCesantias(IdFondoCesantias) {
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
                url: '/Fondo_Cesantias/EliminarFondoCesantias',
                data: {
                    IdUser: TokenUser,
                    IdFondoCesantias: IdFondoCesantias
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

function GridFondoCesantias() {
    var tituloReporte = 'LISTADO DE FONDO DE CESANTIAS';
    let datatable = $('#gridFondoCesantias').DataTable({
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
                    ModalFondoCesantias('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Fondo_Cesantias/GridFondoCesantias',
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
            { "data": "Nombre", title: "FondoCesantias", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarFondoCesantias btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarFondoCesantias btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridFondoCesantias').on('click', '.EditarFondoCesantias', function () {
        let data = datatable.row($(this).parents()).data();
        ModalFondoCesantias('E');
        $('#LabelIdFondoCesantias').text(data.Id);
        $('#InputNombreFondoCesantias').val(data.Nombre);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridFondoCesantias').on('click', '.EliminarFondoCesantias', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarFondoCesantias(data.Id);
    })
}

function ListaFondoCesantias() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Fondo_Cesantias/ListaFondoCesantias',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectFondoCesantias").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectFondoCesantias").empty().append('<option value="-1">- Escoge un Fondo de Cesantías -</option>');
                $.each(resultado, function () {
                    $("#SelectFondoCesantias ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}