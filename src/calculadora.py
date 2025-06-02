from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calcular", methods=["POST"])
def calcular():
    try:
        operacion = request.form.get("operacion", "")
        resultado = str(eval(operacion))  # ¡Usa eval() solo con fines educativos!
    except:
        resultado = "Error"
    return resultado

if __name__ == "__main__":
    app.run(debug=True)