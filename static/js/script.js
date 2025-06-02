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
    try {
        const response = await fetch('http://localhost:5001/calcular', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operacion: pantalla.value })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        pantalla.value = data.resultado;
    } catch (error) {
        pantalla.value = 'ERROR: ' + error.message;
        setTimeout(() => pantalla.value = '', 2000);
    }
}