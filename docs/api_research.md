# API Research Report

## **📌 Overview**
This report documents the research and integration of Open Source Intelligence (OSINT) APIs into the **Real-Time Threat Intelligence and Risk Management Framework for ShopSmart Solutions**. 
The APIs selected will be used for **real-time data collection, risk assessment, and cybersecurity analysis**.

---

## **📌 1️⃣ Selected OSINT APIs & Their Purpose**

| **API**            | **Purpose**                                       | **API Documentation**  |
|--------------------|--------------------------------------------------|------------------------|
| **Shodan**        | Identifies exposed assets and open ports.        | [Shodan API](https://developer.shodan.io/) |
| **SecurityTrails** | Provides domain and IP intelligence.             | [SecurityTrails API](https://securitytrails.com/corp/api) |
| **Hunter.io**     | Finds email addresses associated with domains.    | [Hunter.io API](https://hunter.io/api) |

---

## **📌 2️⃣ API Authentication & Request Methods**

Each API requires authentication using **API keys** stored in environment variables (`.env`). The backend makes **HTTP requests** to fetch real-time threat intelligence data.

### **🔹 Shodan API (Network Security Analysis)**
✅ **Purpose:**
- Detects exposed **services**, **open ports**, and **vulnerable assets**.
- Identifies **IoT devices** and potential security risks.

✅ **Authentication:**
- Requires an **API key** (`SHODAN_API_KEY`).
- Uses `GET` requests.

✅ **Example API Call:**
```bash
curl -X GET "https://api.shodan.io/shodan/host/8.8.8.8?key=YOUR_API_KEY"
```
✅ **Node.js Integration:**
```javascript
const axios = require('axios');
require('dotenv').config();

async function getShodanData(ip) {
    try {
        const url = `https://api.shodan.io/shodan/host/${ip}?key=${process.env.SHODAN_API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return { error: "Shodan API error", details: error.message };
    }
}
```

---

### **🔹 SecurityTrails API (Domain & IP Intelligence)**
✅ **Purpose:**
- Retrieves **historical DNS, WHOIS, and IP information**.
- Identifies **newly registered domains and subdomains**.

✅ **Authentication:**
- Requires an **API key** (`SECURITYTRAILS_API_KEY`).
- Uses `GET` requests with authentication headers.

✅ **Example API Call:**
```bash
curl -X GET "https://api.securitytrails.com/v1/domain/example.com" -H "APIKEY: YOUR_API_KEY"
```
✅ **Node.js Integration:**
```javascript
async function getSecurityTrailsData(domain) {
    try {
        const url = `https://api.securitytrails.com/v1/domain/${domain}`;
        const response = await axios.get(url, {
            headers: { "APIKEY": process.env.SECURITYTRAILS_API_KEY }
        });
        return response.data;
    } catch (error) {
        return { error: "SecurityTrails API error", details: error.message };
    }
}
```

---

### **🔹 Hunter.io API (Email Intelligence & Domain Search)**
✅ **Purpose:**
- Finds **professional email addresses** linked to a domain.
- Helps detect **potential phishing** or malicious emails.

✅ **Authentication:**
- Requires an **API key** (`HUNTERIO_API_KEY`).
- Uses `GET` requests.

✅ **Example API Call:**
```bash
curl -X GET "https://api.hunter.io/v2/domain-search?domain=example.com&api_key=YOUR_API_KEY"
```
✅ **Node.js Integration:**
```javascript
async function getHunterIOData(domain) {
    try {
        const url = `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${process.env.HUNTERIO_API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return { error: "Hunter.io API error", details: error.message };
    }
}
```

---

## **📌 3️⃣ API Data Flow & Integration Plan**

### **1️⃣ Backend Requests OSINT Data**
- The **Node.js backend** makes API calls to **Shodan, SecurityTrails, and Hunter.io**.
- Responses are **parsed and stored** in the **PostgreSQL database**.

### **2️⃣ Data Storage & Risk Analysis**
- Data is stored in the **`assets` and `threats`** tables.
- **Risk scores** are calculated based on API responses.

### **3️⃣ Front-End Dashboard Updates**
- The **React.js front-end** retrieves API data via the backend.
- Security teams can **view threat intelligence** and take action.
 

🚀 **This research report serves as a blueprint for integrating OSINT APIs into the Threat Intelligence Platform.**

