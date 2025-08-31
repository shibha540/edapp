
'use server';
/**
 * @fileOverview An AI agent that explains concepts.
 *
 * - explainConcept - A function that handles the concept explanation process.
 * - ExplainConceptInput - The input type for the explainConcept function.
 * - ExplainConceptOutput - The return type for the explainConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInputSchema = z.object({
  concept: z
    .string()
    .describe('The concept to be explained.'),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
    explanation: z.string().describe('A simple explanation of the concept.'),
    analogy: z.string().describe('A real-world analogy for the concept.'),
    keyTakeaways: z.array(z.string()).describe('A list of key takeaways about the concept.'),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;

export async function explainConcept(input: ExplainConceptInput): Promise<ExplainConceptOutput> {
  return conceptExplainerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conceptExplainerPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `You are an expert educator who can explain complex topics in a simple and engaging way.
  
  Explain the following concept: {{{concept}}}
  
  Provide a simple explanation, a real-world analogy, and a few key takeaways.`,
});

const conceptExplainerFlow = ai.defineFlow(
  {
    name: 'conceptExplainerFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
