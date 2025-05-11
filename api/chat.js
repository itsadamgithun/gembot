// File: /api/chat.js (Vercel serverless function)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, lang } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.TOGETHER_API_KEY; // 🔐 Add this in Vercel environment variables
  const endpoint = "https://api.together.xyz/v1/chat/completions";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "togethercomputer/llama-3-8b-chat", // vagy más elérhető Together.ai modell
        messages: [
          {
            role: "system",
            content: `Válaszolj ${lang} nyelven, légy barátságos.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Together.ai error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
