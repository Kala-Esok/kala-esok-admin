'use client';

import { useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { User } from '@/lib/dummy-data';
import toast from 'react-hot-toast';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user?: User | null; // null = add mode, User = edit mode
  onSave?: (data: Partial<User>) => void;
}

const PACKAGE_OPTIONS = ['Dasar', 'Premium', 'Eksklusif'] as const;

export function UserModal({ open, onClose, user, onSave }: UserModalProps) {
  const isEdit = !!user;
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    birthDate: user?.birthDate ?? '',
    packageStatus: user?.packageStatus ?? 'Dasar',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Nama dan email wajib diisi');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success(isEdit ? 'Data user berhasil diperbarui' : 'User baru berhasil ditambahkan');
    onSave?.(form);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit User' : 'Tambah User'}
      description={isEdit ? `Perbarui data untuk ${user?.name}` : 'Isi data pengguna baru'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nama Lengkap" required>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Contoh: Budi Santoso"
            className="form-input"
          />
        </Field>

        <Field label="Email" required>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="budi@email.com"
            className="form-input"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="No. HP">
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+62 812 xxx xxx"
              className="form-input"
            />
          </Field>
          <Field label="Tanggal Lahir">
            <input
              type="text"
              value={form.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              placeholder="15 Maret 1985"
              className="form-input"
            />
          </Field>
        </div>

        <Field label="Paket Layanan">
          <select
            value={form.packageStatus}
            onChange={(e) => handleChange('packageStatus', e.target.value)}
            className="form-input"
          >
            {PACKAGE_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>

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
            {loading ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah User'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-text mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
