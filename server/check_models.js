require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("🔍 Asking Google for available models...");

async function getModels() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.models) {
      console.log("\n✅ SUCCESS! Here are your available models:");
      // Filter for only the "generateContent" models we need
      const chatModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
      chatModels.forEach(m => {
        console.log(`- ${m.name.replace('models/', '')}`); // Clean name
      });
    } else {
      console.log("❌ ERROR RESPONSE:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("❌ NETWORK ERROR:", error);
  }
}

getModels();