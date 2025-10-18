'use server';
/**
 * @fileOverview A flow for generating a blog post from a topic and keywords.
 *
 * - generateBlogPost - A function that handles the blog post generation.
 * - GenerateBlogPostInput - The input type for the function.
 * - GenerateBlogPostOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogPostInputSchema = z.object({
    topic: z.string().describe('The main topic or title of the blog post.'),
    keywords: z.array(z.string()).describe('A list of keywords to include in the blog post for SEO purposes.'),
});


const GenerateBlogPostOutputSchema = z.object({
  title: z.string().describe('A catchy and SEO-friendly title for the blog post.'),
  content: z.string().describe('The full content of the blog post in Markdown format. It should be well-structured, engaging, and informative.'),
  metaDescription: z.string().describe('A short (150-160 characters) meta description for SEO purposes.'),
});


export async function generateBlogPost(input) {
  return generateBlogPostFlow(input);
}

const generateBlogPostPrompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  model: 'googleai/gemini-2.5-flash-preview',
  input: {schema: GenerateBlogPostInputSchema},
  output: {schema: GenerateBlogPostOutputSchema},
  prompt: `You are an expert content writer and SEO specialist for an e-commerce store in Bangladesh called "Ponno Kenakata".

Your task is to write a compelling, informative, and engaging blog post based on the provided topic and keywords.

Topic: "{{topic}}"
Keywords: {{#each keywords}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}

Please generate a blog post with the following structure:
1.  **Title**: Create a catchy, relevant, and SEO-friendly title based on the topic.
2.  **Content**: Write the full blog post in well-structured Markdown. It should be at least 500 words. Use headings, lists, and bold text to make it readable. Incorporate the provided keywords naturally. The tone should be helpful, friendly, and authoritative.
3.  **Meta Description**: Write a concise (150-160 characters) meta description that summarizes the blog post and includes the primary keyword.
`,
});

const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async input => {
    // Override the title in the output with the one from the input for consistency
    const {output} = await generateBlogPostPrompt(input);
    return {
        ...output,
        title: input.topic,
    };
  }
);
