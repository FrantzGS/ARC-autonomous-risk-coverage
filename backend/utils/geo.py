import requests

def get_coordinates(address):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        'q': address,
        'format': 'json',
        'limit': 1
    }

    response = requests.get(url, params=params)

    if response.status_code != 200 or not response.json():
        raise Exception("Adresse introuvable ou erreur API Nominatim")

    data = response.json()[0]
    return float(data['lat']), float(data['lon'])
