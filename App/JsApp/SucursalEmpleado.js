function ModalSucursalEmpleado(tipo) {
    $("#TituloModalSucursalEmpleado").empty().val('');
    $("#LabelIdSucursalEmpleado").empty().text('');
    $("#SelectContratoLaboralEmpleado").val(-1);    
    $("#SelectEmpresa").val(-1).prop("disabled", true);
    $("#SelectSucursalXIdEmpresaXIdEmpleado").val(-1).prop("disabled", true);
    $("#InputFechaInicioSE").empty().val('');
    $("#InputFechaFinSE").empty().val('');
    $("#InputObservacionSE").empty().val('');
    $("#BotonesModalSucursalEmpleado").empty();
    $("#TituloModalSucursalEmpleado").empty();  
    $("#InputEmpleado").empty().val('');
    $("#InputEmpresa").empty().val('');
    $("#InputSucursal").empty().val('');

    if (tipo == 'C') {
        $('#ImagenEmpleado').empty().append(
            '<img src="/Images/ImagenHVEmpleado/Empleado.png" class="imagen-escalada-cambiar" id="ImagenEmpleado"/>'
        );
        $("#TituloModalSucursalEmpleado").empty().append('<label>Crear Sucursal Empleado</label>');
        $('#ModalSucursalEmpleado').modal('show');
        $("#SelectEstadoSucursalEmpleado").hide();
        $("#BotonesModalSucursalEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearSucursalEmpleado()">Guardar</button>');
        $("#SelectContratoLaboralEmpleado").show();
        $("#InputEmpleado").hide();
        $("#InputSucursal").hide();
        $("#InputFechaInicioSE").prop("disabled", false);
        $("#InputFechaFinSE").prop("disabled", true);
        $("#SelectSucursalXIdEmpresaXIdEmpleado").show();
        
    } if (tipo == 'E') {
        $("#TituloModalSucursalEmpleado").empty().append('<label>Editar Sucursal Empleado</label>');
        $('#ModalSucursalEmpleado').modal('show');
        $("#SelectEstadoSucursalEmpleado").show();
        $("#BotonesModalSucursalEmpleado").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarSucursalEmpleado()">Guardar Cambios</button>');
        $("#SelectContratoLaboralEmpleado").hide();
        $("#SelectSucursalXIdEmpresaXIdEmpleado").hide();
        $("#InputSucursal").show();
        $("#InputEmpleado").show();
        $("#InputFechaInicioSE").prop("disabled", true);
        $("#InputFechaFinSE").prop("disabled", false);
        
        
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

function EliminarSucursalEmpleado(IdSucursalEmpleado) {
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
                url: '/Sucursal_Empleado/EliminarSucursalEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdSucursalEmpleado: IdSucursalEmpleado
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

function GridSucursalEmpleado() {
    var tituloReporte = 'LISTADO DE SUCURSAL EMPLEADOS';
    let datatable = $('#gridSucursalEmpleado').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [1], className: 'dt-head-center' },//Nombre
            { targets: [2], className: 'dt-head-center' },//Empresa
            { targets: [3], className: 'dt-head-center' },//Sucursal
            { targets: [4], className: 'dt-head-center', className: 'dt-center dt-head-center' },//Fecha Inicio
            { targets: [5], className: 'dt-head-center', className: 'dt-center dt-head-center' },//Fecha Fin
            { targets: [6], className: 'dt-head-center', className: 'dt-center dt-head-center' },//Permanencia
            { targets: [7], className: 'dt-head-center' },//Observacion
            { targets: [8], className: 'dt-head-center' },//Observacion            
            { targets: [9], className: 'dt-head-center' },
            { targets: [10], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [11], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape', // landscape portrait
                pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
                title: "Estado",
                data: "Estado",
                "render": function (data, type, row) {

                    if (row.IdEstado == 1) {
                        return '<label class="label-estado-activo">' + data + '</label>';
                    }
                    else if (row.IdEstado == 2) {
                        return '<label class="label-estado-inactivo">' + data + '</label>';
                    }
                }

            },
            //{
            //    title: "Imagén",
            //    data: "Imagen",
            //    width: 'auto',
            //    "render": function (data, type, row) {

            //        if (row.IdEstado == 1) {
            //            return '<img src="/Images/ImagenHVEmpleado/' + data + '" alt="" height="35" width="35" style="border-radius:50%; border: 1px solid green; padding:2px"/>';
            //        }
            //        else {
            //            return '<img src="/Images/ImagenHVEmpleado/' + data + '" alt="" height="35" width="35" style="border-radius: 50%; border: 1px solid red; padding:2px" />';
            //        }
            //    }

            //},
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
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarSucursalEmpleado btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarSucursalEmpleado btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
                orderable: false,
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


