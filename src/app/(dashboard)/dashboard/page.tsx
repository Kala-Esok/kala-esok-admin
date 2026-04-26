'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import {
  dummyStats,
  dummyChartData,
  dummyServiceDistribution,
  dummyRecentActivity,
} from '@/lib/dummy-data';
import { Users, FileCheck2, Package, Wallet } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const iconMap = {
  users: Users,
  fileclock: FileCheck2,
  package: Package,
  wallet: Wallet,
};

const iconBgMap = [
  'bg-orange-100 dark:bg-orange-950/30',
  'bg-amber-100 dark:bg-amber-950/30',
  'bg-rose-100 dark:bg-rose-950/30',
  'bg-emerald-100 dark:bg-emerald-950/30',
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader title="Dashboard Overview" subtitle="Selamat datang kembali, Admin" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {dummyStats.map((stat, i) => {
          const Icon = iconMap[stat.iconKey as keyof typeof iconMap];
          return (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={Icon}
              iconBg={iconBgMap[i]}
            />
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="xl:col-span-2 bg-card rounded-2xl p-6 border border-brand-border shadow-sm">
          <h2 className="text-base font-semibold text-brand-text mb-6">Tren Pendaftaran User</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dummyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: 'currentColor' }}
                opacity={0.5}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: 'currentColor' }}
                opacity={0.5}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid var(--brand-border)',
                  backgroundColor: 'var(--card)',
                  color: 'var(--brand-text)',
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#FF823A"
                strokeWidth={2.5}
                dot={{ fill: '#FF823A', r: 3 }}
                activeDot={{ r: 5 }}
                name="Pengguna"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-card rounded-2xl p-6 border border-brand-border shadow-sm">
          <h2 className="text-base font-semibold text-brand-text mb-4">Distribusi Paket Service</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={dummyServiceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
                paddingAngle={3}
              >
                {dummyServiceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid var(--brand-border)',
                  backgroundColor: 'var(--card)',
                  color: 'var(--brand-text)',
                  fontSize: 12,
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs text-brand-text">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-2xl p-6 border border-brand-border shadow-sm">
        <h2 className="text-base font-semibold text-brand-text mb-5">Aktivitas Terbaru</h2>
        <div className="space-y-4">
          {dummyRecentActivity.map((item) => (
            <div key={item.id} className="flex items-center gap-4 group">
              <div className="h-10 w-10 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-sm font-semibold flex-shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-200">
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brand-text">{item.name}</p>
                <p className="text-xs text-brand-muted truncate">{item.action}</p>
              </div>
              <p className="text-xs text-brand-muted flex-shrink-0">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
