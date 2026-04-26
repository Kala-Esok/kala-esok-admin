// Dummy data for all pages in the app
// Replace API calls here when backend is ready

// ─── Dashboard ────────────────────────────────────────────────
export const dummyStats = [
  { title: 'Total User Aktif', value: '2,714', change: 25.5, iconKey: 'users' },
  { title: 'Dokumen Menunggu Verifikasi', value: '104', change: -4.0, iconKey: 'fileclock' },
  { title: 'Paket Terjual Bulan Ini', value: '488', change: 40.9, iconKey: 'package' },
  { title: 'Pendapatan', value: 'Rp 2.4M', change: -5.5, iconKey: 'wallet' },
];

export const dummyChartData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 180 },
  { month: 'Mar', users: 250 },
  { month: 'Apr', users: 200 },
  { month: 'Mei', users: 310 },
  { month: 'Jun', users: 280 },
  { month: 'Jul', users: 400 },
  { month: 'Agu', users: 360 },
  { month: 'Sep', users: 480 },
  { month: 'Okt', users: 500 },
  { month: 'Nov', users: 540 },
  { month: 'Des', users: 600 },
];

export const dummyServiceDistribution = [
  { name: 'Dasar', value: 104, fill: '#E8DCD5' },
  { name: 'Premium', value: 234, fill: '#FF823A' },
  { name: 'Eksklusif', value: 114, fill: '#874618' },
];

export const dummyRecentActivity = [
  {
    id: '1',
    name: 'Super Admin',
    action: 'Menyetujui dokumen KTP Budi Santoso',
    time: '5 Menit lalu',
    avatar: 'SA',
  },
  { id: '2', name: 'Finance', action: 'Update paket Dasar', time: '15 Menit lalu', avatar: 'F' },
  {
    id: '3',
    name: 'Finance',
    action: 'Verifikasi pembayaran TRX-002',
    time: '1 Jam lalu',
    avatar: 'F',
  },
  {
    id: '4',
    name: 'Super Admin',
    action: 'Hapus artikel dari CMS',
    time: '2 Jam lalu',
    avatar: 'SA',
  },
];

// ─── Manajemen User ──────────────────────────────────────────
export type PackageStatus = 'Dasar' | 'Premium' | 'Eksklusif';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  packageStatus: PackageStatus;
  avatar: string;
}

export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'Budi',
    email: 'budi.santoso@gmail.com',
    phone: '+62 812 3456 7890',
    birthDate: '15 Maret 1985',
    packageStatus: 'Dasar',
    avatar: 'BU',
  },
  {
    id: '2',
    name: 'Siti Nurhalijah',
    email: 'siti.nurhalijah@gmail.com',
    phone: '+62 813 4467 6432',
    birthDate: '23 Juli 1990',
    packageStatus: 'Premium',
    avatar: 'SN',
  },
  {
    id: '3',
    name: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@gmail.com',
    phone: '+62 821 2234 5678',
    birthDate: '8 Oktober 1978',
    packageStatus: 'Eksklusif',
    avatar: 'AF',
  },
  {
    id: '4',
    name: 'Rudi Hermawan',
    email: 'rudi.hermawan@gmail.com',
    phone: '+62 856 7890 1234',
    birthDate: '30 Desember 1988',
    packageStatus: 'Premium',
    avatar: 'RH',
  },
  {
    id: '5',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@gmail.com',
    phone: '+62 812 0011 2233',
    birthDate: '5 Februari 1992',
    packageStatus: 'Dasar',
    avatar: 'DL',
  },
  {
    id: '6',
    name: 'Hendra Wijaya',
    email: 'hendra.wijaya@gmail.com',
    phone: '+62 821 9988 7766',
    birthDate: '17 Agustus 1982',
    packageStatus: 'Premium',
    avatar: 'HW',
  },
];

// ─── Verifikasi Dokumen ──────────────────────────────────────
export type DocStatus = 'Menunggu' | 'Disetujui' | 'Ditolak';
export type DocCategory = 'Identitas' | 'Aset Keuangan' | 'Legal' | 'Properti' | 'Lainnya';

