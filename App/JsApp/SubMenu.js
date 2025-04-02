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

function ListaPermisoSubMenu() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/SubMenu/ListaPermisoSubMenu',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectSubMenu").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectSubMenu").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectMenu ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}