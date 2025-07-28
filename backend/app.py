from flask import Flask, request, jsonify

from utils.geo import geocode_address
from utils.risk import compute_risk_index, get_weather_data

app = Flask(__name__)


@app.route('/')
def health_check():
    return jsonify(message="ARC backend is live and ready!")

@app.route('/api/calculate', methods=['POST'])
def calculate_risk():
    try:
        data = request.get_json()
        print("📦 Données reçues :", data)
        address = data.get('address')
        crop = data.get('crop')
        surface = float(data.get('surface', 0))

        if not address or not crop or surface <= 0:
            return jsonify(error="Champs requis manquants ou invalides"), 400

        lat, lon = geocode_address(address)
        if lat is None or lon is None:
            return jsonify(error="Adresse invalide"), 400
        
        weather_data = get_weather_data(lat, lon)
        risk_index = compute_risk_index(weather_data)

        
        return jsonify({
            "address": address,
            "crop": crop,
            "surface": surface,
            "risk_index": round(risk_index, 4)
        })

    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
