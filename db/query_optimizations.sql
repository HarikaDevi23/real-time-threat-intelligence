-- Optimized Query for High-Risk Threats
CREATE INDEX idx_risk_score ON threat_data(risk_score);

EXPLAIN ANALYZE
SELECT *
FROM threat_data
WHERE risk_score > 20;
