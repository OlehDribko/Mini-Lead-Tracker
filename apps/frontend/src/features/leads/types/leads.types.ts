export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'IN_PROGRESS'
  | 'WON'
  | 'LOST';

export type LeadSortField = 'createdAt' | 'updatedAt';
export type SortOrder = 'asc' | 'desc';

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  status: LeadStatus;
  value: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadComment {
  id: string;
  leadId: string;
  text: string;
  createdAt: string;
}

export interface LeadsListResponse {
  items: Lead[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeadsQueryParams {
  page?: number;
  limit?: number;
  status?: LeadStatus;
  q?: string;
  sort?: LeadSortField;
  order?: SortOrder;
}

export interface CreateLeadPayload {
  name: string;
  email?: string;
  company?: string;
  status?: LeadStatus;
  value?: number;
  notes?: string;
}

export interface UpdateLeadPayload {
  name?: string;
  email?: string | null;
  company?: string | null;
  status?: LeadStatus;
  value?: number | null;
  notes?: string | null;
}

export interface CreateCommentPayload {
  text: string;
}
