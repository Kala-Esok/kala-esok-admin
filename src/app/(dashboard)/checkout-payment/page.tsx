'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import {
  dummyTransactions,
  dummyPaylater,
  Transaction,
  Paylater,
  PaymentStatus,
  PackageStatus,
} from '@/lib/dummy-data';
import { Eye, Calendar, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const txStatusVariant: Record<PaymentStatus, 'success' | 'danger' | 'warning'> = {
  Success: 'success',
  Failed: 'danger',
  Pending: 'warning',
};

const pkgVariant: Record<PackageStatus, 'info' | 'warning' | 'success'> = {
  Dasar: 'info',
  Premium: 'warning',
  Eksklusif: 'success',
};

const TX_TABS = ['Semua', 'Success', 'Pending', 'Failed'] as const;

export default function CheckoutPaymentPage() {
  const [activeTab, setActiveTab] = useState<(typeof TX_TABS)[number]>('Semua');
  const [search, setSearch] = useState('');

  const filteredTransactions = dummyTransactions.filter((tx) => {
    const matchesSearch =
      tx.userName.toLowerCase().includes(search.toLowerCase()) ||
      tx.id.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'Semua' || tx.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const txColumns: Column<Transaction>[] = [
    { key: 'id', header: 'ID Transaksi' },
    { key: 'userName', header: 'Nama User' },
    {
      key: 'packageStatus',
      header: 'Paket',
      render: (row) => (
        <StatusBadge label={row.packageStatus} variant={pkgVariant[row.packageStatus]} />
      ),
    },
    { key: 'total', header: 'Total' },
    { key: 'method', header: 'Metode' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge label={row.status} variant={txStatusVariant[row.status]} />,
    },
    {
      key: 'action',
      header: 'Aksi',
      render: () => (
        <button className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline transition-colors">
          <Eye className="w-3.5 h-3.5" />
          Detail
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title="Checkout & Payment Monitoring"
        subtitle="Pantau transaksi dan pembayaran cicilan"
      />

      {/* Transaction Table */}
      <div className="bg-card rounded-2xl p-6 border border-brand-border shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-base font-semibold text-brand-text">Riwayat Transaksi</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input
                type="text"
                placeholder="Cari user atau ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-brand-border rounded-xl text-sm bg-brand-surface dark:bg-brand-sidebar/50 focus:outline-none focus:border-brand-primary transition-all w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {TX_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
                activeTab === tab
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                  : 'bg-brand-surface dark:bg-brand-sidebar/40 text-brand-muted hover:text-brand-primary'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <DataTable
          columns={txColumns}
          data={filteredTransactions}
          keyExtractor={(row) => row.id}
          emptyMessage="Tidak ada transaksi ditemukan"
        />
      </div>

      {/* Paylater Manager */}
      <div className="bg-card rounded-2xl p-6 border border-brand-border shadow-sm">
        <h2 className="text-base font-semibold text-brand-text mb-5">Paylater Manager</h2>
        <div className="space-y-4">
          {dummyPaylater.map((item) => (
            <PaylaterCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PaylaterCard({ item }: { item: Paylater }) {
  const progress = Math.round((item.paidInstallments / item.tenor) * 100);
  const remaining = item.tenor - item.paidInstallments;

  return (
    <div className="border border-brand-border rounded-2xl p-6 hover:shadow-lg hover:border-brand-primary/30 transition-all bg-brand-surface/20 dark:bg-brand-sidebar/20">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-bold text-brand-text text-lg">{item.userName}</p>
          <p className="text-xs text-brand-muted font-medium uppercase tracking-wider">
            {item.packageName}
          </p>
        </div>
        <StatusBadge
          label={item.status}
          variant={item.status === 'Active' ? 'success' : 'default'}
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="p-3 rounded-xl bg-brand-surface dark:bg-brand-sidebar/40 border border-brand-border/50">
          <p className="text-brand-muted text-[10px] uppercase font-bold tracking-tight mb-1">
            Tenor
          </p>
          <p className="font-bold text-brand-text">{item.tenor} Bulan</p>
        </div>
        <div className="p-3 rounded-xl bg-brand-surface dark:bg-brand-sidebar/40 border border-brand-border/50">
          <p className="text-brand-muted text-[10px] uppercase font-bold tracking-tight mb-1">
            Cicilan
          </p>
          <p className="font-bold text-brand-text">{item.totalAmount}</p>
        </div>
        <div className="p-3 rounded-xl bg-brand-surface dark:bg-brand-sidebar/40 border border-brand-border/50">
          <p className="text-brand-muted text-[10px] uppercase font-bold tracking-tight mb-1">
            Terbayar
          </p>
          <p className="font-bold text-brand-text">{item.paidInstallments} Bln</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs font-bold text-brand-muted mb-2">
          <span>Progress Pembayaran</span>
          <span className="text-brand-primary">{progress}%</span>
        </div>
        <div className="h-2.5 bg-brand-surface dark:bg-brand-sidebar/60 rounded-full overflow-hidden border border-brand-border/30 p-0.5">
          <div
            className="h-full bg-brand-primary rounded-full transition-all duration-1000 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        {item.dueDate && (
          <div className="flex items-center gap-2 text-xs font-medium text-brand-muted bg-brand-surface dark:bg-brand-sidebar/40 px-3 py-1.5 rounded-lg border border-brand-border/40">
            <Calendar className="w-3.5 h-3.5 text-brand-primary" />
            Jatuh tempo: {item.dueDate}
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] font-bold text-brand-muted uppercase block">Sisa</span>
            <span className="text-sm font-bold text-brand-text">{remaining} Bulan</span>
          </div>
          <button className="px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary-hover shadow-md shadow-brand-primary/20 transition-all active:scale-95">
            Lihat Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}
