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

const prompt = ai.definePrompt({
    name: 'chatbotPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are an expert agricultural advisor bot named CropWise.
Your goal is to provide helpful and accurate information to farmers.
You must respond to the user in the same language they used.
Supported languages are: English, Hindi, Tamil, Marathi, and Telugu.
If you don't know the answer, say that you don't know.

Here is the user's message:
{{{message}}}
`
});

const chatFlow = ai.defineFlow(
    {
        name: 'chatbotFlow',
        inputSchema: ChatInputSchema,
        outputSchema: ChatOutputSchema,
    },
    async (input) => {
        const history: History = input.history.map( (msg: any) => ({ // eslint-disable-line
            role: msg.role,
            content: msg.content.map( (c: any) => part(c)) // eslint-disable-line
        }));

        const llmResponse = await ai.generate({
            prompt: {
                text: `You are an expert agricultural advisor bot named CropWise.
Your goal is to provide helpful and accurate information to farmers.
You must respond to the user in the same language they used.
Supported languages are: English, Hindi, Tamil, Marathi, and Telugu.
If you don't know the answer, say that you don't know.`
            },
            history: history,
            input: input.message,
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
