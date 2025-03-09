const axios = require('axios');
const pool = require('../db');
require('dotenv').config();
const { getShodanData, getSecurityTrailsData, getHunterIOData } = require('../osint');

async function fetchThreatData(ip, domain) {
    try {
        // Fetch threat data from multiple OSINT sources
        const shodanData = await getShodanData(ip);
        const securityTrailsData = await getSecurityTrailsData(domain);
        const hunterIOData = await getHunterIOData(domain);

        // Store Shodan threat data
        if (shodanData.ports) {
            await pool.query(
                `INSERT INTO threats (asset_id, threat_name, threat_type, risk_level, detected_at) 
                VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
                [1, `Open Ports: ${shodanData.ports}`, "Network Vulnerability", 4]
            );
        }

        // Store SecurityTrails threat data
        if (securityTrailsData) {
            await pool.query(
                `INSERT INTO threats (asset_id, threat_name, threat_type, risk_level, detected_at) 
                VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
                [2, "Domain Intelligence", "Reputation Analysis", 3]
            );
        }

        console.log("Threat data stored successfully");
    } catch (error) {
        console.error("Error fetching threat data:", error.message);
    }
}

fetchThreatData("8.8.8.8", "example.com");

module.exports = { fetchThreatData };
