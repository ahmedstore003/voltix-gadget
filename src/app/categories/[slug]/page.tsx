import { CategoryPageContent } from '@/components/category/CategoryPageContent';
import { CategoryNotFound } from '@/components/category/CategoryNotFound';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/products-cached';

export const revalidate = 300;
export const dynamicParams = true;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Voltix' };
  }

  return {
    title: `${category.name_fr} | Voltix`,
    description: `Découvrez notre sélection ${category.name_fr.toLowerCase()} — livraison COD au Maroc.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return (
      <main className="flex-grow border-t border-border">
        <CategoryNotFound />
      </main>
    );
  }

  const products = await getProductsByCategory(category.id);

  return (
    <main className="flex-grow border-t border-border">
      <CategoryPageContent
        nameFr={category.name_fr}
        nameAr={category.name_ar}
        products={products}
      />
    </main>
  );
}

export async function generateStaticParams() {
  const { getAllCategorySlugs } = await import('@/lib/products');
  return getAllCategorySlugs();
}
