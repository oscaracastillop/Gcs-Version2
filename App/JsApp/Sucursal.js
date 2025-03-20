function ModalSucursal(tipo) {
    $("#TituloModalSucursal").empty().val('');
    $("#LabelIdSucursal").empty().text('');
    $("#SelectEmpresa").val(-1);
    $("#InputNombreSucursal").empty().val('');
    $("#InputEmailSucursal").empty().val('');
    $("#InputTelefonoSucursal").empty().val('');
    $("#InputContactoSucursal").empty().val('');
    $("#InputDireccionSucursal").empty().val('');
    $("#SelectCiudad").val(-1);
    $("#BotonesModalSucursal").empty();
    $("#TituloModalSucursal").empty();
    if (tipo == 'C') {
        $("#TituloModalSucursal").empty().append('<label>Crear Sucursal</label>');
        $('#ModalSucursal').modal('show');
        $("#SelectEstadoSucursal").hide();
        $("#BotonesModalSucursal").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearSucursal()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalSucursal").empty().append('<label>Editar Sucursal</label>');
        $('#ModalSucursal').modal('show');
        $("#SelectEstadoSucursal").show();
        $("#BotonesModalSucursal").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarSucursal()">Guardar Cambios</button>');
    }
}


function CrearSucursal() {
    let IdEmpresa = $('#SelectEmpresa').val();
    let NombreSucursal = $('#InputNombreSucursal').val();
    let Email = $('#InputEmailSucursal').val();
    let Telefono = $('#InputTelefonoSucursal').val();
    let Contacto = $('#InputContactoSucursal').val();
    let IdCiudad = $('#SelectCiudad').val();
    let Direccion = $('#InputDireccionSucursal').val();

    if (IdEmpresa == -1 || IdEmpresa == null || IdEmpresa == '') {
        $('#SelectEmpresa').focus();
        Swal.fire(TituloSwal, 'Seleccione la Empresa', 'info');
    } else if (NombreSucursal == null || NombreSucursal == '' || NombreSucursal == undefined) {
        $('#InputNombreSucursal').focus();
        Swal.fire(TituloSwal, 'Ingrese nombre de la Sucursal', 'info');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        Swal.fire(TituloSwal, 'Seleccione la ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Sucursal/CrearSucursal',
            data: {
                IdUser: TokenUser,
                IdEmpresa: IdEmpresa,
                NombreSucursal: NombreSucursal,
                Email: Email,
                Telefono: Telefono,
                Contacto: Contacto,
                IdCiudad: IdCiudad,
                Direccion: Direccion
            },
            success: function (resultado) {
                valor = resultado.split('*');
                if (valor[0] == 'OK') {
                    Swal.fire({
                        title: TituloSwal,
                        text: valor[1],
                        icon: 'success',
                        position: 'top',
                        confirmButtonColor: "orangered",
                    }).then((result) => {
                        window.location.reload();
                    })
                } else {
                    Swal.fire(TituloSwal, valor[1], 'info');
                }
            }
        });
    }
}

function ActualizarSucursal() {
    let IdSucursal = $('#LabelIdSucursal').text();
    let IdEmpresa = $('#SelectEmpresa').val();
    let NombreSucursal = $('#InputNombreSucursal').val();
    let Email = $('#InputEmailSucursal').val();
    let Telefono = $('#InputTelefonoSucursal').val();
    let Contacto = $('#InputContactoSucursal').val();
    let IdCiudad = $('#SelectCiudad').val();
    let Direccion = $('#InputDireccionSucursal').val();
    let IdEstado = $('#SelectEstado').val();

    if (IdEmpresa == -1 || IdEmpresa == null || IdEmpresa == '') {
        $('#SelectEmpresa').focus();
        Swal.fire(TituloSwal, 'Seleccione la Empresa', 'info');
    } else if (NombreSucursal == null || NombreSucursal == '' || NombreSucursal == undefined) {
        $('#InputNombreSucursal').focus();
        Swal.fire(TituloSwal, 'Ingrese nombre de la Sucursal', 'info');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        Swal.fire(TituloSwal, 'Seleccione la ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Sucursal/ActualizarSucursal',
            data: {
                IdUser: User,
                IdSucursal: IdSucursal,
                IdEmpresa: IdEmpresa,
                NombreSucursal: NombreSucursal,
                Email: Email,
                Telefono: Telefono,
                Contacto: Contacto,
                IdCiudad: IdCiudad,
                Direccion: Direccion,
                IdEstado: IdEstado
            },
            success: function (resultado) {
                valor = resultado.split('*');
                if (valor[0] == 'OK') {
                    Swal.fire({
                        title: TituloSwal,
                        text: valor[1],
                        icon: 'success',
                    }).then((result) => {
                        window.location.reload();
                    })
                } else {
                    Swal.fire(TituloSwal, valor[1], 'info');
                }
            }
        });
    }
}

