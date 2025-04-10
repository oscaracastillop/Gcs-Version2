function ModalCLE(tipo) {
    $("#TituloModalCLE").empty().val('');
    $("#LabelIdCLE").empty().text('');
    $("#SelectCargo").val(-1);
    $("#SelectEmpleado").val(-1);
    $("#SelectEmpresa").val(-1);
    $("#SelectTipoContrato").val(-1);    
    $("#InputFechaInicioCLE").empty().val('');
    $("#InputFechaFinCLE").empty().val('');
    $("#InputObservacionCLE").empty().val('');
    $("#BotonesModalCLE").empty();
    $("#TituloModalCLE").empty();
    $("#InputSalarioCLE").empty().val('');
    $("#InputValorDiaSalarioCLE").empty().val('');


    if (tipo == 'C') {
        $("#SelectEmpresa").prop("disabled", false);
        $("#SelectEmpleado").prop("disabled", false);
        $("#InputFechaInicioCLE").prop("disabled", false);
        $("#SelectEps").val(1);
        $("#SelectBanco").val(1);
        $("#SelectFondoPensiones").val(1);
        $("#SelectFondoCesantias").val(1);
        $("#InputSalarioCLE").empty().val('0');
        $("#InputPorcentajeContribucionEpsCLE").empty().val('0');
        $("#InputPorcentajeContribucionFPCLE").empty().val('0');
        $("#InputNumeroCuentaPagoCLE").empty().val('0');
        $("#InputSubTransporteCLE").empty().val('0');

        $('#ImagenEmpleado').empty().append(
            '<img src="/Images/ImagenHVEmpleado/Empleado.png" alt="" style="height:200px; width:200px; border-radius:50%; border:0px solid; background:white;padding:0px" id="ImagenEmpleado"/>'
        );
        $("#TituloModalCLE").empty().append('<h6>Crear Contrato Laboral Empleado</h6>');
        $('#ModalCLE').modal('show');
        $("#SelectEstadoCLE").hide();
        $("#BotonesModalCLE").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearCLE()">Guardar</button>');
       

    } if (tipo == 'E') {
        $("#SelectEmpresa").prop("disabled", true);
        $("#SelectEmpleado").prop("disabled", true);
        $("#InputFechaInicioCLE").prop("disabled", true);
        $("#TituloModalCLE").empty().append('<h6>Editar Contrato Laboral Empleado</h6>');
        $('#ModalCLE').modal('show');
        $("#SelectEstadoCLE").show();
        $("#BotonesModalCLE").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarCLE()">Guardar Cambios</button>');      
    }
}

function CalcularValorDia() {
    let Salario = $('#InputSalarioCLE').val();

    let ValorDia = Math.round(Salario / 30);

    $('#InputValorDiaSalarioCLE').val('$ ' + ValorDia);
}


