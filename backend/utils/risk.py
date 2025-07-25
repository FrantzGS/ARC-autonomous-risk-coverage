import random

def compute_risk_index(weather_data: list, crop: str) -> float:
    drought_risk = 0
    frost_risk = 0
    flood_risk = 0
    years = len(weather_data)

    for year in weather_data:
        total_precip = sum(day["precipitation"] for day in year)
        frost_days = sum(1 for day in year if day["temperature_min"] < 0)
        flood_days = sum(1 for day in year if day["precipitation"] > 20)

        # Risque sécheresse si < 500mm/an
        if total_precip < 500:
            drought_risk += 1

        # Risque gel si > 15 jours de gel/an
        if frost_days > 15:
            frost_risk += 1

        # Risque inondation si > 10 jours de pluie forte/an
        if flood_days > 10:
            flood_risk += 1

    # Moyennes sur les 5 ans
    drought_score = drought_risk / years
    frost_score = frost_risk / years
    flood_score = flood_risk / years

    # Pondération selon la culture
    crop_weights = {
        "blé": (0.5, 0.3, 0.2),
        "maïs": (0.6, 0.2, 0.2),
        "colza": (0.4, 0.3, 0.3),
        "tournesol": (0.5, 0.3, 0.2),
        "vigne": (0.3, 0.6, 0.1),
        "pommier": (0.3, 0.4, 0.3),
        "poirier": (0.3, 0.4, 0.3),
        "pêcher": (0.3, 0.5, 0.2),
        "olivier": (0.5, 0.3, 0.2)
    }

    weights = crop_weights.get(crop.lower(), (0.4, 0.4, 0.2))
    risk_index = (
        drought_score * weights[0] +
        frost_score * weights[1] +
        flood_score * weights[2]
    )

    # Clamp entre 0.1 et 0.9
    return round(min(max(risk_index, 0.1), 0.9), 3)

def get_weather_data(lat, lon):
    import random

    # Simule 5 années de données météo (365 jours x 5)
    weather_data = []
    for _ in range(5):
        year_data = []
        for _ in range(365):
            day = {
                "precipitation": random.uniform(0, 20),
                "temperature_min": random.uniform(-5, 15),
            }
            year_data.append(day)
        weather_data.append(year_data)

    return weather_data
