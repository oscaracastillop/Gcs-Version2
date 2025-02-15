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
        $("#TituloModalSucursalEmpleado").empty().append('<h6>Crear Sucursal Empleado</h6>');
        $('#ModalCrearSucursalEmpleado').modal('show');
        $("#SelectEstadoSucursalEmpleado").hide();
        $("#BotonesModalSucursalEmpleado").empty().append('<button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-success btn-sm" onclick="CrearSucursalEmpleado()">Guardar</button>');
        $("#SelectContratoLaboralEmpleado").show();
        $("#InputEmpleado").hide();
        $("#InputSucursal").hide();
        $("#InputFechaInicioSE").prop("disabled", false);
        $("#SelectSucursalXIdEmpresa").show();
        
    } if (tipo == 'E') {
        $("#TituloModalSucursalEmpleado").empty().append('<h6>Editar Sucursal Empleado</h6>');
        $('#ModalCrearSucursalEmpleado').modal('show');
        $("#SelectEstadoSucursalEmpleado").show();
        $("#BotonesModalSucursalEmpleado").empty().append('<button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-success btn-sm" onclick="ActualizarSucursalEmpleado()">Guardar Cambios</button>');
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
        Swal.fire(TituloSwal, 'Seleccione el Empleado', 'info');
    } else if (IdSucursal == -1 || IdSucursal == null || IdSucursal == '') {
        $('#SelectSucursal').focus();
        Swal.fire(TituloSwal, 'Seleccione la Sucursal en la que va a Laborar el Empleado', 'info');
    } else if (FechaInicio == null || FechaInicio == '' || FechaInicio == undefined) {
        $('#InputFechaInicioSE').focus();
        Swal.fire(TituloSwal, 'Ingrese la Fecha Inicio en esta Sucursal', 'info');
    } else {
        if (FechaFin == FechaInicio || FechaFin == '' || FechaFin > FechaInicio ) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Sucursal_Empleado/CrearSucursalEmpleado',
                data: {
                    IdUser: User,
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
            Swal.fire(TituloSwal, 'Ingrese la Fecha ', 'info');
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
                IdUser: User,
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
        Swal.fire(TituloSwal, 'La Fecha fin no puede ser menor que la Fecha Inicio ', 'info');
    }    
}

