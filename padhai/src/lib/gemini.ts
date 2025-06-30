import axios from "axios";

export async function generateFlashcards(text: string) {
  const prompt = `
You are a flashcard generator bot.

🎯 Respond in ONLY this JSON format (no markdown, no explanation):

{
  "flashcards": [
    { "question": "What is ...?", "answer": "..." },
    { "question": "...", "answer": "..." }
  ],
  "meme": {
    "template": "Grumpy Cat",
    "captionTop": "Studying hard?",
    "captionBottom": "Too bad, here's more!"
  }
}

Text:
"""${text}"""
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const raw = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) throw new Error("No response text from Gemini");

    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    const clean = raw.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(clean);

  } catch (error: any) {
    console.error(
      "❌ Gemini Error:",
      JSON.stringify(error?.response?.data || error.message || error, null, 2)
    );
    throw new Error("Failed to generate flashcards.");
  }
}
