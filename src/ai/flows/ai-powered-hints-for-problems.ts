'use server';
/**
 * @fileOverview An AI agent that provides hints for math problems or code errors from an image.
 *
 * - aiPoweredHintsForProblems - A function that handles the hint generation process.
 * - AiPoweredHintsForProblemsInput - The input type for the aiPoweredHintsForProblems function.
 * - AiPoweredHintsForProblemsOutput - The return type for the aiPoweredHintsForProblems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredHintsForProblemsInputSchema = z.object({
  problemImage: z
    .string()
    .describe(
      "A photo of a math problem or code error, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  question: z.string().optional().describe('An optional question about the problem in the image.'),
});
export type AiPoweredHintsForProblemsInput = z.infer<typeof AiPoweredHintsForProblemsInputSchema>;

const AiPoweredHintsForProblemsOutputSchema = z.object({
  hints: z.string().describe('Hints to help solve the math problem or code error.'),
});
export type AiPoweredHintsForProblemsOutput = z.infer<typeof AiPoweredHintsForProblemsOutputSchema>;

export async function aiPoweredHintsForProblems(input: AiPoweredHintsForProblemsInput): Promise<AiPoweredHintsForProblemsOutput> {
  return aiPoweredHintsForProblemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredHintsForProblemsPrompt',
  input: {schema: AiPoweredHintsForProblemsInputSchema},
  output: {schema: AiPoweredHintsForProblemsOutputSchema},
  prompt: `You are an AI assistant that provides hints for math problems or code errors.

  Please analyze the image of the problem or error and provide helpful hints to guide the student towards a solution.

  {{#if question}}The user has a specific question: {{{question}}}{{/if}}

  Image: {{media url=problemImage}}
  `,
});

const aiPoweredHintsForProblemsFlow = ai.defineFlow(
  {
    name: 'aiPoweredHintsForProblemsFlow',
    inputSchema: AiPoweredHintsForProblemsInputSchema,
    outputSchema: AiPoweredHintsForProblemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
