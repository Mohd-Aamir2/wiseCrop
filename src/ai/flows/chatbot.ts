'use server';
/**
 * @fileOverview A multi-language chatbot for agricultural advice.
 * 
 * - chat - A function that handles the conversation with the AI.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { part, History, MessageData } from 'genkit';
import { dummyWeather } from '@/lib/dummy-data';

const ChatInputSchema = z.object({
    message: z.string().describe("The user's message."),
    history: z.array(z.any()).describe("The conversation history."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;


const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
    {
        name: 'chatbotFlow',
        inputSchema: ChatInputSchema,
        outputSchema: ChatOutputSchema,
    },
    async (input) => {
        const history: History = input.history.map( (msg: any) => ({ // eslint-disable-line
            role: msg.role,
            content: msg.content
        }));

        // In a real app, this would be fetched for the specific user
        const farmProfile = {
            farmSize: 50,
            soilType: "loamy",
            location: "Central Valley, California",
            cropPreference: "High-yield cash crop"
        };
        
        const weather = dummyWeather;

        const systemPrompt = `You are an expert agricultural advisor bot named CropWise.
Your goal is to provide helpful and accurate information to farmers.
You must respond to the user in the same language they used.
Supported languages are: English, Hindi, Tamil, Marathi, and Telugu.
If you don't know the answer, say that you don't know.

Here is the user's farm information. Use this to answer their questions about their farm, crops, soil, and weather.

Farm Profile:
- Location: ${farmProfile.location}
- Size: ${farmProfile.farmSize} acres
- Soil Type: ${farmProfile.soilType}
- Crop Preference: ${farmProfile.cropPreference}

Current Weather:
- Temperature: ${weather.currentTemperature}°C
- Humidity: ${weather.humidity}%
- Condition: ${weather.weatherCondition}

3-Day Forecast:
${weather.temperatureForecast.map(f => `- ${f.date}: ${f.temperature}°C`).join('\n')}
`;

        const llmResponse = await ai.generate({
            prompt: input.message,
            history: history,
            config: {
                system: systemPrompt,
            },
            output: {
                schema: ChatOutputSchema,
                format: 'json',
            }
        });
        
        const output = llmResponse.output;

        if (!output) {
            return { response: "I'm sorry, I couldn't generate a response." };
        }

        return output;
    }
);
