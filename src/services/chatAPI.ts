// src/services/chatAPI.ts

const API_URL:string = 'https://api.openai.com/v1/chat/completions';
const API_KEY:string | undefined = import.meta.env.VITE_GPT_API_KEY

/**
 * Function to send a message to the ChatGPT API and get a response.
 * @param {string} message - The message to be sent to ChatGPT.
 * @returns {Promise<string>} - The response text from ChatGPT.
 */
export async function getChatGPTResponse(message:string): Promise<string> {
  if (!API_KEY) {
    throw new Error('API key is undefined');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', 
            content: message, 
            max_tokens: 500, 
          }],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from ChatGPT API');
    }

    const data: { choices: { message: { content: string } }[] } = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching data from ChatGPT API:', error);
    throw error;
  }
}
