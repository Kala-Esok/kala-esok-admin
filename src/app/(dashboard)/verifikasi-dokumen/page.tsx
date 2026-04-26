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
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="flex border-b border-brand-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 relative',
                activeTab === tab ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-text'
              )}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Document Cards */}
        <div className="p-6">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
            <EmptyState description="Tidak ada dokumen di kategori ini" />
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
    <div className="border border-brand-border rounded-xl p-5 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 bg-orange-50 rounded-lg group-hover:bg-brand-primary/10 transition-colors">
          <FileText className="w-5 h-5 text-brand-primary" />
        </div>
        <StatusBadge label={doc.status} variant={statusVariant[doc.status]} />
      </div>

      <h3 className="font-semibold text-brand-text mb-1">{doc.title}</h3>
      <p className="text-xs text-brand-muted mb-4">{doc.owner}</p>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border text-xs text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-all">
          <Eye className="w-3.5 h-3.5" />
          Lihat
        </button>
        {doc.status === 'Menunggu' && (
          <>
            <button
              onClick={onApprove}
              className="p-1.5 rounded-lg border border-green-200 text-green-600 hover:bg-green-50 transition-all"
              title="Setujui"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={onReject}
              className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-all"
              title="Tolak"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
