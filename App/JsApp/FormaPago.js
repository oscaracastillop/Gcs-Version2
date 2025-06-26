function ListaFormaPago() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Forma_Pago/ListaFormaPago',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectFormaPago").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectFormaPago").empty().append('<option value="-1">- Escoge una Forma de Pago -</option>');
                $.each(resultado, function () {
                    $("#SelectFormaPago ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}