'use client';

import { use, useState, useEffect } from 'react';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { dummyUsers, User, PackageStatus } from '@/lib/dummy-data';
import { Mail, Phone, Calendar, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const packageVariant: Record<PackageStatus, 'success' | 'warning' | 'info'> = {
  Dasar: 'info',
  Premium: 'warning',
  Eksklusif: 'success',
};

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const found = dummyUsers.find((u) => u.id === resolvedParams.id);
    if (found) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(found);
    }
  }, [resolvedParams.id]);

  if (!user && resolvedParams.id) {
    // In a real app we'd fetch here. If not found after fetch:
    // notFound();
  }

  if (!user) return <div className="p-8 text-center text-brand-muted">Loading user data...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/manajemen-user"
          className="p-2.5 rounded-xl border border-brand-border bg-card text-brand-muted hover:text-brand-primary transition-all hover:bg-brand-surface"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Detail Pengguna</h1>
          <p className="text-sm text-brand-muted mt-1">ID: {user.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-3xl border border-brand-border p-8 text-center shadow-sm">
            <div className="h-24 w-24 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-3xl font-bold mx-auto mb-6 border-4 border-brand-surface shadow-lg">
              {user.avatar}
            </div>
            <h2 className="text-xl font-bold text-brand-text">{user.name}</h2>
            <div className="mt-3">
              <StatusBadge
                label={user.packageStatus}
                variant={packageVariant[user.packageStatus]}
              />
            </div>

            <div className="w-full h-px bg-brand-border my-6" />

            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-surface rounded-lg">
                  <Mail className="w-4 h-4 text-brand-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                    Email
                  </p>
                  <p className="text-sm text-brand-text font-medium truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="p-2 bg-brand-surface rounded-lg">
                  <Phone className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                    Telepon
                  </p>
                  <p className="text-sm text-brand-text font-medium">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="p-2 bg-brand-surface rounded-lg">
                  <Calendar className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                    Tgl Lahir
                  </p>
                  <p className="text-sm text-brand-text font-medium">{user.birthDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl border border-brand-border p-6 shadow-sm">
            <h3 className="text-sm font-bold text-brand-text mb-4">Ringkasan Aktivitas</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-muted">Total Transaksi</span>
                <span className="font-bold text-brand-text">12 Transaksi</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-muted">Dokumen Terverifikasi</span>
                <span className="font-bold text-brand-success">4 Dokumen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details & Documents */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card rounded-3xl border border-brand-border shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-brand-border bg-brand-surface/30">
              <h2 className="text-lg font-bold text-brand-text">Timeline Status</h2>
            </div>
            <div className="p-8">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-brand-border">
                {[
                  {
                    title: 'Pembelian Paket Premium',
                    date: '12 Feb 2024',
                    status: 'completed',
                    desc: 'Pembayaran dikonfirmasi via Midtrans',
                  },
                  {
                    title: 'Verifikasi KTP',
                    date: '10 Feb 2024',
                    status: 'completed',
                    desc: 'Dokumen disetujui oleh Admin',
                  },
                  {
                    title: 'Registrasi Akun',
                    date: '08 Feb 2024',
                    status: 'completed',
                    desc: 'Pendaftaran awal pengguna',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-border bg-card text-brand-primary shadow-sm z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-brand-border bg-brand-surface/20">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-brand-text">{item.title}</div>
                        <time className="text-[10px] font-medium text-brand-muted">
                          {item.date}
                        </time>
                      </div>
                      <div className="text-xs text-brand-muted">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl border border-brand-border shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-brand-border bg-brand-surface/30 flex items-center justify-between">
              <h2 className="text-lg font-bold text-brand-text">Dokumen Terkait</h2>
              <span className="text-xs text-brand-muted">3 Dokumen</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'KTP_Front.jpg', type: 'Identitas', size: '1.2 MB' },
                { name: 'KK_Digital.pdf', type: 'Keluarga', size: '2.5 MB' },
                { name: 'Selfie_Verification.png', type: 'Biometrik', size: '0.8 MB' },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-brand-border hover:border-brand-primary transition-all group flex items-center gap-4"
                >
                  <div className="p-3 bg-brand-surface rounded-xl group-hover:bg-brand-primary/10 transition-colors">
                    <FileText className="w-6 h-6 text-brand-muted group-hover:text-brand-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-brand-text truncate">{doc.name}</p>
                    <p className="text-[10px] text-brand-muted uppercase tracking-wider">
                      {doc.type} • {doc.size}
                    </p>
                  </div>
                  <button className="text-xs font-bold text-brand-primary hover:underline">
                    Unduh
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
