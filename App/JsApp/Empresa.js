function ModalEmpresa(tipo) {
    $("#TituloModalEmpresa").empty().val('');
    $("#LabelIdEmpresa").empty().val('');
    $("#InputNombreEmpresa").empty().val('');
    $("#SelectTipoDocumento").val(-1);
    $("#InputIdentificacionEmpresa").empty().val('');
    $("#InputEmailEmpresa").empty().val('');
    $("#InputTelefonoEmpresa").empty().val('');
    $("#InputContactoEmpresa").empty().val('');
    $("#InputDireccionEmpresa").empty().val('');
    $("#SelectCiudad").val(-1);
    $("#BotonesModalEmpresa").empty();
    if (tipo == 'C') {
        $("#TituloModalEmpresa").empty().append('<h6>Crear Empresa</h6>');
        $('#ModalEmpresa').modal('show');
        $("#SelectEstadoEmpresa").hide();
        $("#BotonesModalEmpresa").empty().append('<button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-success btn-sm" onclick="CrearEmpresa()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalEmpresa").empty().append('<h6>Editar Empresa</h6>');
        $('#ModalEmpresa').modal('show');
        $("#SelectEstadoEmpresa").show();
        $("#BotonesModalEmpresa").empty().append('<button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-success btn-sm" onclick="ActualizarEmpresa()">Guardar Cambios</button>');
    }
}

function CrearEmpresa() {
    let NombreEmpresa = $('#InputNombreEmpresa').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let Identificacion = $('#InputIdentificacionEmpresa').val();
    let Email = $('#InputEmailEmpresa').val();
    let Telefono = $('#InputTelefonoEmpresa').val();
    let Contacto = $('#InputContactoEmpresa').val();
    let IdCiudad = $('#SelectCiudad').val();
    let Direccion = $('#InputDireccionEmpresa').val();

    if (NombreEmpresa == null || NombreEmpresa == '' || NombreEmpresa == undefined) {
        $('#InputNombreEmpresa').focus();
        Swal.fire(TituloSwal, 'Ingrese nombre de la empresa', 'info');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        Swal.fire(TituloSwal, 'Seleccione tipo documento', 'info');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionEmpresa').focus();
        Swal.fire(TituloSwal, 'Ingrese la identificación', 'info');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        Swal.fire(TituloSwal, 'Seleccione la ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Empresa/CrearEmpresa',
            data: {
                IdUser: User,
                NombreEmpresa: NombreEmpresa,
                IdTipoDocumento: IdTipoDocumento,
                Identificacion: Identificacion,
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

function ActualizarEmpresa() {
    let IdEmpresa = $('#LabelIdEmpresa').text();
    let NombreEmpresa = $('#InputNombreEmpresa').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let Identificacion = $('#InputIdentificacionEmpresa').val();
    let Email = $('#InputEmailEmpresa').val();
    let Telefono = $('#InputTelefonoEmpresa').val();
    let Contacto = $('#InputContactoEmpresa').val();
    let IdCiudad = $('#SelectCiudad').val();
    let Direccion = $('#InputDireccionEmpresa').val();
    let IdEstado = $('#SelectEstado').val();

    if (NombreEmpresa == null || NombreEmpresa == '' || NombreEmpresa == undefined) {
        $('#InputNombreEmpresa').focus();
        Swal.fire(TituloSwal, 'Ingrese nombre de la empresa', 'info');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        Swal.fire(TituloSwal, 'Seleccione tipo documento', 'info');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionEmpresa').focus();
        Swal.fire(TituloSwal, 'Ingrese la Identificación', 'info');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        Swal.fire(TituloSwal, 'Seleccione la ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Empresa/ActualizarEmpresa',
            data: {
                IdUser: User,
                IdEmpresa: IdEmpresa,
                NombreEmpresa: NombreEmpresa,
                IdTipoDocumento: IdTipoDocumento,
                Identificacion: Identificacion,
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

function EliminarEmpresa(IdEmpresa) {
    Swal.fire({
        title: TituloSwal,
        text: "Esta seguro(a)?, No podrás revertir esta acción.!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Empresa/EliminarEmpresa',
                data: {
                    IdUser: User,
                    IdEmpresa: IdEmpresa
                },
                success: function (resultado) {
                    valor = resultado.split('*');
                    if (valor[0] == 'OK') {
                        Swal.fire({
                            title: TituloSwal,
                            text: valor[1],
                            icon: 'success',
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

function GridEmpresa() {
    var tituloReporte = 'LISTADO DE EMPRESAS';
    let datatable = $('#gridEmpresa').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        buttons: [{
            extend: 'excelHtml5',
            footer: true,
            title: tituloReporte + ' ' + NameApp,
            filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
            text: 'Descargar Excel',
            exportOptions: {
                columns: [1, 3, 4, 5, 6, 7, 8, 9,10, 11],
            },
        },
        {
            //download: 'open',
            text: 'Descargar PDF',
            extend: 'pdfHtml5',
            filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
            orientation: 'landscape', //portrait
            pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
            exportOptions: {
                columns: [1, 3, 4, 5, 6, 7, 8,9,10, 11],
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
                            {
                                italics: true,
                                alignment: 'right',
                                fontSize: 10,                                
                                text: NameApp + ' - ' + tituloReporte
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
            "url": '/Empresa/GridEmpresa',
            "type": "GET",
            "datatype": "json"
        },
        columns: [
            {
                title: "Acciones",
                data: null,
                defaultContent: '<div class="btn-group">' +
                    '<a href="#" class= "EditarEmpresa btn" title="Editar Registro"><i class="bi-pencil-fill" style="font-size:0.7rem; color: darkorange"></i></a>' +
                    '<a href="#" class= "EliminarEmpresa btn" title="Eliminar Registro"><i class="bi-trash-fill" style="font-size:0.7rem; color: red"></i></a>' +
                    '</div > ',
                className: '',
                orderable: false,
                width: 'auto' 
            },
            { "data": "Nombre", title: "Empresa", width: 'auto' },      
            {
                title: "Documento",
                data: "",
                render: function (data, type, row) {
                    return `${row.TipoDocumento}:  ${row.Identificacion}`;
                }
                , width: 'auto'
            },
            { "data": "TipoDocumento", title: "Documento", width: 'auto', visible: false },
            { "data": "Identificacion", title: "Identificación", width: 'auto', visible: false },
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
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },

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

    $('#gridEmpresa').on('click', '.EliminarEmpresa', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarEmpresa(data.Id);
    })
}

function ListaEmpresa() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Empresa/ListaEmpresa',
        data: {},
        success: function (resultado) {
            var contador = 0;
            if (resultado.length === 0) {
                $("#SelectEmpresa").append('<option value="">No hay Datos</option>');
            } else {
                $("#SelectEmpresa").empty().append('<option value="-1">Seleccione ...</option>');
                $.each(resultado, function () {
                    $("#SelectEmpresa").append('<option value="' + resultado[contador].Id + '">' + resultado[contador].Nombre + '</option>');
                    contador++;
                });
            }
        },
    });
}

function ListaIdEmpresaXIdEmpleado(IdEmpleado) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Empresa/ListaIdEmpresaXIdEmpleado',
        data: {
            IdEmpleado: IdEmpleado
        },
        success: function (resultado) {
            $('#InputEmpresa').val(resultado[0].Nombre);
        },
    });
}



    







