import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-crop-outcomes.ts';
import '@/ai/flows/generate-crop-recommendation.ts';
import '@/ai/flows/analyze-crop-health.ts';
import '@/ai/flows/chatbot.ts';
