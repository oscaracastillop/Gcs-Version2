function ModalEntrada(tipo) {
    $("#TituloModalEntrada").empty().val('');
    $("#LabelIdEntrada").empty().text('');
    $("#SelectCategoria").val(-1);
    $("#SelectProductoxIdCategoria").val();
    $("#SelectProductoxIdCategoria").prop("disabled", true);
    $("#InputLoteProducto").empty().val('');
    $("#InputCantidadProducto").empty().val('');
    $("#InputValorUnitarioProducto").empty().val('');
    $("#InputPorcentajeIvaProducto").empty().val('');
    $("#InputFechaVencimientoProducto").empty().val('');
    $("#InputFechaIngresoAlmacen").empty().val('');
    $("#BotonesModalEntrada").empty();
   
    if (tipo == 'C') {
        $("#TituloModalEntrada").empty().append('<label>CREAR ENTRADA ALMACEN</label>');
        $('#ModalEntrada').modal('show');
        $("#SelectEstadoEntrada").hide();
        $("#BotonesModalEntrada").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearEntrada()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalEntrada").empty().append('<label>EDITAR ENTRADA ALMACEN</label>');
        $('#ModalEntrada').modal('show');
        $("#SelectEstadoEntrada").show();
        $("#BotonesModalEntrada").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarEntrada()">Guardar Cambios</button>');
    }
}


function CrearEntrada() {
    let IdProducto = $('#SelectProductoxIdCategoria').val();
    let Lote = $('#InputLoteProducto').val();
    let Cantidad = $('#InputCantidadProducto').val();
    let ValorUnitarioCompra = $('#InputValorUnitarioCompraProducto').val();
    let PorcentajeIva = $('#InputPorcentajeIvaProducto').val();
    let FechaVencimientoProducto = $('#InputFechaVencimientoProducto').val();
    let FechaIngresoAlmacen = $('#InputFechaIngresoAlmacen').val();


    if (IdProducto == -1 || IdProducto == null || IdProducto == '') {
        $('#SelectProductoxIdCategoria').focus();
        VentanaMensaje('Seleccione el Producto', 'info');
    } else if (Cantidad == null || Cantidad == '' || Cantidad == undefined) {
        $('#InputCantidadProducto').focus();
        VentanaMensaje('Ingrese la Cantidad', 'info');
    } else if (ValorUnitarioCompra == null || ValorUnitarioCompra == '' || ValorUnitarioCompra == undefined) {
        $('#InputValorUnitarioCompraProducto').focus();
        VentanaMensaje('Ingrese el precio unitario de compra del producto', 'info');
    } else if (Cantidad == null || Cantidad == '' || Cantidad == undefined) {
        $('#InputCantidadProducto').focus();
        VentanaMensaje('Ingrese la Cantidad', 'info');
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