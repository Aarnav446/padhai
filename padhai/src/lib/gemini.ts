import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function generateMemeFlashcard(topic: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Create a funny, educational meme about ${topic}. 
  Return JSON with:
  - title: Short catchy title
  - memeText: Funny text for the meme
  - explanation: Educational explanation (2-3 sentences)
  - imagePrompt: Description for meme image
  
  Make it educational but humorous.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const memeData = JSON.parse(text);
    return memeData;
  } catch (error) {
    console.error('Error generating meme:', error);
    return null;
  }
}

export async function generateQuizQuestions(topic: string, count: number = 5) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate ${count} multiple choice questions about ${topic}.
  Return JSON array with each question having:
  - question: The question text
  - options: Array of 4 possible answers
  - correctAnswer: Index of correct answer (0-3)
  - explanation: Why the answer is correct
  - roast: Funny roast for wrong answers
  
  Make questions educational but fun.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating quiz:', error);
    return [];
  }
}