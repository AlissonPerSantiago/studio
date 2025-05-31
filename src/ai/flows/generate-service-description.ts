'use server';

/**
 * @fileOverview AI agent that generates descriptions for automation services.
 *
 * - generateServiceDescription - A function that generates service descriptions.
 * - GenerateServiceDescriptionInput - The input type for the generateServiceDescription function.
 * - GenerateServiceDescriptionOutput - The return type for the generateServiceDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateServiceDescriptionInputSchema = z.object({
  serviceName: z.string().describe('The name of the automation service.'),
  keywords: z
    .string()
    .describe(
      'A comma-separated list of keywords related to the automation service.'
    ),
  targetAudience: z
    .string()
    .describe('The target audience for the automation service.'),
});
export type GenerateServiceDescriptionInput = z.infer<
  typeof GenerateServiceDescriptionInputSchema
>;

const GenerateServiceDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A detailed description of the automation service.'),
});
export type GenerateServiceDescriptionOutput = z.infer<
  typeof GenerateServiceDescriptionOutputSchema
>;

export async function generateServiceDescription(
  input: GenerateServiceDescriptionInput
): Promise<GenerateServiceDescriptionOutput> {
  return generateServiceDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateServiceDescriptionPrompt',
  input: {schema: GenerateServiceDescriptionInputSchema},
  output: {schema: GenerateServiceDescriptionOutputSchema},
  prompt: `You are an expert in crafting compelling service descriptions for industrial automation companies.

  Based on the service name, associated keywords, and target audience, generate a detailed and engaging description of the service.

  Service Name: {{{serviceName}}}
  Keywords: {{{keywords}}}
  Target Audience: {{{targetAudience}}}

  Description:`, // Changed from triple curly braces to double curly braces.
});

const generateServiceDescriptionFlow = ai.defineFlow(
  {
    name: 'generateServiceDescriptionFlow',
    inputSchema: GenerateServiceDescriptionInputSchema,
    outputSchema: GenerateServiceDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
