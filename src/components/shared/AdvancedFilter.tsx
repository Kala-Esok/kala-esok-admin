'use client';

import { X, Search, Filter, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface FilterField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: { label: string; value: string }[];
}

interface AdvancedFilterProps {
  open: boolean;
  onClose: () => void;
  fields: FilterField[];
  onApply: (filters: Record<string, string>) => void;
  onReset: () => void;
}

export function AdvancedFilter({ open, onClose, fields, onApply, onReset }: AdvancedFilterProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleApply = () => {
    onApply(values);
    onClose();
  };

  const handleReset = () => {
    setValues({});
    onReset();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card border-l border-brand-border z-[70] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="px-6 py-5 border-b border-brand-border flex items-center justify-between bg-brand-surface/20">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-brand-primary" />
            <h2 className="font-bold text-brand-text">Advanced Filter</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-brand-muted hover:bg-brand-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="form-label">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  value={values[field.key] || ''}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  className="form-input"
                >
                  <option value="">Semua {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-brand-muted" />
                  </div>
                  <input
                    type={field.type}
                    value={values[field.key] || ''}
                    onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                    className="form-input pl-10"
                    placeholder={`Cari ${field.label.toLowerCase()}...`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-brand-border bg-brand-surface/10 grid grid-cols-2 gap-4">
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-sm font-bold text-brand-text hover:bg-gray-100 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-3 bg-brand-primary text-white rounded-xl text-sm font-bold hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/20 transition-all active:scale-95"
          >
            Terapkan
          </button>
        </div>
      </aside>
    </>
  );
}
