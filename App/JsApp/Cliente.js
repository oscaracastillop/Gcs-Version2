function ModalCliente(tipo) {
    $("#TituloModalCliente").empty().val('');
    $("#LabelIdCliente").empty().val('');
    $("#InputNombreCliente").empty().val('');
    $("#SelectTipoDocumento").val(-1);
    $("#InputIdentificacionCliente").empty().val('');
    $("#InputEmailCliente").empty().val('');
    $("#InputTelefonoCliente").empty().val('');
    $("#InputCelularCliente").empty().val('');
    $("#InputContactoCliente").empty().val('');
    $("#SelectFormaPago").val(-1);
    $("#SelectPlazoPago").val(-1);
    $("#InputDescripcionCliente").empty().val('');
    $("#InputDireccionCliente").empty().val('');
    $("#SelectCiudad").val(-1);
    $("#BotonesModalCliente").empty();
    if (tipo == 'C') {
        $("#TituloModalCliente").empty().append('<label>CREAR CLIENTE</label>');
        $('#ModalCliente').modal('show');
        $("#SelectEstadoCliente").hide();
        $("#BotonesModalCliente").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearCliente()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalCliente").empty().append('<label>EDITAR CLIENTE</label>');
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
    let Celular = $('#InputCelularCliente').val();
    let Contacto = $('#InputContactoCliente').val();
    let IdCiudad = $('#SelectCiudad').val();
    let Direccion = $('#InputDireccionCliente').val();
    let IdFormaPago = $('#SelectFormaPago').val();
    let IdPlazoPago = $('#SelectPlazoPago').val();
    let Descripcion = $('#InputDescripcionCliente').val();

    if (NombreCliente == null || NombreCliente == '' || NombreCliente == undefined) {
        $('#InputNombreCliente').focus();
        VentanaMensaje('Ingrese nombre del Cliente');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione tipo documento');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionCliente').focus();
        VentanaMensaje('Ingrese la identificación');
    } else if (IdFormaPago == -1 || IdFormaPago == null || IdFormaPago == '') {
        $('#SelectFormaPago').focus();
        VentanaMensaje('Seleccione la forma de pago');
    } else if (IdPlazoPago == -1 || IdPlazoPago == null || IdPlazoPago == '') {
        $('#SelectPlazoPago').focus();
        VentanaMensaje('Seleccione el plazo de pago');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        VentanaMensaje('Seleccione la ciudad');
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
                Celular: Celular,
                Contacto: Contacto,
                IdCiudad: IdCiudad,
                Direccion: Direccion,
                IdFormaPago: IdFormaPago,
                IdPlazoPago: IdPlazoPago,
                Descripcion: Descripcion
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

function ActualizarCliente() {
    let IdCliente = $('#LabelIdCliente').text();
    let NombreCliente = $('#InputNombreCliente').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let Identificacion = $('#InputIdentificacionCliente').val();
    let Email = $('#InputEmailCliente').val();
    let Telefono = $('#InputTelefonoCliente').val();
    let Celular = $('#InputCelularCliente').val();
    let Contacto = $('#InputContactoCliente').val();
    let IdCiudad = $('#SelectCiudad').val();
    let Direccion = $('#InputDireccionCliente').val();
    let IdFormaPago = $('#SelectFormaPago').val();
    let IdPlazoPago = $('#SelectPlazoPago').val();
    let Descripcion = $('#InputDescripcionCliente').val()
    let IdEstado = $('#SelectEstado').val();

    if (NombreCliente == null || NombreCliente == '' || NombreCliente == undefined) {
        $('#InputNombreCliente').focus();
        VentanaMensaje('Ingrese nombre del Cliente');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione tipo documento');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionCliente').focus();
        VentanaMensaje('Ingrese la identificación');
    } else if (IdFormaPago == -1 || IdFormaPago == null || IdFormaPago == '') {
        $('#SelectFormaPago').focus();
        VentanaMensaje('Seleccione la forma de pago');
    } else if (IdPlazoPago == -1 || IdPlazoPago == null || IdPlazoPago == '') {
        $('#SelectPlazoPago').focus();
        VentanaMensaje('Seleccione el plazo de pago');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        VentanaMensaje('Seleccione la ciudad');
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
                Celular: Celular,
                Contacto: Contacto,
                IdCiudad: IdCiudad,
                Direccion: Direccion,
                IdFormaPago: IdFormaPago,
                IdPlazoPago: IdPlazoPago,
                Descripcion: Descripcion,
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
function EliminarCliente(IdCliente) {
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
                url: '/Cliente/EliminarCliente',
                data: {
                    IdUser: TokenUser,
                    IdCliente: IdCliente
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

function GridCliente() {
    var tituloReporte = 'LISTADO DE CLIENTES';
    let datatable = $('#gridCliente').DataTable({
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
            { targets: [15], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [16], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', //portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
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
                className: 'btn-nuevo-datatable',
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
            "datatype": "json",
            dataSrc: function (json) {
                actualizarDashboard(json.data);
                return json.data;
            }
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
            { "data": "Nombre", title: "Cliente", width: 'auto' },            
            { "data": "TipoDocumento", title: "Documento", width: 'auto', visible: true },
            { "data": "Identificacion", title: "Identificación", width: 'auto', visible: true },
            { "data": "TextoFormaPago", title: "Forma de Pago", width: 'auto' },
            { "data": "TextoPlazoPago", title: "Plazo de Pago", width: 'auto' },
            { "data": "Email", title: "Email", width: 'auto' },
            { "data": "Telefono", title: "Teléfono", width: 'auto' },
            { "data": "Celular", title: "Celular", width: 'auto' },
            { "data": "Contacto", title: "Nombre Contacto", width: 'auto' },
            { "data": "Direccion", title: "Dirección", width: 'auto' },
            { "data": "Ciudad", title: "Ciudad", width: 'auto' },
            { "data": "Descripcion", title: "Descripción" },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },            
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarCliente btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarCliente btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridCliente').on('click', '.EditarCliente', function () {
        let data = datatable.row($(this).parents()).data();
        ModalCliente('E');
        $('#LabelIdCliente').text(data.Id);
        $('#InputNombreCliente').val(data.Nombre);
        $('#SelectTipoDocumento').val(data.IdTipoDocumento);
        $('#InputIdentificacionCliente').val(data.Identificacion);
        $('#InputEmailCliente').val(data.Email);
        $('#InputTelefonoCliente').val(data.Telefono);
        $('#InputCelularCliente').val(data.Celular);
        $('#InputContactoCliente').val(data.Contacto);
        $('#SelectFormaPago').val(data.IdFormaPago);
        $('#SelectPlazoPago').val(data.IdPlazoPago);
        $('#InputDireccionCliente').val(data.Direccion);
        $('#SelectCiudad').val(data.IdCiudad);
        $('#InputDescripcionCliente').val(data.Descripcion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridCliente').on('click', '.EliminarCliente', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarCliente(data.Id);
    })

}

function actualizarDashboard(data) {
    if (!data || data.length === 0) return;

    // 📊 Cálculos generales adaptados al contexto de nómina
    const totalClientes = data.length;
    const clientesActivos = data.filter(x => x.IdEstado === 1).length;
    const clientesInactivos = data.filter(x => x.IdEstado === 2).length;
    const clientesContado = data.filter(x => x.TextoFormaPago === 'Contado').length;
    const clientesCredito = data.filter(x => x.TextoFormaPago === 'Crédito').length;
    const masReciente = data.reduce((latest, x) => new Date(x.DateCreate) > new Date(latest.DateCreate) ? x : latest);

    // Función para formatear números sin ceros innecesarios
    function formatoNumero(valor) {
        return Number(valor).toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    // 🧭 Actualizar tarjetas de cada sección del dashboard
    // === Primera fila ===
    document.getElementById('totalClientes').innerText = formatoNumero(totalClientes);
    document.getElementById('clientesActivos').innerText = formatoNumero(clientesActivos);
    document.getElementById('clientesInactivos').innerText = formatoNumero(clientesInactivos);
    document.getElementById('clientesContado').innerText = formatoNumero(clientesContado);
    document.getElementById('clientesCredito').innerText = formatoNumero(clientesCredito);
    document.getElementById('clienteMasReciente').innerText = masReciente.Nombre;

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
                $("#SelectCliente").empty().append('<option value="-1">- Escoge un Cliente -</option>');
                $.each(resultado, function () {
                    $("#SelectCliente").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}


