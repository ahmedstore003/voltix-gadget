import { ProductPageSkeleton } from '@/components/product/ProductPageSkeleton';

export default function ProductLoading() {
  return (
    <main className="flex-grow voltix-page-exit">
      <ProductPageSkeleton />
    </main>
  );
}
