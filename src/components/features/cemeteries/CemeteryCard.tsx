'use client';

import { Cemetery } from '@/lib/dummy-data';
import { MapPin, Pencil, Trash2 } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';

interface CemeteryCardProps {
  item: Cemetery;
  onEdit: (item: Cemetery) => void;
  onDelete: (item: Cemetery) => void;
}

export function CemeteryCard({ item, onEdit, onDelete }: CemeteryCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-brand-border p-6 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-2xl">
            <MapPin className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-brand-text leading-tight group-hover:text-brand-primary transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">{item.location}</p>
          </div>
        </div>
        <StatusBadge
          label={item.type}
          variant={item.type === 'Public' ? 'info' : 'warning'}
          className="rounded-lg px-3 py-1 text-[10px] uppercase font-bold tracking-wider"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-[10px] uppercase font-bold text-brand-muted tracking-widest mb-1">
            Jarak
          </p>
          <p className="text-sm font-bold text-brand-text">{item.distance ?? 'N/A'}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-brand-muted tracking-widest mb-1">
            Kapasitas
          </p>
          <p className="text-sm font-bold text-brand-text">
            {item.capacity - item.occupied <= 0
              ? 'Terbatas'
              : `${(item.capacity - item.occupied).toLocaleString()} tersedia`}
          </p>
        </div>
      </div>

      <div className="bg-brand-surface/50 dark:bg-brand-sidebar/20 rounded-xl p-3 mb-6">
        <p className="text-[10px] uppercase font-bold text-brand-muted tracking-widest mb-1">
          Koordinat
        </p>
        <p className="text-xs font-mono text-brand-text">
          {item.lat?.toFixed(4)}° S, {item.lng?.toFixed(4)}° E
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onEdit(item)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-brand-muted border border-brand-border rounded-xl hover:bg-brand-surface hover:text-brand-primary transition-all"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => onDelete(item)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-950/40 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Hapus
        </button>
      </div>
    </div>
  );
}
