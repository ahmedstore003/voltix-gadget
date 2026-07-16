import { CategoryPageSkeleton } from '@/components/category/CategoryPageSkeleton';

export default function CategoryLoading() {
  return (
    <main className="flex-grow border-t border-border voltix-page-exit">
      <CategoryPageSkeleton />
    </main>
  );
}
