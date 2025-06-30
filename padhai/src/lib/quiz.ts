import axios from 'axios';

export async function generateQuizQuestions(topic: string, count: number = 5) {
  const prompt = `
Generate ${count} MCQ questions on the topic "${topic}".
Use this exact JSON format and nothing else:

[
  {
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"],
    "correctAnswer": 1,
    "explanation": "2 + 2 equals 4.",
    "roast": "Dude... it's basic math!"
  }
]
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!raw || !raw.includes('[')) {
      console.warn('⚠️ Gemini returned an unexpected response:', response.data);
      throw new Error('Gemini response was empty or malformed');
    }

    const firstBrace = raw.indexOf('[');
    const lastBrace = raw.lastIndexOf(']');
    const jsonOnly = raw.slice(firstBrace, lastBrace + 1);

    return JSON.parse(jsonOnly);
  } catch (error: any) {
    console.error('❌ Gemini Quiz Error:', JSON.stringify(error?.response?.data || error.message, null, 2));
    throw new Error('⚠️ Failed to generate quiz questions. Try again later.');
  }
}
