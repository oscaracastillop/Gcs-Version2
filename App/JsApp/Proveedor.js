function ModalProveedor(tipo) {
    $("#TituloModalProveedor").empty().val('');
    $("#LabelIdProveedor").empty().val('');
    $("#InputNombreProveedor").empty().val('');
    $("#SelectTipoDocumento").val(-1);
    $("#InputIdentificacionProveedor").empty().val('');
    $("#InputEmailProveedor").empty().val('');
    $("#InputTelefonoProveedor").empty().val('');
    $("#InputCelularProveedor").empty().val('');
    $("#InputContactoProveedor").empty().val('');
    $("#SelectFormaPago").val(-1);
    $("#SelectPlazoPago").val(-1);
    $("#InputDireccionProveedor").empty().val('');
    $("#InputDescripcionProveedor").empty().val('');
    $("#SelectCiudad").val(-1);
    $("#BotonesModalProveedor").empty();
    if (tipo == 'C') {
        $("#TituloModalProveedor").empty().append('<label>Crear Proveedor</label>');
        $('#ModalProveedor').modal('show');
        $("#SelectEstadoProveedor").hide();
        $("#BotonesModalProveedor").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearProveedor()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalProveedor").empty().append('<label>Editar Proveedor</label>');
        $('#ModalProveedor').modal('show');
        $("#SelectEstadoProveedor").show();
        $("#BotonesModalProveedor").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarProveedor()">Guardar Cambios</button>');
    }
}

