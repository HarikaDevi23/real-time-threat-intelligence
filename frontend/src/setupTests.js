// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import requests
import pytest
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000")

# ✅ Test Authentication API
def test_auth_status():
    url = f"{API_BASE_URL}/api/auth-status"
    response = requests.get(url, cookies={"token": "valid_test_token"})  # Simulated valid token
    assert response.status_code in [200, 403, 401], "Invalid auth response"
    if response.status_code == 200:
        assert "role" in response.json(), "Role missing in response"

# ✅ Test Threats API
def test_threats():
    url = f"{API_BASE_URL}/api/threats"
    response = requests.get(url, cookies={"token": "valid_test_token"})  # Simulated token
    assert response.status_code in [200, 403], "Threats API returned unexpected status"
    if response.status_code == 200:
        assert isinstance(response.json(), list), "Threats response should be a list"

# ✅ Test Alerts API
def test_alerts():
    url = f"{API_BASE_URL}/api/alerts"
    response = requests.get(url, cookies={"token": "valid_test_token"})  # Simulated token
    assert response.status_code in [200, 403], "Alerts API returned unexpected status"
    if response.status_code == 200:
        assert isinstance(response.json(), list), "Alerts response should be a list"

# ✅ Run tests with pytest
if __name__ == "__main__":
    pytest.main()