function GridSucursalEmpleado() {
    var tituloReporte = 'LISTADO SUCURSAL EMPLEADO';
    let datatable = $('#gridSucursalEmpleado').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },//OPCION
            { targets: [1], width: '10px', className: 'dt-center dt-head-center' },//OPCION

        ],
        buttons: [{
            extend: 'excelHtml5',
            footer: true,
            title: tituloReporte + ' ' + NombreEmpresa,
            filename: tituloReporte + ' - ' + NombreEmpresa + ' ' + jsDate + ' ' + hora,
            text: 'Descargar Excel',
            exportOptions: {
                columns: [2, 3, 4, 5, 6, 7, 8,9,10,11],
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
                columns: [2, 3, 4, 5, 6, 7, 8,9,10,11],
                search: 'applied',
                order: 'applied',
            },
            customize: function (doc) {
                doc.content.splice(0, 1.5);
                doc.pageMargins = [40, 60, 20, 30];
                doc.defaultStyle.fontSize = 8;
                doc.styles.tableHeader.fontSize = 8;
                doc['header'] = (function () {
                    return {
                        columns: [
                            {
                                image: logoEmpresa64bits,
                                width: 120,
                                height: 30,
                                margin: [20, 0]
                            },
                            //{
                            //    alignment: 'left',
                            //    italics: true,
                            //    text: NombreEmpresa,
                            //    fontSize: 18,
                            //    margin: [30, 0]
                            //},
                            {
                                italics: true,
                                alignment: 'right',
                                fontSize: 10,
                                text: NombreEmpresa + ' - ' + tituloReporte
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
            "url": '/Sucursal_Empleado/GridSucursalEmpleado',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            {
                title: "Acciones",
                data: null,
                defaultContent: '<div class="btn-group"><a href="#" class= "EditarSucursalEmpleado btn" title="Editar"> <i class="bi-pencil-fill" style="Color:green"></i></a><a href="#" class="EliminarSucursalEmpleado btn" title="Eliminar"><i class="bi-trash-fill" style="Color:red"></i></a></div>',
               
            },
            {
                title: "Imagén",
                data: "Imagen",
                width: 'auto',
                "render": function (data, type, row) {

                    if ( row.IdEstado == 1) {
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
            { "data": "Estado", title: "Estado", width: 'auto' },            
            { "data": "CreateBy", title: "Creado Por", width: 'auto' },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto' },

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
        EliminarRegistroTabla(data.Id, 'Sucursal_Empleado');
    })
}

//function DashboardSucursalEmpleado() {
//    $.ajax({
//        type: 'POST',
//        dataType: 'json',
//        url: '/Sucursal_Empleado/UltimaSucursalEmpleadoCreada',
//        data: {},
//        success: function (resultado) {
//            $('#CardSEEmpleado').text(resultado[0].Empleado);
//            $('#CardSEEmpresa').text(resultado[0].Empresa);
//            $('#CardSESucursal').text(resultado[0].Sucursal);
//            $('#CardSEFechaInicio').text(resultado[0].FechaInicio);
//            $('#CardSEFechaFin').text(resultado[0].FechaFin);
//            $('#CardSEObservacion').text(resultado[0].Observacion);
//            $('#CardSEDateCreate').text(resultado[0].DateCreate);

//        },
//    });
//    $.ajax({
//        type: 'POST',
//        dataType: 'json',
//        url: '/Sucursal_Empleado/TotalSucursalEmpleados',
//        data: {},
//        success: function (resultado) {
//            $('#CardSucursalesEmpleadosActivos').text(resultado[0].Activos);
//            $('#CardSucursalesEmpleadosInActivos').text(resultado[0].InActivos);
//            $('#CardTotalSucursalesEmpleados').text(resultado[0].Total);
//        },
//    });
//    $.ajax({
//        type: 'POST',
//        dataType: 'json',
//        url: '/Sucursal_Empleado/GridSucursalEmpleadoActivosXSucursal',
//        data: {
//        },
//        success: function (data) {
//            var contador = 0;

//            cant = data.length;

//            if (cant == 0) {
//                $("#DatosTablaSucursalEmpleadoActivoXSucursal").append('<td>No hay datos</td><td>No hay datos</td>');
//            } else {
//                $.each(data, function () {
//                    if (contador == 0) {
//                        $("#DatosTablaSucursalEmpleadoActivoXSucursal").append(
//                            '<tr>' +
//                            '<td style="color:green; font-weight:bold">' + data[contador].Nombre + '</td>' +
//                            '<td style="text-align:center; color:green; font-weight:bold">' + data[contador].Cantidad + '</td>' +
//                            '<td style="text-align:center; color:green; font-weight:bold">' + data[contador].Porcentaje + '</td>' +
//                            '</tr>'
//                        );
//                    } else if (contador == cant - 1) {
//                        $("#DatosTablaSucursalEmpleadoActivoXSucursal").append(
//                            '<tr>' +
//                            '<td>' + data[contador].Nombre + '</td>' +
//                            '<td style="text-align:center; color:red">' + data[contador].Cantidad + '</td>' +
//                            '<td style="text-align:center; color:red">' + data[contador].Porcentaje + '</td>' +
//                            '</tr>'
//                        );
//                    } else {
//                        $("#DatosTablaSucursalEmpleadoActivoXSucursal").append(
//                            '<tr>' +
//                            '<td>' + data[contador].Nombre + '</td>' +
//                            '<td style="text-align:center;">' + data[contador].Cantidad + '</td>' +
//                            '<td style="text-align:center;">' + data[contador].Porcentaje + '</td>' +
//                            '</tr>'
//                        );
//                    }

//                    contador++;
//                });
//            }
//        }
//    });
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


