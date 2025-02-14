function ListaMenu() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Menu/ListaMenu',
        data: { Usuario: TokenUser },
        success: function (resultado) {
            var contador = 0;
            $.each(resultado, function () {
                $("#OpcionesMenu").append('<li><a href="' + resultado[contador].Ruta + '" id = "' + resultado[contador].Id + '">' +
                    '' + resultado[contador].IconoCodigoHtml +' '+ resultado[contador].Nombre + '</a>'
                );
                contador++;
            });
        },
    });
}
