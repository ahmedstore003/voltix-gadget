import { HomePage } from '@/components/home/HomePage';
import { getCatalogProducts } from '@/lib/products-cached';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function Home() {
  const products = await getCatalogProducts();

  return (
    <div className="min-h-full bg-background">
      <HomePage products={products} />
    </div>
  );
}
