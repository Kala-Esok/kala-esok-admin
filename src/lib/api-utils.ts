import toast from 'react-hot-toast';

/**
 * Utility to simulate API calls with automatic toast notifications
 */
export const apiRequest = async <T>(
  action: () => Promise<T>,
  options: {
    loading?: string;
    success?: string;
    error?: string;
  } = {}
): Promise<T | null> => {
  const toastId = options.loading ? toast.loading(options.loading) : undefined;

  try {
    const result = await action();

    if (options.success) {
      toast.success(options.success, { id: toastId });
    } else if (toastId) {
      toast.dismiss(toastId);
    }

    return result;
  } catch (err: unknown) {
    const errorMessage =
      options.error || (err instanceof Error ? err.message : 'Terjadi kesalahan sistem');
    toast.error(errorMessage, { id: toastId });
    console.error('API Request Error:', err);
    return null;
  }
};

/**
 * Predefined common API error notifications
 */
export const notifyApiError = (method: 'GET' | 'POST' | 'PUT' | 'DELETE', message?: string) => {
  const messages = {
    GET: 'Gagal memuat data dari server',
    POST: 'Gagal menambahkan data baru',
    PUT: 'Gagal memperbarui data',
    DELETE: 'Gagal menghapus data',
  };

  toast.error(message || messages[method]);
};
