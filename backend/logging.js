const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, '../logs/threat_events.log');

function logThreat(threat, score) {
  const logEntry = `${new Date().toISOString()} - ${threat} detected with risk score: ${score}\n`;
  fs.appendFileSync(logFile, logEntry);
}

module.exports = { logThreat };
