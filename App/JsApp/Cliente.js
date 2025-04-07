function ModalCliente(tipo) {
    $("#TituloModalCliente").empty().val('');
    $("#LabelIdCliente").empty().val('');
    $("#InputNombreCliente").empty().val('');
    $("#SelectTipoDocumento").val(-1);
    $("#InputIdentificacionCliente").empty().val('');
    $("#InputEmailCliente").empty().val('');
    $("#InputTelefonoCliente").empty().val('');
    $("#InputContactoCliente").empty().val('');
    $("#InputDireccionCliente").empty().val('');
    $("#SelectCiudad").val(-1);
    $("#BotonesModalCliente").empty();
    if (tipo == 'C') {
        $("#TituloModalCliente").empty().append('<label>Crear Cliente</label>');
        $('#ModalCliente').modal('show');
        $("#SelectEstadoCliente").hide();
        $("#BotonesModalCliente").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearCliente()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalCliente").empty().append('<label>Editar Cliente</label>');
        $('#ModalCliente').modal('show');
        $("#SelectEstadoCliente").show();
        $("#BotonesModalCliente").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarCliente()">Guardar Cambios</button>');
    }
}

function CrearCliente() {
    let NombreCliente = $('#InputNombreCliente').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let Identificacion = $('#InputIdentificacionCliente').val();
    let Email = $('#InputEmailCliente').val();
    let Telefono = $('#InputTelefonoCliente').val();
    let Contacto = $('#InputContactoCliente').val();
    let IdCiudad = $('#SelectCiudad').val();
    let Direccion = $('#InputDireccionCliente').val();

    if (NombreCliente == null || NombreCliente == '' || NombreCliente == undefined) {
        $('#InputNombreCliente').focus();
        VentanaMensaje('Ingrese nombre del Cliente', 'info');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione tipo documento', 'info');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionCliente').focus();
        VentanaMensaje('Ingrese la identificación', 'info');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        VentanaMensaje('Seleccione la ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Cliente/CrearCliente',
            data: {
                IdUser: TokenUser,
                NombreCliente: NombreCliente,
                IdTipoDocumento: IdTipoDocumento,
                Identificacion: Identificacion,
                Email: Email,
                Telefono: Telefono,
                Contacto: Contacto,
                IdCiudad: IdCiudad,
                Direccion: Direccion
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

function ActualizarCliente() {
    let IdCliente = $('#LabelIdCliente').text();
    let NombreCliente = $('#InputNombreCliente').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let Identificacion = $('#InputIdentificacionCliente').val();
    let Email = $('#InputEmailCliente').val();
    let Telefono = $('#InputTelefonoCliente').val();
    let Contacto = $('#InputContactoCliente').val();
    let IdCiudad = $('#SelectCiudad').val();
    let Direccion = $('#InputDireccionCliente').val();
    let IdEstado = $('#SelectEstado').val();

    if (NombreCliente == null || NombreCliente == '' || NombreCliente == undefined) {
        $('#InputNombreCliente').focus();
        VentanaMensaje('Ingrese nombre del Cliente', 'info');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione tipo documento', 'info');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionCliente').focus();
        VentanaMensaje('Ingrese la identificación', 'info');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        VentanaMensaje('Seleccione la ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Cliente/ActualizarCliente',
            data: {
                IdUser: TokenUser,
                IdCliente: IdCliente,
                NombreCliente: NombreCliente,
                IdTipoDocumento: IdTipoDocumento,
                Identificacion: Identificacion,
                Email: Email,
                Telefono: Telefono,
                Contacto: Contacto,
                IdCiudad: IdCiudad,
                Direccion: Direccion,
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

function EliminarCliente(IdCliente) {
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
                url: '/Cliente/EliminarCliente',
                data: {
                    IdUser: TokenUser,
                    IdCliente: IdCliente
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

function GridCliente() {
    var tituloReporte = 'LISTADO DE CLIENTES';
    let datatable = $('#gridCliente').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [            
            { targets: [0], className: 'dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [2], className: 'dt-head-center' },
            { targets: [3], className: 'dt-head-center' },
            { targets: [4], className: 'dt-head-center' },
            { targets: [5], className: 'dt-head-center' },
            { targets: [6], className: 'dt-head-center' },
            { targets: [7], className: 'dt-head-center' },
            { targets: [8], className: 'dt-head-center' },
            { targets: [9], className: 'dt-head-center' },
            { targets: [10], width: '150px', className: 'dt-center dt-head-center' },
            { targets: [11], width: '100px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: 'Excel',
                exportOptions: {
                    columns: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn btn-pdf-datatable',
                text: 'Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', //portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10],
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
                className: 'btn btn-nuevo-datatable',
                action: function (e, dt, node, config) {
                    ModalCliente('C');
                }
            }

        ],
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Cliente/GridCliente',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Nombre", title: "Cliente", width: 'auto' },
            {
                title: "Documento",
                data: "",
                render: function (data, type, row) {
                    return `${row.TipoDocumento}:  ${row.Identificacion}`;
                }
                , width: 'auto'
            },
            { "data": "TipoDocumento", title: "Documento", width: 'auto', visible: false },
            { "data": "Identificacion", title: "Identificación", width: 'auto', visible: false },
            { "data": "Email", title: "Email", width: 'auto' },
            { "data": "Telefono", title: "Teléfono", width: 'auto' },
            { "data": "Contacto", title: "Contacto", width: 'auto' },
            {
                title: "Dirección",
                data: "nombres",
                render: function (data, type, row) {
                    return `${row.Direccion} ${row.Ciudad}`;
                }
                , width: 'auto'
            },
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
                    '<a class="EditarCliente btn btn-editar-dt" title="Editar Registro">Editar</a>&nbsp;&nbsp;<a class="EliminarCliente btn btn-eliminar-dt" title="Eliminar Registro" style="color:red">Eliminar</a>' +
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

    $('#gridCliente').on('click', '.EditarCliente', function () {
        let data = datatable.row($(this).parents()).data();
        ModalCliente('E');
        $('#LabelIdCliente').text(data.Id);
        $('#InputNombreCliente').val(data.Nombre);
        $('#SelectTipoDocumento').val(data.IdTipoDocumento);
        $('#InputIdentificacionCliente').val(data.Identificacion);
        $('#InputEmailCliente').val(data.Email);
        $('#InputTelefonoCliente').val(data.Telefono);
        $('#InputContactoCliente').val(data.Contacto);
        $('#InputDireccionCliente').val(data.Direccion);
        $('#SelectCiudad').val(data.IdCiudad);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridCliente').on('click', '.EliminarCliente', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarCliente(data.Id);
    })

}

function ListaCliente() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Cliente/ListaCliente',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectCliente").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectCliente").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectCliente").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}






