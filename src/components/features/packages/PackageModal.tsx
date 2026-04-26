'use client';

import { useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { Package } from '@/lib/dummy-data';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface PackageModalProps {
  open: boolean;
  onClose: () => void;
  pkg?: Package | null;
  onSave?: (data: Partial<Package>) => void;
}

export function PackageModal({ open, onClose, pkg, onSave }: PackageModalProps) {
  const isEdit = !!pkg;
  const [form, setForm] = useState({
    name: pkg?.name ?? '',
    price: pkg?.price?.toString() ?? '',
    description: pkg?.description ?? '',
    benefits: pkg?.benefits ?? [''],
    highlight: pkg?.highlight ?? false,
  });
  const [loading, setLoading] = useState(false);

  const handleBenefit = (i: number, value: string) => {
    const updated = [...form.benefits];
    updated[i] = value;
    setForm((prev) => ({ ...prev, benefits: updated }));
  };

  const addBenefit = () => setForm((prev) => ({ ...prev, benefits: [...prev.benefits, ''] }));

  const removeBenefit = (i: number) =>
    setForm((prev) => ({ ...prev, benefits: prev.benefits.filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error('Nama dan harga wajib diisi');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success(isEdit ? 'Paket berhasil diperbarui' : 'Paket baru berhasil ditambahkan');
    onSave?.({ ...form, price: Number(form.price) });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Paket' : 'Tambah Paket'}
      description="Atur detail layanan dan harga paket"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">
              Nama Paket <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Paket Dasar"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">
              Harga (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="5000000"
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label className="form-label">Deskripsi</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Jelaskan paket ini secara singkat..."
            rows={2}
            className="form-input resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="form-label mb-0">Benefit</label>
            <button
              type="button"
              onClick={addBenefit}
              className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline"
            >
              <Plus className="w-3 h-3" /> Tambah
            </button>
          </div>
          <div className="space-y-2">
            {form.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={b}
                  onChange={(e) => handleBenefit(i, e.target.value)}
                  placeholder={`Benefit ${i + 1}`}
                  className="form-input flex-1"
                />
                {form.benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBenefit(i)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={form.highlight}
            onChange={(e) => setForm({ ...form, highlight: e.target.checked })}
            className="w-4 h-4 accent-brand-primary"
          />
          <span className="text-sm text-brand-text group-hover:text-brand-primary transition-colors">
            Tandai sebagai paket unggulan (Populer)
          </span>
        </label>

        <div className="flex gap-3 pt-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-brand-muted border border-brand-border rounded-xl hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-primary rounded-xl hover:bg-brand-primary-hover disabled:opacity-60 transition-all active:scale-95"
          >
            {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Paket'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
