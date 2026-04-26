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
      <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-base font-semibold text-brand-text">Riwayat Transaksi</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input
                type="text"
                placeholder="Cari user atau ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-brand-border rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-brand-primary focus:bg-white transition-all w-full sm:w-64"
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
                'px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap',
                activeTab === tab
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-gray-100 text-brand-muted hover:bg-gray-200'
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
      <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-sm">
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
    <div className="border border-brand-border rounded-xl p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-brand-text">{item.userName}</p>
          <p className="text-xs text-brand-muted">{item.packageName}</p>
        </div>
        <StatusBadge
          label={item.status}
          variant={item.status === 'Active' ? 'success' : 'default'}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <p className="text-brand-muted text-xs mb-0.5">Tenor</p>
          <p className="font-medium text-brand-text">{item.tenor} Bulan</p>
        </div>
        <div>
          <p className="text-brand-muted text-xs mb-0.5">Cicilan/Bulan</p>
          <p className="font-medium text-brand-text">{item.totalAmount}</p>
        </div>
        <div>
          <p className="text-brand-muted text-xs mb-0.5">Sudah Bayar</p>
          <p className="font-medium text-brand-text">{item.paidInstallments} bulan</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-brand-muted mb-1.5">
          <span>Progress pembayaran</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-primary rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {item.dueDate && (
          <div className="flex items-center gap-1.5 text-xs text-brand-muted">
            <Calendar className="w-3.5 h-3.5" />
            Jatuh tempo: {item.dueDate}
          </div>
        )}
        <div className="ml-auto">
          <span className="text-xs text-brand-muted">Sisa: </span>
          <span className="text-xs font-semibold text-brand-text">{remaining} bulan</span>
        </div>
        <button className="ml-4 px-4 py-1.5 bg-brand-primary text-white text-xs font-medium rounded-lg hover:bg-brand-primary-hover transition-colors">
          Lihat Riwayat
        </button>
      </div>
    </div>
  );
}