function CrearProveedor() {
    let NombreProveedor = $('#InputNombreProveedor').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let Identificacion = $('#InputIdentificacionProveedor').val();
    let Email = $('#InputEmailProveedor').val();
    let Telefono = $('#InputTelefonoProveedor').val();
    let Celular = $('#InputCelularProveedor').val();
    let Contacto = $('#InputContactoProveedor').val();
    let Direccion = $('#InputDireccionProveedor').val();
    let IdCiudad = $('#SelectCiudad').val();
    let IdFormaPago = $('#SelectFormaPago').val();
    let IdPlazoPago = $('#SelectPlazoPago').val();
    let Descripcion = $('#InputDescripcionProveedor').val();    

    if (NombreProveedor == null || NombreProveedor == '' || NombreProveedor == undefined) {
        $('#InputNombreProveedor').focus();
        VentanaMensaje('Ingrese nombre del Proveedor', 'info');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione tipo documento', 'info');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionProveedor').focus();
        VentanaMensaje('Ingrese la Identificación', 'info');
    } else if (IdFormaPago == -1 || IdFormaPago == null || IdFormaPago == '') {
        $('#SelectFormaPago').focus();
        VentanaMensaje('Seleccione la Forma de Pago', 'info');
    } else if (IdPlazoPago == -1 || IdPlazoPago == null || IdPlazoPago == '') {
        $('#SelectPlazoPago').focus();
        VentanaMensaje('Seleccione el Plazo de Pago', 'info');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        VentanaMensaje('Seleccione la ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Proveedor/CrearProveedor',
            data: {
                IdUser: TokenUser,
                NombreProveedor: NombreProveedor,
                IdTipoDocumento: IdTipoDocumento,
                Identificacion: Identificacion,
                Email: Email,
                Telefono: Telefono,
                Celular: Celular,
                Contacto: Contacto,
                IdCiudad: IdCiudad,
                Direccion: Direccion,
                IdFormaPago: IdFormaPago,
                IdPlazoPago: IdPlazoPago,
                Descripcion: Descripcion,
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

function ActualizarProveedor() {
    let IdProveedor = $('#LabelIdProveedor').text();
    let NombreProveedor = $('#InputNombreProveedor').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let Identificacion = $('#InputIdentificacionProveedor').val();
    let Email = $('#InputEmailProveedor').val();
    let Telefono = $('#InputTelefonoProveedor').val();
    let Celular = $('#InputCelularProveedor').val();
    let Contacto = $('#InputContactoProveedor').val();
    let IdCiudad = $('#SelectCiudad').val();
    let IdFormaPago = $('#SelectFormaPago').val();
    let IdPlazoPago = $('#SelectPlazoPago').val();
    let Descripcion = $('#InputDescripcionProveedor').val();  
    let Direccion = $('#InputDireccionProveedor').val();
    let Activo = $('#SelectEstado').val();

    if (NombreProveedor == null || NombreProveedor == '' || NombreProveedor == undefined) {
        $('#InputNombreProveedor').focus();
        VentanaMensaje('Ingrese nombre del Proveedor', 'info');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione tipo documento', 'info');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionProveedor').focus();
        VentanaMensaje('Ingrese la Identificación', 'info');
    } else if (IdFormaPago == -1 || IdFormaPago == null || IdFormaPago == '') {
        $('#SelectFormaPago').focus();
        VentanaMensaje('Seleccione la Forma de Pago', 'info');
    } else if (IdPlazoPago == -1 || IdPlazoPago == null || IdPlazoPago == '') {
        $('#SelectPlazoPago').focus();
        VentanaMensaje('Seleccione el Plazo de Pago', 'info');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        VentanaMensaje('Seleccione la ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Proveedor/ActualizarProveedor',
            data: {
                IdUser: TokenUser,
                IdProveedor: IdProveedor,
                NombreProveedor: NombreProveedor,
                IdTipoDocumento: IdTipoDocumento,
                Identificacion: Identificacion,
                Email: Email,
                Telefono: Telefono,
                Celular: Celular,
                Contacto: Contacto,
                IdCiudad: IdCiudad,
                Direccion: Direccion,
                IdFormaPago: IdFormaPago,
                IdPlazoPago: IdPlazoPago,
                Descripcion: Descripcion,
                Activo: Activo
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

function EliminarProveedor(IdProveedor) {
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
                url: '/Proveedor/EliminarProveedor',
                data: {
                    IdUser: TokenUser,
                    IdProveedor: IdProveedor
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

function GridProveedor() {
    var tituloReporte = 'LISTADO DE PROVEEDORES';
    let datatable = $('#gridProveedor').DataTable({
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
            { targets: [9], width: '280px', className: 'dt-head-center' },
            { targets: [10], className: 'dt-head-center' },
            { targets: [11], className: 'dt-head-center' },
            { targets: [12], width: '50px', className: 'dt-center dt-head-center' },
            { targets: [13], width: '30px', className: 'dt-center dt-head-center' },
            { targets: [14], width: '30px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', //  portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
                    ModalProveedor('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Proveedor/GridProveedor',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Nombre", title: "Proveedor", width: 'auto' },
            {
                title: "Identificación",
                data: "",
                render: function (data, type, row) {
                    return `${row.TipoDocumento}: ${row.Identificacion}`;
                    //return `${row.TipoDocumento}: ${Intl.NumberFormat().format(row.Identificacion)}`;
                }
                , width: 'auto'
            },
            { "data": "TextoFormaPago", title: "Forma de Pago", width: 'auto' },
            { "data": "TextoPlazoPago", title: "Plazo de Pago", width: 'auto' },
            { "data": "Email", title: "Email", width: 'auto' },
            { "data": "Telefono", title: "Teléfono", width: 'auto' },
            { "data": "Celular", title: "Celular", width: 'auto' },
            { "data": "Contacto", title: "Contacto", width: 'auto' },
            {
                title: "Dirección",
                data: "nombres",
                render: function (data, type, row) {
                    return `${row.Direccion} ${row.Ciudad}`;
                }
                , width: 'auto'
            },
            { "data": "Descripcion", title: "Descripción"},
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
                    '<a class="EditarProveedor btn btn-editar-dt" title="Editar Registro">Editar</a>' +
                    '</div>',
                orderable: false,
                width: 'auto',
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<a class="EliminarProveedor btn btn-eliminar-dt" title="Eliminar Registro">Eliminar</a>' +
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

    $('#gridProveedor').on('click', '.EditarProveedor', function () {
        let data = datatable.row($(this).parents()).data();
        ModalProveedor('E');
        $('#LabelIdProveedor').text(data.Id);
        $('#InputNombreProveedor').val(data.Nombre);
        $('#SelectTipoDocumento').val(data.IdTipoDocumento);
        $('#InputIdentificacionProveedor').val(data.Identificacion);
        $('#InputEmailProveedor').val(data.Email);
        $('#InputTelefonoProveedor').val(data.Telefono);
        $('#InputCelularProveedor').val(data.Celular);
        $('#InputContactoProveedor').val(data.Contacto);
        $('#SelectFormaPago').val(data.IdFormaPago);
        $('#SelectPlazoPago').val(data.IdPlazoPago);
        $('#InputDireccionProveedor').val(data.Direccion);
        $('#SelectCiudad').val(data.IdCiudad);
        $('#InputDescripcionProveedor').val(data.Descripcion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridProveedor').on('click', '.EliminarProveedor', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarProveedor(data.Id);
    })
}

function ListaProveedor() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Proveedor/ListaProveedor',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectProveedor").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectProveedor").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectProveedor").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}