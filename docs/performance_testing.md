# Performance and Load Testing Report

## Load Testing Summary (Apache JMeter)

- **Test Scenario**: 1000 concurrent users over 10 minutes.
- **Average API Response Time**: Reduced from 450ms to 220ms after optimizations.
- **Database Bottlenecks**: Detected slow queries on `risk_score` retrieval.

## Actions Taken
- Indexed critical database fields (`risk_score`, `threat_level`).
- Optimized backend API endpoints.
- Enabled HTTP compression (gzip) on server.
