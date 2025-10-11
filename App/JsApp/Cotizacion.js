
function ModalCotizacion(tipo) {
    $("#TituloModalBanco").empty().val('');
    $("#LabelIdBanco").empty().val('');
    $("#InputNombreBanco").empty().val('');
    $("#BotonesModalBanco").empty();
    GridTDetalleCotizacion();
   
    if (tipo == 'C') {
        $("#TituloModalBanco").empty().append('<label>CREAR BANCO</label>');
        $('#ModalCotizacion').modal('show');
        $("#SelectEstadoBanco").hide();
        $("#BotonesModalBanco").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="CrearBanco()">Guardar</button>');
    } if (tipo == 'E') {
        $("#TituloModalBanco").empty().append('<label>EDITAR BANCO</label>');
        $('#ModalCotizacion').modal('show');
        $("#SelectEstadoBanco").show();
        $("#BotonesModalBanco").empty().append('<button type="button" class="btn btn-sm btn-modal-Cancelar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>' + '<button type="button" class="btn btn-sm btn-modal-guardar" onclick="ActualizarBanco()">Guardar Cambios</button>');
    }
}

function VentanaCrearCotizacion(){
    window.location.href = '/Venta/Crear_Cotizacion';
}

function CrearCotizacion() {
    var IdCliente = $('#SelectCliente').val();

    if (IdCliente == -1 || IdCliente == '' || IdCliente == undefined) {
        $('#SelectCliente').focus();
        VentanaMensaje('Seleccione el Cliente');
    } else {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Cotizacion/CrearCotizacion',
            data: {
                IdUser: TokenUser,
                IdCliente: IdCliente
            },
            success: function (resultado) {
                valor = resultado.split('*');
                if (valor[0] == 'OK') {
                    VentanaMensajeCrearCot(valor[1]);
                } else {
                    VentanaMensaje(valor[1]);
                }
            }
        });
    }
}




