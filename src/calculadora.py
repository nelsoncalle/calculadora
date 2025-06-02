from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/calcular", methods=["POST"])
def calcular():
    try:
        data = request.get_json()
        operacion = data.get("operacion", "")
        resultado = str(eval(operacion))  # ¡Usa solo en desarrollo!
        return jsonify({"resultado": resultado})
    except Exception as e:
        return jsonify({"error": "Operación inválida"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)  # ¡Host y port críticos!