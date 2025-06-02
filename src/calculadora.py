from flask import Flask, request, jsonify
from flask_cors import CORS  # Si usas frontend en otro puerto

app = Flask(__name__)
CORS(app)  # Opcional: solo necesario para peticiones cruzadas

@app.route('/calcular', methods=['POST'])
def calcular():
    try:
        data = request.get_json()
        operacion = data.get('operacion', '')
        # Alternativa segura a eval(): pip install simpleeval
        from simpleeval import simple_eval
        resultado = str(simple_eval(operacion))
        return jsonify({'resultado': resultado})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Permite conexiones locales