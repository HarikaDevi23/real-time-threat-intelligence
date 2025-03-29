const axios = require("axios");
require("dotenv").config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function analyzeRisk(threat, likelihood, impact) {
  const prompt = `Analyze the risk score for ${threat} with likelihood ${likelihood} and impact ${impact}.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "system", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    return "Error analyzing risk";
  }
}

module.exports = { analyzeRisk };
