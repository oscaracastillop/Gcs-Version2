function ModalSucursalEmpleado(tipo) {
    $("#TituloModalSucursalEmpleado").empty().val('');
    $("#LabelIdSucursalEmpleado").empty().text('');
    $("#SelectContratoLaboralEmpleado").val(-1);
    $("#SelectSucursal").val(-1);
    $("#SelectEmpresa").val(-1);
    $("#InputFechaInicioSE").empty().val('');
    $("#InputFechaFinSE").empty().val('');
    $("#InputObservacionSE").empty().val('');
    $("#BotonesModalSucursalEmpleado").empty();
    $("#TituloModalSucursalEmpleado").empty();  
    $("#SelectSucursalXIdEmpresa").empty();  
    $("#SelectSucursalXIdEmpresa").prop("disabled", true);
    $("#InputEmpleado").empty().val('');
    $("#InputEmpresa").empty().val('');
    $("#InputSucursal").empty().val('');

    if (tipo == 'C') {
        $('#ImagenEmpleado').empty().append(
            '<img src="/Images/ImagenHVEmpleado/Empleado.png" alt="" style="height:200px; width:200px; border-radius:50%; border:0px solid; background:white;padding:0px" id="ImagenEmpleado"/>'
        );
        $("#TituloModalSucursalEmpleado").empty().append('label>Crear Sucursal Empleado</label>');
        $('#ModalCrearSucursalEmpleado').modal('show');
        $("#SelectEstadoSucursalEmpleado").hide();
        $("#BotonesModalSucursalEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearSucursalEmpleado()">Guardar</button>');
        $("#SelectContratoLaboralEmpleado").show();
        $("#InputEmpleado").hide();
        $("#InputSucursal").hide();
        $("#InputFechaInicioSE").prop("disabled", false);
        $("#SelectSucursalXIdEmpresa").show();
        
    } if (tipo == 'E') {
        $("#TituloModalSucursalEmpleado").empty().append('<label>Editar Sucursal Empleado</label>');
        $('#ModalCrearSucursalEmpleado').modal('show');
        $("#SelectEstadoSucursalEmpleado").show();
        $("#BotonesModalSucursalEmpleado").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarSucursalEmpleado()">Guardar Cambios</button>');
        $("#SelectContratoLaboralEmpleado").hide();
        $("#SelectSucursalXIdEmpresaXIdEmpleado").hide();
        $("#InputSucursal").show();
        $("#InputEmpleado").show();
        $("#InputFechaInicioSE").prop("disabled", true);
        
        
    }
}

function CrearSucursalEmpleado() {
    let IdEmpleado = $('#SelectContratoLaboralEmpleado').val();
    let IdSucursal = $('#SelectSucursalXIdEmpresaXIdEmpleado').val();
    let FechaInicio = $('#InputFechaInicioSE').val();
    let FechaFin = $('#InputFechaFinSE').val();
    let Observacion = $('#InputObservacionSE').val();

    if (IdEmpleado == -1 || IdEmpleado == null || IdEmpleado == '') {
        $('#SelectContratoLaboralEmpleado').focus();
        VentanaMensaje('Seleccione el Empleado', 'info');
    } else if (IdSucursal == -1 || IdSucursal == null || IdSucursal == '') {
        $('#SelectSucursal').focus();
        VentanaMensaje('Seleccione la Sucursal en la que va a Laborar el Empleado', 'info');
    } else if (FechaInicio == null || FechaInicio == '' || FechaInicio == undefined) {
        $('#InputFechaInicioSE').focus();
        VentanaMensaje('Ingrese la Fecha Inicio en esta Sucursal', 'info');
    } else {
        if (FechaFin == FechaInicio || FechaFin == '' || FechaFin > FechaInicio ) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Sucursal_Empleado/CrearSucursalEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdEmpleado: IdEmpleado,
                    IdSucursal: IdSucursal,
                    FechaInicio: FechaInicio,
                    FechaFin: FechaFin,
                    Observacion: Observacion
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
        } else {
            $('#InputFechaFinSE').focus();
            VentanaMensaje('Por favor valide la fecha fin', 'info');
        }        
    }
}

