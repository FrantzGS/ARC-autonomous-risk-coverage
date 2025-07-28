import json
import sys
import os
from pathlib import Path
from utils.risk import compute_risk_index

def main(file_path):
    if not os.path.exists(file_path):
        print(f"Fichier introuvable : {file_path}")
        return

    with open(file_path, 'r') as f:
        try:
            weather_data = json.load(f)
        except json.JSONDecodeError:
            print("Erreur de parsing JSON")
            return

    risk_index = compute_risk_index(weather_data)
    print(f"RiskIndex calculé : {risk_index:.2f}")

if __name__ == "__main__":
    default_path = Path(__file__).parent / "mock_weather.json"
    file_path = sys.argv[1] if len(sys.argv) > 1 else default_path
    main(str(file_path))
