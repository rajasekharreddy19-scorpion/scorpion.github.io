'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a personalized compliment based on an uploaded image.
 *
 * generatePersonalizedCompliment - A function that generates a personalized compliment based on an image.
 * GeneratePersonalizedComplimentInput - The input type for the generatePersonalizedCompliment function.
 * GeneratePersonalizedComplimentOutput - The return type for the generatePersonalizedCompliment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedComplimentInputSchema = z.object({
  imageUri: z
    .string()
    .describe(
      'A photo of your girlfriend, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type GeneratePersonalizedComplimentInput = z.infer<
  typeof GeneratePersonalizedComplimentInputSchema
>;

const GeneratePersonalizedComplimentOutputSchema = z.object({
  compliment: z
    .string()
    .describe('A personalized compliment based on the uploaded image.'),
});
export type GeneratePersonalizedComplimentOutput = z.infer<
  typeof GeneratePersonalizedComplimentOutputSchema
>;

export async function generatePersonalizedCompliment(
  input: GeneratePersonalizedComplimentInput
): Promise<GeneratePersonalizedComplimentOutput> {
  return generatePersonalizedComplimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedComplimentPrompt',
  input: {schema: GeneratePersonalizedComplimentInputSchema},
  output: {schema: GeneratePersonalizedComplimentOutputSchema},
  prompt: `You are a thoughtful and romantic AI assistant, skilled at creating heartfelt birthday messages.

  Based on the provided image of the user's girlfriend, generate a single, personalized compliment that highlights her best features.

  Image: {{media url=imageUri}}
  `,
});

const generatePersonalizedComplimentFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedComplimentFlow',
    inputSchema: GeneratePersonalizedComplimentInputSchema,
    outputSchema: GeneratePersonalizedComplimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
