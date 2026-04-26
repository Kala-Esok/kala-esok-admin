'use client';

import { useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { BlogPost } from '@/lib/dummy-data';
import toast from 'react-hot-toast';

interface BlogModalProps {
  open: boolean;
  onClose: () => void;
  post?: BlogPost | null;
  onSave?: (data: Partial<BlogPost>) => void;
}

const CATEGORIES = ['Panduan', 'Kitab', 'Artikel', 'Berita'];
const STATUSES = ['Draft', 'Published'] as const;

export function BlogModal({ open, onClose, post, onSave }: BlogModalProps) {
  const isEdit = !!post;
  const [form, setForm] = useState({
    title: post?.title ?? '',
    category: post?.category ?? 'Panduan',
    status: (post?.status === 'Archived' ? 'Draft' : post?.status) ?? 'Draft',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error('Judul artikel wajib diisi');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success(isEdit ? 'Artikel berhasil diperbarui' : 'Artikel berhasil dibuat');
    onSave?.(form);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Artikel' : 'Tulis Artikel Baru'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Masukkan judul artikel..."
            className="form-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Kategori</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="form-input"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as 'Draft' | 'Published' })
              }
              className="form-input"
            >
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="form-label">Konten</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Tulis konten artikel di sini..."
            rows={6}
            className="form-input resize-none"
          />
        </div>

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
            {loading ? 'Menyimpan...' : isEdit ? 'Simpan' : 'Publikasikan'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
