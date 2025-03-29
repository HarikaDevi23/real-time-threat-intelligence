import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ThreatDashboard.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function ThreatDashboard() {
  const navigate = useNavigate();
  const [threats, setThreats] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [riskUpdating, setRiskUpdating] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth-status`, { withCredentials: true });
        if (!response.data.success) {
          navigate("/");
        } else {
          setRole(response.data.role);
        }
      } catch (error) {
        navigate("/");
      }
    }

    async function fetchData() {
      try {
        const [threatsRes, alertsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/threats`, { withCredentials: true }),
          axios.get(`${API_BASE_URL}/alerts`, { withCredentials: true }),
        ]);

        setThreats(threatsRes.data);
        setAlerts(alertsRes.data);
      } catch (err) {
        setError("Error fetching data from server");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
    fetchData();
  }, [navigate]);

  const handleUpdateRiskScores = async () => {
    setRiskUpdating(true);
    try {
      await axios.post(`${API_BASE_URL}/api/update-risk-scores`, {}, { withCredentials: true });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setError("Error updating risk scores");
    } finally {
      setRiskUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/logout`, {}, { withCredentials: true });
      setLogoutMessage("Logging out...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError("Error logging out.");
    }
  };

  if (loading) return <p className="loading">Loading threat data...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Threat Intelligence</h2>
        <ul>
          <li>📊 Dashboard</li>
          <li>⚠️ Threat Logs</li>
          <li>📉 Risk Analysis</li>
          <li>🔔 Alerts</li>
          <li>⚙️ Settings</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        {logoutMessage && <p className="success">{logoutMessage}</p>}
      </div>

      <div className="main-content">
        <h1>Real-Time Threat Dashboard</h1>

        {role === "admin" ? (
          <div className="dashboard-sections">
            <button className="update-risk-btn" onClick={handleUpdateRiskScores} disabled={riskUpdating}>
              {riskUpdating ? "Updating Risk Scores..." : "🔄 Update Risk Scores"}
            </button>

            <div className="card">
              <h2>🔔 Alerts</h2>
              <ul>
                {alerts.length > 0 ? (
                  alerts.map((alert, index) => (
                    <li key={index}>{alert.alert_message} (Severity: {alert.severity})</li>
                  ))
                ) : (
                  <p>No recent alerts.</p>
                )}
              </ul>
            </div>

            <div className="card">
              <h2>🛡️ Threat Logs</h2>
              <table className="threat-table">
                <thead>
                  <tr>
                    <th>Threat</th>
                    <th>Type</th>
                    <th>Risk Level</th>
                    <th>Detected At</th>
                  </tr>
                </thead>
                <tbody>
                  {threats.length > 0 ? (
                    threats.map((threat, index) => (
                      <tr key={index}>
                        <td>{threat.threat_name}</td>
                        <td>{threat.threat_type}</td>
                        <td>{threat.risk_level}</td>
                        <td>{new Date(threat.detected_at).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-data">No threats detected.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h2>🔒 Restricted Access: Only Admins Can View Threat Data</h2>
        )}
      </div>
    </div>
  );
}

export default ThreatDashboard;


 
