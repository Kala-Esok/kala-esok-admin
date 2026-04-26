'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { dummyDocuments, Document, DocCategory, DocStatus } from '@/lib/dummy-data';
import { FileText, Eye, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/shared/EmptyState';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import toast from 'react-hot-toast';

const CATEGORIES: DocCategory[] = ['Identitas', 'Aset Keuangan', 'Legal', 'Properti', 'Lainnya'];

const statusVariant: Record<DocStatus, 'warning' | 'success' | 'danger'> = {
  Menunggu: 'warning',
  Disetujui: 'success',
  Ditolak: 'danger',
};

export default function VerifikasiDokumenPage() {
  const [activeTab, setActiveTab] = useState<'Semua' | DocCategory>('Semua');
  const [docs, setDocs] = useState<Document[]>(dummyDocuments);
  const [rejectTarget, setRejectTarget] = useState<Document | null>(null);

  const tabs = ['Semua' as const, ...CATEGORIES];
  const filtered = activeTab === 'Semua' ? docs : docs.filter((d) => d.category === activeTab);

  const handleApprove = (id: string) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, status: 'Disetujui' } : d)));
    toast.success('Dokumen berhasil disetujui');
  };

  const handleReject = () => {
    if (!rejectTarget) return;
    setDocs((prev) =>
      prev.map((d) => (d.id === rejectTarget.id ? { ...d, status: 'Ditolak' } : d))
    );
    toast.error('Dokumen telah ditolak');
    setRejectTarget(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader
        title="Verifikasi Dokumen"
        subtitle="Kelola dan verifikasi dokumen yang diunggah pengguna"
      />

      {/* Tabs */}
      <div className="bg-card rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="flex border-b border-brand-border overflow-x-auto scrollbar-hide bg-brand-surface/30 dark:bg-brand-sidebar/20">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-8 py-5 text-sm font-bold whitespace-nowrap transition-all duration-200 relative',
                activeTab === tab
                  ? 'text-brand-primary'
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface dark:hover:bg-brand-sidebar/40'
              )}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-t-full shadow-[0_-2px_8px_rgba(255,130,58,0.5)]" />
              )}
            </button>
          ))}
        </div>

        {/* Document Cards */}
        <div className="p-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  onApprove={() => handleApprove(doc.id)}
                  onReject={() => setRejectTarget(doc)}
                />
              ))}
            </div>
          ) : (
            <div className="py-12">
              <EmptyState description="Tidak ada dokumen di kategori ini" />
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!rejectTarget}
        title="Tolak Dokumen"
        description={`Apakah kamu yakin ingin menolak dokumen "${rejectTarget?.title}"?`}
        confirmLabel="Ya, Tolak"
        onConfirm={handleReject}
        onCancel={() => setRejectTarget(null)}
      />
    </div>
  );
}

function DocumentCard({
  doc,
  onApprove,
  onReject,
}: {
  doc: Document;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="bg-brand-surface/30 dark:bg-brand-sidebar/10 border border-brand-border rounded-2xl p-6 hover:shadow-xl hover:border-brand-primary/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-5">
        <div className="p-3 bg-brand-primary/10 rounded-xl group-hover:scale-110 transition-transform">
          <FileText className="w-6 h-6 text-brand-primary" />
        </div>
        <StatusBadge label={doc.status} variant={statusVariant[doc.status]} />
      </div>

      <h3 className="font-bold text-brand-text text-lg mb-1 group-hover:text-brand-primary transition-colors">
        {doc.title}
      </h3>
      <p className="text-xs text-brand-muted font-medium mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/40"></span>
        {doc.owner}
      </p>

      <div className="flex items-center gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-brand-border bg-card text-xs font-bold text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-all active:scale-95 shadow-sm">
          <Eye className="w-4 h-4" />
          Lihat
        </button>
        {doc.status === 'Menunggu' && (
          <div className="flex gap-2">
            <button
              onClick={onApprove}
              className="p-2.5 rounded-xl border border-brand-success/30 text-brand-success bg-brand-success/5 hover:bg-brand-success hover:text-white transition-all active:scale-90"
              title="Setujui"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={onReject}
              className="p-2.5 rounded-xl border border-brand-danger/30 text-brand-danger bg-brand-danger/5 hover:bg-brand-danger hover:text-white transition-all active:scale-90"
              title="Tolak"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
