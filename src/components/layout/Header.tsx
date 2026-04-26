'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
  FileCheck,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';

interface HeaderProps {
  onMenuClick?: () => void;
}

import { ConfirmDialog } from '@/components/shared/ConfirmDialog';

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const name = session?.user?.name ?? 'Admin';
  const email = session?.user?.email ?? 'admin@kalaesok.com';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const dummyNotifs = [
    {
      id: '1',
      title: 'Dokumen Baru',
      desc: 'Budi Santoso mengunggah KTP',
      time: '2m ago',
      read: false,
      type: 'doc',
    },
    {
      id: '2',
      title: 'Pembayaran Berhasil',
      desc: 'TRX-004 telah dikonfirmasi',
      time: '15m ago',
      read: false,
      type: 'pay',
    },
    {
      id: '3',
      title: 'Update Sistem',
      desc: 'Versi 1.2.0 telah dirilis',
      time: '1h ago',
      read: true,
      type: 'info',
    },
  ];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    setProfileOpen(false);
    toast.loading('Keluar dari sesi...', { id: 'logout' });
    await signOut({ callbackUrl: '/login' });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header className="h-20 bg-background border-b border-brand-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 text-brand-muted hover:bg-brand-surface rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1 max-w-xl hidden sm:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
            </div>
            <input type="text" className="form-input pl-9 rounded-full" placeholder="Search..." />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 text-brand-muted hover:text-brand-primary hover:bg-brand-surface dark:hover:bg-brand-sidebar/50 rounded-lg transition-all"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative text-brand-muted hover:text-brand-primary transition-colors p-2 rounded-lg hover:bg-brand-surface dark:hover:bg-brand-sidebar/30"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-brand-primary border-2 border-background" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-3 w-80 bg-card rounded-2xl border border-brand-border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200 z-50">
                <div className="px-5 py-4 border-b border-brand-border flex items-center justify-between bg-brand-surface/30">
                  <h3 className="text-sm font-bold text-brand-text">Notifikasi</h3>
                  <button className="text-[10px] font-bold text-brand-primary hover:underline uppercase tracking-wider">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {dummyNotifs.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        'px-5 py-4 flex gap-4 hover:bg-brand-surface/50 transition-colors cursor-pointer border-b border-brand-border last:border-0',
                        !notif.read && 'bg-brand-primary/5'
                      )}
                    >
                      <div
                        className={cn(
                          'h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0',
                          notif.type === 'doc'
                            ? 'bg-blue-100 text-blue-600'
                            : notif.type === 'pay'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-purple-100 text-purple-600'
                        )}
                      >
                        {notif.type === 'doc' ? (
                          <FileCheck className="w-5 h-5" />
                        ) : notif.type === 'pay' ? (
                          <CreditCard className="w-5 h-5" />
                        ) : (
                          <Bell className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-brand-text truncate">{notif.title}</p>
                        <p className="text-xs text-brand-muted mt-0.5 line-clamp-2">{notif.desc}</p>
                        <p className="text-[10px] text-brand-muted mt-2 font-medium">
                          {notif.time}
                        </p>
                      </div>
                      {!notif.read && (
                        <div className="h-2 w-2 rounded-full bg-brand-primary mt-2" />
                      )}
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 text-xs font-bold text-brand-muted hover:text-brand-primary bg-brand-surface/20 border-t border-brand-border transition-colors">
                  Lihat Semua Notifikasi
                </button>
              </div>
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 pl-4 border-l border-brand-border hover:opacity-80 transition-opacity"
            >
              <div className="h-9 w-9 rounded-full bg-brand-sidebar text-white flex items-center justify-center font-semibold text-sm shadow-sm">
                {initials}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-brand-text leading-tight">{name}</p>
                <p className="text-xs text-brand-muted leading-tight uppercase tracking-tighter">
                  Super Admin
                </p>
              </div>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-brand-muted transition-transform',
                  profileOpen && 'rotate-180'
                )}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-card rounded-2xl border border-brand-border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200 z-50">
                <div className="px-5 py-4 border-b border-brand-border bg-brand-surface/30">
                  <p className="text-sm font-bold text-brand-text">{name}</p>
                  <p className="text-xs text-brand-muted truncate">{email}</p>
                </div>
                <div className="p-1.5">
                  <Link
                    href="/profil"
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-text rounded-xl hover:bg-brand-surface transition-colors"
                  >
                    <User className="w-4 h-4 text-brand-muted" />
                    Profil Saya
                  </Link>
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <ConfirmDialog
        open={showLogoutConfirm}
        title="Konfirmasi Keluar"
        description="Apakah kamu yakin ingin keluar dari akun ini?"
        confirmLabel="Ya, Keluar"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}
