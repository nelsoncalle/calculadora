// Función para agregar valores a la pantalla
function agregar(valor) {
    const pantalla = document.getElementById('pantalla');
    
    // Evita múltiples puntos decimales en un mismo número
    if (valor === '.' && pantalla.value.split(/[\+\-\*\/]/).pop().includes('.')) {
        return;
    }
    
    // Evita operadores al inicio (excepto "-")
    if (['+', '*', '/'].includes(valor) && pantalla.value === '') {
        return;
    }
    
    pantalla.value += valor;
}

// Función para limpiar la pantalla
function limpiar() {
    document.getElementById('pantalla').value = '';
}

// Función para calcular
async function calcular() {
    const pantalla = document.getElementById('pantalla');
    const operacion = pantalla.value;
    
    // Validación: pantalla vacía
    if (!operacion) {
        pantalla.value = '0';
        return;
    }
    
    try {
        const response = await fetch('/calcular', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `operacion=${encodeURIComponent(operacion)}`
        });
        
        const resultado = await response.text();
        
        // Validación: respuesta del servidor
        if (resultado.includes("Error")) {
            pantalla.value = resultado;
            setTimeout(limpiar, 1500); // Limpia después de 1.5 segundos
        } else {
            pantalla.value = resultado;
        }
        
    } catch (error) {
        pantalla.value = "Error: Revise la operación";
        setTimeout(limpiar, 1500);
    }
}