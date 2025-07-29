from flask import Flask, request, jsonify

from utils.geo import geocode_address
from utils.risk import compute_risk_index
import logging

app = Flask(__name__)

logger = logging.getLogger("arc")
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

@app.route('/')
def health_check():
    return jsonify({"message": "ARC backend is live and ready!"})

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

        weather_data = compute_risk_index(lat, lon) if False else None
        risk_index = compute_risk_index(weather_data)

        prix_kg = 0.25
        rendement_t_ha = 6.5
        prime = surface * rendement_t_ha * 1000 * prix_kg * risk_index

        logger.info(f"{address} -> RiskIndex={risk_index:.2f}, Prime={prime:.2f}")

        return jsonify({

            "address": address,
            "crop": crop,
            "surface": surface,
            "risk_index": round(risk_index, 3),
            "prime": round(prime, 2)
        })

    except Exception as e:
        logger.exception("Unexpected error")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
