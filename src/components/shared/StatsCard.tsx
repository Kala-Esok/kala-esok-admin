import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconBg?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconBg = 'bg-brand-primary/10',
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-card rounded-2xl p-6 border border-brand-border shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-brand-muted font-medium">{title}</p>
          <p className="text-3xl font-bold text-brand-text mt-2 tracking-tight">{value}</p>
          {change !== undefined && (
            <div
              className={cn(
                'flex items-center gap-1 mt-3 text-xs font-semibold',
                isPositive ? 'text-brand-success' : 'text-brand-danger'
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>
                {isPositive ? '+' : ''}
                {change}%
              </span>
              <span className="text-brand-muted font-normal ml-1">vs bulan lalu</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'p-3 rounded-xl transition-transform duration-200 group-hover:scale-110',
            iconBg
          )}
        >
          <Icon className="w-6 h-6 text-brand-primary" />
        </div>
      </div>
    </div>
  );
}
