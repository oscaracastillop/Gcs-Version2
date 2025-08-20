
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




