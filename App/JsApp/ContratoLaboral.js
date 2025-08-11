function ModalCLE(tipo) {
    $("#TituloModalCLE").empty().val('');
    $("#LabelIdCLE").empty().text('');
    $("#SelectCargo").val(-1);
    $("#SelectEmpleado").val(-1);
    $("#SelectEmpresa").val(-1); 
    $("#SelectSucursalXIdEmpresa").val(0);
    $("#SelectSucursalXIdEmpresa").prop("disabled", true);
    $("#SelectTipoContrato").val(-1);    
    $("#InputFechaInicioCLE").empty().val('');
    //$("#InputFechaFinCLE").empty().val('');
    $("#InputObservacionCLE").empty().val('');
    $("#BotonesModalCLE").empty();
    $("#TituloModalCLE").empty();
    $("#InputSalarioCLE").empty().val('');
    $("#InputValorDiaSalarioCLE").empty().val('');
    $("#InputSucurslEmpleadoTexto").hide();


    if (tipo == 'C') {
        $("#SelectEmpresa").prop("disabled", false);
        $("#SelectEstadoCLE").hide();
        $("#SelectEmpleado").prop("disabled", false);
        $("#InputFechaInicioCLE").prop("disabled", false);
        $("#InputSucurslEmpleadoTexto").hide();
        
        $("#SelectEps").val(1);
        $("#SelectBanco").val(1);
        $("#SelectFondoPensiones").val(1);
        $("#SelectFondoCesantias").val(1);
        $("#InputSalarioCLE").empty().val('');
        $("#InputPorcentajeContribucionEpsCLE").empty().val('');
        $("#InputPorcentajeContribucionFPCLE").empty().val('');
        $("#InputNumeroCuentaPagoCLE").empty().val('');
        $("#InputSubTransporteCLE").empty().val('');

        $('#ImagenEmpleado').empty().append(
            '<img class="imagen-escalada-cambiar" src="/Images/ImagenHVEmpleado/Empleado.png" id="ImagenEmpleado"/>'
        );
        $("#TituloModalCLE").empty().append('<h6>Crear Contrato Laboral Empleado</h6>');
        $('#ModalCLE').modal('show');
        $("#SelectEstadoCLE").hide();
        $("#BotonesModalCLE").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearCLE()">Guardar</button>');
       

    } if (tipo == 'E') {
        $("#SelectEmpresa").prop("disabled", true);
        $("#SelectEmpleado").prop("disabled", true);
        $("#SelectSucursalXIdEmpresa").hide();
        $("#InputSucurslEmpleadoTexto").show();
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
    let IdEmpleado = $('#SelectEmpleado').val();
    let IdSucursal = $('#SelectSucursalXIdEmpresa').val();
    let IdCargo = $('#SelectCargo').val();  
    let IdTipoContrato = $('#SelectTipoContrato').val();  
    let SalarioMensual = $('#InputSalarioCLE').val();
    let FechaInicio = $('#InputFechaInicioCLE').val();
    //let FechaFin = $('#InputFechaFinCLE').val();
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
        VentanaMensaje('Seleccione el Empleado');
    } else if (FechaInicio == null || FechaInicio == '' || FechaInicio == undefined) {
        $('#InputFechaInicioCLE').focus();
        VentanaMensaje('Ingrese la fecha de Incio del Contrato');
    } else if (IdSucursal == -1 || IdSucursal == null || IdSucursal == '') {
        $('#SelectSucursalXIdEmpresa').focus();
        VentanaMensaje('Seleccione la Sucursal');
    } else if (IdTipoContrato == -1 || IdTipoContrato == null || IdTipoContrato == '') {
        $('#SelectTipoContrato').focus();
        VentanaMensaje('Seleccione el Tipo de Contrato');
    } else if (IdCargo == -1 || IdCargo == null || IdCargo == '') {
        $('#SelectCargo').focus();
        VentanaMensaje('Seleccione el Cargo del Empleado');
    } else if (SalarioMensual == null || SalarioMensual == '' || SalarioMensual == undefined) {
        $('#InputSalarioCLE').focus();
        VentanaMensaje('Ingrese el Salario Mensual del Empleado');
    } else if (SubTransporte == null || SubTransporte == '' || SubTransporte == undefined) {
        $('#InputSubTransporteCLE').focus();
        VentanaMensaje('Ingrese el valor del Subsidio de Transporte');
    } else if (IdBanco == -1 || IdBanco == null || IdBanco == '') {
        $('#SelectBanco').focus();
        VentanaMensaje('Seleccione el Banco en donde se le realizara el pago al Empleado');
    } else if (NumeroCuentaPago == null || NumeroCuentaPago == '' || NumeroCuentaPago == undefined) {
        $('#InputNumeroCuentaPagoCLE').focus();
        VentanaMensaje('Ingrese número de cuenta del Banco o Número Celular para Billeteras Digitales');
    } else if (IdEps == -1 || IdEps == null || IdEps == '') {
        $('#SelectEps').focus();
        VentanaMensaje('Seleccione la Eps');
    } else if (PorcentajeContEps == null || PorcentajeContEps == '' || PorcentajeContEps == undefined) {
        $('#InputPorcentajeContribucionEpsCLE').focus();
        VentanaMensaje('El porcentaje de contribución de la Eps no púede ser Vacio');        
    } else if (IdFondoPension == -1 || IdFondoPension == null || IdFondoPension == '') {
        $('#SelectFondoPensiones').focus();
        VentanaMensaje('Seleccione el Fondo de Pensiones');
    } else if (PorcentajeContFP == null || PorcentajeContFP == '' || PorcentajeContFP == undefined) {
        $('#InputPorcentajeContribucionFPCLE').focus();
        VentanaMensaje('El porcentaje de contribución al Fondo de Pensiones no púede ser Vacio'); 
    } else if (IdCesantias == -1 || IdCesantias == null || IdCesantias == '') {
        $('#SelectFondoCesantias').focus();
        VentanaMensaje('Seleccione el Fondo de Cesantías');
    } else {
        //if (FechaFin == FechaInicio || FechaFin == '' || FechaFin > FechaInicio) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Contrato_Laboral/CrearCLE',
                data: {
                    IdUser: TokenUser,
                    IdEmpleado: IdEmpleado,
                    IdSucursal: IdSucursal,
                    IdCargo: IdCargo,
                    IdTipoContrato: IdTipoContrato,
                    SalarioMensual: SalarioMensual,
                    FechaInicio: FechaInicio,                    
                    //FechaFin: FechaFin,
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
                        VentanaMensajeOK(valor[1]);
                    } else {
                        VentanaMensaje(valor[1]);
                    }
                }
            });
        //} else {
        //    $('#InputFechaFinCLE').focus();
        //    VentanaMensaje('Ingrese la Fecha');
        //}
    }
}