function ActualizarSucursalEmpleado() {
    let IdSucursalEmpleado = $('#LabelIdSucursalEmpleado').text();
    let FechaInicio = $('#InputFechaInicioSE').val();
    let FechaFin = $('#InputFechaFinSE').val();
    let Observacion = $('#InputObservacionSE').val();
    let IdEstado = $('#SelectEstado').val();

        if (FechaFin == FechaInicio || FechaFin == '' || FechaFin > FechaInicio) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Sucursal_Empleado/ActualizarSucursalEmpleado',
            data: {
                IdUser: TokenUser,
                IdSucursalEmpleado: IdSucursalEmpleado, 
                FechaFin: FechaFin,
                Observacion: Observacion,
                IdEstado: IdEstado
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
    } else {
        $('#InputFechaFinSE').focus();
        Swal.fire(TituloSwal, 'La Fecha fin no puede ser menor que la Fecha Inicio', 'info');
    }    
}

function GridSucursalEmpleado() {
    var tituloReporte = 'LISTADO DE SUCURSAL EMPLEADOS';
    let datatable = $('#gridSucursalEmpleado').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], className: 'dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [2], className: 'dt-head-center' },
            { targets: [3], width: '150px', className: 'dt-center dt-head-center' },
            { targets: [4], width: '100px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: 'Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn btn-pdf-datatable',
                text: 'Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'portrait', // landscape
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 3],
                    search: 'applied',
                    order: 'applied',
                },
                customize: function (doc) {
                    doc.content.splice(0, 1.5);
                    doc.pageMargins = [40, 60, 20, 30];
                    doc.defaultStyle.fontSize = 6;
                    doc.styles.tableHeader.fontSize = 12;
                    doc['header'] = (function () {
                        return {
                            columns: [
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
                    ModalSucursalEmpleado('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Sucursal_Empleado/GridSucursalEmpleado',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            {
                title: "Imagén",
                data: "Imagen",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.IdEstado == 1) {
                        return '<img src="/Images/ImagenHVEmpleado/' + data + '" alt="" height="45" width="45" style="border-radius:50%; border: 1px solid green; padding:2px"/>';
                    }
                    else {
                        return '<img src="/Images/ImagenHVEmpleado/' + data + '" alt="" height="45" width="45" style="border-radius: 50%; border: 1px solid red; padding:2px" />';
                    }
                }

            },
            { "data": "Empleado", title: "Empleado", width: 'auto' },
            { "data": "Empresa", title: "Empresa", width: 'auto' },
            { "data": "Sucursal", title: "Sucursal", width: 'auto' },
            { "data": "TextoFechaInicio", title: "Fecha Inicio", width: 'auto' },
            { "data": "TextoFechaFin", title: "Fecha Fin", width: 'auto' },
            { "data": "Permanencia", title: "Permanencia", width: 'auto' },
            { "data": "Observacion", title: "Observación", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },
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
                    '<a class="EditarSucursalEmpleado btn btn-editar-dt" title="Editar Registro">Editar</a>&nbsp;&nbsp;<a class="EliminarSucursalEmpleado btn btn-eliminar-dt" title="Eliminar Registro" style="color:red">Eliminar</a>' +
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

    $('#gridSucursalEmpleado').on('click', '.EditarSucursalEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        ModalSucursalEmpleado('E');
        $('#LabelIdSucursalEmpleado').text(data.Id);
        $("#InputEmpleado").val(data.Empleado);
        $("#InputEmpresa").val(data.Empresa);
        $("#InputSucursal").val(data.Sucursal);
        $("#InputFechaInicioSE").val(data.FechaInicio);
        $("#InputFechaFinSE").val(data.FechaFin);
        $("#InputObservacionSE").val(data.Observacion);
        $('#SelectEstado').val(data.IdEstado);
        $('#ImagenEmpleado').empty().append(
            '<img src="/Images/ImagenHVEmpleado/' + data.Imagen + '" alt="" style="height:200px; width:200px; border-radius:50%; border:0px solid; background:white;padding:0px" id="ImagenEmpleado"/>'
        );  
    })

    $('#gridSucursalEmpleado').on('click', '.EliminarSucursalEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarSucursalEmpleado(data.Id);
    })
}

//function GridSucursalEmpleado() {
//    var tituloReporte = 'LISTADO SUCURSAL EMPLEADO';
//    let datatable = $('#gridSucursalEmpleado').DataTable({
//        responsive: false,
//        scrollCollapse: true,
//        scrollY: '800px',
//        scrollX: true,
//        dom: 'B<"clear">frtip',
//        columnDefs: [
//            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },//OPCION
//            { targets: [1], width: '10px', className: 'dt-center dt-head-center' },//OPCION

//        ],
//        buttons: [{
//            extend: 'excelHtml5',
//            footer: true,
//            title: tituloReporte + ' ' + NombreEmpresa,
//            filename: tituloReporte + ' - ' + NombreEmpresa + ' ' + jsDate + ' ' + hora,
//            text: 'Descargar Excel',
//            exportOptions: {
//                columns: [2, 3, 4, 5, 6, 7, 8,9,10,11],
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
//                columns: [2, 3, 4, 5, 6, 7, 8,9,10,11],
//                search: 'applied',
//                order: 'applied',
//            },
//            customize: function (doc) {
//                doc.content.splice(0, 1.5);
//                doc.pageMargins = [40, 60, 20, 30];
//                doc.defaultStyle.fontSize = 8;
//                doc.styles.tableHeader.fontSize = 8;
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
//                                alignment: 'left',
//                                text: GCS + ' ' + now
//                            },
//                            {
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
//            "url": '/Sucursal_Empleado/GridSucursalEmpleado',
//            "type": "GET",
//            "datatype": "json"
//        },
//        columns: [
//            {
//                title: "Acciones",
//                data: null,
//                defaultContent: '<div class="btn-group"><a href="#" class= "EditarSucursalEmpleado btn" title="Editar"> <i class="bi-pencil-fill" style="Color:green"></i></a><a href="#" class="EliminarSucursalEmpleado btn" title="Eliminar"><i class="bi-trash-fill" style="Color:red"></i></a></div>',
               
//            },
//            {
//                title: "Imagén",
//                data: "Imagen",
//                width: 'auto',
//                "render": function (data, type, row) {

//                    if ( row.IdEstado == 1) {
//                        return '<img src="/Images/ImagenHVEmpleado/' + data + '" alt="" height="45" width="45" style="border-radius:50%; border: 1px solid green; padding:2px"/>';
//                    }
//                    else {
//                        return '<img src="/Images/ImagenHVEmpleado/' + data + '" alt="" height="45" width="45" style="border-radius: 50%; border: 1px solid red; padding:2px" />';
//                    }
//                }

//            },
//            { "data": "Empleado", title: "Empleado", width: 'auto' },
//            { "data": "Empresa", title: "Empresa", width: 'auto' },
//            { "data": "Sucursal", title: "Sucursal", width: 'auto' },
//            { "data": "TextoFechaInicio", title: "Fecha Inicio", width: 'auto' },
//            { "data": "TextoFechaFin", title: "Fecha Fin", width: 'auto' },
//            { "data": "Permanencia", title: "Permanencia", width: 'auto' },
//            { "data": "Observacion", title: "Observación", width: 'auto' },
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

//    $('#gridSucursalEmpleado').on('click', '.EditarSucursalEmpleado', function () {
//        let data = datatable.row($(this).parents()).data();
//        ModalSucursalEmpleado('E');
//        $('#LabelIdSucursalEmpleado').text(data.Id);
//        $("#InputEmpleado").val(data.Empleado);
//        $("#InputEmpresa").val(data.Empresa);
//        $("#InputSucursal").val(data.Sucursal);
//        $("#InputFechaInicioSE").val(data.FechaInicio);
//        $("#InputFechaFinSE").val(data.FechaFin);
//        $("#InputObservacionSE").val(data.Observacion);
//        $('#SelectEstado').val(data.IdEstado);   
//        $('#ImagenEmpleado').empty().append(
//            '<img src="/Images/ImagenHVEmpleado/' + data.Imagen + '" alt="" style="height:200px; width:200px; border-radius:50%; border:0px solid; background:white;padding:0px" id="ImagenEmpleado"/>'
//        );       

//    })

//    $('#gridSucursalEmpleado').on('click', '.EliminarSucursalEmpleado', function () {
//        let data = datatable.row($(this).parents()).data();
//        EliminarRegistroTabla(data.Id, 'Sucursal_Empleado');
//    })
//}

function BuscarDatosEmpleado(IdEmpleado) {
    if (IdEmpleado == -1) {
        $('#InputEmpresa').val('');
        $('#SelectSucursalXIdEmpresaXIdEmpleado').empty();
        $('#SelectSucursalXIdEmpresaXIdEmpleado').prop("disabled", true);
        BuscarImagenEmpleado(IdEmpleado);
    } else {
        $('#SelectSucursalXIdEmpresaXIdEmpleado').prop("disabled", false);
        BuscarImagenEmpleado(IdEmpleado);
        ListaIdEmpresaXIdEmpleado(IdEmpleado);
        ListaSucursalXIdEmpresaXIdEmpleado(IdEmpleado);
    }
    
}


