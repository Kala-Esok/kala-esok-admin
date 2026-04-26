'use client';

import Link from 'next/link';
import { LucideIcon, Home, ArrowLeft } from 'lucide-react';

interface ErrorLayoutProps {
  code: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ErrorLayout({ code, title, description, icon: Icon }: ErrorLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-surface dark:bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full" />
          <div className="relative bg-card border border-brand-border h-32 w-32 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
            <Icon className="w-16 h-16 text-brand-primary" />
          </div>
        </div>

        <h1 className="text-6xl font-serif font-bold text-brand-text mb-4">{code}</h1>
        <h2 className="text-xl font-bold text-brand-text mb-3">{title}</h2>
        <p className="text-brand-muted text-sm leading-relaxed mb-10">{description}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/20 transition-all active:scale-95"
          >
            <Home className="w-4.5 h-4.5" />
            Ke Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-card border border-brand-border text-brand-text font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-brand-sidebar/20 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
            Kembali
          </button>
        </div>

        <div className="mt-16">
          <p className="text-xs text-brand-muted uppercase tracking-[0.2em] font-medium">
            Kala Esok Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