function ActualizarCLE() {
    let IdCLE = $('#LabelIdCLE').text();
    let IdCargo = $('#SelectCargo').val(); 
    let SalarioMensual = $('#InputSalarioCLE').val();
    let IdTipoContrato = $('#SelectTipoContrato').val();  
    //let FechaFin = $('#InputFechaFinCLE').val();
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
            //FechaFin: FechaFin,
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
                VentanaMensajeOK(valor[1]);
            } else {
                VentanaMensaje(valor[1]);
            }
        }
    });


    //if (IdEstado == 2) {
    //    if (FechaFin == null || FechaFin == '' || FechaFin == undefined) {
    //        $('#InputFechaFinCLE').focus();
    //        VentanaMensaje('Ingrese la fecha de Finalización del Contrato');
    //    }
    //    else {
    //        $.ajax({
    //            type: 'POST',
    //            dataType: 'json',
    //            url: '/Contrato_Laboral/ActualizarCLE',
    //            data: {
    //                IdUser: TokenUser,
    //                IdCLE: IdCLE,
    //                IdCargo: IdCargo,
    //                SalarioMensual: SalarioMensual,
    //                IdTipoContrato: IdTipoContrato,
    //                FechaFin: FechaFin,
    //                IdEps: IdEps,
    //                PorcentajeContEps: PorcentajeContEps,
    //                IdFondoPension: IdFondoPension,
    //                PorcentajeContFP: PorcentajeContFP,
    //                IdBanco: IdBanco,
    //                NumeroCuentaPago: NumeroCuentaPago,
    //                SubTransporte: SubTransporte,
    //                IdCesantias: IdCesantias,
    //                Observacion: Observacion,
    //                IdEstado: IdEstado
    //            },
    //            success: function (resultado) {
    //                valor = resultado.split('*');
    //                if (valor[0] == 'OK') {
    //                    VentanaMensajeOK(valor[1]);
    //                } else {
    //                    VentanaMensaje(valor[1]);
    //                }
    //            }
    //        });
    //    }
    //} else {
    //    $.ajax({
    //        type: 'POST',
    //        dataType: 'json',
    //        url: '/Contrato_Laboral/ActualizarCLE',
    //        data: {
    //            IdUser: TokenUser,
    //            IdCLE: IdCLE,
    //            IdCargo: IdCargo,
    //            SalarioMensual: SalarioMensual,
    //            IdTipoContrato: IdTipoContrato,
    //            FechaFin: FechaFin,
    //            IdEps: IdEps,
    //            PorcentajeContEps: PorcentajeContEps,
    //            IdFondoPension: IdFondoPension,
    //            PorcentajeContFP: PorcentajeContFP,
    //            IdBanco: IdBanco,
    //            NumeroCuentaPago: NumeroCuentaPago,
    //            SubTransporte: SubTransporte,
    //            IdCesantias: IdCesantias,
    //            Observacion: Observacion,
    //            IdEstado: IdEstado
    //        },
    //        success: function (resultado) {
    //            valor = resultado.split('*');
    //            if (valor[0] == 'OK') {
    //                VentanaMensajeOK(valor[1]);
    //            } else {
    //                VentanaMensaje(valor[1]);
    //            }
    //        }
    //    });
    //} 
}




