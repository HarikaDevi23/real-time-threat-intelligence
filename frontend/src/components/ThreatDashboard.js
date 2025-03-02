import React, { useState, useEffect } from 'react';

function ThreatDashboard() {
    const [threats, setThreats] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/threats")
            .then(res => res.json())
            .then(data => setThreats(data));
    }, []);

    return (
        <div>
            <h1>Real-Time Threat Intelligence</h1>
            <ul>
                {threats.map((threat, index) => (
                    <li key={index}>{threat.threat_name} - Risk Level: {threat.risk_level}</li>
                ))}
            </ul>
        </div>
    );
}

export default ThreatDashboard;
 
