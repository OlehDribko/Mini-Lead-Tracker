import type { LeadStatus } from '../types/leads.types';

export const LEAD_STATUS_OPTIONS: Array<{ label: string; value: LeadStatus }> = [
  { label: 'NEW', value: 'NEW' },
  { label: 'CONTACTED', value: 'CONTACTED' },
  { label: 'IN_PROGRESS', value: 'IN_PROGRESS' },
  { label: 'WON', value: 'WON' },
  { label: 'LOST', value: 'LOST' },
];

export const LEADS_LIMIT_OPTIONS = [5, 10, 20, 50];

export const LEAD_STATUS_STYLES: Record<LeadStatus, string> = {
  NEW: 'bg-slate-100 text-slate-700',
  CONTACTED: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  WON: 'bg-emerald-100 text-emerald-700',
  LOST: 'bg-rose-100 text-rose-700',
};
