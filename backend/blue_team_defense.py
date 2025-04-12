# blue_team_defense.py

import os

def block_ip(ip):
    os.system(f"iptables -A INPUT -s {ip} -j DROP")

# Example usage
if __name__ == "__main__":
    malicious_ip = "192.168.1.10"
    block_ip(malicious_ip)
    print(f"Blocked IP: {malicious_ip}")
