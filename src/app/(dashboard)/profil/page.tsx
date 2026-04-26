'use client';

import { useState } from 'react';
import { Mail, Shield, Camera, Save, Key, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilPage() {
  const [form, setForm] = useState({
    name: 'Admin',
    email: 'admin@kalaesok.com',
    phone: '+62 812 3456 7890',
    bio: 'Super Admin for Kala Esok Platform. Managing system configuration and user verification.',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profil berhasil diperbarui');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-brand-text">Profil Saya</h1>
        <p className="text-sm text-brand-muted mt-1">
          Kelola informasi pribadi dan keamanan akun kamu
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-3xl border border-brand-border p-8 flex flex-col items-center text-center shadow-sm">
            <div className="relative group mb-6">
              <div className="h-32 w-32 rounded-full bg-brand-sidebar text-white flex items-center justify-center text-4xl font-serif border-4 border-brand-surface shadow-xl">
                AD
              </div>
              <button className="absolute bottom-0 right-0 p-2.5 bg-brand-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-brand-text">{form.name}</h2>
            <p className="text-sm text-brand-muted mt-1">Super Admin</p>

            <div className="w-full h-px bg-brand-border my-6" />

            <div className="w-full space-y-4">
              <div className="flex items-center gap-3 text-left">
                <div className="p-2 bg-brand-surface rounded-lg">
                  <Mail className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                    Email
                  </p>
                  <p className="text-sm text-brand-text font-medium">{form.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="p-2 bg-brand-surface rounded-lg">
                  <Shield className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                    Role
                  </p>
                  <p className="text-sm text-brand-text font-medium">Super Admin</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl border border-brand-border p-6 shadow-sm">
            <h3 className="text-sm font-bold text-brand-text mb-4">Statistik Akun</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-brand-muted">Terdaftar Sejak</span>
                <span className="text-xs font-bold text-brand-text">12 Jan 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-brand-muted">Login Terakhir</span>
                <span className="text-xs font-bold text-brand-text">Hari ini, 14:20</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Edit Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card rounded-3xl border border-brand-border shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-brand-border bg-brand-surface/30">
              <h2 className="text-lg font-bold text-brand-text">Informasi Dasar</h2>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Alamat Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Nomor Telepon</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Bio Singkat</label>
                <textarea
                  rows={4}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="form-input resize-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/20 transition-all active:scale-95"
                >
                  <Save className="w-5 h-5" />
                  Simpan Profil
                </button>
              </div>
            </form>
          </div>

          <div className="bg-card rounded-3xl border border-brand-border shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-brand-border bg-brand-surface/30">
              <h2 className="text-lg font-bold text-brand-text">Keamanan Akun</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-surface rounded-2xl">
                    <Key className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-text">Ganti Password</p>
                    <p className="text-xs text-brand-muted mt-1">
                      Perbarui password kamu secara berkala untuk keamanan.
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-brand-border rounded-xl text-xs font-bold hover:bg-brand-surface transition-all">
                  Ganti
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-surface rounded-2xl">
                    <Bell className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-text">Verifikasi 2 Langkah</p>
                    <p className="text-xs text-brand-muted mt-1">
                      Tambahkan lapisan keamanan ekstra pada akun kamu.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  Aktif
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