export interface Document {
  id: string;
  title: string;
  owner: string;
  status: DocStatus;
  category: DocCategory;
  uploadedAt: string;
}

export const dummyDocuments: Document[] = [
  {
    id: '1',
    title: 'KTP',
    owner: 'Budi Santoso',
    status: 'Menunggu',
    category: 'Identitas',
    uploadedAt: '2 Jan 2025',
  },
  {
    id: '2',
    title: 'Sertifikat Tanah',
    owner: 'Siti Nurhalijah',
    status: 'Menunggu',
    category: 'Properti',
    uploadedAt: '3 Jan 2025',
  },
  {
    id: '3',
    title: 'Rekening Bank',
    owner: 'Ahmad Fauzi',
    status: 'Menunggu',
    category: 'Aset Keuangan',
    uploadedAt: '4 Jan 2025',
  },
  {
    id: '4',
    title: 'Surat Wasiat',
    owner: 'Dewi Lestari',
    status: 'Disetujui',
    category: 'Legal',
    uploadedAt: '5 Jan 2025',
  },
  {
    id: '5',
    title: 'BPKB Kendaraan',
    status: 'Ditolak',
    owner: 'Rudi Hermawan',
    category: 'Aset Keuangan',
    uploadedAt: '6 Jan 2025',
  },
  {
    id: '6',
    title: 'Akta Kelahiran',
    owner: 'Hendra Wijaya',
    status: 'Disetujui',
    category: 'Identitas',
    uploadedAt: '7 Jan 2025',
  },
  {
    id: '7',
    title: 'Polis Asuransi',
    owner: 'Siti Nurhalijah',
    status: 'Menunggu',
    category: 'Aset Keuangan',
    uploadedAt: '8 Jan 2025',
  },
];

// ─── Layanan & Paket ─────────────────────────────────────────
export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  highlight?: boolean;
}

export const dummyPackages: Package[] = [
  {
    id: '1',
    name: 'Paket Dasar',
    price: 5000000,
    description: 'Paket dasar untuk perencanaan pemakaman sederhan',
    benefits: [
      'Pengurusan administrasi pemakaman',
      'Dokumen digital tersimpan aman',
      'Konsultasi hukum dasar',
      'Akses kitab suci digital',
    ],
  },
  {
    id: '2',
    name: 'Paket Premium',
    price: 15000000,
    description: 'Paket menengah dengan layanan lengkap',
    benefits: [
      'Semua fitur Paket Dasar',
      'Pengurusan surat wasiat',
      'Konsultasi hukum lanjutan',
      'Layanan perencanaan pemakaman',
      'Dukungan keluarga 24/7',
    ],
    highlight: true,
  },
  {
    id: '3',
    name: 'Paket Eksklusif',
    price: 30000000,
    description: 'Paket eksklusif dengan layanan terbaik',
    benefits: [
      'Semua fitur Paket Premium',
      'Personal estate planner',
      'Pengurusan aset properti',
      'Layanan Trust Fund',
      'Perencanaan waris lengkap',
    ],
  },
];

// ─── Checkout & Payment ──────────────────────────────────────
export type PaymentStatus = 'Success' | 'Pending' | 'Failed';

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  package: string;
  packageStatus: PackageStatus;
  total: string;
  method: string;
  status: PaymentStatus;
}

export interface Paylater {
  id: string;
  userName: string;
  packageName: string;
  tenor: number;
  totalAmount: string;
  paidInstallments: number;
  dueDate: string;
  status: 'Active' | 'Completed';
}