function CrearCLE() {
    /*debugger;*/
    let IdEmpleado = $('#SelectEmpleado').val();
    let IdEmpresa = $('#SelectEmpresa').val();
    let IdCargo = $('#SelectCargo').val();  
    let IdTipoContrato = $('#SelectTipoContrato').val();  
    let SalarioMensual = $('#InputSalarioCLE').val();
    let FechaInicio = $('#InputFechaInicioCLE').val();
    let FechaFin = $('#InputFechaFinCLE').val();
    let IdEps = $('#SelectEps').val();
    let PorcentajeContEps = $('#InputPorcentajeContribucionEpsCLE').val();
    let IdFondoPension = $('#SelectFondoPensiones').val();
    let PorcentajeContFP = $('#InputPorcentajeContribucionFPCLE').val();
    let IdBanco = $('#SelectBanco').val();
    let NumeroCuentaPago = $('#InputNumeroCuentaPagoCLE').val();
    let SubTransporte = $('#InputSubTransporteCLE').val();
    let IdCesantias = $('#SelectFondoCesantias').val();
    let Observacion = $('#InputObservacionCLE').val();

    if (IdEmpleado == -1 || IdEmpleado == null || IdEmpleado == '') {
        $('#SelectEmpleado').focus();
        VentanaMensaje('Seleccione el Empleado', 'info');
    } else if (IdEmpresa == -1 || IdEmpresa == null || IdEmpresa == '') {
        $('#SelectEmpresa').focus();
        VentanaMensaje('Seleccione la Empresa', 'info');
    } else if (IdCargo == -1 || IdCargo == null || IdCargo == '') {
        $('#SelectCargo').focus();
        VentanaMensaje('Seleccione el Cargo del Empleado', 'info');
    } else if (IdTipoContrato == -1 || IdTipoContrato == null || IdTipoContrato == '') {
        $('#SelectTipoContrato').focus();
        VentanaMensaje('Seleccione el Tipo de Contrato', 'info');
    } else if (SalarioMensual == null || SalarioMensual == '' || SalarioMensual == undefined) {
        $('#InputSalarioCLE').focus();
        VentanaMensaje('Ingrese el Salario Mensual del Empleado', 'info');
    } else if (FechaInicio == null || FechaInicio == '' || FechaInicio == undefined) {
        $('#InputFechaInicioSE').focus();
        VentanaMensaje('Ingrese la fecha de Incio del Contrato', 'info');
    } else if (IdEps == -1 || IdEps == null || IdEps == '') {
        $('#SelectEps').focus();
        VentanaMensaje('Seleccione la Eps', 'info');
    } else if (PorcentajeContEps == null || PorcentajeContEps == '' || PorcentajeContEps == undefined) {
        $('#InputPorcentajeContribucionEpsCLE').focus();
        VentanaMensaje('El porcentaje de contribución no púede ser Vacio', 'info');        
    } else if (IdFondoPension == -1 || IdFondoPension == null || IdFondoPension == '') {
        $('#SelectFondoPensiones').focus();
        VentanaMensaje('Seleccione el Fondo de Pensiones', 'info');
    } else if (PorcentajeContFP == null || PorcentajeContFP == '' || PorcentajeContFP == undefined) {
        $('#InputPorcentajeContribucionFPCLE').focus();
        VentanaMensaje('El porcentaje de contribución no púede ser Vacio', 'info'); 
    } else if (IdBanco == -1 || IdBanco == null || IdBanco == '') {
        $('#SelectBanco').focus();
        VentanaMensaje('Seleccione el Banco en donde se le realizara el pago al Empleado', 'info');
    } else if (NumeroCuentaPago == null || NumeroCuentaPago == '' || NumeroCuentaPago == undefined) {
        $('#InputNumeroCuentaPagoCLE').focus();
        VentanaMensaje('Ingrese número de cuenta del Banco o Número Celular para Billeteras Digitales', 'info');
    } else if (SubTransporte == null || SubTransporte == '' || SubTransporte == undefined) {
        $('#InputSubTransporteCLE').focus();
        VentanaMensaje('Ingrese el valor del Subsidio de Transporte', 'info');
    } else if (IdCesantias == -1 || IdCesantias == null || IdCesantias == '') {
        $('#SelectFondoCesantias').focus();
        VentanaMensaje('Seleccione el Fondo de Cesantías', 'info');
    } else {
        if (FechaFin == FechaInicio || FechaFin == '' || FechaFin > FechaInicio) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Contrato_Laboral/CrearCLE',
                data: {
                    IdUser: TokenUser,
                    IdEmpleado: IdEmpleado,
                    IdEmpresa: IdEmpresa,
                    IdCargo: IdCargo,
                    IdTipoContrato: IdTipoContrato,
                    SalarioMensual: SalarioMensual,
                    FechaInicio: FechaInicio,                    
                    FechaFin: FechaFin,
                    IdEps: IdEps,
                    PorcentajeContEps: PorcentajeContEps,
                    IdFondoPension: IdFondoPension,
                    PorcentajeContFP: PorcentajeContFP,
                    IdBanco: IdBanco,
                    NumeroCuentaPago: NumeroCuentaPago,
                    SubTransporte: SubTransporte,
                    IdCesantias: IdCesantias,
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
            $('#InputFechaFinCLE').focus();
            Swal.fire(TituloSwal, 'Ingrese la Fecha ', 'info');
        }
    }
}

