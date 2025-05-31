// src/ai/flows/improve-contact-form-prompt.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow to improve the clarity and effectiveness of user contact form submissions using AI.
 *
 * - improveContactFormPrompt - A function that takes a contact form submission and returns an improved version.
 * - ImproveContactFormPromptInput - The input type for the improveContactFormPrompt function.
 * - ImproveContactFormPromptOutput - The output type for the improveContactFormPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveContactFormPromptInputSchema = z.object({
  submissionText: z
    .string()
    .describe('The original text from the user\u2019s contact form submission.'),
});

export type ImproveContactFormPromptInput = z.infer<
  typeof ImproveContactFormPromptInputSchema
>;

const ImproveContactFormPromptOutputSchema = z.object({
  improvedText: z
    .string()
    .describe('The improved and clarified text for better understanding of user needs.'),
});

export type ImproveContactFormPromptOutput = z.infer<
  typeof ImproveContactFormPromptOutputSchema
>;

export async function improveContactFormPrompt(
  input: ImproveContactFormPromptInput
): Promise<ImproveContactFormPromptOutput> {
  return improveContactFormPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveContactFormPrompt',
  input: {schema: ImproveContactFormPromptInputSchema},
  output: {schema: ImproveContactFormPromptOutputSchema},
  prompt: `You are an AI expert in refining user input for clarity and effectiveness.

  Please analyze the following contact form submission and improve its clarity while preserving the original intent.

  Original Submission: {{{submissionText}}}
  \nImproved Submission:`, //Crucially adding the Improved Submission here to guide the model
});

const improveContactFormPromptFlow = ai.defineFlow(
  {
    name: 'improveContactFormPromptFlow',
    inputSchema: ImproveContactFormPromptInputSchema,
    outputSchema: ImproveContactFormPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
