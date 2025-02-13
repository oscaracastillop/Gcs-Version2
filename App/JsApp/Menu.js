function ListaMenu() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Menu/ListaMenu',
        data: { Usuario: User },
        success: function (resultado) {
            var contador = 0;
            $.each(resultado, function () {
                $("#MenuBotones").append('<a href="' + resultado[contador].Ruta + '" class="btn botonMenu1" id = "' + resultado[contador].Id + '">' +
                    '' + resultado[contador].IconoCodigoHtml + '<br>' +
                    '<span class="spanMenu"> ' + resultado[contador].Nombre + '</span>' +
                    '</a>'
                );
                contador++;
            });
        },
    });
}



function ListaMenuWeb() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Menu/ListaMenuWeb',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectMenu").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectMenu").empty().append('<option value="-1">Seleccione Menu</option>');
                $.each(resultado, function () {
                    $("#SelectMenu").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function InfoMenu() {
    const Toast = Swal.mixin({ //F2F9FA   EEFBFE
        background: 'white',
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        html: '<div style="font-size:9px!important; text-align:justify">' +
            '<label><strong>Modulo Menu WEB</strong></label>' +
            '<br /><br />' +
            '<label><i class="bi-dot"></i> En este modulo podrá configurar de los distintos Modulos(Menu WEB) del <strong>Aplicativo WEB GCS</strong>.</label>' +
            '<br /><br />' +
            '<label><i class="bi-dot"></i> Podrá configurar los modulos con Iconos, tamaño, color, orden según su necesidad.</label>' +
            '<br /><br />' +
            '<label><i class="bi-dot"></i> Dependiendo del ROL que tenga asignado el Usuario en el en <strong>Aplicativo WEB GCS</strong> podrá realizar las siguientes acciones Crear, editar o eliminar.</label>' +
            '</div > ',
    });
}

function GridMenu() {
        var tituloReporte = 'REPORTE MENU';
        let datatable = $('#gridMenu').DataTable({
            scrollCollapse: true,
            scrollY: '800px',
            scrollX: true,
            dom: 'B<"clear">frtip',
            columnDefs: [
                { targets: [0], width: '350px', className: 'dt-left dt-head-center' },//MENU
                { targets: [1], width: '200px', className: 'dt-center dt-head-center' },//IMAGEN
                { targets: [2], width: '250px', className: 'dt-left dt-head-center' },//ICONO
                { targets: [3], width: '300px', className: 'dt-center dt-head-center' },//TAMAÑO
                { targets: [4], width: '200px', className: 'dt-left dt-head-center' },//COLOR
                { targets: [5], width: '300px', className: 'dt-left dt-head-center' },//RUTA
                { targets: [6], width: '100px', className: 'dt-center dt-head-center' },//ORDEN
                { targets: [7], width: '300px', className: 'dt-center dt-head-center' },//ESTADO
                { targets: [8], width: '30px', className: 'dt-center dt-head-center' },//Editar
                { targets: [9], width: '30px', className: 'dt-center dt-head-center' }//Eliminar
            ],
            buttons: [{
                extend: 'excelHtml5',
                footer: true,
                title: tituloReporte + ' ' + NombreEmpresa,
                filename: tituloReporte + ' - ' + NombreEmpresa + ' ' + jsDate + ' ' + hora,
                text: 'Descargar Excel',
                exportOptions: {
                    columns: [0,2,3,4,5,6,7],
                },
            },
            {
                //download: 'open',
                text: 'Descargar PDF',
                extend: 'pdfHtml5',
                filename: tituloReporte + ' - ' + NombreEmpresa + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', //portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 2,3,4,5,6,7],
                    search: 'applied',
                    order: 'applied',
                },
                customize: function (doc) {
                    doc.content.splice(0, 1.5);
                    doc.pageMargins = [40, 60, 20, 30];
                    doc.defaultStyle.fontSize = 7;
                    doc.styles.tableHeader.fontSize = 7;
                    doc['header'] = (function () {
                        return {
                            columns: [
                                {
                                    image: logoEmpresa64bits,
                                    width: 60,
                                    margin: [20, 0]
                                },
                                {
                                    alignment: 'left',
                                    italics: true,
                                    text: NombreEmpresa,
                                    fontSize: 18,
                                    margin: [30, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: tituloReporte
                                }
                            ],
                            margin: 20
                        }
                    });
                    doc['footer'] = (function (page, pages) {
                        return {
                            columns: [
                                {
                                    alignment: 'left',
                                    text: GCS + ' ' + now
                                },
                                {
                                    alignment: 'right',
                                    text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
                                }
                            ],
                            margin: 20
                        }
                    });
                    var objLayout = {};
                    objLayout['hLineWidth'] = function (i) { return .5; };
                    objLayout['vLineWidth'] = function (i) { return .5; };
                    objLayout['hLineColor'] = function (i) { return '#aaa'; };
                    objLayout['vLineColor'] = function (i) { return '#aaa'; };
                    objLayout['paddingLeft'] = function (i) { return 4; };
                    objLayout['paddingRight'] = function (i) { return 4; };
                    doc.content[0].layout = objLayout;
                }
            },
            ],
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Menu/GridMenu',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Nombre", title: "MENU" },
            { "data": "IconoCodigoHtml", title: "IMAGEN" },
            { "data": "Icono", title: "ICONO" },
            { "data": "SizeIcono", title: "TAMAÑO" },
            { "data": "Color", title: "COLOR" },
            { "data": "Ruta", title: "RUTA" },
            { "data": "Orden", title: "ORDEN" },
            { "data": "Estado", title: "ESTADO" },
            {
                title: "EDITAR",
                data: null,
                defaultContent: '<a href="#" class="EditarMenu" title="Editar"><i class="bi-pencil-fill" style="Color:green"></i></a>',
                className: '',
                orderable: false,
                width: 50,
            },
            {
                title: "ELIMINAR",
                data: null,
                defaultContent: '<a href="#" class="EliminarMenu" title="Eliminar"><i class="bi-trash-fill" style="Color:red"></i></a>',
                className: '',
                orderable: false,
                width: 50,
            },
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
        },
        lengthMenu: [
            [10, 25, 50, -1],
            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });

    $('#gridMenu').on('click', '.EditarMenu', function () {
        ModalMenu('E');
        let data = datatable.row($(this).parents()).data();
        $('#IdMenu').text(data.Id);
        $('#InputMenu').val(data.Nombre);
        $('#InputIcono').val(data.Icono);
        $('#InputSizeIcono').val(data.SizeIcono);
        $('#InputColor').val(data.Color);
        $('#InputRuta').val(data.Ruta);
        $('#InputRuta').val(data.Ruta);
        $('#InputOrden').val(data.Orden);
    })

    $('#gridMenu').on('click', '.EliminarMenu', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarMenu').modal('show');
        $('#IdMenu').text(data.Id);
        $('#MensajeEliminarMenu').text('Esta seguro de eliminar el menu ' + data.Nombre + ' ?. ');
    })
}

function ModalMenu(tipo) {
    var seletcEstado = document.getElementById('SelectEstado');

    if (tipo == 'C') {
        LimpiarFormularioMenu();
        $("#IdMenu").text(0);
        $('#TituloModal').text('NUEVO MENU WEB');
        $('#SelectEstado').val(1);
        seletcEstado.disabled = true;
    } else {
        LimpiarFormularioMenu();
        $('#TituloModal').text('EDITAR MENU WEB');
        seletcEstado.disabled = false;
    }
    $('#ModalMenu').modal('show');
}
function LimpiarFormularioMenu() {
    $("#IdMenu").empty().text('');
    $("#InputMenu").empty().val('');
    $("#InputIcono").empty().val('');
    $("#InputSizeIcono").empty().val('');
    $("#InputColor").empty().val('');
    $("#InputRuta").empty().val('');
    $("#InputOrden").empty().val('');

}

function EliminarMenu() {
    let IdMenu = $('#IdMenu').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Menu/EliminarMenu',
        data: {
            IdUser: User,
            IdMenu: IdMenu
        },
        success: function (resultado) {
            valor = resultado.split('*');
            if (valor[0] == 'OK') {
                Swal.fire({
                    title: 'Mensaje del Sistema',
                    text: valor[1],
                    icon: 'success',
                }).then((result) => {
                    location.reload();
                })
            } else {
                Swal.fire('Mensaje del Sistema', valor[1], 'info');
            }
        }
    });
}

