function ModalEmpresa(tipo) {
    $("#TituloModalEmpresa").empty().val('');
    $("#LabelIdEmpresa").empty().val('');
    $("#InputNombreEmpresa").empty().val('');
    $("#SelectTipoDocumento").val(-1);
    $("#InputIdentificacionEmpresa").empty().val('');
    $("#InputEmailEmpresa").empty().val('');
    $("#InputTelefonoEmpresa").empty().val('');
    $("#InputCelularEmpresa").empty().val('');
    $("#InputContactoEmpresa").empty().val('');
    $("#SelectTipoDocumentoRL").val(-1);
    $("#InputIdentificacionRL").empty().val('');
    $("#InputDireccionEmpresa").empty().val('');
    $("#InputDescripcionEmpresa").empty().val('');
    $("#SelectCiudad").val(-1);
    $("#SelectCiudadExpedicionRL").val(-1);
    $("#BotonesModalEmpresa").empty();
    if (tipo == 'C') {
        $("#TituloModalEmpresa").empty().append('<label>CREAR EMPRESA</label>');
        $('#ModalEmpresa').modal('show');
        $("#SelectEstadoEmpresa").hide();        
        $("#BotonesModalEmpresa").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearEmpresa()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalEmpresa").empty().append('<label>EDITAR EMPRESA</label>');
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
    let Celular = $('#InputCelularEmpresa').val();
    let Contacto = $('#InputContactoEmpresa').val();    
    let IdTipoDocumentoRL = $('#SelectTipoDocumentoRL').val();
    let IdentificacionRL = $('#InputIdentificacionRL').val();
    let IdCiudad = $('#SelectCiudad').val(); 
    let IdCiudadExpedicionRL = $('#SelectCiudadExpedicionRL').val(); 
    let Direccion = $('#InputDireccionEmpresa').val();
    let Descripcion = $('#InputDescripcionEmpresa').val();    

    if (NombreEmpresa == null || NombreEmpresa == '' || NombreEmpresa == undefined) {
        $('#InputNombreEmpresa').focus();
        VentanaMensaje('Ingrese nombre de la Empresa');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione tipo documento de la Empresa');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionEmpresa').focus();
        VentanaMensaje('Ingrese la identificación de la Empresa');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        VentanaMensaje('Seleccione la ciudad');
    } else if (Contacto == null || Contacto == '' || Contacto == undefined) {
        $('#InputContactoEmpresa').focus();
        VentanaMensaje('Ingrese el Nombre del Representante Legal de la Empresa');
    } else if (IdTipoDocumentoRL == -1 || IdTipoDocumentoRL == null || IdTipoDocumentoRL == '') {
        $('#SelectTipoDocumentoRL').focus();
        VentanaMensaje('Seleccione tipo documento del Representante Legal');
    } else if (IdentificacionRL == null || IdentificacionRL == '' || IdentificacionRL == undefined) {
        $('#InputIdentificacionRL').focus();
        VentanaMensaje('Ingrese la identificación del Representante Legal');
    } else if (IdCiudadExpedicionRL == -1 || IdCiudadExpedicionRL == '' || IdCiudadExpedicionRL == null) {
        $('#SelectCiudadExpedicionRL').focus();
        VentanaMensaje('Seleccione la Ciudad de Expedición del documento de Identificación del Representante Legal');
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
                Celular: Celular,
                Contacto: Contacto,
                IdTipoDocumentoRL: IdTipoDocumentoRL,
                IdentificacionRL: IdentificacionRL,
                IdCiudadExpedicion: IdCiudadExpedicionRL,
                IdCiudad: IdCiudad,
                Direccion: Direccion,
                Descripcion: Descripcion,
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

function ActualizarEmpresa() {
    let IdEmpresa = $('#LabelIdEmpresa').text();
    let NombreEmpresa = $('#InputNombreEmpresa').val();
    let IdTipoDocumento = $('#SelectTipoDocumento').val();
    let Identificacion = $('#InputIdentificacionEmpresa').val();
    let Email = $('#InputEmailEmpresa').val();
    let Telefono = $('#InputTelefonoEmpresa').val();
    let Celular = $('#InputCelularEmpresa').val();
    let Contacto = $('#InputContactoEmpresa').val();
    let IdTipoDocumentoRL = $('#SelectTipoDocumentoRL').val();
    let IdentificacionRL = $('#InputIdentificacionRL').val();
    let IdCiudadExpedicionRL = $('#SelectCiudadExpedicionRL').val();
    let IdCiudad = $('#SelectCiudad').val();
    let Direccion = $('#InputDireccionEmpresa').val();
    let Descripcion = $('#InputDescripcionEmpresa').val();    
    let IdEstado = $('#SelectEstado').val();

    if (NombreEmpresa == null || NombreEmpresa == '' || NombreEmpresa == undefined) {
        $('#InputNombreEmpresa').focus();
        VentanaMensaje('Ingrese nombre de la empresa');
    } else if (IdTipoDocumento == -1 || IdTipoDocumento == null || IdTipoDocumento == '') {
        $('#SelectTipoDocumento').focus();
        VentanaMensaje('Seleccione tipo documento');
    } else if (Identificacion == null || Identificacion == '' || Identificacion == undefined) {
        $('#InputIdentificacionEmpresa').focus();
        VentanaMensaje('Ingrese la identificación');
    } else if (IdCiudad == -1 || IdCiudad == null || IdCiudad == '') {
        $('#SelectCiudad').focus();
        VentanaMensaje('Seleccione la ciudad');
    } else if (Contacto == null || Contacto == '' || Contacto == undefined) {
        $('#InputContactoEmpresa').focus();
        VentanaMensaje('Ingrese el Nombre del Representante Legal de la Empresa');
    } else if (IdTipoDocumentoRL == -1 || IdTipoDocumentoRL == null || IdTipoDocumentoRL == '') {
        $('#SelectTipoDocumentoRL').focus();
        VentanaMensaje('Seleccione tipo documento del Representante Legal');
    } else if (IdentificacionRL == null || IdentificacionRL == '' || IdentificacionRL == undefined) {
        $('#InputIdentificacionRL').focus();
        VentanaMensaje('Ingrese la identificación del Representante Legal');
    } else if (IdCiudadExpedicionRL == null || IdCiudadExpedicionRL == '' || IdCiudadExpedicionRL == -1) {
        $('#SelectCiudadExpedicionRL').focus();
        VentanaMensaje('Seleccione la Ciudad de Expedición del documento de Identificación del Representante Legal');
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
                Celular: Celular,
                Contacto: Contacto,
                IdTipoDocumentoRL: IdTipoDocumentoRL,
                IdentificacionRL: IdentificacionRL,
                IdCiudadExpedicion: IdCiudadExpedicionRL,
                IdCiudad: IdCiudad,
                Direccion: Direccion,
                Descripcion: Descripcion,
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
    }
}

function EliminarEmpresa(IdEmpresa) {
    Swal.fire({
        title: `<span style="font-size:18px; font-weight:bold; color:#d9534f;">${TituloSwal}</span>`,
        html: `<p style="font-size:14px; color:#444; margin-top:8px;">
                  ¿Está seguro(a)? <br> <strong>No podrás revertir esta acción.</strong>
               </p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d9534f",
        cancelButtonColor: "#6c757d",
        confirmButtonText: '<i class="bi bi-trash-fill"></i> Sí, eliminar',
        cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar',
        position: 'top',
        background: '#f9f9f9',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'rounded-4 shadow-lg',
            confirmButton: 'px-3 py-1 rounded-pill fw-semibold',
            cancelButton: 'px-3 py-1 rounded-pill fw-semibold'
        }
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
                    if (valor[0] === 'OK') {
                        VentanaMensajeOK(valor[1]);
                    } else {
                        VentanaMensaje(valor[1]);
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
        columnDefs: [
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [1], className: 'dt-head-center' },
            { targets: [2], className: 'dt-head-center' },
            { targets: [3], className: 'dt-head-center' },
            { targets: [4], className: 'dt-head-center' },
            { targets: [5], className: 'dt-head-center' },
            { targets: [6], className: 'dt-head-center' },
            { targets: [7], className: 'dt-head-center' },
            { targets: [8], className: 'dt-head-center' },
            { targets: [9], className: 'dt-head-center' },
            { targets: [10], className: 'dt-head-center' },            
            { targets: [11], className: 'dt-head-center' },
            { targets: [12], className: 'dt-head-center' },
            { targets: [13], className: 'dt-head-center' },
            { targets: [14], className: 'dt-head-center' },
            { targets: [15], className: 'dt-head-center' },
            { targets: [16], className: 'dt-head-center' },
            { targets: [17], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [18], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [

            {
            extend: 'excel', className: 'btn-excel-datatable',
            footer: true,
            title: tituloReporte + ' ' + NameApp,
            filename: NameApp + ' - ' +tituloReporte + ' ' + jsDate + ' ' + hora,
            text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
            exportOptions: {
                columns: [0, 2, 3, 4, 5, 6, 7, 8, 9, 14, 10, 11, 12, 13, 15, 16],
            },
        },
            {
            extend: 'pdfHtml5', className: 'btn-pdf-datatable',
            text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
            filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
            orientation: 'landscape', //portrait
            pageSize: 'letter', //A3 , A5 , A6 , legal , letter, A4
            exportOptions: {
                columns: [0, 2, 3, 4, 5, 6, 7, 8, 9 , 14, 10, 11 ,12, 13, 15, 16],
                search: 'applied',
                order: 'applied',
            },
            customize: function (doc) {
                doc.content.splice(0, 1.5);
                doc.pageMargins = [40, 60, 20, 30];
                doc.defaultStyle.fontSize = 5;
                doc.styles.tableHeader.fontSize = 5;
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
                className: 'btn-nuevo-datatable',
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
            {
                title: "Logo",
                "data": 'Logo',
                "render": function (data, type, row, meta) {                   
                    return '<div class="contimg-grid">' +
                        '<img class="btn imagen-escalada-grid LogoEmpresa" src="/Images/LogoEmpresa/' + data + '"/>' +
                        '</div>';
                },
            },             
            { "data": "Nombre", title: "Empresa", width: 'auto' },      
            { "data": "TipoDocumento", title: "Documento", width: 'auto', visible: true },
            { "data": "Identificacion", title: "Identificación", width: 'auto', visible: true },
            { "data": "Email", title: "Email", width: 'auto' },
            { "data": "Telefono", title: "Teléfono", width: 'auto' },
            { "data": "Celular", title: "Celular", width: 'auto' },
            { "data": "Direccion", title: "Dirección", width: 'auto' },
            { "data": "Ciudad", title: "Ciudad", width: 'auto' }, 
            { "data": "Contacto", title: "Representante Legal", width: 'auto' },
            { "data": "TipoDocumentoRL", title: "Documento RL", width: 'auto', visible: true },
            { "data": "IdentificacionRL", title: "Identificación RL", width: 'auto', visible: true },
            { "data": "CiudadExpedicion", title: "Ciudad Expedición", width: 'auto' },               
            { "data": "Descripcion", title: "Descripción" },
            { "data": "CreateBy", title: "Creado Por", width: 'auto', visible: true },
            { "data": "DateCreate", title: "Fecha Creación", width: 'auto', visible: true },            
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EditarEmpresa btn btn-editar-dt" title="editar registro"><i class="bi-pencil-fill"></i></a>',
                orderable: false,
            },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarEmpresa btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
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

    $('#gridEmpresa').on('click', '.EditarEmpresa', function () {
        let data = datatable.row($(this).parents()).data();
        ModalEmpresa('E');
        $('#LabelIdEmpresa').text(data.Id);
        $('#InputNombreEmpresa').val(data.Nombre);
        $('#SelectTipoDocumento').val(data.IdTipoDocumento);
        $('#InputIdentificacionEmpresa').val(data.Identificacion);
        $('#InputEmailEmpresa').val(data.Email);
        $('#InputTelefonoEmpresa').val(data.Telefono);
        $('#InputCelularEmpresa').val(data.Celular);
        $('#InputContactoEmpresa').val(data.Contacto);
        $('#SelectTipoDocumentoRL').val(data.IdTipoDocumentoRL);
        $('#InputIdentificacionRL').val(data.IdentificacionRL);
        $('#InputCiudadExpedicionRL').val(data.CiudadExpedicion);
        $('#InputDireccionEmpresa').val(data.Direccion);
        $('#SelectCiudad').val(data.IdCiudad); 
        $('#SelectCiudadExpedicionRL').val(data.IdCiudadExpedicionRL); 
        $('#InputDescripcionEmpresa').val(data.Descripcion);
        $('#SelectEstado').val(data.IdEstado);
    })

    $('#gridEmpresa').on('click', '.EliminarEmpresa', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarEmpresa(data.Id);
    })    

 
    $('#gridEmpresa').on('click', '.LogoEmpresa', function () {
        let data = datatable.row($(this).parents()).data();
        $('#ModalLogoEmpresa').modal('show');
        $('#IdEmpresaLogo').text(data.Id);
        $('#NombreLogoActualEmpresa').text(data.Logo);
        $('#NombreEmpresaLogo').text(data.Nombre);
        $('#ImagenLogoEmpresa').empty().append(            
            '<img src="/Images/LogoEmpresa/' + data.Logo +'" class="imagen-escalada-cambiar"/>'
        );
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
                $("#SelectEmpresa").empty().append('<option value="-1">- Escoge una Empresa -</option>');
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


function GuardarLogoEmpresa() {
    var IdEmpresa = $('#IdEmpresaLogo').text();
    var NombreLogo = $('#NombreLogoActualEmpresa').text();
    var photo = new Array();
    var formData = new FormData();

    var Imagen = $('#inPhotoEmpresa').val();

    if (Imagen == null || Imagen == '' || Imagen == undefined) {
        $('#inPhotoEmpresa').focus();
        VentanaMensaje('El campo de imagén esta vacío', 'info');
    } else {
        if ($('#inPhotoEmpresa')[0].files.length > 0) {
            formData.append('Files', $('#inPhotoEmpresa')[0].files[0], $('#inPhotoEmpresa')[0].files[0].name);
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Empresa/DatosEmpresa',
            data: {
                IdEmpresa: IdEmpresa,
                IdUsuario: TokenUser,
                NombreImagen: NombreLogo
            }
        });
        photo.push(formData);
        $.ajax({
            type: 'POST',
            data: photo[0],
            url: '/Empresa/GuardarLogoEmpresa',
            contentType: false,
            processData: false,
            success: function (result) {
                valor = result.split('*');
                if (valor[0] == 'OK') {
                    VentanaMensajeOK(valor[1]);
                } else {
                    VentanaMensaje(valor[1]);
                }
            }
        });
    }
}
    

function CardDatosEmpresa() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Empresa/GridEmpresa',
        data: {},
        success: function (resultado) {
            $('#CardDatosEmpresa').append(
                '<img class="card-img-top" id="" src="/Images/LogoEmpresa/' + resultado.data[0].Logo +'">'+
                    '<div class="card-body">'+
                    '<h6 class="card-title" id="NombreEmpresa">' + resultado.data[0].Nombre +'</h6>'+
                    '<label> ' + resultado.data[0].TipoDocumento +': ' + resultado.data[0].Identificacion +'</label>'+
                        '<br />'+
                        '<label><i class="bi-envelope-fill"></i> <a href="mailto:' + resultado.data[0].Email + '">' + resultado.data[0].Email +'</a></label>'+
                        '<br />'+
                        '<label><i class="bi-telephone-fill"></i> ' + resultado.data[0].Telefono +'</label>'+
                        '<br />'+
                        '<label><i class="bi-whatsapp"></i> ' + resultado.data[0].Telefono +'</label>'+
                        '<br />'+
                '<label><i class="bi-pin-map-fill"></i> ' + resultado.data[0].Direccion + ' ' + resultado.data[0].Ciudad +'</label>'+
                    '</div>'
            );
        },
    });
}








