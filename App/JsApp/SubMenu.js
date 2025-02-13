function InfoSubMenu() {
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
            '<label><strong>Modulo SubMenu WEB</strong></label>' +
            '<br /><br />' +
            '<label><i class="bi-dot"></i> En este modulo podrá configurar de los distintos SubModulos(SubMenu WEB) del <strong>Aplicativo WEB GCS</strong>.</label>' +
            '<br /><br />' +
            '<label><i class="bi-dot"></i> Podrá configurar los modulos con Iconos, tamaño, color, orden según su necesidad.</label>' +
            '<br /><br />' +
            '<label><i class="bi-dot"></i> Dependiendo del ROL que tenga asignado el Usuario en el en <strong>Aplicativo WEB GCS</strong> podrá realizar las siguientes acciones Crear, editar o eliminar.</label>' +
            '</div > ',
    });
}


function ListaSubMenu(Modulo) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/SubMenu/ListaSubMenu',
        data: {
            Usuario: User,
            Modulo: Modulo
        },
        success: function (resultado) {
            var contador = 0;
            $.each(resultado, function () {
                $("#SubMenuBotones").append('<a href="' + resultado[contador].Ruta + '"class="btn botonMenu2" id = "' + resultado[contador].Id + '">' +
                    '' + resultado[contador].IconoCodigoHtml + '<br>' +
                    '<span class="spanMenu"> ' + resultado[contador].Nombre + '</span>' +
                    '</a>'
                );
                contador++;
            });
        },
    });
}

