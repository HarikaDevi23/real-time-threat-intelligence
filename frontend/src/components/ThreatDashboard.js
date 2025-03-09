import React, { useState, useEffect } from 'react';
import './ThreatDashboard.css';

function ThreatDashboard() {
    const [threats, setThreats] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/threats")
            .then(res => res.json())
            .then(data => setThreats(data));
    }, []);

    return (
        <div>
            <h1>Threat Intelligence Overview</h1>
            <table>
                <thead>
                    <tr>
                        <th>Threat</th>
                        <th>Vulnerability</th>
                        <th>Risk Score</th>
                    </tr>
                </thead>
                <tbody>
                    {threats.map((threat, index) => (
                        <tr key={index}>
                            <td>{threat.threat_name}</td>
                            <td>{threat.description}</td>
                            <td>{threat.risk_score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ThreatDashboard;

 
