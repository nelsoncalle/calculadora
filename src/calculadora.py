from flask import Flask, request, jsonify

app = Flask(__name__)

# Esta ruta debe aceptar POST explícitamente
@app.route('/calcular', methods=['POST'])  # ¡Método POST habilitado!
def calcular():
    try:
        data = request.get_json()
        operacion = data.get('operacion', '')
        resultado = str(eval(operacion))  # ¡Usa solo en desarrollo!
        return jsonify({'resultado': resultado})
    except:
        return jsonify({'error': 'REVISAR OPERACION'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Puerto 5000