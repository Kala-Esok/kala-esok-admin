'use client';

import { useEffect, useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { Cemetery } from '@/lib/dummy-data';
import toast from 'react-hot-toast';

interface CemeteryModalProps {
  open: boolean;
  onClose: () => void;
  cemetery?: Cemetery | null;
  onSave?: (data: Partial<Cemetery>) => void;
}

export function CemeteryModal({ open, onClose, cemetery, onSave }: CemeteryModalProps) {
  const isEdit = !!cemetery;
  const [form, setForm] = useState({
    name: '',
    location: '',
    type: 'Public' as 'Public' | 'Private',
    capacity: '',
    occupied: '',
    status: 'Aktif' as 'Aktif' | 'Penuh',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: cemetery?.name ?? '',
        location: cemetery?.location ?? '',
        type: (cemetery?.type as 'Public' | 'Private') ?? 'Public',
        capacity: cemetery?.capacity?.toString() ?? '',
        occupied: cemetery?.occupied?.toString() ?? '',
        status: (cemetery?.status as 'Aktif' | 'Penuh') ?? 'Aktif',
        lat: cemetery?.lat?.toString() ?? '',
        lng: cemetery?.lng?.toString() ?? '',
      });
    }
  }, [open, cemetery]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.capacity) {
      toast.error('Nama, lokasi, dan kapasitas wajib diisi');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    onSave?.({
      ...form,
      capacity: Number(form.capacity),
      occupied: Number(form.occupied || 0),
      lat: Number(form.lat || 0),
      lng: Number(form.lng || 0),
    } as Partial<Cemetery>);

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Data Pemakaman' : 'Tambah Lokasi Pemakaman'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label">
            Nama Pemakaman <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Contoh: TPU Karet Bivak"
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">
            Lokasi / Alamat <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Jakarta Pusat"
            className="form-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Tipe</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as 'Public' | 'Private' })}
              className="form-input"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div>
            <label className="form-label">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as 'Aktif' | 'Penuh' })}
              className="form-input"
            >
              <option value="Aktif">Aktif</option>
              <option value="Penuh">Penuh</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Latitude</label>
            <input
              type="text"
              value={form.lat}
              onChange={(e) => setForm({ ...form, lat: e.target.value })}
              placeholder="-6.1234"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Longitude</label>
            <input
              type="text"
              value={form.lng}
              onChange={(e) => setForm({ ...form, lng: e.target.value })}
              placeholder="106.1234"
              className="form-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">
              Total Kapasitas <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              placeholder="1000"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Terisi</label>
            <input
              type="number"
              value={form.occupied}
              onChange={(e) => setForm({ ...form, occupied: e.target.value })}
              placeholder="0"
              className="form-input"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-brand-muted border border-brand-border rounded-xl hover:bg-brand-surface transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-primary rounded-xl hover:bg-brand-primary-hover disabled:opacity-60 transition-all active:scale-95"
          >
            {loading ? 'Menyimpan...' : isEdit ? 'Simpan' : 'Tambah'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
