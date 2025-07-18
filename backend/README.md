# 🌤️ ARC Backend – Climate Risk & Premium Estimation (Flask API)

This folder contains the backend service used by ARC (Autonomous Risk Coverage) to calculate climate risk indexes and premium estimations based on historical weather data.

---

## 🔍 What It Does

This Flask API collects and processes weather data (rain, drought, frost...) from open sources like **Open-Meteo**. It then uses a basic AI model to:

- Calculate a **Risk Index** (climate probability score)
- Estimate a **dynamic premium** per crop and location

This logic powers the smart contract subscription process by providing real-time risk and pricing data.

---

## 🔧 Tech Stack

- **Python 3.10+**
- **Flask** (REST API)
- **Requests** (for weather API calls)
- **Scikit-learn / NumPy** (for future AI model – placeholder for now)

---

## 🧪 How to Run Locally

```bash
cd backend
pip install -r requirements.txt
python app.py


Add backend README for Flask API
