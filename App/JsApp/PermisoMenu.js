function ModalPermisoMenu(tipo) {
    var seletcEstado = document.getElementById('SelectEstadoPermisoMenu');
    $("#TituloModalPermisoMenu").empty().val('');
    $("#LabelIdPermisoMenu").empty().val('');
    $("#SelectUsuario").val(-1);
    $("#SelectMenu").val(-1);
    $("#SelectEstadoPermisoMenu").val(1);
    $("#BotonesModalPermisoMenu").empty();
    if (tipo == 'C') {
        $("#TituloModalPermisoMenu").empty().append('<label>Crear Permiso Menu</label>');
        $('#ModalPermisoMenu').modal('show');
        $("#BotonesModalPermisoMenu").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearPermisoMenu()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalPermisoMenu").empty().append('<label>Editar Permiso Menu</label>');
        $('#ModalPermisoMenu').modal('show');
        $("#BotonesModalPermisoMenu").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarPermisoMenu()">Guardar Cambios</button>');
    }
}

function CrearPermisoMenu() {
    let IdUsuarioMenu = $('#SelectUsuario').val();
    let IdMenu = $('#SelectMenu').val();
    let IdPermiso = $('#SelectEstadoPermisoMenu').val();

    if (IdUsuarioMenu == -1 || IdUsuarioMenu == null || IdUsuarioMenu == '') {
        $('#SelectUsuario').focus();
        VentanaMensaje('Seleccione un Usuario', 'info');
    } else if (IdMenu == -1 || IdMenu == null || IdMenu == '') {
        $('#SelectMenu').focus();
        VentanaMensaje('Seleccione un Menú', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Permiso_Menu/CrearPermisoMenu',
            data: {
                IdUser: TokenUser,
                IdUsuarioMenu: IdUsuarioMenu,
                IdMenu: IdMenu,
                Permiso: IdPermiso
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

function ActualizarPermisoMenu() {
    let IdPermisoMenu = $('#LabelIdPermisoMenu').text();//Id Tabla Permiso_Menu
    let IdUsuarioMenu = $('#SelectUsuario').val();
    let IdMenu = $('#SelectMenu').val();
    let IdPermiso = $('#SelectEstadoPermisoMenu').val();
    

    if (IdUsuarioMenu == -1 || IdUsuarioMenu == null || IdUsuarioMenu == '') {
        $('#SelectUsuario').focus();
        VentanaMensaje('Seleccione un Usuario', 'info');
    } else if (IdMenu == -1 || IdMenu == null || IdMenu == '') {
        $('#SelectMenu').focus();
        VentanaMensaje('Seleccione un Menú', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Permiso_Menu/ActualizarPermisoMenu',
            data: {
                IdUser: TokenUser,
                IdPermisoMenu: IdPermisoMenu,
                IdUsuarioMenu: IdUsuarioMenu,
                IdMenu: IdMenu,
                Permiso: IdPermiso
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

function EliminarPermisoMenu(IdPermisoMenu) {
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
                url: '/Permiso_Menu/EliminarPermisoMenu',
                data: {
                    IdUser: TokenUser,
                    IdPermisoMenu: IdPermisoMenu
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

function GridPermisoMenu() {
    var tituloReporte = 'LISTADO DE PERMISO MENU';
    let datatable = $('#gridPermisoMenu').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },//Usuario
            { targets: [1], className: 'dt-head-center' },//Menu
            { targets: [2], className: 'dt-head-center' },//Creado Por
            { targets: [3], className: 'dt-head-center' },//Date Create            
            { targets: [4], className: 'dt-center dt-head-center' },
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
                    ModalPermisoMenu('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Permiso_Menu/GridPermisoMenu',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            {
                title: "Visualizar",
                data: "PermisoTexto",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.Permiso == 1) {
                        return '<label class="label-estado-activo">' + data + '</label>';
                    }
                    else {
                        return '<label class="label-estado-inactivo">' + data + '</label>';
                    }
                }

            },
            { "data": "Usuario", title: "Usuario", width: 'auto' },
            { "data": "NombreMenu", title: "Menu", width: 'auto' },            
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },            
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarPermisoMenu btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarPermisoMenu btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridPermisoMenu').on('click', '.EditarPermisoMenu', function () {
        let data = datatable.row($(this).parents()).data();
        ModalPermisoMenu('E');
        $('#LabelIdPermisoMenu').text(data.Id);
        $('#SelectUsuario').val(data.IdUsuario);
        $('#SelectMenu').val(data.IdMenu);
        $('#SelectEstadoPermisoMenu').val(data.Permiso);
    })

    $('#gridPermisoMenu').on('click', '.EliminarPermisoMenu', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarPermisoMenu(data.Id);
    })
}