// Sistema de facturación - Gametech Solution
// Adaptado para productos de tecnología

function mostrar() {
    let item1 = document.getElementById('prod1');
    let item2 = document.getElementById('prod2');
    let item3 = document.getElementById('prod3');
    
    // Configurar item 1
    if(item1.selectedIndex === 0) {
        document.getElementById('desc01').value = "";
        document.getElementById('vau01').value = 0;
        document.getElementById('cant01').value = 0;
        document.getElementById('vat01').value = 0;
    } else {
        const selectedOption = item1.options[item1.selectedIndex];
        document.getElementById('desc01').value = selectedOption.text;
        document.getElementById('vau01').value = selectedOption.value;
        document.getElementById('vat01').value = parseFloat(
            (document.getElementById('cant01').value) * parseFloat(document.getElementById('vau01').value) || 0
        ).toFixed(0);
    }

    // Configurar item 2
    if(item2.selectedIndex === 0) {
        document.getElementById('desc02').value = "";
        document.getElementById('vau02').value = 0;
        document.getElementById('cant02').value = 0;
        document.getElementById('vat02').value = 0;
    } else {
        const selectedOption = item2.options[item2.selectedIndex];
        document.getElementById('desc02').value = selectedOption.text;
        document.getElementById('vau02').value = selectedOption.value;
        document.getElementById('vat02').value = parseFloat(
            (document.getElementById('cant02').value) * parseFloat(document.getElementById('vau02').value) || 0
        ).toFixed(0);
    }

    // Configurar item 3
    if(item3.selectedIndex === 0) {
        document.getElementById('desc03').value = "";
        document.getElementById('vau03').value = 0;
        document.getElementById('cant03').value = 0;
        document.getElementById('vat03').value = 0;
    } else {
        const selectedOption = item3.options[item3.selectedIndex];
        document.getElementById('desc03').value = selectedOption.text;
        document.getElementById('vau03').value = selectedOption.value;
        document.getElementById('vat03').value = parseFloat(
            (document.getElementById('cant03').value) * parseFloat(document.getElementById('vau03').value) || 0
        ).toFixed(0);
    }

    // Calcular total adicionales 
    let totaladic0 = 0;

    if(document.getElementById('checkbox1').checked) {
        totaladic0 += 50000; // Instalación y Configuración
    }
    if(document.getElementById('checkbox2').checked) {
        totaladic0 += 100000; // Garantía Extendida
    }
    if(document.getElementById('checkbox3').checked) {
        totaladic0 += 75000; // Soporte Técnico Premium
    }

    document.getElementById('adic0').value = totaladic0;

    // Calcular subtotal
    document.getElementById('subt').value = (
        parseFloat(document.getElementById('vat01').value) + 
        parseFloat(document.getElementById('vat02').value) + 
        parseFloat(document.getElementById('vat03').value) + 
        parseFloat(document.getElementById('adic0').value) || 0
    ).toFixed(0);

    // Calcular IVA (19%)
    document.getElementById('iva').value = (
        parseFloat(document.getElementById('subt').value) * 0.19 || 0
    ).toFixed(0);

    // Calcular Descuento
    if(document.getElementById('radio1').checked) {
        // Descuento del 10% por pago en efectivo
        document.getElementById('desc').value = (
            parseFloat(document.getElementById('subt').value) * 0.10 || 0
        ).toFixed(0);
    } else if(document.getElementById('radio2').checked) {
        // Sin descuento - Tarjeta de crédito
        document.getElementById('desc').value = 0;
    } else if(document.getElementById('radio3').checked) {
        // Sin descuento - Transferencia bancaria
        document.getElementById('desc').value = 0;
    }

    // Calcular Total Neto = Subtotal + IVA - Descuento
    document.getElementById('neto').value = (
        parseFloat(document.getElementById('subt').value) + 
        parseFloat(document.getElementById('iva').value) - 
        parseFloat(document.getElementById('desc').value) || 0
    ).toFixed(0);
}

function generar() {
    const cliente = document.getElementById('cliente').value;
    const cedula = document.getElementById('cedula').value;
    const neto = document.getElementById('neto').value;
    
    if (!cliente || !cedula) {
        swal("⚠️ Atención", "Por favor complete los datos del cliente", "warning");
        return;
    }
    
    if (parseFloat(neto) === 0) {
        swal("⚠️ Atención", "Por favor seleccione al menos un producto", "warning");
        return;
    }
    
    swal("✅ Factura Generada", `Cliente: ${cliente}\nTotal: $${parseFloat(neto).toLocaleString('es-CO')}\n\nGracias por su compra en Gametech Solution`, "success");
}