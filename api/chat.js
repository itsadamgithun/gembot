// api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Csak POST kérés engedélyezett' });
  }

  const { message, language } = req.body; // Üzenet és nyelv

  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`, // API kulcs
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-8b-chat-hf",  // Használt modell
        messages: [{ role: "user", content: message }],
        language: language // Küldje el a választott nyelvet is
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      return res.status(500).json({ reply: "Nem érkezett válasz a modellből." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ reply: "Hiba történt a kapcsolat során." });
  }
}
