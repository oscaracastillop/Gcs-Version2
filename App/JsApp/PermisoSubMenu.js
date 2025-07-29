function ModalPermisoSubMenu(tipo) {    
    $("#TituloModalPermisoSubMenu").empty().val('');
    $("#LabelIdPermisoSubMenu").empty().val('');
    $("#SelectUsuario").val(-1);
    $("#SelectMenu").val(-1);
    $("#SelectSubMenu").val(-1);
    $("#SelectEstadoPermisoSubMenu").val(1);
    $("#SelectEstadoCrearSubMenu").val(2);
    $("#SelectEstadoEditarSubMenu").val(2);
    $("#SelectEstadoEliminarSubMenu").val(2);
    $("#BotonesModalPermisoSubMenu").empty();
    if (tipo == 'C') {
        $("#TituloModalPermisoSubMenu").empty().append('<label>CREAR PERMISO SUB-MENU</label>');
        $("#SelectUsuario").prop("disabled", false);
        $("#SelectMenu").prop("disabled", false);
        $("#SelectSubMenu").prop("disabled", true);
        $('#ModalPermisoSubMenu').modal('show');
        $("#BotonesModalPermisoSubMenu").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearPermisoSubMenu()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalPermisoSubMenu").empty().append('<label>EDITAR PERMISO SUB-MENU</label>');
        $("#SelectUsuario").prop("disabled", true);
        $("#SelectMenu").prop("disabled", true);
        $("#SelectSubMenu").prop("disabled", true);
        $('#ModalPermisoSubMenu').modal('show');
        $("#BotonesModalPermisoSubMenu").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarPermisoSubMenu()">Guardar Cambios</button>');
    }
}

function CrearPermisoSubMenu() {
    let IdUsuarioSubMenu = $('#SelectUsuario').val();
    let IdSubMenu = $('#SelectSubMenu').val();
    let IdPermiso = $('#SelectEstadoPermisoSubMenu').val();
    let IdCrear = $('#SelectEstadoCrearSubMenu').val();
    let IdEditar = $('#SelectEstadoEditarSubMenu').val();
    let IdEliminar = $('#SelectEstadoEliminarSubMenu').val();    

    if (IdUsuarioSubMenu == -1 || IdUsuarioSubMenu == null || IdUsuarioSubMenu == '') {
        $('#SelectUsuario').focus();
        VentanaMensaje('Seleccione un Usuario');
    } else if (IdSubMenu == -1 || IdSubMenu == null || IdSubMenu == '') {
        $('#SelectSubMenu').focus();
        VentanaMensaje('Seleccione un Sub Menú');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Permiso_SubMenu/CrearPermisoSubMenu',
            data: {
                IdUser: TokenUser,
                IdUsuarioSubMenu: IdUsuarioSubMenu,
                IdSubMenu: IdSubMenu,
                Permiso: IdPermiso,
                Crear: IdCrear,
                Editar: IdEditar,
                Eliminar: IdEliminar
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

function ActualizarPermisoSubMenu() {
    let IdPermisoSubMenu = $('#LabelIdPermisoSubMenu').text();//Id Tabla Permiso_SubMenu
    let IdUsuarioSubMenu = $('#SelectUsuario').val();
    let IdSubMenu = $('#SelectSubMenu').val();
    let IdPermiso = $('#SelectEstadoPermisoSubMenu').val();
    let IdCrear = $('#SelectEstadoCrearSubMenu').val();
    let IdEditar = $('#SelectEstadoEditarSubMenu').val();
    let IdEliminar = $('#SelectEstadoEliminarSubMenu').val();   
    if (IdUsuarioSubMenu == -1 || IdUsuarioSubMenu == null || IdUsuarioSubMenu == '') {
        $('#SelectUsuario').focus();
        VentanaMensaje('Seleccione un Usuario');
    } else if (IdSubMenu == -1 || IdSubMenu == null || IdSubMenu == '') {
        $('#SelectSubMenu').focus();
        VentanaMensaje('Seleccione un Menú');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Permiso_SubMenu/ActualizarPermisoSubMenu',
            data: {
                IdUser: TokenUser,
                IdPermisoSubMenu: IdPermisoSubMenu,
                IdUsuarioSubMenu: IdUsuarioSubMenu,
                IdSubMenu: IdSubMenu,
                Permiso: IdPermiso,
                Crear: IdCrear,
                Editar: IdEditar,
                Eliminar: IdEliminar
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

function EliminarPermisoSubMenu(IdPermisoSubMenu) {
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
                url: '/Permiso_SubMenu/EliminarPermisoSubMenu',
                data: {
                    IdUser: TokenUser,
                    IdPermisoSubMenu: IdPermisoSubMenu
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

function GridPermisoSubMenu() {
    var tituloReporte = 'LISTADO DE PERMISO SUB MENU';
    let datatable = $('#gridPermisoSubMenu').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [1], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [2], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [3], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [4], className: 'dt-head-center' },//Crear
            { targets: [5], className: 'dt-head-center' },//Editar
            { targets: [6], className: 'dt-head-center' },//Eliminar
            { targets: [7], className: 'dt-head-center' },//Creado Por
            { targets: [8], className: 'dt-head-center' },//Date Create            
            { targets: [9], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [10], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'portrait', // landscape portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8],
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
                    ModalPermisoSubMenu('C');
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
            {
                title: "Ver",
                data: "PermisoTexto",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.Permiso == 1) {
                        return '<label class="label-estado-activo">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label class="label-estado-inactivo">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            {
                title: "Crear",
                data: "CrearTexto",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.Crear == 1) {
                        return '<label class="label-estado-activo">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label class="label-estado-inactivo">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            {
                title: "Editar",
                data: "EditarTexto",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.Editar == 1) {
                        return '<label class="label-estado-activo">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label class="label-estado-inactivo">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            {
                title: "Eliminar",
                data: "EliminarTexto",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.Eliminar == 1) {
                        return '<label class="label-estado-activo">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label class="label-estado-inactivo">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            { "data": "Usuario", title: "Usuario", width: 'auto' },
            { "data": "NombreMenu", title: "Menú", width: 'auto' },
            { "data": "NombreSubMenu", title: "Sub Menú", width: 'auto' },              
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarPermisoSubMenu btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarPermisoSubMenu btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridPermisoSubMenu').on('click', '.EditarPermisoSubMenu', function () {
        let data = datatable.row($(this).parents()).data();
        ModalPermisoSubMenu('E');
        $('#LabelIdPermisoSubMenu').text(data.Id);
        $('#SelectUsuario').val(data.IdUsuario);
        $('#SelectMenu').val(data.IdMenu);
        $('#SelectSubMenu').val(data.IdSubMenu);
        $('#SelectEstadoPermisoSubMenu').val(data.Permiso);
        $('#SelectEstadoCrearSubMenu').val(data.Crear);
        $('#SelectEstadoEditarSubMenu').val(data.Editar);
        $('#SelectEstadoEliminarSubMenu').val(data.Eliminar);
    })

    $('#gridPermisoSubMenu').on('click', '.EliminarPermisoSubMenu', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarPermisoSubMenu(data.Id);
    })
}