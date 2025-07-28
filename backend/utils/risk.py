def compute_risk_index(weather_data: list) -> float:
    from datetime import datetime

    gel_days = 0
    precip_juin_juillet = 0.0
    dry_streak = 0
    max_dry_streak = 0

    for day in weather_data:
        tmin = day.get("temperature_min", 99)
        precip = day.get("precipitation_sum", 0.0)
        date = datetime.strptime(day["date"], "%Y-%m-%d")

        if tmin < -2:
            gel_days += 1
        if date.month in [6, 7]:
            precip_juin_juillet += precip
        if precip < 1.0:
            dry_streak += 1
            max_dry_streak = max(max_dry_streak, dry_streak)
        else:
            dry_streak = 0

    score = 0.0
    if gel_days > 5:
        score += 0.3
    if precip_juin_juillet < 200:
        score += 0.3
    if max_dry_streak >= 20:
        score += 0.4

    return min(score, 1.0)

import requests

def get_weather_data(lat, lon):
    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": "2021-01-01",
        "end_date": "2021-12-31",
        "daily": ["temperature_2m_min", "precipitation_sum"],
        "timezone": "Europe/Paris"
    }

    response = requests.get(url, params=params)
    data = response.json()

    weather_data = []
    for i in range(len(data["daily"]["time"])):
        weather_data.append({
            "date": data["daily"]["time"][i],
            "temperature_min": data["daily"]["temperature_2m_min"][i],
            "precipitation_sum": data["daily"]["precipitation_sum"][i]
        })

    return weather_data
