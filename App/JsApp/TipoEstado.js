function ListaTipoEstado(Tipo) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Tipo_Estado/ListaTipoEstado',
        data: {
            Tipo: Tipo
        },
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectEstado").append('<option value="">No hay Datos</option>');
            } else {                
                $.each(resultado, function () {
                    $("#SelectEstado").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}