function ActualizarCLE() {
    let IdCLE = $('#LabelIdCLE').text();
    let IdCargo = $('#SelectCargo').val(); 
    let SalarioMensual = $('#InputSalarioCLE').val();
    let IdTipoContrato = $('#SelectTipoContrato').val();  
    let FechaFin = $('#InputFechaFinCLE').val();
    let IdEps = $('#SelectEps').val();
    let PorcentajeContEps = $('#InputPorcentajeContribucionEpsCLE').val();
    let IdFondoPension = $('#SelectFondoPensiones').val();
    let PorcentajeContFP = $('#InputPorcentajeContribucionFPCLE').val();
    let IdBanco = $('#SelectBanco').val();
    let NumeroCuentaPago = $('#InputNumeroCuentaPagoCLE').val();
    let SubTransporte = $('#InputSubTransporteCLE').val();
    let IdCesantias = $('#SelectFondoCesantias').val();
    let Observacion = $('#InputObservacionCLE').val();
    let IdEstado = $('#SelectEstado').val();


    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Contrato_Laboral/ActualizarCLE',
        data: {
            IdUser: TokenUser,
            IdCLE: IdCLE, 
            IdCargo: IdCargo,
            SalarioMensual: SalarioMensual,
            IdTipoContrato: IdTipoContrato,
            FechaFin: FechaFin,
            IdEps: IdEps,
            PorcentajeContEps: PorcentajeContEps,
            IdFondoPension: IdFondoPension,
            PorcentajeContFP: PorcentajeContFP,
            IdBanco: IdBanco,
            NumeroCuentaPago: NumeroCuentaPago,
            SubTransporte: SubTransporte,
            IdCesantias: IdCesantias,
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
}




function EliminarCLE(IdCLE) {
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
                url: '/Contrato_Laboral/EliminarCLE',
                data: {
                    IdUser: TokenUser,
                    IdCLE: IdCLE
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

function GridCLE() {
    var tituloReporte = 'LISTADO DE CONTRATOS LABORALES';
    let datatable = $('#gridCLE').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], className: 'dt-center dt-head-center' },//Imagen Empleado
            { targets: [1], className: 'dt-head-center' },//Nombre empleado
            { targets: [2], className: 'dt-head-center' },//Empresa
            { targets: [3], className: 'dt-head-center' },//Cargo
            { targets: [4], className: 'dt-head-center' },//TipoContrato
            { targets: [6], className: 'dt-head-center' },//Salario Mensual
            { targets: [7], className: 'dt-head-center' },//Fecha Inicio
            { targets: [7], className: 'dt-head-center' },//Fecha Fin
            { targets: [8], className: 'dt-head-center' },//Permanencia
            { targets: [9], className: 'dt-head-center' },//Observacion
            { targets: [10], className: 'dt-head-center' },//Creado por
            { targets: [11], className: 'dt-head-center' },//Fecha Creación
            { targets: [12], width: '150px', className: 'dt-center dt-head-center' },//Estado
            { targets: [13], width: '100px', className: 'dt-center dt-head-center' }//Acciones
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: 'Excel',
                exportOptions: {
                    columns: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn btn-pdf-datatable',
                text: 'Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', // landscape  portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13],
                    search: 'applied',
                    order: 'applied',
                },
                customize: function (doc) {
                    doc.content.splice(0, 1.5);
                    doc.pageMargins = [40, 60, 20, 30];
                    doc.defaultStyle.fontSize = 6;
                    doc.styles.tableHeader.fontSize = 8;
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
                    ModalCLE('C');
                }
            }

        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Contrato_Laboral/GridCLE',
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

            },//0
            { "data": "Empleado", title: "Empleado", width: 'auto' },//1
            { "data": "Empresa", title: "Empresa", width: 'auto' },//2
            { "data": "Cargo", title: "Cargo", width: 'auto' },//3
            { "data": "Contrato", title: "Contrato", width: 'auto' },//4
            {
                "data": "null",
                title: "Salario Mensual",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.SalarioMensual);
                }
            },//5
            { "data": "SalarioMensual", title: "Salario Mensual", width: 'auto', visible: false },//6
            { "data": "TextoFechaInicio", title: "Fecha Inicio", width: 'auto' },//7
            { "data": "TextoFechaFin", title: "Fecha Fin", width: 'auto' },//8
            { "data": "Permanencia", title: "Permanencia", width: 'auto' },//9
            { "data": "Observacion", title: "Observación", width: 'auto' },//10        
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },//11
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },//12
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

            },//13
            {
                title: "Acciones",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<a class="EditarCLE btn btn-editar-dt" title="Editar Registro">Editar</a>&nbsp;&nbsp;<a class="EliminarCLE btn btn-eliminar-dt" title="Eliminar Registro" style="color:red">Eliminar</a>' +
                    '</div>',
                orderable: false,
                width: 'auto',
            },//14

        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
        },
        lengthMenu: [
            [10, 25, 50, -1],
            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });

    $('#gridCLE').on('click', '.EditarCLE', function () {
        let data = datatable.row($(this).parents()).data();
        ModalCLE('E');
        $('#LabelIdCLE').text(data.Id);
        $('#LabelIdCLE').text(data.Id);
        $('#ImagenEmpleado').empty().append(
            '<img src="/Images/ImagenHVEmpleado/' + data.Imagen + '" alt="" style="height:200px; width:200px; border-radius:50%; border:0px solid; background:white;padding:0px" id="ImagenEmpleado"/>'
        );
        $('#SelectEmpleado').val(data.IdEmpleado);
        $('#SelectEmpresa').val(data.IdEmpresa);
        $('#SelectCargo').val(data.IdCargo);
        $('#SelectTipoContrato').val(data.IdTipoContrato);
        $('#InputSalarioCLE').val(data.SalarioMensual);
        $('#InputValorDiaSalarioCLE').val(Math.round(data.SalarioMensual / 30));
        $("#InputFechaInicioCLE").val(data.FechaInicio);
        $("#InputFechaFinCLE").val(data.FechaFin);
        $('#SelectEps').val(data.IdEps);
        $('#SelectFondoPension').val(data.IdFondoPension);
        $('#SelectFondoCesantias').val(data.IdFondoCesantias);
        $('#SelectBanco').val(data.IdBanco);
        $('#InputPorcentajeContribucionEpsCLE').val(data.PorcentajeEps);
        $('#InputPorcentajeContribucionFPCLE').val(data.PorcentajeFondoPension);
        $('#InputNumeroCuentaPagoCLE').val(data.NumeroCuenta);
        $('#InputSubTransporteCLE').val(data.SubTransporte);
        $("#InputObservacionCLE").val(data.Observacion);
        $('#SelectEstado').val(data.IdEstado); 
    })

    $('#gridCLE').on('click', '.EliminarCLE', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarCLE(data.Id);
    })
}



