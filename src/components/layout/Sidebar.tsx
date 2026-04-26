'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FileCheck,
  Package,
  CreditCard,
  MapPin,
  BookOpen,
  Settings,
  X,
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profil Saya', href: '/profil', icon: Users },
  { name: 'Manajemen User', href: '/manajemen-user', icon: Users },

  { name: 'Verifikasi Dokumen', href: '/verifikasi-dokumen', icon: FileCheck },
  { name: 'Layanan & Paket', href: '/layanan-paket', icon: Package },
  { name: 'Checkout & Payment', href: '/checkout-payment', icon: CreditCard },
  { name: 'Database Pemakaman', href: '/database-pemakaman', icon: MapPin },
  { name: 'CMS Blog & Kitab', href: '/cms-blog', icon: BookOpen },
  { name: 'Pengaturan', href: '/pengaturan', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 z-50 w-64 bg-brand-sidebar text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif text-brand-surface tracking-wide">Kala Esok</h1>
            <p className="text-xs text-brand-surface/70 mt-1 font-light">Admin Dashboard</p>
          </div>
          <button onClick={onClose} className="p-1 lg:hidden hover:bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium',
                  isActive
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
