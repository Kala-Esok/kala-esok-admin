'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { dummyCemeteries, Cemetery } from '@/lib/dummy-data';
import { Plus, Search, Loader2 } from 'lucide-react';

import { CemeteryModal } from '@/components/features/cemeteries/CemeteryModal';
import { CemeteryCard } from '@/components/features/cemeteries/CemeteryCard';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import toast from 'react-hot-toast';

// Load map dynamically to avoid SSR errors
const CemeteryMap = dynamic(() => import('@/components/features/cemeteries/CemeteryMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-brand-surface animate-pulse">
      <Loader2 className="w-8 h-8 text-brand-primary animate-spin mb-2" />
      <p className="text-sm text-brand-muted">Memuat Peta...</p>
    </div>
  ),
});

export default function DatabasePemakamanPage() {
  const [items, setItems] = useState<Cemetery[]>(dummyCemeteries);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Cemetery | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Cemetery | null>(null);
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    toast.success(`Data pemakaman "${deleteTarget.name}" berhasil dihapus`);
    setDeleteTarget(null);
  };

  const handleEdit = (item: Cemetery) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const handleSave = (data: Partial<Cemetery>) => {
    if (editItem) {
      setItems((prev) => prev.map((i) => (i.id === editItem.id ? { ...i, ...data } : i)));
      toast.success('Data pemakaman berhasil diperbarui');
    } else {
      const newItem: Cemetery = {
        id: String(Date.now()),
        name: data.name ?? '',
        location: data.location ?? '',
        capacity: data.capacity ?? 0,
        occupied: data.occupied ?? 0,
        type: (data.type as 'Public' | 'Private') ?? 'Public',
        status: (data.status as 'Aktif' | 'Penuh') ?? 'Aktif',
        distance: '0 Km',
        lat: -6.2,
        lng: 106.8,
      };
      setItems((prev) => [newItem, ...prev]);
      toast.success('Data pemakaman baru berhasil ditambahkan');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Database Lokasi Pemakaman</h1>
          <p className="text-sm text-brand-muted mt-1">Kelola data pemakaman dan lokasi</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white text-sm font-bold rounded-xl hover:bg-brand-primary-hover transition-all duration-200 shadow-md shadow-brand-primary/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Tambah Lokasi
        </button>
      </div>

      {/* Map Section */}
      <div className="relative w-full aspect-[21/9] bg-brand-surface border border-brand-border rounded-3xl overflow-hidden shadow-inner">
        <CemeteryMap items={filteredItems} />
      </div>

      {/* Search & Filter bar (Optional but good for UX) */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-muted" />
          <input
            type="text"
            placeholder="Cari nama pemakaman atau lokasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card border border-brand-border rounded-2xl text-sm focus:outline-none focus:border-brand-primary transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <CemeteryCard key={item.id} item={item} onEdit={handleEdit} onDelete={setDeleteTarget} />
        ))}
      </div>

      <CemeteryModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditItem(null);
        }}
        cemetery={editItem}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Data Pemakaman"
        description={`Apakah kamu yakin ingin menghapus data "${deleteTarget?.name}"?`}
        confirmLabel="Ya, Hapus"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
