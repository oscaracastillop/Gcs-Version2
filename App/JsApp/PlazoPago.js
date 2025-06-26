function ListaPlazoPago() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Plazo_Pago/ListaPlazoPago',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectPlazoPago").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectPlazoPago").empty().append('<option value="-1">- Escoge un Plazo de Pago -</option>');
                $.each(resultado, function () {
                    $("#SelectPlazoPago ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}