import { Product } from '@/context/CartContext';

export type CategorySortOption = 'newest' | 'price_asc' | 'price_desc';

export function sortCategoryProducts(
  products: Product[],
  sort: CategorySortOption
): Product[] {
  const list = [...products];

  switch (sort) {
    case 'price_asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return list.sort((a, b) => b.price - a.price);
    case 'newest':
    default:
      return list.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (a.is_trending !== b.is_trending) {
          return Number(b.is_trending) - Number(a.is_trending);
        }
        return a.title_fr.localeCompare(b.title_fr);
      });
  }
}
