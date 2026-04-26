'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyState } from './EmptyState';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  pageSize?: number;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'Belum ada data tersedia',
  pageSize: initialPageSize = 10,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  // Reset page when pageSize changes
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-2xl border border-brand-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-brand-surface dark:bg-brand-sidebar/20 border-b border-brand-border">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    'text-left px-6 py-4 text-[10px] font-bold text-brand-muted uppercase tracking-[0.15em]',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12">
                  <EmptyState description={emptyMessage} />
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  className="hover:bg-brand-surface/80 dark:hover:bg-brand-sidebar/10 transition-colors duration-150"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={cn('px-6 py-4 text-brand-text', col.className)}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key as string] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-2 gap-4">
        <div className="flex items-center gap-4">
          <p className="text-xs text-brand-muted whitespace-nowrap">
            Menampilkan{' '}
            <span className="font-bold text-brand-text">
              {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, data.length)}
            </span>{' '}
            dari <span className="font-bold text-brand-text">{data.length}</span> data
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-muted">Show</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="bg-brand-surface dark:bg-brand-sidebar/30 border border-brand-border rounded-lg px-2 py-1 text-xs font-bold text-brand-text focus:outline-none focus:border-brand-primary"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-brand-border bg-card text-brand-muted hover:text-brand-primary hover:border-brand-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                // Show first, last, and pages around current
                if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={cn(
                        'w-9 h-9 rounded-xl text-xs font-bold transition-all',
                        page === p
                          ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-110'
                          : 'text-brand-muted hover:bg-brand-surface dark:hover:bg-brand-sidebar/30 border border-transparent hover:border-brand-border'
                      )}
                    >
                      {p}
                    </button>
                  );
                }

                if (p === page - 2 || p === page + 2) {
                  return (
                    <span key={p} className="text-brand-muted px-1">
                      ...
                    </span>
                  );
                }

                return null;
              })}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-brand-border bg-card text-brand-muted hover:text-brand-primary hover:border-brand-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
