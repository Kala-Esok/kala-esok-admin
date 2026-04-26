/**
 * API Service Layer
 * ─────────────────
 * Centralized HTTP client ready for backend integration.
 * Replace BASE_URL with real API endpoint from environment variables.
 * All methods return typed responses and handle errors consistently.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
  headers?: Record<string, string>;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token, headers = {} } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError(res.status, error.message ?? 'Request failed');
  }

  return res.json() as Promise<T>;
}

// ─── Generic CRUD helpers ────────────────────────────────────
export const api = {
  get: <T>(endpoint: string, token?: string) => request<T>(endpoint, { method: 'GET', token }),

  post: <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>(endpoint, { method: 'POST', body, token }),

  put: <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>(endpoint, { method: 'PUT', body, token }),

  patch: <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>(endpoint, { method: 'PATCH', body, token }),

  delete: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, { method: 'DELETE', token }),
};

// ─── Domain-specific service endpoints ──────────────────────
// Replace dummy data imports with these calls once BE is ready.

export const userService = {
  getAll: (token?: string) => api.get('/users', token),
  getById: (id: string, token?: string) => api.get(`/users/${id}`, token),
  update: (id: string, data: unknown, token?: string) => api.patch(`/users/${id}`, data, token),
  delete: (id: string, token?: string) => api.delete(`/users/${id}`, token),
};

export const documentService = {
  getAll: (token?: string) => api.get('/documents', token),
  verify: (id: string, status: 'approved' | 'rejected', token?: string) =>
    api.patch(`/documents/${id}/verify`, { status }, token),
};

export const packageService = {
  getAll: (token?: string) => api.get('/packages', token),
  create: (data: unknown, token?: string) => api.post('/packages', data, token),
  update: (id: string, data: unknown, token?: string) => api.put(`/packages/${id}`, data, token),
  delete: (id: string, token?: string) => api.delete(`/packages/${id}`, token),
};

export const transactionService = {
  getAll: (token?: string) => api.get('/transactions', token),
  getById: (id: string, token?: string) => api.get(`/transactions/${id}`, token),
};

export const cemeteryService = {
  getAll: (token?: string) => api.get('/cemeteries', token),
  create: (data: unknown, token?: string) => api.post('/cemeteries', data, token),
  update: (id: string, data: unknown, token?: string) => api.put(`/cemeteries/${id}`, data, token),
};

export const blogService = {
  getAll: (token?: string) => api.get('/posts', token),
  create: (data: unknown, token?: string) => api.post('/posts', data, token),
  update: (id: string, data: unknown, token?: string) => api.put(`/posts/${id}`, data, token),
  delete: (id: string, token?: string) => api.delete(`/posts/${id}`, token),
};

export const dashboardService = {
  getStats: (token?: string) => api.get('/dashboard/stats', token),
  getActivity: (token?: string) => api.get('/dashboard/activity', token),
};
