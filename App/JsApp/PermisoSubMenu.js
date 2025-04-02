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