//function GridCLE() {
//    var tituloReporte = 'LISTADO CONTRATOS LABORALES EMPLEADO';
//    let datatable = $('#gridCLE').DataTable({
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
//                columns: [2, 3, 4, 5, 7, 8, 9, 10, 11, 12,13,14],
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
//                columns: [2, 3, 4, 5, 7, 8, 9, 10, 11, 12,13,14],
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
//            "url": '/Contrato_Laboral_Empleado/GridCLE',
//            "type": "GET",
//            "datatype": "json"
//        },
//        columns: [
//            {
//                title: "Acciones",
//                data: null,
//                defaultContent: '<div class="btn-group"><a href="#" class= "EditarCLE btn" title="Editar"> <i class="bi-pencil-fill" style="Color:green"></i></a><a href="#" class="EliminarCLE btn" title="Eliminar"><i class="bi-trash-fill" style="Color:red"></i></a></div>',

//            },
            

//        ],
//        "language": {
//            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
//        },
//        lengthMenu: [
//            [10, 25, 50, -1],
//            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
//        ],
//    });

//    $('#gridCLE').on('click', '.EditarCLE', function () {
//        let data = datatable.row($(this).parents()).data();
//        ModalCLE('E');
//        $('#LabelIdCLE').text(data.Id);
//        $('#ImagenEmpleado').empty().append(
//            '<img src="/Images/ImagenHVEmpleado/' + data.Imagen + '" alt="" style="height:200px; width:200px; border-radius:50%; border:0px solid; background:white;padding:0px" id="ImagenEmpleado"/>'
//        );
//        $('#SelectEmpleado').val(data.IdEmpleado);
//        $('#SelectEmpresa').val(data.IdEmpresa);
//        $('#SelectCargo').val(data.IdCargo);
//        $('#SelectTipoContrato').val(data.IdTipoContrato);
//        $('#InputSalarioCLE').val(data.SalarioMensual);
//        $('#InputValorDiaSalarioCLE').val(Math.round(data.SalarioMensual / 30));
//        $("#InputFechaInicioCLE").val(data.FechaInicio);
//        $("#InputFechaFinCLE").val(data.FechaFin);
//        $('#SelectEps').val(data.IdEps);
//        $('#SelectFondoPension').val(data.IdFondoPension);
//        $('#SelectFondoCesantias').val(data.IdFondoCesantias);
//        $('#SelectBanco').val(data.IdBanco);
//        $('#InputPorcentajeContribucionEpsCLE').val(data.PorcentajeEps);
//        $('#InputPorcentajeContribucionFPCLE').val(data.PorcentajeFondoPension);
//        $('#InputNumeroCuentaPagoCLE').val(data.NumeroCuenta);
//        $('#InputSubTransporteCLE').val(data.SubTransporte);
//        $("#InputObservacionCLE").val(data.Observacion);
//        $('#SelectEstado').val(data.IdEstado);        
//    })

//    $('#gridCLE').on('click', '.EliminarCLE', function () {
//        let data = datatable.row($(this).parents()).data();
//        EliminarRegistroTabla(data.Id, 'Contrato_Laboral_Empleado');
//    })
//}


function ListaContratoLaboralEmpleado() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Contrato_Laboral_Empleado/ListaContratoLaboralEmpleado',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length == 0) {
                $("#SelectContratoLaboralEmpleado").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectContratoLaboralEmpleado").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectContratoLaboralEmpleado").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function CargarDatosCLE(IdEmpleado){
    BuscarImagenEmpleado(IdEmpleado);
    $("#SelectEmpresa").val(-1);
    $("#SelectCargo").val(-1);
}



