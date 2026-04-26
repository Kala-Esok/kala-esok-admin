'use client';

import { Shield, Bell, Database, UserPlus, User, Lock } from 'lucide-react';

import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { dummyRecentActivity } from '@/lib/dummy-data';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'in-active';
}

const dummyAdmins: AdminUser[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'superadmin@kalaesok.com',
    role: 'Super Admin',
    status: 'active',
  },
  { id: '2', name: 'Admin', email: 'admin@kalaesok.com', role: 'Admin', status: 'in-active' },
  {
    id: '3',
    name: 'Finance Admin',
    email: 'finance@kalaesok.com',
    role: 'Finance',
    status: 'active',
  },
];

export default function PengaturanPage() {
  const columns: Column<AdminUser>[] = [
    {
      key: 'name',
      header: 'Nama User',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-brand-sidebar text-white flex items-center justify-center text-[10px] font-bold">
            {row.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <span className="font-medium text-brand-text">{row.name}</span>
        </div>
      ),
    },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (row) => (
        <StatusBadge
          label={row.role}
          variant="default"
          className="bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 border-none"
        />
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <StatusBadge
          label={row.status}
          variant={row.status === 'active' ? 'success' : 'warning'}
          className="capitalize"
        />
      ),
    },
    {
      key: 'action',
      header: 'Aksi',
      render: () => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg text-brand-muted hover:text-brand-primary transition-all">
            <User className="w-4.5 h-4.5" />
          </button>
          <button className="p-1.5 rounded-lg text-brand-muted hover:text-brand-primary transition-all">
            <Lock className="w-4.5 h-4.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-brand-text">Settings & Security</h1>
        <p className="text-sm text-brand-muted mt-1">Kelola pengaturan sistem dan keamanan</p>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-3xl border border-brand-border p-8 flex flex-col items-center text-center group hover:border-brand-primary/30 transition-all">
          <div className="w-16 h-16 bg-brand-surface rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-bold text-brand-text mb-1">Keamanan Sistem</h3>
          <p className="text-sm text-brand-muted mb-6">2-Factor Authentication aktif</p>
          <button className="w-full py-3 bg-brand-surface border border-brand-border rounded-2xl text-sm font-bold text-brand-text hover:bg-gray-50 transition-all">
            Lihat
          </button>
        </div>

        <div className="bg-card rounded-3xl border border-brand-border p-8 flex flex-col items-center text-center group hover:border-brand-primary/30 transition-all">
          <div className="w-16 h-16 bg-brand-surface rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Bell className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-brand-text mb-1">Notifikasi</h3>
          <p className="text-sm text-brand-muted mb-6">Email & Push notifications</p>
          <button className="w-full py-3 bg-brand-surface border border-brand-border rounded-2xl text-sm font-bold text-brand-text hover:bg-gray-50 transition-all">
            Lihat
          </button>
        </div>

        <div className="bg-card rounded-3xl border border-brand-border p-8 flex flex-col items-center text-center group hover:border-brand-primary/30 transition-all">
          <div className="w-16 h-16 bg-brand-surface rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Database className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-bold text-brand-text mb-1">Backup Data</h3>
          <p className="text-sm text-brand-muted mb-6">Terakhir: 7 Mar 2025</p>
          <button className="w-full py-3 bg-brand-surface border border-brand-border rounded-2xl text-sm font-bold text-brand-text hover:bg-gray-50 transition-all">
            Lihat
          </button>
        </div>
      </div>

      {/* Admin Users Table */}
      <div className="bg-card rounded-3xl border border-brand-border overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-brand-border flex items-center justify-between bg-brand-surface/20">
          <h2 className="text-lg font-bold text-brand-text">Riwayat Transaksi</h2>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary-hover transition-all active:scale-95 shadow-lg shadow-brand-primary/20">
            <UserPlus className="w-4 h-4" />
            Tambah User
          </button>
        </div>
        <div className="p-2">
          <DataTable columns={columns} data={dummyAdmins} keyExtractor={(item) => item.id} />
        </div>
      </div>

      {/* Activity Logs List */}
      <div className="bg-card rounded-3xl border border-brand-border overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-brand-border flex items-center justify-between bg-brand-surface/20">
          <h2 className="text-lg font-bold text-brand-text">Log Aktivitas Admin</h2>
          <button className="text-xs font-bold text-brand-primary hover:underline">
            Lihat semua
          </button>
        </div>
        <div className="divide-y divide-brand-border">
          {dummyRecentActivity.map((log) => (
            <div
              key={log.id}
              className="px-8 py-5 flex items-center justify-between hover:bg-brand-surface/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-brand-sidebar/10 border border-brand-border text-brand-sidebar flex items-center justify-center text-xs font-bold group-hover:bg-brand-primary group-hover:text-white transition-all">
                  {log.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-text leading-tight">{log.name}</p>
                  <p className="text-xs text-brand-muted mt-1">{log.action}</p>
                </div>
              </div>
              <span className="text-xs text-brand-muted whitespace-nowrap ml-4">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
