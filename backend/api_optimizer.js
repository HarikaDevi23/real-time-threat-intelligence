const redis = require("redis");
const { fetchOSINT } = require("./osint"); // You must define this

const client = redis.createClient();
client.connect();

async function getThreatData(ip) {
  try {
    const cached = await client.get(ip);
    if (cached) {
      console.log("🔁 Returned from cache");
      return JSON.parse(cached);
    } else {
      const data = await fetchOSINT(ip);
      await client.setEx(ip, 3600, JSON.stringify(data)); // 1 hour cache
      console.log("📡 Fetched from API and cached");
      return data;
    }
  } catch (err) {
    console.error("Redis error:", err.message);
    return null;
  }
}

module.exports = { getThreatData };
