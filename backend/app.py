from flask import Flask, request, jsonify
from utils.risk import compute_risk_index
import requests

app = Flask(__name__)

def geocode_address(address):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": address,
        "format": "json",
        "limit": 1
    }
    headers = {
        "User-Agent": "ARClimate/1.0 (contact@example.com)"
    }

    response = requests.get(url, params=params, headers=headers)
    data = response.json()

    if not data:
        return None, None

    lat = float(data[0]["lat"])
    lon = float(data[0]["lon"])
    return lat, lon

def estimate_prime(surface_ha, rendement_t_ha, prix_kg, risk_index):
    rendement_kg_ha = rendement_t_ha * 1000
    prime = surface_ha * rendement_kg_ha * prix_kg * risk_index * 0.01
    return round(prime, 2)

@app.route("/risk", methods=["GET"])
def risk_index_route():
    address = request.args.get("address")
    crop_type = request.args.get("crop_type")

    if not address or not crop_type:
        return jsonify({"error": "Missing address or crop_type"}), 400

    lat, lon = geocode_address(address)
    if lat is None or lon is None:
        return jsonify({"error": "Invalid address"}), 400

    try:
        risk_index = compute_risk_index(lat, lon, crop_type)

        surface_ha = 10
        prix_kg = 0.30
        rendements = {
            "blé": 6.0,
            "maïs": 9.0,
            "colza": 3.5,
            "tournesol": 2.5,
            "vigne": 7.0,
            "pommier": 20.0,
            "poirier": 18.0,
            "pêcher": 15.0,
            "olivier": 4.0
        }
        rendement_t_ha = rendements.get(crop_type.lower(), 5.0)

        prime_estimate = estimate_prime(surface_ha, rendement_t_ha, prix_kg, risk_index)

        return jsonify({
            "address": address,
            "crop_type": crop_type,
            "lat": lat,
            "lon": lon,
            "risk_index": risk_index,
            "prime_estimate": prime_estimate
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "ARC backend is live and ready!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


