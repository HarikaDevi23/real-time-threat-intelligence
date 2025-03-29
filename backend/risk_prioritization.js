function prioritizeRisks(threats) {
  return threats.sort((a, b) => b.risk_score - a.risk_score);
}

module.exports = { prioritizeRisks };
