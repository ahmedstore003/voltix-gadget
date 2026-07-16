import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product/ProductDetail';
import { getProductBySlug, LOCAL_CATEGORIES } from '@/lib/products-cached';

export const revalidate = 300;
export const dynamicParams = true;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Voltix' };
  return {
    title: `${product.title_fr} | Voltix`,
    description: product.description_fr,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const category = product.category_id
    ? LOCAL_CATEGORIES.find((c) => c.id === product.category_id) ?? null
    : null;

  return (
    <main className="flex-grow bg-background">
      <ProductDetail
        product={product}
        categoryNameFr={category?.name_fr ?? 'Voltix'}
        categoryNameAr={category?.name_ar ?? 'فولتكس'}
        categorySlug={category?.slug}
      />
    </main>
  );
}

export async function generateStaticParams() {
  const { getAllProductSlugs } = await import('@/lib/products');
  return getAllProductSlugs();
}
