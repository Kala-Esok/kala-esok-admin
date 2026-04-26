'use client';

import { useState } from 'react';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { dummyBlogPosts, BlogPost, BlogStatus } from '@/lib/dummy-data';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import toast from 'react-hot-toast';

const statusVariant: Record<BlogStatus, 'success' | 'warning' | 'default'> = {
  Published: 'success',
  Draft: 'warning',
  Archived: 'default',
};

export default function CmsBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(dummyBlogPosts);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  // Editor State
  const [editorData, setEditorData] = useState({
    title: '',
    category: 'Islam',
    coverUrl: '',
    content: '',
  });

  const handleDelete = () => {
    if (!deleteTarget) return;
    setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success(`Artikel "${deleteTarget.title}" berhasil dihapus`);
    setDeleteTarget(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditorData({
      title: post.title,
      category: post.category,
      coverUrl: '', // Dummy since not in data
      content: '', // Dummy since not in data
    });
    // Scroll to editor
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handlePublish = (status: BlogStatus = 'Published') => {
    if (!editorData.title || !editorData.content) {
      toast.error('Judul dan isi artikel wajib diisi');
      return;
    }

    const newPost: BlogPost = {
      id: String(Date.now()),
      title: editorData.title,
      author: 'Admin',
      category: editorData.category,
      status: status,
      publishedAt:
        status === 'Published'
          ? new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : '-',
      views: 0,
    };

    setPosts((prev) => [newPost, ...prev]);
    toast.success(
      status === 'Published' ? 'Artikel berhasil dipublikasikan' : 'Draft berhasil disimpan'
    );
    setEditorData({ title: '', category: 'Islam', coverUrl: '', content: '' });
  };

  const columns: Column<BlogPost>[] = [
    {
      key: 'title',
      header: 'Judul',
      render: (row) => <p className="font-medium text-brand-text">{row.title}</p>,
    },
    {
      key: 'category',
      header: 'Kategori',
      render: (row) => (
        <StatusBadge
          label={row.category}
          variant={
            row.category === 'Islam' ? 'info' : row.category === 'Kristen' ? 'default' : 'warning'
          }
          className="min-w-[80px] text-center"
        />
      ),
    },
    { key: 'publishedAt', header: 'Tanggal' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge label={row.status} variant={statusVariant[row.status]} />,
    },
    {
      key: 'views',
      header: 'Views',
      render: (row) => <span className="text-brand-muted">{row.views.toLocaleString()}</span>,
    },
    {
      key: 'action',
      header: 'Aksi',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 rounded-lg text-brand-muted hover:text-brand-primary hover:bg-orange-50 transition-all">
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-primary hover:bg-orange-50 transition-all"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-danger hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-brand-text">Content Management System</h1>
        <p className="text-sm text-brand-muted mt-1">Kelola konten blog</p>
      </div>

      <div className="bg-card rounded-2xl border border-brand-border shadow-sm p-6">
        <DataTable
          columns={columns}
          data={posts}
          keyExtractor={(row) => row.id}
          emptyMessage="Tidak ada artikel"
        />
      </div>

      {/* Editor Section */}
      <div className="bg-card rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-border bg-brand-surface/30">
          <h2 className="text-lg font-bold text-brand-text">Editor Artikel</h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="form-label">Judul Artikel</label>
            <input
              type="text"
              placeholder="Masukan judul artikel..."
              className="form-input"
              value={editorData.title}
              onChange={(e) => setEditorData({ ...editorData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Kategori Agama</label>
              <select
                className="form-input"
                value={editorData.category}
                onChange={(e) => setEditorData({ ...editorData, category: e.target.value })}
              >
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Hindu">Hindu</option>
                <option value="Budha">Budha</option>
                <option value="Umum">Umum</option>
              </select>
            </div>
            <div>
              <label className="form-label">Gambar Cover URL</label>
              <input
                type="text"
                placeholder="https://..."
                className="form-input"
                value={editorData.coverUrl}
                onChange={(e) => setEditorData({ ...editorData, coverUrl: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Isi Artikel</label>
            <textarea
              placeholder="Masukan konten artikel..."
              rows={6}
              className="form-input min-h-[200px] resize-none"
              value={editorData.content}
              onChange={(e) => setEditorData({ ...editorData, content: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => handlePublish('Published')}
              className="px-8 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary-hover shadow-md shadow-brand-primary/20 transition-all active:scale-95"
            >
              Publish
            </button>
            <button
              onClick={() => handlePublish('Draft')}
              className="px-8 py-3 bg-brand-surface border border-brand-border text-brand-text font-bold rounded-xl hover:bg-gray-100 transition-all active:scale-95"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Artikel"
        description={`Apakah kamu yakin ingin menghapus artikel "${deleteTarget?.title}"?`}
        confirmLabel="Ya, Hapus"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
