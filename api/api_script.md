const axios = require('axios');
require('dotenv').config();

// 🔹 Shodan API (Find Open Ports & Exposed Devices)
async function getShodanData(ip) {
    try {
        const url = `https://api.shodan.io/shodan/host/${ip}?key=${process.env.SHODAN_API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return { error: "Shodan API error", details: error.message };
    }
}

// 🔹 SecurityTrails API (Domain & IP Intelligence)
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

// 🔹 Hunter.io API (Find Email Addresses for a Domain)
async function getHunterIOData(domain) {
    try {
        const url = `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${process.env.HUNTERIO_API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return { error: "Hunter.io API error", details: error.message };
    }
}

module.exports = { getShodanData, getSecurityTrailsData, getHunterIOData };


 
