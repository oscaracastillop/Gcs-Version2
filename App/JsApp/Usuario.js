function ModalUsuario(tipo) {
    $("#TituloModalUsuario").empty().val('');
    $("#LabelIdUsuario").empty().val('');
    $("#InputUsuario").empty().val('');   
    $("#InputPassword").empty().val('');
    $("#InputEmailUsuario").empty().val('');
    $("#InputNombreUsuario").empty().val('');
    $("#InputFechaVigencia").empty().val('');
    $("#BotonesModalUsuario").empty();
    if (tipo == 'C') {
        $("#TituloModalUsuario").empty().append('<label>Crear Usuario</label>');
        $('#ModalUsuario').modal('show');
        $("#SelectEstadoUsuario").hide();
        $("#BotonesModalUsuario").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearUsuario()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalUsuario").empty().append('<label>Editar Usuario</label>');
        $('#ModalUsuario').modal('show');
        $("#SelectEstadoUsuario").show();
        $("#BotonesModalUsuario").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarUsuario()">Guardar Cambios</button>');
    }
}

function CrearUsuario() {
    let Usuario = $('#InputUsuario').val();
    let Password = $('#InputPassword').val();
    let Email = $('#InputEmailUsuario').val();
    let NombreUsuarioLogin = $('#InputNombreUsuario').val();
    let FechaVigencia = $('#InputFechaVigencia').val();

    if (Usuario == null || Usuario == '' || Usuario == undefined) {
        $('#InputUsuario').focus();
        VentanaMensaje('Ingrese usuario / login', 'info');
    } else if (Password == null || Password == '' || Password == undefined) {
        $('#InputPassword').focus();
        VentanaMensaje('Ingrese el password / login', 'info');
    } else if (FechaVigencia == null || FechaVigencia == '' || FechaVigencia == undefined) {
        $('#InputFechaVigencia').focus();
        VentanaMensaje('Ingrese la fecha de expiración del usuario', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Usuario/CrearUsuario',
            data: {
                IdUser: TokenUser,
                Usuario: Usuario,
                Password: Password,
                Email: Email,
                NombreUsuarioLogin: NombreUsuarioLogin,
                FechaVigencia: FechaVigencia
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

function ActualizarUsuario() {
    let IdUsuarioLogin = $('#LabelIdUsuario').text();
    let Usuario = $('#InputUsuario').val();
    let Password = $('#InputPassword').val();
    let Email = $('#InputEmailUsuario').val();
    let NombreUsuarioLogin = $('#InputNombreUsuario').val();
    let FechaVigencia = $('#InputFechaVigencia').val();
    let IdEstado = $('#SelectEstado').val();

    if (Usuario == null || Usuario == '' || Usuario == undefined) {
        $('#InputUsuario').focus();
        VentanaMensaje('Ingrese usuario / login', 'info');
    } else if (Password == null || Password == '' || Password == undefined) {
        $('#InputPassword').focus();
        VentanaMensaje('Ingrese el password / login', 'info');
    } else if (FechaVigencia == null || FechaVigencia == '' || FechaVigencia == undefined) {
        $('#InputFechaVigencia').focus();
        VentanaMensaje('Ingrese la fecha de expiración del usuario', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Usuario/ActualizarUsuario',
            data: {
                IdUser: TokenUser,
                IdUsuarioLogin: IdUsuarioLogin,
                Usuario: Usuario,
                Password: Password,
                Email: Email,
                NombreUsuarioLogin: NombreUsuarioLogin,
                FechaVigencia: FechaVigencia,
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

function EliminarUsuario(IdUsuario) {
    Swal.fire({
        title: 'Eliminar Usuario',
        text: '¿Está seguro de eliminar el usuario seleccionado?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'orangered',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Usuario/EliminarUsuario',
                data: {
                    IdUser: TokenUser,
                    IdUsuario: IdUsuario
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
    });
}

function GridUsuario() {
    var tituloReporte = 'LISTADO DE USUARIOS';
    let datatable = $('#gridUsuario').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], className: 'dt-head-center' },// Propietario
            { targets: [1], className: 'dt-head-center' },// Usuario/Login
            { targets: [2], className: 'dt-head-center' },// Email
            { targets: [3], className: 'dt-head-center' },// Fecha Vigencia
            { targets: [4], className: 'dt-head-center' },// Creado por
            { targets: [5], className: 'dt-head-center' },// Fecha Creación
            { targets: [6], width: '150px', className: 'dt-center dt-head-center' },//Estado
            { targets: [7], width: '100px', className: 'dt-center dt-head-center' }
        ],
        buttons: [
            {
                extend: 'excel', className: 'btn btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn btn-pdf-datatable',
                text: 'Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'portrait', // landscape
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6],
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
                    ModalUsuario('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Usuario/GridUsuario',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "NombreUsuario", title: "Propietario", width: 'auto' },
            { "data": "Usuario", title: "Usuario/Login", width: 'auto' },
            { "data": "Email", title: "Email", width: 'auto' },
            { "data": "TextoFechaVigencia", title: "Fecha Expiración", width: 'auto' },
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
                    '<a class="EditarUsuario btn btn-editar-dt" title="Editar Registro">Editar</a>&nbsp;&nbsp;<a class="EliminarUsuario btn btn-eliminar-dt" title="Eliminar Registro" style="color:red">Eliminar</a>' +
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

    $('#gridUsuario').on('click', '.EditarUsuario', function () {
        let data = datatable.row($(this).parents()).data();
        ModalUsuario('E');
        $('#LabelIdUsuario').text(data.Id);
        $('#InputUsuario').val(data.Usuario);
        $('#InputPassword').val(data.Password);
        $('#InputEmailUsuario').val(data.Email);
        $('#InputNombreUsuario').val(data.NombreUsuario);
        $('#InputFechaVigencia').val(data.FechaVigencia);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridUsuario').on('click', '.EliminarUsuario', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarUsuario(data.Id);
    })
}

function ListaUsuario() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Usuario/ListaUsuario',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectUsuario").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectUsuario").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectUsuario ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Usuario + '</option>');
                    contador++;
                });
            }
        },
    });
}