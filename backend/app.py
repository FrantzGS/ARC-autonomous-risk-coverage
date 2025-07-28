from flask import Flask, request, jsonify
from utils.logger import get_logger
from utils.geo import geocode_address
from utils.risk import compute_risk_index

app = Flask(__name__)
logger = get_logger()

@app.route('/')
def home():
    return {'message': "Le backend ARC est en ligne et prêt !"}

@app.route('/api/calculate', methods=['POST'])
def calculate_risk():
    try:
        data = request.get_json()
        area = data.get('area') or data.get('surface')
        address = data.get('address')
        crop = data.get('crop')
        if not address or not crop or not area:
            logger.warning("Requête incomplète reçue")
            return jsonify({"error": "Champs requis manquants"}), 400

        lat, lon = geocode_address(address)
        if lat is None or lon is None:
            logger.warning(f"Adresse non trouvée : {address}")
            return jsonify({"error": "Adresse non reconnue"}), 400

        from utils.risk import get_weather_data
        weather_data = get_weather_data(lat, lon)
        risk_index = compute_risk_index(weather_data)

        prix_kg = 0.25
        rendement_t_ha = 6.5
        prime = area * rendement_t_ha * 1000 * prix_kg * risk_index

        logger.info(f"{address} → RiskIndex={risk_index:.2f}, Prime={prime:.2f}")

        return jsonify({
            "address": address,
            "crop": crop,
            "area": area,
            "risk_index": round(risk_index, 3),
            "prime": round(prime, 2)
        })

    except Exception as e:
        logger.exception("Erreur pendant le calcul")
        return jsonify({'error': str(e)}), 500

@app.errorhandler(Exception)
def handle_unexpected_error(e):
    logger.exception("Erreur inattendue")
    return jsonify({'error': str(e)}), 500
