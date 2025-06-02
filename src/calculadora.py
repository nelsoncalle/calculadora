# from flask import Flask, request, jsonify, render_template  # Añade render_template

# app = Flask(__name__)

# # Ruta para la página principal (HTML)
# @app.route("/")
# def home():
#     return render_template("index.html")  # Sirve el archivo HTML

# # Ruta para los cálculos (la que ya tenías)
# @app.route("/calcular", methods=["POST"])
# def calcular():
#     try:
#         data = request.get_json()
#         operacion = data.get("operacion", "")
#         resultado = str(eval(operacion))  # ¡Usa solo en desarrollo!
#         return jsonify({"resultado": resultado})
#     except Exception as e:
#         return jsonify({"error": "Operación inválida"}), 400

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)


from flask import Flask, render_template, request, jsonify
import os  # Para manejar rutas de manera segura

# Inicializa Flask con la ruta correcta a templates
app = Flask(__name__)

# Ruta principal - Sirve el HTML
@app.route("/")
def home():
    return render_template("index.html")  # Busca en /templates/index.html

# Ruta para cálculos
@app.route("/calcular", methods=["POST"])
def calcular():
    try:
        data = request.get_json()
        operacion = data.get("operacion", "").replace('×', '*').replace('÷', '/')  # Compatibilidad con símbolos
        resultado = str(eval(operacion))  # ¡Usar solo en desarrollo!
        return jsonify({"resultado": resultado})
    except ZeroDivisionError:
        return jsonify({"error": "División por cero"}), 400
    except Exception as e:
        return jsonify({"error": "Operación inválida"}), 400

if __name__ == "__main__":
    # Configuración segura para desarrollo
    app.run(
        host="0.0.0.0", 
        port=5000, 
        debug=True,
        use_reloader=True
    )