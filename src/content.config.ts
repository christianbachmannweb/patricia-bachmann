import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/pages' }),
});

export const collections = { pages };
