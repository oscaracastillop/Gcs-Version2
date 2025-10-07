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
        $("#TituloModalProveedor").empty().append('<label>CREAR PROVEEDOR</label>');
        $('#ModalProveedor').modal('show');
        $("#SelectEstadoProveedor").hide();
        $("#BotonesModalProveedor").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearProveedor()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalProveedor").empty().append('<label>EDITAR PROVEEDOR</label>');
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
                    VentanaMensajeOK(valor[1]);
                } else {
                    VentanaMensaje(valor[1]);
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
                    VentanaMensajeOK(valor[1]);
                } else {
                    VentanaMensaje(valor[1]);
                }
            }
        });
    }
}

function EliminarProveedor(IdProveedor) {
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
                url: '/Proveedor/EliminarProveedor',
                data: {
                    IdUser: TokenUser,
                    IdProveedor: IdProveedor
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
function GridProveedor() {
    var tituloReporte = 'LISTADO DE PROVEEDORES';
    let datatable = $('#gridProveedor').DataTable({
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
            { targets: [5], className: 'dt-head-center' },
            { targets: [6], className: 'dt-head-center' },
            { targets: [7], className: 'dt-head-center' },
            { targets: [8], className: 'dt-head-center' },
            { targets: [9], className: 'dt-head-center' },
            { targets: [10], className: 'dt-head-center' },
            { targets: [11], className: 'dt-head-center' },
            { targets: [12], className: 'dt-head-center' },
            { targets: [13], className: 'dt-head-center' },
            { targets: [14], className: 'dt-head-center' },
            { targets: [15], width: '30px', className: 'dt-center dt-head-center' },
            { targets: [16], width: '30px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', //  portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                    search: 'applied',
                    order: 'applied',
                },
                customize: function (doc) {
                    doc.content.splice(0, 1.5);
                    doc.pageMargins = [40, 60, 20, 30];
                    doc.defaultStyle.fontSize = 5;
                    doc.styles.tableHeader.fontSize = 6;
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
            { "data": "Nombre", title: "Proveedor", width: 'auto' },
            { "data": "TipoDocumento", title: "Documento", width: 'auto', visible: true },
            { "data": "Identificacion", title: "Identificación", width: 'auto', visible: true },
            { "data": "TextoFormaPago", title: "Forma de Pago", width: 'auto' },
            { "data": "TextoPlazoPago", title: "Plazo de Pago", width: 'auto' },
            { "data": "Email", title: "Email", width: 'auto' },
            { "data": "Telefono", title: "Teléfono", width: 'auto' },
            { "data": "Celular", title: "Celular", width: 'auto' },
            { "data": "Contacto", title: "Contacto", width: 'auto' },
            { "data": "Direccion", title: "Dirección", width: 'auto' },
            { "data": "Ciudad", title: "Ciudad", width: 'auto' },
            { "data": "Descripcion", title: "Descripción"},
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarProveedor btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarProveedor btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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