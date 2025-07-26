import os
import subprocess
import requests
from utils.risk import compute_risk_index, get_weather_data
from flask import Flask, request, jsonify

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

    lat, lon = 43.1833, 3.0034  # Narbonne

    weather_data = get_weather_data(lat, lon)
    risk_index = compute_risk_index(weather_data, crop)

    return jsonify({"risk_index": risk_index})

@app.route("/api/calculate", methods=["POST"])
def calculate_risk_and_prime():
    data = request.get_json()

    address = data.get("address")
    crop_type = data.get("crop")
    area = data.get("area")

    if not address or not crop_type or not area:
        return jsonify({"error": "Champs requis manquants"}), 400

    # Géocodage
    lat, lon = geocode_address(address)
    if lat is None or lon is None:
        return jsonify({"error": "Adresse non trouvée"}), 400

    # Données météo
    weather_data = get_weather_data(lat, lon)
    if weather_data is None:
        return jsonify({"error": "Échec de récupération des données météo"}), 500

    # Calcul indice de risque
    risk_index = compute_risk_index(weather_data, crop_type)

    # Estimation rendement selon culture (en t/ha)
    crop_yields = {
        "blé": 7.0,
        "maïs": 9.0,
        "colza": 3.2,
        "tournesol": 2.5,
        "vigne": 6.0
    }

    rendement = crop_yields.get(crop_type.lower())
    if rendement is None:
        return jsonify({"error": "Culture inconnue"}), 400

    # Prix du kg (mocké pour l’instant)
    prix_kg = 0.25

    # Calcul prime
    prime = estimate_prime(area, rendement, prix_kg, risk_index)

    # Calcul indemnisation estimée
    payout_estimate = area * rendement * 1000 * prix_kg

    return jsonify({
        "risk_index": round(risk_index, 2),
        "prime": round(prime, 2),
        "payout_estimate": round(payout_estimate, 2)
    })

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "ARC backend is live and ready!"})

@app.route("/simulate-risk", methods=["POST"])
def simulate_risk():
    data = request.get_json()
    crop = data.get("crop")
    area = data.get("area")

    if not crop or not area:
        return jsonify({"error": "Missing crop or area"}), 400

    try:
        result = subprocess.run(
            ["node", "scripts/risk-index/runRiskIndex.js", crop, str(area)],
            cwd=os.path.abspath("../smart-contracts"),
            capture_output=True,
            text=True,
            check=True
        )
        output = result.stdout
        for line in output.splitlines():
            if "Risk Index récupéré" in line:
                value = float(line.split(":")[1].strip())
                return jsonify({"riskIndex": value})

        return jsonify({"error": "RiskIndex not found in output"}), 500

    except subprocess.CalledProcessError as e:
        return jsonify({"error": "Simulation failed", "details": e.stderr}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
