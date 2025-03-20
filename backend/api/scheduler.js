import schedule
import time
from shodan_integration import get_shodan_data, save_to_database

# List of IPs to monitor
IP_LIST = ["8.8.8.8", "1.1.1.1", "104.26.10.78"]

def update_threat_data():
    print("🔄 Updating threat data...")
    for ip in IP_LIST:
        data = get_shodan_data(ip)
        if "error" not in data:
            save_to_database(ip, data)
    print("✅ Threat data updated successfully!")

# Schedule the function to run every 6 hours
schedule.every(6).hours.do(update_threat_data)

if __name__ == "__main__":
    print("🚀 Threat data scheduler running...")
    while True:
        schedule.run_pending()
        time.sleep(60)  # Wait 1 minute before checking the schedule again
