import json
from backend.app import app

def test_home():
    tester = app.test_client()
    response = tester.get('/')
    assert response.status_code == 200
    assert b"ARC backend is live and ready!" in response.data

def test_calculate_valid():
    tester = app.test_client()
    data = {
        "address": "Narbonne, France",
        "crop": "blé",
        "area": 10
    }
    response = tester.post("/api/calculate",
        data=json.dumps(data),
        content_type='application/json'
    )
    assert response.status_code == 200
    assert b"risk_index" in response.data
    assert b"prime" in response.data

def test_calculate_missing_field():
    tester = app.test_client()
    response = tester.post("/api/calculate",
        data=json.dumps({"crop": "blé"}),
        content_type='application/json'
    )
    assert response.status_code == 400