function GridCotizacion() {
    var tituloReporte = 'LISTADO DE COTIZACIONES';
    let datatable = $('#gridCotizacion').DataTable({
        responsive: false,
        scrollCollapse: true,
        scrollY: '800px',
        scrollX: true,
        dom: 'B<"clear">frtip',
        columnDefs: [
            { targets: [0], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [1], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], className: 'dt-head-center' },
            { targets: [14], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [
            {
                extend: 'excel',
                className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: {
                    columns: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                },
            },
            {
                extend: 'pdfHtml5',
                className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'landscape',
                pageSize: 'letter',
                exportOptions: {
                    columns: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                    search: 'applied',
                    order: 'applied',
                },
                customize: function (doc) {
                    doc.content.splice(0, 1.5);
                    doc.pageMargins = [40, 60, 20, 30];
                    doc.defaultStyle.fontSize = 6;
                    doc.styles.tableHeader.fontSize = 6;
                    doc['header'] = function () {
                        return {
                            columns: [{ italics: true, fontSize: 10, text: tituloReporte, margin: [30, 18] }],
                            margin: 20
                        };
                    };
                    doc['footer'] = function (page, pages) {
                        return {
                            columns: [
                                { fontSize: 5, alignment: 'left', text: ' ' + now },
                                { fontSize: 5, alignment: 'right', text: ['page ', { text: page.toString() }, ' of ', { text: pages.toString() }] }
                            ],
                            margin: 20
                        };
                    };
                    var objLayout = {};
                    objLayout['hLineWidth'] = function () { return .5; };
                    objLayout['vLineWidth'] = function () { return .5; };
                    objLayout['hLineColor'] = function () { return '#aaa'; };
                    objLayout['vLineColor'] = function () { return '#aaa'; };
                    objLayout['paddingLeft'] = function () { return 4; };
                    objLayout['paddingRight'] = function () { return 4; };
                    doc.content[0].layout = objLayout;
                }
            },
            {
                text: 'Nuevo',
                className: 'btn-nuevo-datatable',
                action: function () {
                    VentanaCrearCotizacion();
                }
            }
        ],
        destroy: true,
        "ajax": {
            "url": '/Cotizacion/GridCotizacion',
            "type": "GET",
            "datatype": "json",
            dataSrc: function (json) {
                actualizarDashboard(json.data);
                return json.data;
            }
        },
        columns: [
            {
                title: "",
                data: "",
                render: function (data, type, row) {
                    return '<button class="btn btn-sm btn-pdf-grid-descarga" onclick="descargarCotizacion(' + row.Id + ')">Pdf</button>';
                }
            },
            {
                title: "",
                data: "Estado",
                render: function (data, type, row) {
                    if (row.IdEstado == 1)
                        return '<label class="label-estado-activo">' + data + '</label>';
                    else if (row.IdEstado == 2)
                        return '<label class="label-estado-inactivo">' + data + '</label>';
                    else if (row.IdEstado == 5)
                        return '<label class="label-estado-finalizado">' + data + '</label>';
                    else if (row.IdEstado == 7)
                        return '<label class="label-estado-anulado">' + data + '</label>';
                    return data;
                }
            },
            { data: "CodigoCotizacion", title: "Código" },
            { data: "Nombre", title: "Cliente" },
            { data: "Documento", title: "Documento" },
            { data: "Identificacion", title: "Identificación" },
            { data: "FormaPago", title: "Forma de Pago" },
            { data: "PlazoPago", title: "Plazo de Pago" },
            { data: "CantidadProductos", title: "Cant. Productos" },
            {
                data: null, title: "Sub Total",
                render: (d, t, r) => '$ ' + new Intl.NumberFormat('es-CO').format(r.SubTotal)
            },
            {
                data: null, title: "IVA",
                render: (d, t, r) => '$ ' + new Intl.NumberFormat('es-CO').format(r.ValorIva)
            },

            {
                data: null, title: "Valor Total",
                render: (d, t, r) => '$ ' + new Intl.NumberFormat('es-CO').format(r.ValorTotal)
            },
            { data: "CreateBy", title: "Creado Por" },
            { data: "DateCreate", title: "Fecha Creación" },
            {
                title: "",
                data: null,
                defaultContent:
                    '<a class="EliminarCliente btn btn-eliminar-dt" title="Eliminar Registro"><i class="bi-trash-fill"></i></a>',
                orderable: false,
            },
        ],
        "language": { "url": "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json" },
        lengthMenu: [
            [10, 25, 50, -1],
            ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']
        ],
    });

    $('#gridCliente').on('click', '.EditarCliente', function () {
        let data = datatable.row($(this).parents()).data();
        ModalCliente('E');
        $('#LabelIdCliente').text(data.Id);
        $('#InputNombreCliente').val(data.Nombre);
        $('#SelectTipoDocumento').val(data.IdTipoDocumento);
        $('#InputIdentificacionCliente').val(data.Identificacion);
        $('#InputEmailCliente').val(data.Email);
        $('#InputTelefonoCliente').val(data.Telefono);
        $('#InputCelularCliente').val(data.Celular);
        $('#InputContactoCliente').val(data.Contacto);
        $('#SelectFormaPago').val(data.IdFormaPago);
        $('#SelectPlazoPago').val(data.IdPlazoPago);
        $('#InputDireccionCliente').val(data.Direccion);
        $('#SelectCiudad').val(data.IdCiudad);
        $('#InputDescripcionCliente').val(data.Descripcion);
        $('#SelectEstado').val(data.IdEstado);
    });

    $('#gridCliente').on('click', '.EliminarCliente', function () {
        let data = datatable.row($(this).parents()).data();
        EliminarCliente(data.Id);
    });
}

// === DASHBOARD COTIZACIONES ===
function actualizarDashboard(data) {
    if (!data || data.length === 0) return;

    const totalCotizaciones = data.length;
    const cotizacionesActivos = data.filter(x => x.IdEstado === 1).length;
    const cotizacionesAceptadas = data.filter(x => x.IdEstado === 6).length;
    const cotizacionesAnuladas = data.filter(x => x.IdEstado === 1).length;

    const valorTotalCotizaciones = data
        .filter(x => [1, 6, 7].includes(x.IdEstado))
        .reduce((sum, x) => sum + (Number(x.ValorTotal) || 0), 0);

    const valorCotizacionesActivas = data
        .filter(x => x.IdEstado === 1)
        .reduce((sum, x) => sum + (Number(x.ValorTotal) || 0), 0);

    const valorCotizacionesAceptadas = data
        .filter(x => x.IdEstado === 6)
        .reduce((sum, x) => sum + (Number(x.ValorTotal) || 0), 0);

    const valorCotizacionesAnuladas = data
        .filter(x => x.IdEstado === 7)
        .reduce((sum, x) => sum + (Number(x.ValorTotal) || 0), 0);

    const cotizacionesContado = data.filter(x => x.FormaPago === 'Contado').length;
    const cotizacionesCredito = data.filter(x => x.FormaPago === 'Crédito').length;
    const totalProductosCotizados = data.reduce((sum, x) => sum + (Number(x.CantidadProductos) || 0), 0);
    const masReciente = data.reduce((latest, x) =>
        new Date(x.DateCreate) > new Date(latest.DateCreate) ? x : latest
    );

    function formatoNumero(valor) {
        return Number(valor).toLocaleString('es-CO', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }

    // === Primera fila ===
    document.getElementById('totalCotizaciones').innerText = formatoNumero(totalCotizaciones);
    document.getElementById('cotizacionesActivos').innerText = formatoNumero(cotizacionesActivos);
    document.getElementById('cotizacionesAceptadas').innerText = formatoNumero(cotizacionesAceptadas);
    document.getElementById('cotizacionesAnuladas').innerText = formatoNumero(cotizacionesAnuladas);

    // === Segunda fila ===
    document.getElementById('valorTotalCotizaciones').innerText = '$ ' + formatoNumero(valorTotalCotizaciones);
    document.getElementById('valorCotizacionesActivas').innerText = '$ ' + formatoNumero(valorCotizacionesActivas);
    document.getElementById('valorCotizacionesAceptadas').innerText = '$ ' + formatoNumero(valorCotizacionesAceptadas);
    document.getElementById('valorCotizacionesAnuladas').innerText = '$ ' + formatoNumero(valorCotizacionesAnuladas);

    // === Tercera fila ===
    document.getElementById('cotizacionesContado').innerText = formatoNumero(cotizacionesContado);
    document.getElementById('cotizacionesCredito').innerText = formatoNumero(cotizacionesCredito);
    document.getElementById('totalProductosCotizados').innerText = formatoNumero(totalProductosCotizados);
    document.getElementById('clienteMasReciente').innerText = masReciente.Nombre;
}

// === GRAFICO TOTAL COTIZACIONES POR MES (ULTIMOS 12 MESES) ===
function generarGraficoCotizaciones(data) {
    if (!data || data.length === 0) return;

    const meses = [];
    const hoy = new Date();
    for (let i = 11; i >= 0; i--) {
        const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
        const nombreMes = fecha.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
        meses.push({ etiqueta: nombreMes + ' ' + fecha.getFullYear(), mes: fecha.getMonth() + 1, anio: fecha.getFullYear() });
    }

    const totalesPorMes = meses.map(m => {
        const total = data
            .filter(x => {
                //if (x.IdEstado == 1) return false; 
                if (!x.FechaChart) return false;
                const fecha = new Date(x.FechaChart);
                return fecha.getMonth() + 1 === m.mes && fecha.getFullYear() === m.anio;
            })
            .reduce((sum, x) => sum + (Number(x.ValorTotal) || 0), 0);
        return total;
    });

    if (window.chartCotizaciones) {
        window.chartCotizaciones.destroy();
    }

    const ctx = document.getElementById('graficoCotizaciones').getContext('2d');
    window.chartCotizaciones = new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses.map(m => m.etiqueta),
            datasets: [{
                label: 'Total Cotizaciones ($)',
                data: totalesPorMes,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#1d4ed8',
                pointBorderColor: '#fff',
                pointRadius: 4,
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: {
                    callbacks: {
                        label: ctx => ' $ ' + Number(ctx.parsed.y).toLocaleString('es-CO')
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '$ ' + value.toLocaleString('es-CO')
                    }
                }
            }
        }
    });
}


const originalActualizarDashboard = actualizarDashboard;
actualizarDashboard = function (data) {
    originalActualizarDashboard(data);
    generarGraficoCotizaciones(data);
};



function descargarCotizacion(id) {
    window.open('/Cotizacion/descargarCotizacion?id=' + id, '_blank');
}