'use server';

/**
 * @fileOverview A flow for suggesting relevant offers, news, or how-to guides
 * based on the product category a user is browsing.
 *
 * - suggestOffers - A function that handles the offer suggestion process.
 * - SuggestOffersInput - The input type for the suggestOffers function.
 * - SuggestOffersOutput - The return type for the suggestOffers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOffersInputSchema = z.object({
  productCategory: z.string().describe('The category of the product being viewed.'),
  recentUserActivity: z
    .string()
    .describe(
      'A summary of the users recent activity and purchase history on the site.'
    ),
  language: z.enum(['en', 'bn']).describe('The language for the suggestions.'),
});


const SuggestOffersOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      type: z.enum(['offer', 'news', 'how-to']).describe('The type of suggestion.'),
      title: z.string().describe('The title of the suggestion.'),
      description: z.string().describe('A brief description of the suggestion.'),
      link: z.string().describe('A functional URL for the suggestion. For offers, link to a relevant product or category page like `/products?category=...` or `/products?sort=top-deals`.'),
    })
  ).describe('A list of relevant suggestions.'),
});


export async function suggestOffers(input) {
  return suggestOffersFlow(input);
}

const suggestOffersPrompt = ai.definePrompt({
  name: 'suggestOffersPrompt',
  input: {schema: SuggestOffersInputSchema},
  output: {schema: SuggestOffersOutputSchema},
  prompt: `You are an expert e-commerce assistant, skilled at suggesting relevant offers and information to users based on their current browsing context and past activity.

  The user is currently viewing products in the '{{productCategory}}' category.
  The suggestions should be in the '{{language}}' language.

  Here is a summary of the user's recent activity:
  {{recentUserActivity}}

  Based on this information, suggest three relevant and helpful resources for the user. These resources can be:
  - Offers: Special deals or discounts on products in the category. The link should point to a relevant page, e.g., '/products?sort=top-deals' or '/products?category={{productCategory}}'.
  - News: Recent news or announcements related to the category or products in it. The link can point to a category page or a new arrivals page, e.g., '/products?sort=newest'.
  - How-to Guides: Helpful guides or tutorials on using products in the category. The link can be a placeholder like '/blog/how-to-use-product'.

  Ensure that the suggestions are diverse and provide real value to the user.
  Generate creative, engaging, and professional titles and descriptions.
  Format the output as a JSON array of suggestions, including the type, title, description, and a functional link for each suggestion.
  `,
});

const suggestOffersFlow = ai.defineFlow(
  {
    name: 'suggestOffersFlow',
    inputSchema: SuggestOffersInputSchema,
    outputSchema: SuggestOffersOutputSchema,
  },
  async input => {
    const {output} = await suggestOffersPrompt(input);
    return output;
  }
);
