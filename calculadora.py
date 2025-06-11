from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Importar CORS
import os

app = Flask(__name__,)


# Habilitar CORS para todas las rutas
CORS(app)

# Ruta para el menú principal
@app.route("/")
def home():
    return render_template("index.html")

# Ruta para la calculadora básica
@app.route("/calculadora-basica")
def calculadora_basica():
    return render_template("calculadora-basica.html")

@app.route("/calcular", methods=["POST"])
def calcular():
    try:
        data = request.get_json()
        if not data or 'operacion' not in data:
            return jsonify({"error": "Datos inválidos"}), 400
            
        operacion = data.get("operacion", "").replace('×', '*').replace('÷', '/')
        
        # Validación adicional
        if not operacion:
            return jsonify({"error": "Operación vacía"}), 400
            
        # Verificar caracteres permitidos
        caracteres_permitidos = set('0123456789+-*/.() ')
        if not all(c in caracteres_permitidos for c in operacion):
            return jsonify({"error": "Caracteres inválidos"}), 400
            
        resultado = str(eval(operacion))
        return jsonify({"resultado": resultado})
        
    except ZeroDivisionError:
        return jsonify({"error": "División por cero"}), 400
    except SyntaxError:
        return jsonify({"error": "Sintaxis inválida"}), 400
    except Exception as e:
        return jsonify({"error": f"Error en el cálculo: {str(e)}"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)