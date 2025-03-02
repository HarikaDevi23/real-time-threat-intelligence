require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { getShodanData, getSecurityTrailsData, getHunterIOData } = require('./osint');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test API Route
app.get('/', (req, res) => {
    res.send("Threat Intelligence Platform API is running...");
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
    const { name, category, description } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO assets (name, category, description) VALUES ($1, $2, $3) RETURNING *",
            [name, category, description]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ API Route: Update an existing asset
app.put('/assets/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category, description } = req.body;
    try {
        const result = await pool.query(
            "UPDATE assets SET name = $1, category = $2, description = $3 WHERE id = $4 RETURNING *",
            [name, category, description, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Asset not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ API Route: Delete an asset
app.delete('/assets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM assets WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Asset not found" });
        }
        res.json({ message: "Asset deleted successfully" });
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

// ✅ API Route: Get a single threat by ID
app.get('/threats/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM threats WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Threat not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ API Route: Add a new threat
app.post('/threats', async (req, res) => {
    const { asset_id, threat_name, risk_level } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO threats (asset_id, threat_name, risk_level) VALUES ($1, $2, $3) RETURNING *",
            [asset_id, threat_name, risk_level]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ API Route: Update an existing threat
app.put('/threats/:id', async (req, res) => {
    const { id } = req.params;
    const { asset_id, threat_name, risk_level } = req.body;
    try {
        const result = await pool.query(
            "UPDATE threats SET asset_id = $1, threat_name = $2, risk_level = $3 WHERE id = $4 RETURNING *",
            [asset_id, threat_name, risk_level, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Threat not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ API Route: Delete a threat
app.delete('/threats/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM threats WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Threat not found" });
        }
        res.json({ message: "Threat deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------- 🌍 OSINT API ROUTES ----------------------

// ✅ API Route: Fetch Shodan Data
app.get('/osint/shodan/:ip', async (req, res) => {
    const { ip } = req.params;
    const data = await getShodanData(ip);
    res.json(data);
});

// ✅ API Route: Fetch SecurityTrails Data
app.get('/osint/securitytrails/:domain', async (req, res) => {
    const { domain } = req.params;
    const data = await getSecurityTrailsData(domain);
    res.json(data);
});

// ✅ API Route: Fetch Hunter.io Data
app.get('/osint/hunterio/:domain', async (req, res) => {
    const { domain } = req.params;
    const data = await getHunterIOData(domain);
    res.json(data);
});

// ---------------------- 🚀 SERVER START ----------------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


