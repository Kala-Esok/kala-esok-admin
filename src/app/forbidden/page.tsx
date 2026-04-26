'use client';

import { ErrorLayout } from '@/components/shared/ErrorLayout';
import { ShieldAlert } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <ErrorLayout
      code="403"
      title="Akses Ditolak"
      description="Kamu tidak memiliki izin yang cukup untuk mengakses halaman ini. Hubungi administrator jika kamu merasa ini adalah kesalahan."
      icon={ShieldAlert}
    />
  );
}
