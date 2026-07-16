/** IDs locaux historiques ↔ IDs Supabase (VOLTIX). */
export const CATEGORY_ID_EQUIVALENTS: Record<string, string[]> = {
  '77a6f958-3d12-40f4-b258-450f38b1f8fb': [
    '77a6f958-3d12-40f4-b258-450f38b1f8fb',
    '9a9a923a-b213-43f2-8ade-7c52b82724d1',
  ],
  '9a9a923a-b213-43f2-8ade-7c52b82724d1': [
    '77a6f958-3d12-40f4-b258-450f38b1f8fb',
    '9a9a923a-b213-43f2-8ade-7c52b82724d1',
  ],
  '11d6f958-3d12-40f4-b258-450f38b1f8fe': [
    '11d6f958-3d12-40f4-b258-450f38b1f8fe',
    'ce56d601-e170-4480-ae57-e46912727aab',
  ],
  'ce56d601-e170-4480-ae57-e46912727aab': [
    '11d6f958-3d12-40f4-b258-450f38b1f8fe',
    'ce56d601-e170-4480-ae57-e46912727aab',
  ],
  '55b6f958-3d12-40f4-b258-450f38b1f8fc': [
    '55b6f958-3d12-40f4-b258-450f38b1f8fc',
    'f3e020d6-6ca0-448c-b4b3-358f64876974',
  ],
  'f3e020d6-6ca0-448c-b4b3-358f64876974': [
    '55b6f958-3d12-40f4-b258-450f38b1f8fc',
    'f3e020d6-6ca0-448c-b4b3-358f64876974',
  ],
};

/** Slugs affichés dans l'app → slugs possibles en base. */
export const CATEGORY_SLUG_ALIASES: Record<string, string[]> = {
  cuisine: ['cuisine', 'kitchen'],
  kitchen: ['cuisine', 'kitchen'],
  cosmetique: ['cosmetique', 'cosmetics'],
  cosmetics: ['cosmetique', 'cosmetics'],
  gadgets: ['gadgets'],
};

export function getEquivalentCategoryIds(categoryId: string): string[] {
  return CATEGORY_ID_EQUIVALENTS[categoryId] ?? [categoryId];
}

export function getCategorySlugCandidates(slug: string): string[] {
  return CATEGORY_SLUG_ALIASES[slug] ?? [slug];
}