function ListaSubMenuWeb() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/SubMenu/ListaSubMenuWeb',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectSubMenu").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectSubMenu").empty().append('<option value="-1">Seleccione Sub-Menu</option>');
                $.each(resultado, function () {
                    $("#SelectSubMenu").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function GridSubMenu() {
    var tituloReporte = 'REPORTE SUBMENU';
    let datatable = $('#gridSubMenu').DataTable({
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], width: '350px', className: 'dt-left dt-head-center' },//MENU
            { targets: [1], width: '350px', className: 'dt-left dt-head-center' },//SUBMENU
            { targets: [2], width: '200px', className: 'dt-center dt-head-center' },//IMAGEN
            { targets: [3], width: '250px', className: 'dt-left dt-head-center' },//ICONO
            { targets: [4], width: '300px', className: 'dt-center dt-head-center' },//TAMAÑO
            { targets: [5], width: '200px', className: 'dt-left dt-head-center' },//COLOR
            { targets: [6], width: '300px', className: 'dt-left dt-head-center' },//RUTA            
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
                columns: [0, 1, 3, 4, 5, 6, 7],
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
                columns: [0, 1, 3, 4, 5, 6, 7],
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
            "url": '/SubMenu/GridSubMenu',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "NombreMenu", title: "MENU" },
            { "data": "NombreSubMenu", title: "SUBMENU" },
            { "data": "IconoCodigoHtml", title: "IMAGEN" },
            { "data": "Icono", title: "ICONO" },
            { "data": "SizeIcono", title: "TAMAÑO" },
            { "data": "Color", title: "COLOR" },            
            { "data": "Ruta", title: "RUTA" },
            { "data": "Estado", title: "ESTADO" },
            {
                title: "EDITAR",
                data: null,
                defaultContent: '<a href="#" class="EditarSubMenu" title="Editar"><i class="bi-pencil-fill" style="Color:green"></i></a>',
                className: '',
                orderable: false,
                width: 50,
            },
            {
                title: "ELIMINAR",
                data: null,
                defaultContent: '<a href="#" class="EliminarSubMenu" title="Eliminar"><i class="bi-trash-fill" style="Color:red"></i></a>',
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

    $('#gridSubMenu').on('click', '.EditarSubMenu', function () {
        ModalSubMenu('E');
        let data = datatable.row($(this).parents()).data();
        $('#IdSubMenu').text(data.Id);
        $('#SelectMenu').val(data.IdMenu);
        $('#InputSubMenu').val(data.NombreSubMenu);
        $('#InputIconoSubMenu').val(data.Icono);
        $('#InputSizeIconoSubMenu').val(data.SizeIcono);
        $('#InputColorSubMenu').val(data.Color);
        $('#InputRutaSubMenu').val(data.Ruta);
        $('#SelectEstado').val(data.IdActivo);
    })

    $('#gridSubMenu').on('click', '.EliminarSubMenu', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalEliminarSubMenu').modal('show');
        $('#IdSubMenu').text(data.Id);
        $('#MensajeEliminarSubMenu').text('Esta seguro de eliminar el submenu ' + data.Nombre + ' ?. ');
    })
}

function ModalSubMenu(tipo) {
    var seletcEstado = document.getElementById('SelectEstado');

    if (tipo == 'C') {
        LimpiarFormularioSubMenu();
        $("#IdSubMenu").text(0);
        $('#TituloModal').text('NUEVO SUBMENU');
        $('#SelectEstado').val(1);
        seletcEstado.disabled = true;
    } else {
        LimpiarFormularioSubMenu();
        $('#TituloModal').text('EDITAR SUBMENU');
        seletcEstado.disabled = false;
    }
    $('#ModalSubMenu').modal('show');
}
function LimpiarFormularioSubMenu() {

    $("#IdSubMenu").empty().text('');
    $("#SelectMenu").val(-1);
    $("#InputSubMenu").empty().val('');
    $("#InputIconoSubMenu").empty().val('');
    $("#InputSizeIconoSubMenu").empty().val('');
    $("#InputColorSubMenu").empty().val('');
    $("#InputRutaSubMenu").empty().val('');   

}

function EliminarSubMenu() {
    let IdSubMenu = $('#IdSubMenu').text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/SubMenu/EliminarSubMenu',
        data: {
            IdUser: User,
            IdSubMenu: IdSubMenu
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

function GuardarDatosSubMenu() {
    let IdSubMenu = $('#IdSubMenu').text();
    let IdMenu = $('#SelectMenu').val();
    let SubMenu = $('#InputSubMenu').val();
    let Icono = $('#InputIconoSubMenu').val();
    let SizeIcono = $('#InputSizeIconoSubMenu').val();
    let Color = $('#InputColorSubMenu').val();
    let Ruta = $('#InputRutaSubMenu').val();
    let Activo = $('#SelectEstado').val();

    if (IdMenu == -1 || IdMenu == null || IdMenu == '') {
        $('#SelectMenu').focus();
        Swal.fire('Mensaje del Sistema', 'Seleccione un menu', 'info');
    } else if (SubMenu == null || SubMenu == '' || SubMenu == undefined) {
        $('#InputSubMenu').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese nombre del SubMenu', 'info');
    } else if (Icono == null || Icono == '' || Icono == undefined) {
        $('#InputIconoSubMenu').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese el icono', 'info');
    } else if (SizeIcono == null || SizeIcono == '' || SizeIcono == undefined) {
        $('#InputSizeIconoSubMenu').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese el tamaño del icono', 'info');
    } else if (Color == null || Color == '' || Color == undefined) {
        $('#InputColorSubMenu').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese el color del icono', 'info');
    } else if (Ruta == null || Ruta == '' || Ruta == undefined) {
        $('#InputRutaSubMenu').focus();
        Swal.fire('Mensaje del Sistema', 'Ingrese la Ruta del menu', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/SubMenu/GuardarDatosSubMenu',
            data: {
                IdUser: User,
                IdSubMenu: IdSubMenu,
                IdMenu: IdMenu,
                SubMenu: SubMenu,
                Icono: Icono,
                SizeIcono: SizeIcono,
                Color: Color,
                Ruta: Ruta,
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
                        window.location.href = '/SubMenu';
                    })
                } else {
                    Swal.fire('Mensaje del Sistema', valor[1], 'info');
                }
            }
        });
    }
}