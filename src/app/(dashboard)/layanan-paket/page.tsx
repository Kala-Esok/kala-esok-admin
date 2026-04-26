'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { dummyPackages, Package } from '@/lib/dummy-data';
import { CheckCircle2, Pencil, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PackageModal } from '@/components/features/packages/PackageModal';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import toast from 'react-hot-toast';

function formatRupiah(num: number) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

export default function LayananPaketPage() {
  const [packages, setPackages] = useState<Package[]>(dummyPackages);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPackage, setEditPackage] = useState<Package | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Package | null>(null);

  const handleDelete = () => {
    if (!deleteTarget) return;
    setPackages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success(`Paket "${deleteTarget.name}" berhasil dihapus`);
    setDeleteTarget(null);
  };

  const handleEdit = (pkg: Package) => {
    setEditPackage(pkg);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditPackage(null);
    setModalOpen(true);
  };

  const handleSave = (data: Partial<Package>) => {
    if (editPackage) {
      setPackages((prev) => prev.map((p) => (p.id === editPackage.id ? { ...p, ...data } : p)));
    } else {
      const newPackage: Package = {
        id: String(Date.now()),
        name: data.name ?? '',
        price: data.price ?? 0,
        description: data.description ?? '',
        benefits: data.benefits ?? [],
        highlight: data.highlight ?? false,
      };
      setPackages((prev) => [...prev, newPackage]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader
        title="Layanan & Paket Service"
        subtitle="Kelola paket layanan yang tersedia"
        action={
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-xl hover:bg-brand-primary-hover active:scale-95 transition-all duration-200 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Tambah Paket
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onEdit={() => handleEdit(pkg)}
            onDelete={() => setDeleteTarget(pkg)}
          />
        ))}
      </div>

      <PackageModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditPackage(null);
        }}
        pkg={editPackage}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Paket"
        description={`Apakah kamu yakin ingin menghapus paket "${deleteTarget?.name}"?`}
        confirmLabel="Ya, Hapus"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

function PackageCard({
  pkg,
  onEdit,
  onDelete,
}: {
  pkg: Package;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={cn(
        'rounded-3xl p-8 border transition-all duration-300 hover:shadow-2xl relative overflow-hidden group',
        pkg.highlight
          ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary/20 shadow-lg shadow-brand-primary/5'
          : 'border-brand-border bg-card hover:border-brand-primary/30 shadow-sm'
      )}
    >
      {pkg.highlight && (
        <div className="absolute top-0 right-0">
          <div className="bg-brand-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">
            POPULER
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-brand-text mb-1">{pkg.name}</h3>
          <p className="text-[10px] font-bold text-brand-muted uppercase tracking-tighter">
            Paket Layanan
          </p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-2 rounded-xl text-brand-muted hover:text-brand-primary hover:bg-brand-surface dark:hover:bg-brand-sidebar/60 transition-all"
            title="Edit Paket"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-xl text-brand-muted hover:text-brand-danger hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            title="Hapus Paket"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-3xl font-black text-brand-primary">{formatRupiah(pkg.price)}</p>
        <p className="text-xs text-brand-muted mt-2 leading-relaxed">{pkg.description}</p>
      </div>

      <div className="border-t border-brand-border pt-6 mt-2">
        <p className="text-xs font-bold text-brand-text uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-4 h-px bg-brand-primary"></span>
          Benefit Paket
        </p>
        <ul className="space-y-3">
          {pkg.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-brand-muted group/item">
              <div className="p-0.5 rounded-full bg-brand-success/10 text-brand-success mt-0.5 flex-shrink-0 group-hover/item:bg-brand-success group-hover/item:text-white transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="group-hover/item:text-brand-text transition-colors">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-all" />
    </div>
  );
}
