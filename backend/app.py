from flask import Flask, request, jsonify
import os
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

@app.route("/evaluate-risk", methods=["GET"])
def evaluate_risk_route():
    crop = request.args.get("crop")
    area = request.args.get("area")

    if not crop or not area:
        return jsonify({"error": "Missing crop or area"}), 400

    try:
        area = float(area)
    except ValueError:
        return jsonify({"error": "Invalid area value"}), 400

    lat, lon = 43.1833, 3.0034
    risk_index = compute_risk_index(lat, lon, crop)

    return jsonify({"risk_index": risk_index})

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "ARC backend is live and ready!"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
