'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';

import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { UserModal } from '@/components/features/users/UserModal';
import { dummyUsers, User, PackageStatus } from '@/lib/dummy-data';
import { Search, Filter, Eye, Pencil, Trash2, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

import { AdvancedFilter } from '@/components/shared/AdvancedFilter';

const packageVariant: Record<PackageStatus, 'success' | 'warning' | 'info'> = {
  Dasar: 'info',
  Premium: 'warning',
  Eksklusif: 'success',
};

export default function ManajemenUserPage() {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilters = Object.entries(activeFilters).every(([key, value]) => {
      if (!value) return true;
      if (key === 'packageStatus') return u.packageStatus === value;
      if (key === 'email') return u.email.toLowerCase().includes(value.toLowerCase());
      return true;
    });

    return matchesSearch && matchesFilters;
  });

  const handleDelete = () => {
    if (!deleteTarget) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    toast.success(`User "${deleteTarget.name}" berhasil dihapus`);
    setDeleteTarget(null);
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditUser(null);
    setModalOpen(true);
  };

  const handleSave = (data: Partial<User>) => {
    if (editUser) {
      setUsers((prev) => prev.map((u) => (u.id === editUser.id ? { ...u, ...data } : u)));
    } else {
      const newUser: User = {
        id: String(Date.now()),
        name: data.name ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        birthDate: data.birthDate ?? '',
        packageStatus: (data.packageStatus as PackageStatus) ?? 'Dasar',
        avatar: (data.name ?? 'U').slice(0, 2).toUpperCase(),
      };
      setUsers((prev) => [newUser, ...prev]);
    }
  };

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Nama',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
            {row.avatar}
          </div>
          <span className="font-medium text-brand-text">{row.name}</span>
        </div>
      ),
    },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'No Hp' },
    { key: 'birthDate', header: 'Tanggal Lahir' },
    {
      key: 'packageStatus',
      header: 'Status Paket',
      render: (row) => (
        <StatusBadge label={row.packageStatus} variant={packageVariant[row.packageStatus]} />
      ),
    },
    {
      key: 'action',
      header: 'Aksi',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/manajemen-user/${row.id}`}
            className="flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Detail
          </Link>

          <button
            onClick={() => handleEdit(row)}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-primary hover:bg-orange-50 transition-all"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-danger hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader
        title="Manajemen User"
        subtitle="Kelola data pengguna platform"
        action={
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-xl hover:bg-brand-primary-hover transition-all duration-200 shadow-sm active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            Tambah User
          </button>
        }
      />

      <div className="bg-card rounded-2xl p-6 border border-brand-border shadow-sm">
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input pl-9"
            />
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition-all duration-200',
              Object.keys(activeFilters).length > 0
                ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                : 'border-brand-border text-brand-muted hover:border-brand-primary hover:text-brand-primary'
            )}
          >
            <Filter className="w-4 h-4" />
            Filter
            {Object.keys(activeFilters).length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-brand-primary text-white text-[10px] rounded-full">
                {Object.keys(activeFilters).length}
              </span>
            )}
          </button>
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(row) => row.id}
          emptyMessage="Tidak ada user ditemukan"
        />
      </div>

      <UserModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditUser(null);
        }}
        user={editUser}
        onSave={handleSave}
      />

      <AdvancedFilter
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={setActiveFilters}
        onReset={() => setActiveFilters({})}
        fields={[
          {
            key: 'packageStatus',
            label: 'Status Paket',
            type: 'select',
            options: [
              { label: 'Dasar', value: 'Dasar' },
              { label: 'Premium', value: 'Premium' },
              { label: 'Eksklusif', value: 'Eksklusif' },
            ],
          },
          {
            key: 'email',
            label: 'Email Address',
            type: 'text',
          },
        ]}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus User"
        description={`Apakah kamu yakin ingin menghapus user "${deleteTarget?.name}"? Tindakan ini tidak bisa dibatalkan.`}
        confirmLabel="Ya, Hapus"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
