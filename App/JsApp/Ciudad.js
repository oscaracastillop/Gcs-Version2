
function ListaCiudad() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Ciudad/ListaCiudad',
        data: {},
        success: function (resultado) {
            var contador = 0;

            if (resultado.length == 0) {
                $("#SelectCiudad").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectCiudad").empty().append('<option value="-1">- Escoge una Ciudad -</option>');
                $.each(resultado, function () {
                    $("#SelectCiudad").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }

        },
    });
}

function ListaCiudadExpedicionRL() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Ciudad/ListaCiudad',
        data: {},
        success: function (resultado) {
            var contador = 0;

            if (resultado.length == 0) {
                $("#SelectCiudadExpedicionRL").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectCiudadExpedicionRL").empty().append('<option value="-1">- Escoge una Ciudad -</option>');
                $.each(resultado, function () {
                    $("#SelectCiudadExpedicionRL").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }

        },
    });
}






































