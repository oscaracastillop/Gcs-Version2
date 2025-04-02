function ModalPermisoSubMenu(tipo) {    
    $("#TituloModalPermisoSubMenu").empty().val('');
    $("#LabelIdPermisoSubMenu").empty().val('');
    $("#SelectUsuario").val(-1);
    $("#SelectMenu").val(-1);
    $("#SelectSubMenu").val(-1);
    $("#SelectEstadoPermisoSubMenu").val(1);
    $("#SelectEstadoCrearSubMenu").val(0);
    $("#SelectEstadoEditarSubMenu").val(0);
    $("#SelectEstadoEliminarSubMenu").val(0);
    $("#BotonesModalPermisoSubMenu").empty();
    if (tipo == 'C') {
        $("#TituloModalPermisoSubMenu").empty().append('<label>Crear Permiso Sub Menu</label>');
        $('#ModalPermisoSubMenu').modal('show');
        $("#BotonesModalPermisoSubMenu").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearPermisoSubMenu()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalPermisoSubMenu").empty().append('<label>Editar Permiso Sub Menu</label>');
        $('#ModalPermisoSubMenu').modal('show');
        $("#BotonesModalPermisoSubMenu").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarPermisoSubMenu()">Guardar Cambios</button>');
    }
}

function CrearPermisoSubMenu() {
    let IdUsuarioSubMenu = $('#SelectUsuario').val();
    let IdSubMenu = $('#SelectMenu').val();
    let IdPermiso = $('#SelectEstadoPermisoSubMenu').val();
    let IdCrear = $('#SelectEstadoCrearSubMenu').val();
    let IdEditar = $('#SelectEstadoEditarSubMenu').val();
    let IdEliminar = $('#SelectEstadoEliminarSubMenu').val();    

    if (IdUsuarioSubMenu == -1 || IdUsuarioSubMenu == null || IdUsuarioSubMenu == '') {
        $('#SelectUsuario').focus();
        VentanaMensaje('Seleccione un Usuario', 'info');
    } else if (IdSubMenu == -1 || IdSubMenu == null || IdSubMenu == '') {
        $('#SelectSubMenu').focus();
        VentanaMensaje('Seleccione un Sub Menú', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Permiso_SubMenu/CrearPermisoSubMenu',
            data: {
                IdUser: TokenUser,
                IdUsuarioMenu: IdUsuarioMenu,
                IdMenu: IdMenu,
                Permiso: IdPermiso,
                Crear: IdCrear,
                Editar: IdEditar,
                Eliminar: IdEliminar
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

function ActualizarPermisoSubMenu() {
    let IdPermisoSubMenu = $('#LabelIdPermisoSubMenu').text();//Id Tabla Permiso_SubMenu
    let IdUsuarioSubMenu = $('#SelectUsuario').val();
    let IdSubMenu = $('#SelectMenu').val();
    let IdPermiso = $('#SelectEstadoPermisoSubMenu').val();
    let IdCrear = $('#SelectEstadoCrearSubMenu').val();
    let IdEditar = $('#SelectEstadoEditarSubMenu').val();
    let IdEliminar = $('#SelectEstadoEliminarSubMenu').val();   

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
            url: '/Permiso_SubMenu/ActualizarPermisoSubMenu',
            data: {
                IdUser: TokenUser,
                IdPermisoSubMenu: IdPermisoSubMenu,
                IdUsuarioMenu: IdUsuarioMenu,
                IdMenu: IdMenu,
                Permiso: IdPermiso,
                Crear: IdCrear,
                Editar: IdEditar,
                Eliminar: IdEliminar
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

function EliminarPermisoSubMenu(IdPermisoSubMenu) {
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
                url: '/Permiso_SubMenu/EliminarPermisoSubMenu',
                data: {
                    IdUser: TokenUser,
                    IdPermisoSubMenu: IdPermisoSubMenu
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

function GridPermisoSubMenu() {
    var tituloReporte = 'LISTADO DE PERMISO SUB MENU';
    let datatable = $('#gridPermisoSubMenu').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], className: 'dt-head-center' },//Usuario
            { targets: [1], className: 'dt-head-center' },//Menu
            { targets: [2], className: 'dt-head-center' },//Sub Menu
            { targets: [2], width: '150px', className: 'dt-center dt-head-center' },//Estado
            { targets: [3], className: 'dt-head-center' },//Creado Por
            { targets: [4], className: 'dt-head-center' },//Date Create            
            { targets: [5], width: '100px', className: 'dt-center dt-head-center' }//Acciones
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
                    ModalPermisoMenu('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Permiso_SubMenu/GridPermisoSubMenu',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Usuario", title: "Usuario", width: 'auto' },
            { "data": "NombreMenu", title: "Menú", width: 'auto' },
            { "data": "NombreSubMenu", title: "Sub Menú", width: 'auto' },
            {
                title: "Ver",
                data: "VerTexto",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.Permiso == 1) {
                        return '<label style="background-color:green; padding:2px;border-radius:5px;font-size:11px!important; color:white">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label style="background-color:red; padding:2px;border-radius:5px;font-size:11px!important; color: white">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            {
                title: "Crear",
                data: "CrearTexto",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.Permiso == 1) {
                        return '<label style="background-color:green; padding:2px;border-radius:5px;font-size:11px!important; color:white">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label style="background-color:red; padding:2px;border-radius:5px;font-size:11px!important; color: white">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            {
                title: "Editar",
                data: "EditarTexto",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.Permiso == 1) {
                        return '<label style="background-color:green; padding:2px;border-radius:5px;font-size:11px!important; color:white">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label style="background-color:red; padding:2px;border-radius:5px;font-size:11px!important; color: white">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            {
                title: "Eliminar",
                data: "EliminarTexto",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.Permiso == 1) {
                        return '<label style="background-color:green; padding:2px;border-radius:5px;font-size:11px!important; color:white">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label style="background-color:red; padding:2px;border-radius:5px;font-size:11px!important; color: white">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },

            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "Acciones",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<a class="EditarPermisoMenu btn btn-editar-dt" title="Editar Registro">Editar</a>&nbsp;&nbsp;<a class="EliminarPermisoMenu btn btn-eliminar-dt" title="Eliminar Registro" style="color:red">Eliminar</a>' +
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

    $('#gridPermisoSubMenu').on('click', '.EditarPermisoSubMenu', function () {
        let data = datatable.row($(this).parents()).data();
        ModalPermisoSubMenu('E');
        $('#LabelIdPermisoSubMenu').text(data.Id);
        $('#SelectUsuario').val(data.IdUsuario);
        $('#SelectMenu').val(data.IdMenu);
        $('#SelectSubMenu').val(data.IdSubMenu);
        $('#SelectEstadoPermisoSubMenu').val(data.Permiso);
    })

    $('#gridPermisoMenu').on('click', '.EliminarPermisoMenu', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarPermisoMenu(data.Id);
    })
}