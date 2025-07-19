//function ListaMenu() {
//    $.ajax({
//        type: 'POST',
//        dataType: 'json',
//        url: '/Menu/ListaMenu',
//        data: { Usuario: TokenUser },
//        success: function (resultado) {
//            var contador = 0;
//            $.each(resultado, function () {
//                $("#BotonesMenu").append('<a href="' + resultado[contador].Ruta + '" class="btn btnMenu" style="background-color:' + resultado[contador].ColorFondo + '" id = "' + resultado[contador].Id + '">' +
//                    '' + resultado[contador].IconoCodigoHtml + '<br>' +
//                    '<label class="">' + resultado[contador].Nombre + '</label>' +
//                    '</a>'
//                );
//                contador++;
//            });
//        },
//        //success: function (resultado) {
//        //    var contador = 0;
//        //    $.each(resultado, function () {
//        //        $("#OpcionesMenu").append('<li><a href="' + resultado[contador].Ruta + '" id = "' + resultado[contador].Id + '">' +
//        //            '' + resultado[contador].IconoCodigoHtml +' &nbsp;&nbsp;'+ resultado[contador].Nombre + '</a>'
//        //        );
//        //        contador++;
//        //    });
//        //},
//    });
//}



function ListaMenu() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Menu/ListaMenu',
        data: { Usuario: TokenUser },
        success: function (resultado) {
            var contador = 0;
            $.each(resultado, function () {
                $("#menu").append(
                    '<li class="nav-item" >' +
                    '<a class="nav-link btnmenu" href="' + resultado[contador].Ruta + '">' + resultado[contador].Nombre + '</a>' +
                    /*'<a class="nav-link btnmenu" href="' + resultado[contador].Ruta + '">' + resultado[contador].IconoCodigoHtml + ' &nbsp;&nbsp;' + resultado[contador].Nombre + '</a>' +*/
                    '</li >'
                );
                contador++;
            });
        },
    });
}


function ListaPermisoMenu() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Menu/ListaPermisoMenu',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectMenu").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectMenu").empty().append('<option value="-1">- Escoge un Menú -</option>');
                $.each(resultado, function () {
                    $("#SelectMenu ").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}