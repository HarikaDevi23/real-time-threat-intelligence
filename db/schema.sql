CREATE DATABASE threat_db;
\c threat_db;

-- 🚀 Table 1: Assets
CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🚀 Table 2: Threats
CREATE TABLE threats (
    id SERIAL PRIMARY KEY,
    asset_id INT REFERENCES assets(id) ON DELETE CASCADE,
    threat_name VARCHAR(255) NOT NULL,
    threat_type VARCHAR(255),
    risk_level INT CHECK (risk_level BETWEEN 1 AND 10),
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🚀 Table 3: Vulnerabilities
CREATE TABLE vulnerabilities (
    id SERIAL PRIMARY KEY,
    asset_id INT REFERENCES assets(id) ON DELETE CASCADE,
    cve_id VARCHAR(50) UNIQUE NOT NULL, -- Example: CVE-2023-1234
    description TEXT,
    severity VARCHAR(10) CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🚀 Table 4: Risk Ratings
CREATE TABLE risk_ratings (
    id SERIAL PRIMARY KEY,
    asset_id INT REFERENCES assets(id) ON DELETE CASCADE,
    threat_id INT REFERENCES threats(id) ON DELETE CASCADE,
    vulnerability_id INT REFERENCES vulnerabilities(id) ON DELETE CASCADE,
    risk_score INT CHECK (risk_score BETWEEN 1 AND 100),
    mitigation_plan TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

