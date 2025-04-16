function ModalPrestamoEmpleado(tipo) {
    $("#TituloModalPrestamoEmpleado").empty().val('');
    $("#LabelIdPrestamoEmpleado").empty().val('');
    $("#InputPrestamoEmpleadoEmpleado").empty().val('');
    $("#InputPrestamoEmpleadoValor").empty().val('');
    $("#InputPrestamoEmpleadoFechaPrestamo").empty().val('');
    $("#InputPrestamoEmpleadoFechaPago").empty().val('');
    //$("#InputPrestamoEmpleadoNumeroCuotas").empty().val('');
    $("#InputPrestamoEmpleadoObservacion").empty().val('');    
    $("#SelectContratoLaboralEmpleado").val(-1);
    $("#BotonesModalPrestamoEmpleado").empty();
    if (tipo == 'C') {
        $("#TituloModalPrestamoEmpleado").empty().append('<h6>Crear Préstamo Empleado</h6>');
        $('#ModalCrearPrestamoEmpleado').modal('show');
        $("#InputPrestamoEmpleadoEmpleado").hide();
        $("#SelectContratoLaboralEmpleado").show();
        $("#SelectEstadoPrestamoEmpleado").hide();
        $("#BotonesModalPrestamoEmpleado").empty().append('<button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-success btn-sm" onclick="CrearPrestamoEmpleado()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalPrestamoEmpleado").empty().append('<h5>Editar Préstamo Empleado</h5>');
        $('#ModalCrearPrestamoEmpleado').modal('show');
        $("#InputPrestamoEmpleadoEmpleado").show();
        $("#SelectContratoLaboralEmpleado").hide();
        $("#SelectEstadoPrestamoEmpleado").show();
        $("#BotonesModalPrestamoEmpleado").empty().append('<button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-success btn-sm" onclick="ActualizarPrestamoEmpleado()">Guardar Cambios</button>');
    }
}


//#region funciones guardar


function CrearPrestamoEmpleado() {
    let IdEmpleado = $('#SelectContratoLaboralEmpleado').val();
    let Valor = $('#InputPrestamoEmpleadoValor').val();
    let FechaPrestamo = $('#InputPrestamoEmpleadoFechaPrestamo').val();
    let FechaPago = $('#InputPrestamoEmpleadoFechaPago').val();
    let Cuotas = $('#InputPrestamoEmpleadoNumeroCuotas').val();
    let Observacion = $('#InputPrestamoEmpleadoObservacion').val();
    if (IdEmpleado == -1 || IdEmpleado == null || IdEmpleado == '') {
        $('#SelectContratoLaboralEmpleado').focus();
        Swal.fire(TituloSwal, 'Seleccione el Empleado', 'info');
    } else if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputPrestamoEmpleadoValor').focus();
        Swal.fire(TituloSwal, 'Ingrese el Valor', 'info');
    } else if (FechaPrestamo == null || FechaPrestamo == '' || FechaPrestamo == undefined) {
        $('#InputPrestamoEmpleadoFechaPrestamo').focus();
        Swal.fire(TituloSwal, 'Ingrese la Fecha', 'info');
    } else if (FechaPago == null || FechaPago == '' || FechaPago == undefined) {
        $('#InputPrestamoEmpleadoFechaPago').focus();
        Swal.fire(TituloSwal, 'Ingrese la Fecha de Pago', 'info');
    } else if (Cuotas == null || Cuotas == '' || Cuotas == undefined) {
        $('#InputPrestamoEmpleadoNumeroCuotas').focus();
        Swal.fire(TituloSwal, 'Ingrese el número de Cuotas', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Prestamo_Empleado/CrearPrestamoEmpleado',
            data: {
                IdUser: User,
                IdEmpleado: IdEmpleado,
                Valor: Valor,
                FechaPrestamo: FechaPrestamo,
                FechaPago: FechaPago,
                Cuotas: Cuotas,
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
    }
}


function ActualizarPrestamoEmpleado() {
    let IdPrestamoEmpleado = $('#LabelIdPrestamoEmpleado').text();
    let Valor = $('#InputPrestamoEmpleadoValor').val();
    let FechaPrestamo = $('#InputPrestamoEmpleadoFechaPrestamo').val();
    let FechaPago = $('#InputPrestamoEmpleadoFechaPago').val();
    let Cuotas = $('#InputPrestamoEmpleadoNumeroCuotas').val();
    let Observacion = $('#InputPrestamoEmpleadoObservacion').val();
    let IdEstado = $('#SelectEstado').val();
    if (Valor == null || Valor == '' || Valor == undefined) {
        $('#InputPrestamoEmpleadoValor').focus();
        Swal.fire(TituloSwal, 'Ingrese el Valor', 'info');
    } else if (FechaPrestamo == null || FechaPrestamo == '' || FechaPrestamo == undefined) {
        $('#InputPrestamoEmpleadoFechaPrestamo').focus();
        Swal.fire(TituloSwal, 'Ingrese la Fecha', 'info');
    } else if (FechaPago == null || FechaPago == '' || FechaPago == undefined) {
        $('#InputPrestamoEmpleadoFechaPago').focus();
        Swal.fire(TituloSwal, 'Ingrese la Fecha de Pago', 'info');
    } else if (Cuotas == null || Cuotas == '' || Cuotas == undefined) {
        $('#InputPrestamoEmpleadoNumeroCuotas').focus();
        Swal.fire(TituloSwal, 'Ingrese el número de Cuotas', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Prestamo_Empleado/ActualizarPrestamoEmpleado',
            data: {
                IdUser: User,
                IdPrestamoEmpleado: IdPrestamoEmpleado,
                Valor: Valor,
                FechaPrestamo: FechaPrestamo,
                FechaPago: FechaPago,
                Cuotas: Cuotas,
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
}


//#endregion

//#region funciones Grid
function GridPrestamoEmpleado() {
    var tituloReporte = 'LISTADO PRÉSTAMO EMPLEADO';
    let datatable = $('#gridPrestamoEmpleado').DataTable({
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        buttons: [{
            extend: 'excelHtml5',
            footer: true,
            title: tituloReporte + ' ' + NombreEmpresa,
            filename: tituloReporte + ' - ' + NombreEmpresa + ' ' + jsDate + ' ' + hora,
            text: 'Descargar Excel',
            exportOptions: {
                columns: [1, 2, 3, 5, 6, 7, 8,9,10,11,12],
            },
        },
        {
            //download: 'open',
            text: 'Descargar PDF',
            extend: 'pdfHtml5',
            filename: tituloReporte + ' - ' + NombreEmpresa + ' ' + jsDate + ' ' + hora,
            orientation: 'landscape', //portrait  landscape
            pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
            exportOptions: {
                columns: [1, 2, 3, 5, 6, 7, 8,9,10,11,12],
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
                                fontSize: 5,
                                alignment: 'left',
                                text: GCS + ' ' + now
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
        ],
        "order": [[1, "asc"]],
        destroy: true,
        "ajax": {
            "url": '/Prestamo_Empleado/GridPrestamoEmpleado',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            {
                title: "Acciones",
                data: null,
                defaultContent: '<div class="btn-group"><a href="#" class= "EditarPrestamoEmpleado btn" title="Editar"> <i class="bi-pencil-fill" style="Color:green"></i></a><a href="#" class="EliminarPrestamoEmpleado btn" title="Eliminar"><i class="bi-trash-fill" style=";Color:red"></i></a></div>',
                className: '',
                orderable: false,
                width: 'auto'
            },
            { "data": "Empleado", title: "Empleado", width: 'auto' },
            { "data": "Sucursal", title: "Sucursal", width: 'auto' },
            { "data": "Valor", title: "Valor", width: 'auto', visible: false },
            {
                "data": "null",
                title: "Valor",
                "render": function (data, type, row, meta) {
                    return '$ ' + new Intl.NumberFormat('en-US').format(row.Valor);
                }
            },
            { "data": "TextoFechaPrestamo", title: "Fecha Préstamo", width: 'auto' },
            { "data": "TextoFechaPago", title: "Fecha Pago", width: 'auto' },
            { "data": "Cuotas", title: "# Cuotas", width: 'auto' },
            { "data": "ComprobanteNomina", title: "# Comprobante Nómina", width: 'auto' },
            { "data": "Observacion", title: "Observación", width: 'auto' },
            { "data": "Estado", title: "Estado", width: 'auto' },
            { "data": "CreateBy", title: "Creado Por", width: 'auto'},
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto'},
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json"
        },
        lengthMenu: [
            [10, 25, 50, -1],
            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });
    $('#gridPrestamoEmpleado').on('click', '.EditarPrestamoEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        ModalPrestamoEmpleado('E');
        $('#LabelIdPrestamoEmpleado').text(data.Id);
        $('#InputPrestamoEmpleadoEmpleado').val(data.Empleado);
        $('#InputPrestamoEmpleadoValor').val(data.Valor);
        $('#InputPrestamoEmpleadoFechaPrestamo').val(data.FechaPrestamo);
        $('#InputPrestamoEmpleadoFechaPago').val(data.FechaPago);
        $('#InputPrestamoEmpleadoNumeroCuotas').val(data.Cuotas);
        $('#InputPrestamoEmpleadoObservacion').val(data.Observacion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridPrestamoEmpleado').on('click', '.EliminarPrestamoEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarRegistroTabla(data.Id, 'Prestamo_Empleado');
    })
}

//#endregion

//#region lista/buscar
function DashboardPrestamoEmpleado() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Prestamo_Empleado/UltimoPrestamoEmpleadoCreado',
        data: {},
        success: function (resultado) {
            $('#CardPrestamoEmpleadoEmpleado').text(resultado[0].Empleado);
            $('#CardPrestamoEmpleadoSucursal').text(resultado[0].Sucursal);
            $('#CardPrestamoEmpleadoValor').text(resultado[0].Valor);
            $('#CardPrestamoEmpleadoFechaPrestamo').text(resultado[0].FechaPrestamo);
            $('#CardPrestamoEmpleadoFechaPago').text(resultado[0].FechaPago);
            $('#CardPrestamoNumeroPagosEmpleado').text(resultado[0].Cuotas);
            $('#CardPrestamoEmpleadoObservacion').text(resultado[0].Observacion);
            $('#CardPrestamoEmpleadoCreate').text(resultado[0].DateCreate);
        },
    });
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Prestamo_Empleado/DatosTablaTotalPrestamo',
        data: {
        },
        success: function (data) {
            var contador = 0;

            cant = data.length;

            if (cant == 0) {
                $("#DatosTablaTotalPrestamo").append('<td>No hay datos</td><td>No hay datos</td><td>No hay datos</td>');
            } else {
                $.each(data, function () {
                    if (data[contador].Estado == 'Paz y Salvo') {
                        $("#DatosTablaTotalPrestamo").append(
                            '<tr>' +
                            '<td style="color:green;">' + data[contador].Estado + '</td>' +
                            '<td style="color:green">' + data[contador].Cantidad + '</td>' +
                            '<td style="color:green">' + data[contador].Valor + '</td>' +
                            '</tr>'
                        );
                    } else {
                        $("#DatosTablaTotalPrestamo").append(
                            '<tr>' +
                            '<td style="color:red;font-weight:bold">' + data[contador].Estado + '</td>' +
                            '<td style="color:red;font-weight:bold">' + data[contador].Cantidad + '</td>' +
                            '<td style="color:red;font-weight:bold">' + data[contador].Valor + '</td>' +
                            '</tr>'
                        );
                    }
                    contador++;
                });
            }
        }
    });
}

//#endregion

