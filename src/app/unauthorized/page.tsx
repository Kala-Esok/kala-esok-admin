'use client';

import { ErrorLayout } from '@/components/shared/ErrorLayout';
import { Lock } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <ErrorLayout
      code="401"
      title="Sesi Berakhir"
      description="Sesi kamu telah berakhir atau kamu belum login. Silakan login kembali untuk mengakses halaman ini."
      icon={Lock}
    />
  );
}
