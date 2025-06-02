// Función para agregar valores a la pantalla
function agregar(valor) {
    const pantalla = document.getElementById('pantalla');
    
    // Evita múltiples puntos decimales en un número
    if (valor === '.' && pantalla.value.split(/[\+\-\*\/]/).pop().includes('.')) {
        return;
    }
    
    // Evita operadores al inicio (excepto "-")
    if (['+', '*', '/'].includes(valor) && pantalla.value === '') {
        return;
    }
    
    // Reemplaza el último operador si se presiona uno nuevo
    const ultimoCaracter = pantalla.value.slice(-1);
    const esOperador = ['+', '-', '*', '/'].includes(valor);
    
    if (esOperador && ['+', '-', '*', '/'].includes(ultimoCaracter)) {
        pantalla.value = pantalla.value.slice(0, -1) + valor;
        return;
    }
    
    pantalla.value += valor;
}

// Función para limpiar la pantalla
function limpiar() {
    document.getElementById('pantalla').value = '';
}

// Función para borrar el último carácter
function borrar() {
    const pantalla = document.getElementById('pantalla');
    pantalla.value = pantalla.value.slice(0, -1);
}

// Función principal para calcular
async function calcular() {
    const pantalla = document.getElementById('pantalla');
    let operacion = pantalla.value;
    
    // Validación: pantalla vacía
    if (!operacion) {
        pantalla.value = '0';
        return;
    }
    
    // Reemplaza símbolos para compatibilidad con eval()
    operacion = operacion.replace(/×/g, '*').replace(/÷/g, '/');
    
    try {
        console.log("Enviando operación:", operacion); // Debug
        
        const response = await fetch('http://127.0.0.1:5000/calcular', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ operacion: operacion })
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Respuesta recibida:", data); // Debug
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        pantalla.value = data.resultado;
        
    } catch (error) {
        console.error("Error en calcular():", error);
        pantalla.value = "Error";
        setTimeout(() => limpiar(), 1500); // Limpia después de 1.5 segundos
    }
}

// Eventos para teclado (opcional)
document.addEventListener('DOMContentLoaded', () => {
    const pantalla = document.getElementById('pantalla');
    
    pantalla.addEventListener('keydown', (e) => {
        // Permite solo números, operadores y teclas de control
        const teclasPermitidas = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Delete'
        ];
        
        if (!teclasPermitidas.includes(e.key) && !e.ctrlKey) {
            e.preventDefault();
            return;
        }
        
        // Mapeo de teclas especiales
        if (e.key === 'Enter') {
            e.preventDefault();
            calcular();
        } else if (e.key === 'Delete') {
            limpiar();
        } else if (e.key === 'Backspace') {
            borrar();
            e.preventDefault(); // Evita borrar rápido
        }
    });
});