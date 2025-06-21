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
                $("#SelectTipoDocumento").empty().append('<option value="-1">- Escoge un tipo de documento -</option>');
                $.each(resultado, function () {
                    $("#SelectTipoDocumento").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}