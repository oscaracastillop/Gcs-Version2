
function ModalCotizacion(tipo) {
    $("#TituloModalBanco").empty().val('');
    $("#LabelIdBanco").empty().val('');
    $("#InputNombreBanco").empty().val('');
    $("#BotonesModalBanco").empty();
    GridTDetalleCotizacion();
   
    if (tipo == 'C') {
        $("#TituloModalBanco").empty().append('<label>CREAR BANCO</label>');
        $('#ModalCotizacion').modal('show');
        $("#SelectEstadoBanco").hide();
        $("#BotonesModalBanco").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearBanco()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalBanco").empty().append('<label>EDITAR BANCO</label>');
        $('#ModalCotizacion').modal('show');
        $("#SelectEstadoBanco").show();
        $("#BotonesModalBanco").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarBanco()">Guardar Cambios</button>');
    }
}


function CrearCotizacion() {
    let IdCliente = $('#SelectCliente').val();

    if (IdCliente == -1 || IdCliente == '' || IdCliente == undefined) {
        $('#SelectCliente').focus();
        VentanaMensaje('Seleccione el Cliente');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Cotizacion/CrearCotizacion',
            data: {
                IdUser: TokenUser,
                IdCliente: IdCliente
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


