function ModalEmpleado(tipo) {
    $("#TituloModalEmpleado").empty().val('');
    $("#LabelIdEmpleado").empty().val('');
    $("#InputNombreEmpleado").empty().val('');
    $("#InputApellidosEmpleado").empty().val('');
    $("#SelectTipoDocumento").val(-1);
    $("#InputIdentificacionEmpleado").empty().val('');
    $("#BotonesModalEmpleado").empty();
    if (tipo == 'C') {
        $("#ContenedorImagenHVEmpleado").hide();
        $("#TituloModalEmpleado").empty().append('<label>Crear Empleado</label>');
        $('#ModalEmpleado').modal('show');
        $("#SelectEstadoEmpleado").hide();
        $("#BotonesModalEmpleado").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearEmpleado()">Guardar</button>');
    } if (tipo == 'E') {
        $("#ContenedorImagenHVEmpleado").show();
        $("#TituloModalEmpleado").empty().append('<label>Editar Empleado</label>');
        $('#ModalEmpleado').modal('show');
        $("#SelectEstadoEmpleado").show();
        $("#BotonesModalEmpleado").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarEmpleado()">Guardar Cambios</button>');
    }
}


function CrearEmpleado() {
    let Nombre = $('#InputNombreEmpleado').val();
    let Apellidos = $('#InputApellidosEmpleado').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let Identificacion = $('#InputIdentificacionEmpleado').val();
    if (Nombre == null || Nombre == '' || Nombre == undefined) {
        $('#InputNombreEmpleado').focus();
        VentanaMensaje('Ingrese el Nombre del Empleado', 'info');
    } else if (Apellidos == null || Apellidos == '' || Apellidos == undefined) {
        $('#InputApellidosEmpleado').focus();
        VentanaMensaje('Ingrese el Apellido del Empleado', 'info');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione el Tipo de Documento del Empleado', 'info');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionEmpleado').focus();
        VentanaMensaje('Ingrese la Identificación del Empleado', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Empleado/CrearEmpleado',
            data: {
                IdUser: TokenUser,
                Nombre: Nombre,
                Apellidos: Apellidos,
                IdTipoDocumento: IdTipoDocumento,
                Identificacion: Identificacion
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


function ActualizarEmpleado() {
    let IdEmpleado = $('#LabelIdEmpleado').text();
    let Nombre = $('#InputNombreEmpleado').val();
    let Apellidos = $('#InputApellidosEmpleado').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let Identificacion = $('#InputIdentificacionEmpleado').val();
    let IdEstado = $('#SelectEstado').val();
    if (Nombre == null || Nombre == '' || Nombre == undefined) {
        $('#InputNombreEmpleado').focus();
        VentanaMensaje('Ingrese el Nombre del Empleado', 'info');
    } else if (Apellidos == null || Apellidos == '' || Apellidos == undefined) {
        VentanaMensaje('Ingrese el Apellido del Empleado', 'info');
        Swal.fire(TituloSwal, 'Ingrese el Apellido del Empleado', 'info');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione el Tipo de Documento del Empleado', 'info');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionEmpleado').focus();
        VentanaMensaje('Ingrese la Identificación del Empleado', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Empleado/ActualizarEmpleado',
            data: {
                IdUser: TokenUser,
                IdEmpleado: IdEmpleado,
                Nombre: Nombre,
                Apellidos: Apellidos,
                IdTipoDocumento: IdTipoDocumento,
                Identificacion: Identificacion,
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
    }
}

function EliminarEmpleado(IdEmpleado) {
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
                url: '/Empleado/EliminarEmpleado',
                data: {
                    IdUser: TokenUser,
                    IdEmpleado: IdEmpleado
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

function GuardarImagenHVEmpleado() {
    var IdEmpleado = $('#IdEmpleadoImagen').text();
    var NombreImagen = $('#NombreImagenActualEmpleado').text();
    var photo = new Array();
    var formData = new FormData();

    var Imagen = $('#inPhoto').val();

    if (Imagen == null || Imagen == '' || Imagen == undefined) {
        $('#inPhoto').focus();
        VentanaMensaje('El campo de imagén esta vacío', 'info');
    } else {
        if ($('#inPhoto')[0].files.length > 0) {
            formData.append('Files', $('#inPhoto')[0].files[0], $('#inPhoto')[0].files[0].name);
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Empleado/DatosEmpleado',
            data: {
                IdEmpleado: IdEmpleado,
                IdUsuario: TokenUser,
                NombreImagen: NombreImagen
            }
        });
        photo.push(formData);
        $.ajax({
            type: 'POST',
            data: photo[0],
            url: '/Empleado/GuardarImagenHVEmpleado',
            contentType: false,
            processData: false,
            success: function (result) {
                valor = result.split('*');
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
}

//#endregion

//#region funciones Grid
function GridEmpleado() {
    var tituloReporte = 'REPORTE EMPLEADO';
    let datatable = $('#gridEmpleado').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], className: 'dt-center dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [2], className: 'dt-head-center' },
            { targets: [4], className: 'dt-head-center' },
            { targets: [5], className: 'dt-head-center' },
            { targets: [6], className: 'dt-head-center' },
            { targets: [7], width: '50px', className: 'dt-center dt-head-center' },
            { targets: [8], width: '30px', className: 'dt-center dt-head-center' },
            { targets: [9], width: '30px', className: 'dt-center dt-head-center' }
        ],
        buttons: [{
            extend: 'excel', className: 'btn-excel-datatable',
            footer: true,
            title: tituloReporte + ' ' + NameApp,
            filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
            text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
            exportOptions: {
                columns: [1, 2, 3, 5, 6, 7]
            },
        },
        {
            //download: 'open',
            extend: 'pdfHtml5', className: 'btn-pdf-datatable',
            text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
            filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
            orientation: 'portrait', //portrait landscape
            pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
            exportOptions: {
                columns: [1, 2, 3, 5, 6, 7],
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
                ModalEmpleado('C');
            }
        }
        ],
        /*"order": [[1, "asc"]],*/
        destroy: true,
        "ajax": {
            "url": '/Empleado/GridEmpleado',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            {
                title: "Imagén",
                "data": 'Imagen',
                "render": function (data, type, row, meta) {
                    return '<div class="contimg-grid">' +
                        '<img class="imagen-escalada-grid btn CambiarImagenEmpleado" src="/Images/ImagenHVEmpleado/' + data + '"/>' +
                        '</div>';
                },
                width: '50px'
            },
            {
                title: "Empleado",
                data: "nombres",
                render: function (data, type, row) {
                    return `${row.Nombre} ${row.Apellidos}`;
                }
                , width: 'auto'
            },
            { "data": "TipoDocumento", title: "Documento", width: 'auto', visible: false },
            { "data": "Identificacion", title: "Identificación", width: 'auto', visible: false },
            {
                title: "Identificación",
                data: "",
                render: function (data, type, row) {
                    return `${row.TipoDocumento}: ${Intl.NumberFormat().format(row.Identificacion)}`;
                }
                , width: 'auto'
            },
            { "data": "CreateBy", title: "Creado Por", width: 'auto' },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto' },
            {
                title: "Estado",
                data: "Estado",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.IdEstado == 1) {
                        return '<label class="label-estado-activo">&nbsp;' + data + '&nbsp;</label>';
                    }
                    else {
                        return '<label class="label-estado-inactivo">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<i class="bi-pencil-square btn EditarEmpleado" style="color:blue" title="Editar"></i>'+
                    /*'<a class="EditarEmpleado btn btn-editar-dt" title="Editar Registro">Editar</a>' +*/
                    '</div>',
                orderable: false,
                width: 'auto',
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<div class="btn-group-sm">' +
                    '<i class="bi-trash3-fill btn EliminarEmpleado" style="color:red" title="Eliminar"></i>' +
                    /*'<a class="EliminarEmpleado btn btn-eliminar-dt" title="Eliminar Registro">Eliminar</a>' +*/
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


    $('#gridEmpleado').on('click', '.EditarEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        ModalEmpleado('E');
        $('#LabelIdEmpleado').text(data.Id);
        $('#InputNombreEmpleado').val(data.Nombre);
        $('#InputApellidosEmpleado').val(data.Apellidos);
        $('#SelectTipoDocumento').val(data.IdTipoDocumento);
        $('#InputIdentificacionEmpleado').val(data.Identificacion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridEmpleado').on('click', '.CambiarImagenEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalImagenEmpleado').modal('show');
        $('#IdEmpleadoImagen').text(data.Id);
        $('#NombreImagenActualEmpleado').text(data.Imagen);
        $('#NombreEmpleadoImagen').text(data.Nombre + ' ' + data.Apellidos);
        $('#ImagenHVEmpleado').empty().append(
            '<img class="imagen-escalada-cambiar" src="/Images/ImagenHVEmpleado/' + data.Imagen + '"/>'
        );
    })

    $('#gridEmpleado').on('click', '.EliminarEmpleado', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarEmpleado(data.Id);
    })

}


function ListaEmpleado() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Empleado/ListaEmpleado',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectEmpleado").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectEmpleado").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectEmpleado").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function BuscarImagenEmpleado(IdEmpleado) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Empleado/BuscarImagenEmpleado',
        data: {
            IdEmpleado: IdEmpleado
        },
        success: function (resultado) {
            $("#ImagenEmpleado").empty();
            if (IdEmpleado == -1) {
                $('#ImagenEmpleado').empty().append(
                    '<img class="imagen-escalada-cambiar" src="/Images/ImagenHVEmpleado/Empleado.png"/>'
                );
            } else {
                $('#ImagenEmpleado').empty().append(
                    '<img class="imagen-escalada-cambiar" src="/Images/ImagenHVEmpleado/' + resultado[0].Imagen + '"/>'
                );
            }
        },
    });
}

function InfoEmpleado() {
    Swal.fire(TituloSwal, 'Esta Opción no esta disponible en el momento', 'info');
}