function EliminarSucursal(IdSucursal) {
    Swal.fire({
        title: TituloSwal,
        text: "Esta seguro(a)?, No podrás revertir esta acción.!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "orangered",
        cancelButtonColor: "#333",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "Cancelar",
        position: 'top'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Sucursal/EliminarSucursal',
                data: {
                    IdUser: TokenUser,
                    IdSucursal: IdSucursal
                },
                success: function (resultado) {
                    valor = resultado.split('*');
                    if (valor[0] == 'OK') {
                        Swal.fire({
                            title: TituloSwal,
                            text: valor[1],
                            icon: 'success',
                            position: 'top',
                            confirmButtonColor: "orangered",
                        }).then((result) => {
                            location.reload();
                        })
                    } else {
                        Swal.fire(TituloSwal, valor[1], 'info');
                    }
                }
            });
        }
    });
}

function GridSucursal() {
    var tituloReporte = 'LISTADO DE SUCURSALES';
    let datatable = $('#gridSucursal').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [9], width: '30px', className: 'dt-center dt-head-center' },
            { targets: [10], width: '30px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: 'Excel',
                exportOptions: {
                    columns: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn btn-pdf-datatable',
                text: 'Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', //portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                    search: 'applied',
                    order: 'applied',
                },
                customize: function (doc) {
                    doc.content.splice(0, 1.5);
                    doc.pageMargins = [40, 60, 20, 30];
                    doc.defaultStyle.fontSize = 6;
                    doc.styles.tableHeader.fontSize = 6;
                    doc['header'] = (function () {
                        return {
                            columns: [
                                //{
                                //    image: logoEmpresabase64,
                                //    width: 180,
                                //    height: 30,
                                //    margin: [20, 0]
                                //},
                                {
                                    italics: true,
                                    fontSize: 10,
                                    text: tituloReporte,
                                    margin: [30, 18]
                                }
                            ],
                            margin: 20
                        }
                    });
                    doc['footer'] = (function (page, pages) {
                        return {
                            columns: [
                                {
                                    fontSize: 5,
                                    alignment: 'left',
                                    text: ' ' + now
                                },
                                {
                                    fontSize: 5,
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
            {
                text: 'Nuevo',
                className: 'btn btn-nuevo-datatable',
                action: function (e, dt, node, config) {
                    ModalSucursal('C');
                }
            }

        ],
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Sucursal/GridSucursal',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            { "data": "Nombre", title: "Sucursal", width: 'auto' },
            { "data": "Empresa", title: "Empresa", width: 'auto' },
            { "data": "Email", title: "Email", width: 'auto' },
            { "data": "Telefono", title: "Teléfono", width: 'auto' },
            { "data": "Contacto", title: "Contacto", width: 'auto' },
            {
                title: "Dirección",
                data: "nombres",
                render: function (data, type, row) {
                    return `${row.Direccion} ${row.Ciudad}`;
                }
                , width: 'auto'
            },
            { "data": "Estado", title: "Estado", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto' },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto' },
            {
                title: "Estado",
                data: "Estado",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.IdEstado == 1) {
                        return '<label style="background-color:green; padding:2px;border-radius:5px;font-size:11px!important; color:white">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label style="background-color:red; padding:2px;border-radius:5px;font-size:11px!important; color: white">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            {
                title: "Acciones",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<a class="EditarSucursal btn btn-editar-dt" title="Editar Registro">Editar</a>&nbsp;&nbsp;<a class= "EliminarSucursal btn btn-eliminar-dt" title="Eliminar Registro" style="color:red">Eliminar</a>'+
                '</div>',
                orderable: false,
                width: 'auto',
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

    $('#gridEmpresa').on('click', '.EditarEmpresa', function () {
        let data = datatable.row($(this).parents()).data();
        ModalEmpresa('E');
        $('#LabelIdEmpresa').text(data.Id);
        $('#InputNombreEmpresa').val(data.Nombre);
        $('#SelectTipoDocumento').val(data.IdTipoDocumento);
        $('#InputIdentificacionEmpresa').val(data.Identificacion);
        $('#InputEmailEmpresa').val(data.Email);
        $('#InputTelefonoEmpresa').val(data.Telefono);
        $('#InputContactoEmpresa').val(data.Contacto);
        $('#InputDireccionEmpresa').val(data.Direccion);
        $('#SelectCiudad').val(data.IdCiudad);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridSucursal').on('click', '.EliminarSucursal', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarSucursal(data.Id);
    })
}

//function GridSucursal() {
//    var tituloReporte = 'LISTADO DE SUCURSALES';
//    let datatable = $('#gridSucursal').DataTable({
//        responsive: false,
//        scrollCollapse: true,
//        scrollY: '800px',
//        scrollX: true,
//        dom: 'B<"clear">frtip',
//        buttons: [{
//            extend: 'excelHtml5',
//            footer: true,
//            title: tituloReporte + ' ' + NombreEmpresa,
//            filename: tituloReporte + ' - ' + NombreEmpresa + ' ' + jsDate + ' ' + hora,
//            text: 'Descargar Excel',
//            exportOptions: {
//                columns: [1, 2, 3, 4, 5, 6, 7, 8,9],
//            },
//        },
//        {
//            //download: 'open',
//            text: 'Descargar PDF',
//            extend: 'pdfHtml5',
//            filename: tituloReporte + ' - ' + NombreEmpresa + ' ' + jsDate + ' ' + hora,
//            orientation: 'landscape', //portrait
//            pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
//            exportOptions: {
//                columns: [1, 2, 3, 4, 5, 6, 7, 8,9],
//                search: 'applied',
//                order: 'applied',
//            },
//            customize: function (doc) {
//                doc.content.splice(0, 1.5);
//                doc.pageMargins = [40, 60, 20, 30];
//                doc.defaultStyle.fontSize = 7;
//                doc.styles.tableHeader.fontSize = 7;
//                doc['header'] = (function () {
//                    return {
//                        columns: [
//                            {
//                                image: logoEmpresa64bits,
//                                width: 120,
//                                height: 30,
//                                margin: [20, 0]
//                            },
//                            //{
//                            //    alignment: 'left',
//                            //    italics: true,
//                            //    text: NombreEmpresa,
//                            //    fontSize: 18,
//                            //    margin: [30, 0]
//                            //},
//                            {
//                                italics: true,
//                                alignment: 'right',
//                                fontSize: 10,
//                                text: NombreEmpresa + ' - ' + tituloReporte
//                            }
//                        ],
//                        margin: 20
//                    }
//                });
//                doc['footer'] = (function (page, pages) {
//                    return {
//                        columns: [
//                            {
//                                fontSize: 5,
//                                alignment: 'left',
//                                text: GCS + ' ' + now
//                            },
//                            {
//                                fontSize: 5,
//                                alignment: 'right',
//                                text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }]
//                            }
//                        ],
//                        margin: 20
//                    }
//                });
//                var objLayout = {};
//                objLayout['hLineWidth'] = function (i) { return .5; };
//                objLayout['vLineWidth'] = function (i) { return .5; };
//                objLayout['hLineColor'] = function (i) { return '#aaa'; };
//                objLayout['vLineColor'] = function (i) { return '#aaa'; };
//                objLayout['paddingLeft'] = function (i) { return 4; };
//                objLayout['paddingRight'] = function (i) { return 4; };
//                doc.content[0].layout = objLayout;
//            }
//        },
//        ],
//        "order": [[1, "asc"]],
//        destroy: true,
//        "ajax": {
//            "url": '/Sucursal/GridSucursal',
//            "type": "GET",
//            "datatype": "json"
//        },
//        columns: [
//            {
//                title: "Acciones",
//                data: null,
//                defaultContent: '<div class="btn-group"><a href="#" class= "EditarSucursal btn" title="Editar"> <i class="bi-pencil-fill" style="Color:green"></i></a><a href="#" class="EliminarSucursal btn" title="Eliminar"><i class="bi-trash-fill" style="Color:red"></i></a></div>',
//                className: '',
//                orderable: false,
//                width: 'auto', className: 'dt-center dt-head-center'
//            },
//            { "data": "Nombre", title: "Sucursal", width: 'auto'},
//            { "data": "Empresa", title: "Empresa", width: 'auto' },
//            { "data": "Email", title: "Email", width: 'auto' },
//            { "data": "Telefono", title: "Teléfono", width: 'auto' },
//            { "data": "Contacto", title: "Contacto", width: 'auto' },
//            {
//                title: "Dirección",
//                data: "nombres",
//                render: function (data, type, row) {
//                    // esto es lo que se va a renderizar como html
//                    return `${row.Direccion} ${row.Ciudad}`;
//                }
//                , width: 'auto'
//            },
//            { "data": "Estado", title: "Estado", width: 'auto' },
//            { "data": "CreateBy", title: "Creado Por", width: 'auto' },
//            { "data": "DateCreate", title: "Fecha Creación", width: 'auto' },

//        ],
//        "language": {
//            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
//        },
//        lengthMenu: [
//            [10, 25, 50, -1],
//            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
//        ],
//    });

//    $('#gridSucursal').on('click', '.EditarSucursal', function () {
//        let data = datatable.row($(this).parents()).data();
//        ModalSucursal('E');
//        $('#LabelIdSucursal').text(data.Id);
//        $('#SelectEmpresa').val(data.IdEmpresa);
//        $('#InputNombreSucursal').val(data.Nombre);
//        $('#InputEmailSucursal').val(data.Email);
//        $('#InputTelefonoSucursal').val(data.Telefono);
//        $('#InputContactoSucursal').val(data.Contacto);
//        $('#InputDireccionSucursal').val(data.Direccion);
//        $('#SelectCiudad').val(data.IdCiudad);
//        $('#SelectEstado').val(data.IdEstado);       
//    })

//    $('#gridSucursal').on('click', '.EliminarSucursal', function () {
//        let data = datatable.row($(this).parents()).data();
//        EliminarRegistroTabla(data.Id, 'Sucursal');
//    })
//}

function ListaSucursal() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Sucursal/ListaSucursal',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectSucursal").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectSucursal").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectSucursal").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function ListaSucursalXIdEmpresa(Id) {
    $("#SelectSucursalXIdEmpresa").empty();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Sucursal/ListaSucursalXIdEmpresa', 
        data: {
            Id: Id
        },
        success: function (resultado) {
            if (Id == -1) {
                $("#SelectSucursalXIdEmpresa").prop("disabled", true);                
            } else {
                $("#SelectSucursalXIdEmpresa").prop("disabled", false);
                var contador = 0;
                if (resultado.length === 0) {
                    $("#SelectSucursalXIdEmpresa").append('<option value="">No hay Datos</option>');
                } else {
                    $("#SelectSucursalXIdEmpresa").empty().append('<option value="-1">Seleccione ...</option>');
                    $.each(resultado, function () {
                        $("#SelectSucursalXIdEmpresa").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                        contador++;
                    });
                }
            }            
        },
    });
}

function ListaSucursalXIdEmpresaXIdEmpleado(IdEmpleado) {
    $("#SelectSucursalXIdEmpresaXIdEmpleado").empty();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Sucursal/ListaSucursalXIdEmpresaXIdEmpleado',
        data: {
            IdEmpleado: IdEmpleado
        },
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectSucursalXIdEmpresaXIdEmpleado").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectSucursalXIdEmpresaXIdEmpleado").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectSucursalXIdEmpresaXIdEmpleado").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

