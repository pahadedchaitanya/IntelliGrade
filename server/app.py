from flask import Flask, request, jsonify

from flask_cors import CORS

import joblib

app = Flask(__name__)

CORS(app)

model = joblib.load("final_model.pkl")

@app.route("/predict", methods=["POST"])

def predict():

    data = request.json

    studytime = float(data["studytime"])

    absences = float(data["absences"])

    g1 = float(data["g1"])

    g2 = float(data["g2"])

    features = [[studytime, absences, g1, g2]]

    prediction = model.predict(features)

    result = round(prediction[0], 2)

    if result < 0:
        result = 0

    if result > 20:
        result = 20

    status = "PASS"

    if result < 10:

        status = "FAIL"

    return jsonify({

        "prediction": result,

        "status": status

    })

if __name__ == "__main__":

    app.run(debug=True)