const responsePlans = {
  "SQL Injection": {
    response: "Sanitize input, patch affected services, and monitor DB.",
    priority: "High"
  },
  "Phishing": {
    response: "Lock accounts, reset passwords, and report to IT.",
    priority: "Medium"
  },
  "DDoS": {
    response: "Enable WAF, reroute traffic, and alert ISP.",
    priority: "High"
  }
};

function getResponsePlan(threat) {
  return responsePlans[threat] || {
    response: "No response plan available.",
    priority: "Low"
  };
}

module.exports = { getResponsePlan };
