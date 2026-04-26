// ─── Auth ────────────────────────────────────────────────────
import 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

// ─── API Response Wrapper ────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// ─── User ────────────────────────────────────────────────────
export interface UserEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  packageStatus: 'Dasar' | 'Premium' | 'Eksklusif';
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Document ────────────────────────────────────────────────
export interface DocumentEntity {
  id: string;
  title: string;
  owner: string;
  status: 'Menunggu' | 'Disetujui' | 'Ditolak';
  category: 'Identitas' | 'Aset Keuangan' | 'Legal' | 'Properti' | 'Lainnya';
  uploadedAt: string;
  fileUrl?: string;
}

// ─── Package ─────────────────────────────────────────────────
export interface PackageEntity {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  highlight?: boolean;
  createdAt?: string;
}

// ─── Transaction ─────────────────────────────────────────────
export interface TransactionEntity {
  id: string;
  userId: string;
  userName: string;
  package: string;
  packageStatus: 'Dasar' | 'Premium' | 'Eksklusif';
  total: string;
  method: string;
  status: 'Success' | 'Pending' | 'Failed';
  createdAt?: string;
}

// ─── Cemetery ────────────────────────────────────────────────
export interface CemeteryEntity {
  id: string;
  name: string;
  location: string;
  capacity: number;
  occupied: number;
  type: string;
  status: 'Aktif' | 'Penuh';
}

// ─── Blog ────────────────────────────────────────────────────
export interface BlogPostEntity {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'Published' | 'Draft' | 'Archived';
  publishedAt: string;
  views: number;
  content?: string;
}

// ─── UI Helpers ──────────────────────────────────────────────
export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

export interface SelectOption {
  label: string;
  value: string;
}
