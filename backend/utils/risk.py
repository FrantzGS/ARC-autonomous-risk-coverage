import requests

def compute_risk_index(lat, lon, crop_type):

    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": "2018-01-01",
        "end_date": "2022-12-31",
        "daily": "precipitation_sum",
        "timezone": "Europe/Paris"
    }

    response = requests.get(url, params=params)
    data = response.json()

    if "daily" not in data or "precipitation_sum" not in data["daily"]:
        raise Exception("Erreur récupération données météo")

    precipitations = data["daily"]["precipitation_sum"]

    dry_days = sum(1 for p in precipitations if p < 1.0)
    total_days = len(precipitations)

    dryness_ratio = dry_days / total_days

    crop_sensitivity = {
        "blé": 1.0,
        "maïs": 1.2,
        "vigne": 0.9,
        "tournesol": 1.1,
        "colza": 1.0
    }

    sensitivity = crop_sensitivity.get(crop_type.lower(), 1.0)

    risk_index = min(1.0, dryness_ratio * sensitivity)
    return round(risk_index, 2)
