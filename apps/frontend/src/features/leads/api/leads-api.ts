import type {
  CreateCommentPayload,
  CreateLeadPayload,
  Lead,
  LeadComment,
  LeadsListResponse,
  LeadsQueryParams,
  UpdateLeadPayload,
} from '../types/leads.types';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let payload: unknown;
    let message = 'Request failed';

    try {
      payload = await response.json();
      if (
        payload &&
        typeof payload === 'object' &&
        'message' in payload &&
        (typeof payload.message === 'string' || Array.isArray(payload.message))
      ) {
        if (typeof payload.message === 'string') {
          message = payload.message;
        } else {
          message = payload.message.join(', ');
        }
      }
    } catch {
      message = response.statusText || message;
    }

    throw new ApiError(message, response.status, payload);
  }

  return (await response.json()) as T;
}

export function listLeads(params: LeadsQueryParams): Promise<LeadsListResponse> {
  const query = new URLSearchParams();

  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.status) query.set('status', params.status);
  if (params.q) query.set('q', params.q);
  if (params.sort) query.set('sort', params.sort);
  if (params.order) query.set('order', params.order);

  const queryString = query.toString();
  return apiFetch<LeadsListResponse>(`/leads${queryString ? `?${queryString}` : ''}`);
}

export function createLead(payload: CreateLeadPayload): Promise<Lead> {
  return apiFetch<Lead>('/leads', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getLead(id: string): Promise<Lead> {
  return apiFetch<Lead>(`/leads/${id}`);
}

export function updateLead(id: string, payload: UpdateLeadPayload): Promise<Lead> {
  return apiFetch<Lead>(`/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteLead(id: string): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/leads/${id}`, {
    method: 'DELETE',
  });
}

export function listLeadComments(leadId: string): Promise<LeadComment[]> {
  return apiFetch<LeadComment[]>(`/leads/${leadId}/comments`);
}

export function createLeadComment(
  leadId: string,
  payload: CreateCommentPayload,
): Promise<LeadComment> {
  return apiFetch<LeadComment>(`/leads/${leadId}/comments`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
