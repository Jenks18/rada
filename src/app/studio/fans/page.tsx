import { FanList } from '@/components/crm/FanList';

export default function FansPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fan Management</h1>
      <FanList />
    </div>
  );
}
