"use server";

import { chat, type ChatOutput, type ChatInput } from "@/ai/flows/chatbot";

export async function sendMessage(message: string, history: any[]): Promise<ChatOutput> {
  try {
    const input: ChatInput = { message, history };
    const response = await chat(input);
    return response;
  } catch (error) {
    console.error("Error sending message to chatbot:", error);
    throw new Error("Failed to get response from chatbot.");
  }
}
