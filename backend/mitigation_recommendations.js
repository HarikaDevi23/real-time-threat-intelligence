function recommendMitigation(threat) {
  const mitigations = {
    "SQL Injection": "Use prepared statements and input validation.",
    "Phishing": "Enable 2FA and train employees to identify phishing.",
    "DDoS": "Rate limit APIs and use cloud-based DDoS protection."
  };
  return mitigations[threat] || "No recommendation available.";
}

module.exports = { recommendMitigation };
