function calculateRisk(likelihood, impact) {
    return likelihood * impact;
}

async function updateRiskScores(pool) {
    try {
        const result = await pool.query("SELECT id, likelihood, impact FROM tva_mapping");
        for (const row of result.rows) {
            const risk_score = calculateRisk(row.likelihood, row.impact);
            await pool.query(
                "UPDATE tva_mapping SET risk_score = $1 WHERE id = $2",
                [risk_score, row.id]
            );
        }
        console.log("Risk scores updated successfully");
    } catch (error) {
        console.error("Error updating risk scores:", error.message);
    }
}

module.exports = { calculateRisk, updateRiskScores };