function GuardarDatosMenu() {
    let IdMenu = $('#IdMenu').text();
    let Menu = $('#InputMenu').val();
    let Icono = $('#InputIcono').val();
    let SizeIcono = $('#InputSizeIcono').val();
    let Color = $('#InputColor').val();
    let Ruta = $('#InputRuta').val();
    let Orden = $('#InputOrden').val();
    let Activo = $('#SelectEstado').val();

    if (Menu == null || Menu == '' || Menu == undefined) {
        $('#InputMenu').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese nombre del Menu', 'info');
    } else if (Icono == null || Icono == '' || Icono == undefined) {
        $('#InputIcono').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese el icono', 'info');
    } else if (SizeIcono == null || SizeIcono == '' || SizeIcono == undefined) {
        $('#InputSizeIcono').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese el tamaño del icono', 'info');
    } else if (Color == null || Color == '' || Color == undefined) {
        $('#InputColor').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese el color del icono', 'info');
    } else if (Ruta == null || Ruta == '' || Ruta == undefined) {
        $('#InputRuta').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese la Ruta del menu', 'info');
    } else if (Orden == null || Orden == '' || Orden == undefined) {
        $('#InputOrden').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese el orden del menu', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Menu/GuardarDatosMenu',
            data: {
                IdUser: User,
                IdMenu: IdMenu,
                Menu: Menu,
                Icono: Icono,
                SizeIcono: SizeIcono,
                Color: Color,
                Ruta: Ruta,
                Orden: Orden,
                Activo: Activo
            },
            success: function (resultado) {
                valor = resultado.split('*');
                if (valor[0] == 'OK') {
                    Swal.fire({
                        title: 'Mensaje del Sistema',
                        text: valor[1],
                        icon: 'success',
                    }).then((result) => {
                        window.location.href = '/Menu';
                    })
                } else {
                    Swal.fire('Mensaje del Sistema', valor[1], 'info');
                }
            }
        });
    }
}