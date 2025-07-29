from flask import Flask, request, jsonify

from utils.geo import geocode_address
from utils.risk import compute_risk_index_from_summary
import logging

app = Flask(__name__)

# Logger configuration
logger = logging.getLogger("arc")
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

# Health check
@app.route('/')
def health_check():
    return jsonify({"message": "ARC backend is live and ready!"})

# Main API endpoint
@app.route('/api/calculate', methods=['POST'])
def calculate_risk():
    try:
        data = request.get_json(silent=True)
        if not data:
            logger.warning("No JSON payload")
            return jsonify({"error": "Invalid or missing JSON"}), 400

        address = data.get('address')
        crop = data.get('crop')
        surface = data.get('surface') or data.get('area')

        if not address or not crop or surface is None:
            logger.warning("Missing required field(s)")
            return jsonify({"error": "Missing address, crop, or surface"}), 400

        lat, lon = geocode_address(address)
        if lat is None or lon is None:
            logger.warning(f"Could not geocode address: {address}")
            return jsonify({"error": "Could not geocode address"}), 400

        # MOCK météo (à remplacer plus tard par get_weather_data(lat, lon))
        weather_data = {
            "precipitation": 100,
            "frost_days": 3,
            "heatwaves": 2
        }

        if not weather_data:
            logger.warning("Weather data is missing")
            return jsonify({"error": "Weather data unavailable"}), 500

        # Calcul du Risk Index
        risk_index = compute_risk_index_from_summary(weather_data)

        # Estimation prime
        prix_kg = 0.25
        rendement_t_ha = 6.5
        surface_ha = float(surface)
        prime = surface_ha * rendement_t_ha * 1000 * prix_kg * risk_index

        logger.info(f"{address} -> RiskIndex={risk_index:.2f}, Prime={prime:.2f}")

        return jsonify({
            
            "address": address,
            "crop": crop,
            "surface": surface_ha,
            "risk_index": round(risk_index, 3),
            "prime": round(prime, 2)
        })

    except Exception as e:
        logger.exception("Unexpected error in calculate_risk()")
        return jsonify({"error": "Internal server error"}), 500

# Lancement local
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
