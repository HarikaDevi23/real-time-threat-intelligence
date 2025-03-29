const nodemailer = require("nodemailer");
const axios = require("axios");
require("dotenv").config();

const WEBHOOK_URL = process.env.WEBHOOK_URL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ALERT_EMAIL,
    pass: process.env.ALERT_PASSWORD
  }
});

function sendEmailAlert(threat, riskScore) {
  const mailOptions = {
    from: process.env.ALERT_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "⚠️ Critical Cybersecurity Alert",
    text: `High-Risk Threat Detected: ${threat} with Risk Score ${riskScore}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error("Email error:", error);
    else console.log("Email sent:", info.response);
  });
}

function sendWebhookAlert(threat, riskScore) {
  axios.post(WEBHOOK_URL, { threat, riskScore })
    .then(() => console.log("Webhook alert sent."))
    .catch(err => console.error("Webhook error:", err.message));
}

function triggerAlerts(threat, riskScore) {
  if (riskScore > 20) {
    sendEmailAlert(threat, riskScore);
    sendWebhookAlert(threat, riskScore);
  }
}

module.exports = { triggerAlerts };
