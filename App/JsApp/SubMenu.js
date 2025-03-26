function ListaSubMenu(Modulo) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/SubMenu/ListaSubMenu',
        data: {
            Usuario: TokenUser,
            Modulo: Modulo
        },
        success: function (resultado) {
            var contador = 0;
            $.each(resultado, function () {
                $("#BotonesSubMenu").append('<a href="' + resultado[contador].Ruta + '" class="btn btnSubMenu" style="background-color:' + resultado[contador].ColorFondo + '" id = "' + resultado[contador].Id + '">' +
                    '' + resultado[contador].IconoCodigoHtml + '<br>' +
                    '<label class="">' + resultado[contador].Nombre + '</label>' +
                    '</a>'
                );
                contador++;
            });
        },
    });
}
