function calculateCBA(alePrior, alePost, acs) {
  return alePrior - alePost - acs;
}

// Example usage
// const result = calculateCBA(50000, 10000, 15000); // should return 25000

module.exports = { calculateCBA };
