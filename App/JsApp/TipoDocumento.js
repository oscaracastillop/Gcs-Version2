function ListaTipoDocumento(Tipo) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Tipo_Documento/ListaTipoDocumento',
        data: {
            Tipo: Tipo
        },
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectTipoDocumento").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectTipoDocumento").empty().append('<option value="-1">- Escoge un Tipo de Documento -</option>');
                $.each(resultado, function () {
                    $("#SelectTipoDocumento").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function ListaTipoDocumentoRL(Tipo) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Tipo_Documento/ListaTipoDocumento',
        data: {
            Tipo: Tipo
        },
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectTipoDocumentoRL").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectTipoDocumentoRL").empty().append('<option value="-1">- Escoge un Tipo de Documento -</option>');
                $.each(resultado, function () {
                    $("#SelectTipoDocumentoRL").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}