'use server';
/**
 * @fileOverview An AI agent that answers follow-up questions based on a previous context.
 *
 * - followUpOnExplanation - A function that handles follow-up questions.
 * - FollowUpOnExplanationInput - The input type for the followUpOnExplanation function.
 * - FollowUpOnExplanationOutput - The return type for the followUpOnExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const FollowUpOnExplanationInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The conversation history.'),
  question: z.string().describe('The follow-up question from the user.'),
});
export type FollowUpOnExplanationInput = z.infer<typeof FollowUpOnExplanationInputSchema>;

export const FollowUpOnExplanationOutputSchema = z.object({
  answer: z.string().describe('The answer to the follow-up question.'),
});
export type FollowUpOnExplanationOutput = z.infer<typeof FollowUpOnExplanationOutputSchema>;

export async function followUpOnExplanation(input: FollowUpOnExplanationInput): Promise<FollowUpOnExplanationOutput> {
  return followUpOnExplanationFlow(input);
}

const followUpOnExplanationFlow = ai.defineFlow(
  {
    name: 'followUpOnExplanationFlow',
    inputSchema: FollowUpOnExplanationInputSchema,
    outputSchema: FollowUpOnExplanationOutputSchema,
  },
  async ({ history, question }) => {

    const prompt = `You are a helpful AI assistant. The user asked a question and you provided a response. Now, they have a follow-up question.
    
Here is the conversation history:
{{#each history}}
{{#if (eq role 'user')}}User: {{content}}{{/if}}
{{#if (eq role 'model')}}AI: {{content}}{{/if}}
{{/each}}

New follow-up question from user: ${question}

Your task is to answer the follow-up question based on the context of the conversation. Be concise and helpful.`;
    
    const { output } = await ai.generate({
      prompt,
      history: history.map(h => ({ role: h.role, content: [{ text: h.content }]})),
      output: {
        schema: FollowUpOnExplanationOutputSchema,
      }
    });

    return output!;
  }
);
