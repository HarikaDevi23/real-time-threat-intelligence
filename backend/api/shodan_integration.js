import requests
import psycopg2
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SHODAN_API_KEY = os.getenv("SHODAN_API_KEY")
DB_URL = os.getenv("DATABASE_URL")

# Function to fetch data from Shodan
def get_shodan_data(ip):
    url = f"https://api.shodan.io/shodan/host/{ip}?key={SHODAN_API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed to fetch data for {ip}", "status": response.status_code}

# Function to store data in PostgreSQL
def save_to_database(ip, data):
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO threats (ip_address, data, detected_at)
            VALUES (%s, %s, NOW()) ON CONFLICT (ip_address) DO UPDATE SET data = EXCLUDED.data;
        """, (ip, str(data)))
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Database error: {e}")

# Example usage
if __name__ == "__main__":
    ip = "8.8.8.8"  # Example IP
    shodan_data = get_shodan_data(ip)
    if "error" not in shodan_data:
        save_to_database(ip, shodan_data)
    print(shodan_data)
