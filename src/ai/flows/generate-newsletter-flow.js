'use server';
/**
 * @fileOverview A flow for generating a marketing newsletter based on top deals.
 *
 * - generateNewsletter - A function that handles the newsletter generation.
 * - GenerateNewsletterInput - The input type for the function.
 * - GenerateNewsletterOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DealSchema = z.object({
    name: z.string(),
    price: z.number(),
    originalPrice: z.number(),
});

const GenerateNewsletterInputSchema = z.object({
  topDeals: z.array(DealSchema).describe('A list of top deals to feature in the newsletter.'),
});


const GenerateNewsletterOutputSchema = z.object({
  subject: z.string().describe('A catchy and engaging subject line for the email newsletter.'),
  body: z.string().describe('The full body of the newsletter in plain text. It should be friendly, professional, highlight the deals, and include a call to action.'),
});


export async function generateNewsletter(input) {
  return generateNewsletterFlow(input);
}

const generateNewsletterPrompt = ai.definePrompt({
  name: 'generateNewsletterPrompt',
  model: 'googleai/gemini-2.5-flash-preview',
  input: {schema: GenerateNewsletterInputSchema},
  output: {schema: GenerateNewsletterOutputSchema},
  prompt: `You are an expert e-commerce marketing assistant for a store named "Ponno Kenakata". Your task is to write a compelling newsletter to subscribers.

  The goal is to highlight the current top deals to drive sales.

  Here are the deals to feature:
  {{#each topDeals}}
  - Product: {{name}}, New Price: ৳{{price}}, Old Price: ৳{{originalPrice}}
  {{/each}}

  Please generate a newsletter with the following structure:
  1.  A short, catchy, and professional email subject.
  2.  A friendly and engaging email body.
  3.  Clearly list the deals provided.
  4.  Include a strong call to action, encouraging users to visit the website.
  5.  Maintain the brand voice of "Ponno Kenakata" - which is trustworthy and customer-focused.
  `,
});

const generateNewsletterFlow = ai.defineFlow(
  {
    name: 'generateNewsletterFlow',
    inputSchema: GenerateNewsletterInputSchema,
    outputSchema: GenerateNewsletterOutputSchema,
  },
  async input => {
    const {output} = await generateNewsletterPrompt(input);
    return output;
  }
);
