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
        $("#BotonesModalEmpresa").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearEmpresa()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalEmpresa").empty().append('<h6>Editar Empresa</h6>');
        $('#ModalEmpresa').modal('show');
        $("#SelectEstadoEmpresa").show();
        $("#BotonesModalEmpresa").empty().append('<button type="button" class="btn btn-modal-Cancelar btn-sm" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-modal-guardar btn-sm" onclick="ActualizarEmpresa()">Guardar Cambios</button>');
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
        VentanaMensaje('Ingrese nombre de la empresa', 'info');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione tipo documento', 'info');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionEmpresa').focus();
        VentanaMensaje('Ingrese la identificación', 'info');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        VentanaMensaje('Seleccione la ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Empresa/CrearEmpresa',
            data: {
                IdUser: TokenUser,
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
        VentanaMensaje('Ingrese nombre de la empresa', 'info');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione tipo documento', 'info');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionEmpresa').focus();
        VentanaMensaje('Ingrese la identificación', 'info');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        VentanaMensaje('Seleccione la ciudad', 'info');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Empresa/ActualizarEmpresa',
            data: {
                IdUser: TokenUser,
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

function EliminarEmpresa(IdEmpresa) {
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
                url: '/Empresa/EliminarEmpresa',
                data: {
                    IdUser: TokenUser,
                    IdEmpresa: IdEmpresa
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

function GridEmpresa() {
    var tituloReporte = 'LISTADO DE EMPRESAS';
    let datatable = $('#gridEmpresa').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        buttons: [

            {
            extend: 'excel', className: 'btn btn-excel-datatable',
            footer: true,
            title: tituloReporte + ' ' + NameApp,
            filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
            text: 'Descargar Excel',
            exportOptions: {
                columns: [1, 3, 4, 5, 6, 7, 8, 9,10, 11],
            },
        },
            {
            extend: 'pdf', className: 'btn btn-pdf-datatable',
            //download: 'open',
            text: 'Descargar PDF',
            //extend: 'pdfHtml5',
            
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
                                text: NameApp +' '+SloganEmpresa,
                                fontSize: 25,
                                 /* color:'orangered',
                              image: logoEmpresa64bits,*/
                                width: 100,
                                height: 30,
                                margin: [20, 0]
                            },
                            {
                                text: SloganEmpresa,
                                fontSize: 7,
                                italics: true,
                                /* image: logoEmpresa64bits,*/
                                width: 120,
                                height: 30,
                                margin: [-18, 18]
                            },
                            {
                                italics: true,
                                alignment: 'right',
                                fontSize: 10,                                
                                text: tituloReporte,
                                margin: [0, 18]
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
                text: 'Nuevo Registro',
                className: 'btn-pdf-datatable',
                action: function (e, dt, node, config) {
                    ModalEmpresa('C');
                }
            }
            
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
                title: "Editar",
                data: null,
                defaultContent: '<a href="#" class= "EditarEmpresa btn btn-editar-dt" title="Editar Registro"><i class="bi-pencil" style="color:white; font-size:0.5rem"></i></a>',
                orderable: false,
                width: 5 
            },
            {
                title: "Eliminar",
                data: null,
                defaultContent: '<a href="#" class="EliminarEmpresa btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash" style="color:white; font-size:0.5rem"></i></a>',
                orderable: false,
                width: 5
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
            //{ "data": "Estado", title: "Estado", width: 'auto' },
            {
                title: "Estado",
                data: "Estado",
                width: 'auto',
                "render": function (data, type, row) {

                    if (row.IdEstado == 1) {
                        return '<label style="background-color:green; padding:2px;border-radius:5px;font-size:10px!important; color:white">&nbsp;'+data+'&nbsp;</label>';
                    }
                    else {
                        return '<label style="background-color:red; padding:2px;border-radius:5px;font-size:10px!important; color: white">&nbsp;' + data + '&nbsp;</label>';
                    }
                }

            },
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



    







