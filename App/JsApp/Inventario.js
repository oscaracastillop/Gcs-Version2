
function GridInventario() {
    var tituloReporte = 'INVENTARIO DE PRODUCTOS';
    let datatable = $('#gridInventario').DataTable({
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
            { targets: [4], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [5], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [6], width: '10px', className: 'dt-center dt-head-center' },
            { targets: [7], width: '10px', className: 'dt-center dt-head-center' }
        ],
        buttons: [
            {
                extend: 'excel', className: 'btn-excel-datatable',
                footer: true,
                title: tituloReporte + ' ' + NameApp,
                filename: NameApp + ' - ' + tituloReporte + ' ' + jsDate + ' ' + hora,
                text: '<i class="bi-file-earmark-excel-fill" style="color:green"></i> Descargar Excel',
                exportOptions: { columns: [0, 1, 2, 3] },
            },
            {
                extend: 'pdfHtml5', className: 'btn-pdf-datatable',
                text: '<i class="bi-file-earmark-pdf-fill" style="color:red"></i> Descargar Pdf',
                filename: tituloReporte + ' - ' + NameApp + ' ' + jsDate + ' ' + hora,
                orientation: 'portrait',
                pageSize: 'letter',
                exportOptions: { columns: [0, 1, 2, 3], search: 'applied', order: 'applied' }
            }
        ],
        destroy: true,
        ajax: {
            url: '/Inventario/GridInventario',
            type: 'GET',
            datatype: 'json',
            dataSrc: function (json) {
                actualizarDashboard(json.data);
                return json.data;
            }
        },
        columns: [
            { data: "NombreProducto", title: "Producto" },
            { data: "UnidadMedida", title: "Unidad de Medida" },
            { data: "StockMinimo", title: "Stock Mínimo" },
            { data: "Cantidad", title: "Cantidad" },
            {
                data: null,
                title: "Nivel de Stock",
                render: function (data, type, row) {
                    let stockMin = row.StockMinimo || 1;
                    let cantidad = row.Cantidad;
                    let porcentaje = (cantidad / stockMin) * 100;
                    let color;
                    if (porcentaje <= 50) color = '#e74c3c';
                    else if (porcentaje <= 100) color = '#f1c40f';
                    else color = '#2ecc71';
                    let segs = Math.round(Math.min(porcentaje, 100) / 20);
                    let segmentos = '';
                    for (let i = 0; i < 5; i++) {
                        segmentos += `<div style="flex:1;height:8px;margin:0 1px;border-radius:2px;background:${i < segs ? color : '#eee'};"></div>`;
                    }
                    return `<div style="display:flex;width:60px;">${segmentos}</div>`;
                }
            },
            {
                data: "CostoPromedioCompra",
                title: "Costo Promedio Compra",
                render: function (data) {
                    return '$ ' + new Intl.NumberFormat('es-CO').format(data);
                }
            },
            { data: "FechaUltimoMovimiento", title: "Fecha Último Movimiento" },
            { data: "DiasSinMovimiento", title: "Días Sin Movimiento" }
        ],
        language: { url: "//cdn.datatables.net/plug-ins/1.11.2/i18n/es_es.json" },
        lengthMenu: [[10, 25, 50, -1], ['10 Filas', '25 Filas', '50 Filas', 'Ver Todo']],
    });
}


function actualizarDashboard(data) {
    if (!data || data.length === 0) return;

    const totalProductos = data.length;
    const valorInventario = data.reduce((sum, x) => sum + (x.Cantidad * x.CostoPromedioCompra), 0);
    const bajoStock = data.filter(x => x.Cantidad <= x.StockMinimo).length;
    const stockTotal = data.reduce((sum, x) => sum + x.Cantidad, 0);

    const mayor = data.reduce((max, x) => x.Cantidad > max.Cantidad ? x : max);
    const menor = data.reduce((min, x) => x.Cantidad < min.Cantidad ? x : min);
    const masDias = data.reduce((max, x) => x.DiasSinMovimiento > max.DiasSinMovimiento ? x : max);
    const masReciente = data.reduce((latest, x) => new Date(x.FechaUltimoMovimiento) > new Date(latest.FechaUltimoMovimiento) ? x : latest);

    // Actualizar tarjetas
    document.getElementById('totalProductos').innerText = totalProductos;
    document.getElementById('valorInventario').innerText = '$ ' + valorInventario.toLocaleString('es-CO');
    document.getElementById('productosBajoStock').innerText = bajoStock;
    document.getElementById('productoMasDias').innerText = masDias.NombreProducto;
    document.getElementById('diasMasSinMovimiento').innerText = masDias.DiasSinMovimiento + ' días';
    document.getElementById('stockTotal').innerText = stockTotal.toLocaleString('es-CO');
    document.getElementById('productoMayorStock').innerText = mayor.NombreProducto;
    document.getElementById('productoMenorStock').innerText = menor.NombreProducto;
    document.getElementById('productoMasReciente').innerText = masReciente.NombreProducto;
}