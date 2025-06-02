// Función para agregar valores a la pantalla
        function agregar(valor) {
            document.getElementById('pantalla').value += valor;
        }

        // Función para limpiar la pantalla
        function limpiar() {
            document.getElementById('pantalla').value = '';
        }

        // Función para enviar la operación a Flask
        async function calcular() {
            const operacion = document.getElementById('pantalla').value;
            
            try {
                const response = await fetch('/calcular', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `operacion=${encodeURIComponent(operacion)}`
                });
                
                const resultado = await response.text();
                document.getElementById('pantalla').value = resultado;
            } catch (error) {
                document.getElementById('pantalla').value = 'Error';
            }
        }