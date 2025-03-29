require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { getShodanData, getSecurityTrailsData, getHunterIOData } = require('./osint');
const { analyzeRisk } = require('./risk_analysis');
const { recommendMitigation } = require('./mitigation_recommendations');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test API Route
app.get('/', (req, res) => {
    res.send("Threat Intelligence Platform API is running...");
});

const users = [{ email: "admin@example.com", password: "password123" }];

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ---------------------- 🛠️ ASSETS CRUD OPERATIONS ----------------------

// ✅ API Route: Get all assets
app.get('/assets', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM assets");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ API Route: Get a single asset by ID
app.get('/assets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM assets WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Asset not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ API Route: Add a new asset
app.post('/assets', async (req, res) => {
    const { asset_name, asset_type, description } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO assets (asset_name, asset_type, description) VALUES ($1, $2, $3) RETURNING *",
            [asset_name, asset_type, description]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------- 🔥 THREATS CRUD OPERATIONS ----------------------

// ✅ API Route: Get all threats
app.get('/threats', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM threats");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------- 🌍 OSINT API ROUTES ----------------------

// ✅ API Route: Fetch Shodan Data
app.get('/osint/shodan/:ip', async (req, res) => {
    try {
        const { ip } = req.params;
        const data = await getShodanData(ip);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Error fetching data from Shodan", details: err.message });
    }
});

// ✅ API Route: Fetch SecurityTrails Data
app.get('/osint/securitytrails/:domain', async (req, res) => {
    try {
        const { domain } = req.params;
        const data = await getSecurityTrailsData(domain);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Error fetching data from SecurityTrails", details: err.message });
    }
});

// ✅ API Route: Fetch Hunter.io Data
app.get('/osint/hunterio/:domain', async (req, res) => {
    try {
        const { domain } = req.params;
        const data = await getHunterIOData(domain);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Error fetching data from Hunter.io", details: err.message });
    }
});

// ---------------------- 🚀 SERVER START ----------------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