export const dummyTransactions: Transaction[] = [
  {
    id: 'TRX-001',
    userId: '1',
    userName: 'Budi Santoso',
    package: 'Dasar',
    packageStatus: 'Dasar',
    total: 'Rp 5.000.000',
    method: 'Credit Card',
    status: 'Success',
  },
  {
    id: 'TRX-002',
    userId: '2',
    userName: 'Siti Nurhalijah',
    package: 'Premium',
    packageStatus: 'Premium',
    total: 'Rp 25.000.000',
    method: 'Paylater 12 bulan',
    status: 'Success',
  },
  {
    id: 'TRX-003',
    userId: '3',
    userName: 'Ahmad Fauzi',
    package: 'Eksklusif',
    packageStatus: 'Eksklusif',
    total: 'Rp 5.000.000',
    method: 'Credit Card',
    status: 'Failed',
  },
  {
    id: 'TRX-004',
    userId: '4',
    userName: 'Dewi Lestari',
    package: 'Premium',
    packageStatus: 'Premium',
    total: 'Rp 12.000.000',
    method: 'Paylater 6 bulan',
    status: 'Pending',
  },
];

export const dummyPaylater: Paylater[] = [
  {
    id: 'PLT-001',
    userName: 'Siti Nurhaliza',
    packageName: 'Paket Dasar',
    tenor: 12,
    totalAmount: 'Rp 2.083.333',
    paidInstallments: 2,
    dueDate: '15 Maret 2025',
    status: 'Active',
  },
  {
    id: 'PLT-002',
    userName: 'Dewi Lestari',
    packageName: 'Paket Eksklusif',
    tenor: 6,
    totalAmount: 'Rp 2.000.000',
    paidInstallments: 1,
    dueDate: '',
    status: 'Active',
  },
];

// ─── Database Pemakaman ──────────────────────────────────────
export interface Cemetery {
  id: string;
  name: string;
  location: string;
  capacity: number;
  occupied: number;
  type: 'Public' | 'Private';
  status: 'Aktif' | 'Penuh';
  distance?: string;
  lat?: number;
  lng?: number;
}

export const dummyCemeteries: Cemetery[] = [
  {
    id: '1',
    name: 'TPU Tanah Kusir',
    location: 'Jakarta Selatan',
    capacity: 250,
    occupied: 180,
    type: 'Public',
    status: 'Aktif',
    distance: '12 Km',
    lat: -6.2615,
    lng: 106.7842,
  },
  {
    id: '2',
    name: 'San Diego Hills Memorial Park',
    location: 'Karawang, Jawa Barat',
    capacity: 1250,
    occupied: 800,
    type: 'Private',
    status: 'Aktif',
    distance: '45 Km',
    lat: -6.3515,
    lng: 107.2842,
  },
  {
    id: '3',
    name: 'Taman Makam Pahlawan Kalibata',
    location: 'Jakarta Selatan',
    capacity: 500,
    occupied: 480,
    type: 'Public',
    status: 'Aktif',
    distance: '8 Km',
    lat: -6.2515,
    lng: 106.8442,
  },
  {
    id: '4',
    name: 'Pemakaman Jeruk Purut',
    location: 'Jakarta Selatan',
    capacity: 100,
    occupied: 95,
    type: 'Public',
    status: 'Aktif',
    distance: '10 Km',
    lat: -6.2815,
    lng: 106.8242,
  },
];

// ─── CMS Blog ────────────────────────────────────────────────
export type BlogStatus = 'Published' | 'Draft' | 'Archived';

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  status: BlogStatus;
  publishedAt: string;
  views: number;
}

export const dummyBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Keutamaan Bersedekah dalam Islam',
    author: 'Admin',
    category: 'Islam',
    status: 'Published',
    publishedAt: '15 Maret 2025',
    views: 1250,
  },
  {
    id: '2',
    title: 'Makna Kematian dalam Perspektif Kristen',
    author: 'Admin',
    category: 'Kristen',
    status: 'Published',
    publishedAt: '22 Juni 2025',
    views: 322,
  },
  {
    id: '3',
    title: 'Ritual Pemakaman dalam Tradisi Hindu',
    author: 'Admin',
    category: 'Hindu',
    status: 'Draft',
    publishedAt: '8 Oktober 2025',
    views: 0,
  },
];
