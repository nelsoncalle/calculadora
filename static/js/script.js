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
    const operacion = document.getElementById('pantalla').value;
    try {
        // Cambia a http://localhost:5000/calcular
        const response = await fetch('http://localhost:5000/calcular', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Envía datos como JSON
            },
            body: JSON.stringify({ operacion: operacion })
        });
        const data = await response.json();
        document.getElementById('pantalla').value = data.resultado;
    } catch (error) {
        document.getElementById('pantalla').value = 'REVISAR OPERACION';
    }
}