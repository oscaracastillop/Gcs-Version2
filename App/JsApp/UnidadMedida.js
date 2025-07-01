
function ListaUnidadMedida() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Unidad_Medida/ListaUnidadMedida',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectUnidadMedida").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectUnidadMedida").empty().append('<option value="-1">- Escoge una Und de Medida -</option>');
                $.each(resultado, function () {
                    $("#SelectUnidadMedida").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}