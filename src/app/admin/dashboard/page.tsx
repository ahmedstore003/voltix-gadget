import { AdminDashboardShell } from '@/components/admin/AdminDashboardShell';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard Admin | AtlasTrends',
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return <AdminDashboardShell />;
}