function EliminarCLE(IdCLE) {
    Swal.fire({
        title: TituloSwal,
        text: "Esta seguro(a)?, No podrás revertir esta acción.!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
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
                        VentanaMensajeOK(valor[1]);
                    } else {
                        VentanaMensaje(valor[1]);
                    }
                }
            });
        }
    });
}

function FinalizarCLE() {
   
    let IdCLE = $('#LabelIdFinalizarCLE').text();
    let FechaInicio = $('#InputFechaInicioFinalizarCLE').val();
    let FechaFin = $('#InputFechaFinFinalizarCLE').val();

    if (FechaFin == FechaInicio || FechaFin == '' || FechaFin < FechaInicio) {
        $('#InputFechaFinFinalizarCLE').focus();
        VentanaMensaje('Por favor valide la Fecha Fin, no puede estar el campo vacio, o la fecha es inferior a la Fecha Inicio del Contrato');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Contrato_Laboral/FinalizarCLE',
            data: {
                IdUser: TokenUser,
                IdCLE: IdCLE,
                FechaFin: FechaFin,
            },
            success: function (resultado) {
                valor = resultado.split('*');
                if (valor[0] == 'OK') {
                    VentanaMensajeOK(valor[1]);
                } else {
                    VentanaMensaje(valor[1]);
                }
            }
        });
    }
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
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [1], className: 'dt-center dt-head-center' },//Nombre empleado
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
            { targets: [12], className: 'dt-head-center' },//Fecha Creación
            { targets: [13], className: 'dt-head-center' },
            { targets: [14], className: 'dt-head-center' },
            { targets: [15], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [16], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', // landscape  portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13],
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
                className: 'btn-nuevo-datatable',
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
                title: "",
                data: "",
                "render": function (data, type, row) {
                    return '<button class="btn btn-sm btn-pdf-cle" onclick="descargarContratoLaboral(' + row.Id + ')">PDF</button>';
                }
            },
            {
                title: "",
                data: "Estado",
                "render": function (data, type, row) {

                    if (row.IdEstado !== 1) {
                        return '<button class="btn btn-sm btn-fin-contrato" disabled>Finalizar Contrato</button>';
                    }
                    else {
                        return '<button class="btn btn-sm btn-fin-contrato ModalFinalizarCLE">Finalizar Contrato</button>';
                    }
                }

            },
            {
                title: "Estado",
                data: "Estado",
                "render": function (data, type, row) {

                    if (row.IdEstado == 1) {
                        return '<label class="label-estado-activo">' + data + '</label>';
                    }
                    else if (row.IdEstado == 2) {
                        return '<label class="label-estado-inactivo">' + data + '</label>';
                    }
                    else if (row.IdEstado == 5) {
                        return '<label class="label-estado-finalizado">' + data + '</label>';
                    }
                }

            },
            {
                title: "Imagén",
                "data": 'Imagen',
                "render": function (data, type, row, meta) {
                    return '<div class="contimg-grid">' +
                        '<img class="imagen-escalada-grid CambiarImagenEmpleado" src="/Images/ImagenHVEmpleado/' + data + '"/>' +
                        '</div>';
                },
                width: '50px'
            },
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
                title: "",
                data: "Estado",
                "render": function (data, type, row) {
                    if (row.IdEstado !== 1) {
                        return '<button class="btn btn-editar-dt" title="Editar Registro" disabled><i class="bi-pencil-fill"></i></button>';
                    }
                    else {
                        return '<a class="EditarCLE btn btn-editar-dt" title="Editar Registro"><i class="bi-pencil-fill"></i></a>';
                    }
                }
            },

            {
                title: "",
                data: "Estado",
                "render": function (data, type, row) {
                    if (row.IdEstado !== 1) {
                        return '<button class="btn btn-eliminar-dt" title="Eliminar Registro" disabled><i class="bi-trash-fill"></i></button>';
                    }
                    else {
                        return '<a class="EliminarCLE btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>';
                    }
                }

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

    $('#gridCLE').on('click', '.EditarCLE', function () {
        let data = datatable.row($(this).parents()).data();
        ModalCLE('E');
        $('#LabelIdCLE').text(data.Id);
        $('#LabelIdCLE').text(data.Id);
        $('#ImagenEmpleado').empty().append(
            '<img class="imagen-escalada-cambiar" src="/Images/ImagenHVEmpleado/' + data.Imagen + '" id="ImagenEmpleado"/>'
        );
        $('#SelectEmpleado').val(data.IdEmpleado);
        $('#SelectEmpresa').val(data.IdEmpresa);
        $('#InputSucurslEmpleadoTexto').val(data.IdSucursal);
        $('#SelectCargo').val(data.IdCargo);
        $('#SelectTipoContrato').val(data.IdTipoContrato);
        $('#InputSalarioCLE').val(data.SalarioMensual);
        $('#InputValorDiaSalarioCLE').val(Math.round(data.SalarioMensual / 30));
        $("#InputFechaInicioCLE").val(data.FechaInicio);
        $("#InputFechaFinCLE").val(data.FechaFin);
        $('#SelectEps').val(data.IdEps);
        $('#SelectFondoPensiones').val(data.IdFondoPension);
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

    $('#gridCLE').on('click', '.ModalFinalizarCLE', function () {
        let data = datatable.row($(this).parents()).data(); 
        $("#InputFechaInicioFinalizarCLE").empty().val('');
        $("#InputFechaFinFinalizarCLE").empty().val('');
        $("#NombreEmpleado").empty().val('');
        $('#ModalFinalizarCLE').modal('show');
        $('#LabelIdFinalizarCLE').text(data.Id);
        $('#NombreEmpleado').val(data.Empleado);
        $("#InputFechaInicioFinalizarCLE").val(data.FechaInicio);
    })
}

function ListaContratoLaboralEmpleado() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Contrato_Laboral/ListaContratoLaboralEmpleado',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length == 0) {
                $("#SelectContratoLaboralEmpleado").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectContratoLaboralEmpleado").empty().append('<option value="-1">- Escoge un Empleado -</option>');
                $.each(resultado, function () {
                    $("#SelectContratoLaboralEmpleado").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function ListaContratoLaboralSucursalEmpleado() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Contrato_Laboral/ListaContratoLaboralSucursalEmpleado',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length == 0) {
                $("#SelectContratoLaboralSucursalEmpleado").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectContratoLaboralSucursalEmpleado").empty().append('<option value="-1">- Escoge un Empleado -</option>');
                $.each(resultado, function () {
                    $("#SelectContratoLaboralSucursalEmpleado").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
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



function descargarContratoLaboral(id) {
    window.open('/Contrato_Laboral/DescargarContratoLaboral?id=' + id, '_blank');
}

