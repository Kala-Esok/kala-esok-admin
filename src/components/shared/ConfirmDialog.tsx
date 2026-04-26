'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title = 'Konfirmasi',
  description = 'Apakah kamu yakin ingin melanjutkan tindakan ini?',
  confirmLabel = 'Ya, Lanjutkan',
  cancelLabel = 'Batal',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [visible, setVisible] = useState(open);
  const overlayRef = useRef<HTMLDivElement>(null);

  if (open && !visible) {
    setVisible(true);
  }

  useEffect(() => {
    if (!open && visible) {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open, visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center transition-all duration-200',
        open ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Dialog */}
      <div
        className={cn(
          'relative bg-card rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 transition-all duration-200',
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        )}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div
            className={cn(
              'p-2.5 rounded-xl flex-shrink-0',
              variant === 'danger' ? 'bg-red-100' : 'bg-yellow-100'
            )}
          >
            <AlertTriangle
              className={cn('w-5 h-5', variant === 'danger' ? 'text-red-500' : 'text-yellow-500')}
            />
          </div>
          <div className="flex-1 pt-0.5">
            <h3 className="text-base font-semibold text-brand-text mb-1">{title}</h3>
            <p className="text-sm text-brand-muted leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-brand-muted border border-brand-border rounded-xl hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
            }}
            className={cn(
              'px-4 py-2 text-sm font-medium text-white rounded-xl transition-all active:scale-95',
              variant === 'danger'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-yellow-500 hover:bg-yellow-600'
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
