const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateReport(data) {
  try {
    const prompt = `
    Generate a short exam monitoring report.

    Data:
    - Looked away: ${data.lookAway || 0}
    - Phone detected: ${data.phoneDetected || 0}
    - Face missing: ${data.faceMissing || 0}
    - Tab switched: ${data.tabSwitch || 0}

    Give:
    - Summary
    - Suspicion level (Low / Medium / High)
    - Integrity score out of 100
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("AI Error:", error);
    return "Report generation failed";
  }
}

module.exports = generateReport;