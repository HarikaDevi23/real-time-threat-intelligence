const moment = require('moment');

function calculateRiskScore(likelihood, impact, lastSeenDate) {
  const daysSinceLastSeen = moment().diff(moment(lastSeenDate), 'days');
  const decayFactor = Math.max(0.1, 1 - (0.05 * daysSinceLastSeen));
  return (likelihood * impact) * decayFactor;
}

module.exports = { calculateRiskScore };

// Example usage
// console.log(calculateRiskScore(4, 5, '2025-03-20'));
