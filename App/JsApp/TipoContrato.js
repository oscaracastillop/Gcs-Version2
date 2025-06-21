function ListaTipoContrato() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Tipo_Contrato/ListaTipoContrato',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectTipoContrato").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectTipoContrato").empty().append('<option value="-1">- Escoge un tipo Contrato -</option>');
                $.each(resultado, function () {
                    $("#SelectTipoContrato").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}