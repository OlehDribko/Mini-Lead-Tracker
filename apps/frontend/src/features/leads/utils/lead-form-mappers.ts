import type { Lead, LeadStatus, UpdateLeadPayload } from '../types/leads.types';

export type EditLeadFormState = {
  name: string;
  email: string;
  company: string;
  status: LeadStatus;
  value: string;
  notes: string;
};

export function toEditLeadForm(lead: Lead): EditLeadFormState {
  return {
    name: lead.name,
    email: lead.email ?? '',
    company: lead.company ?? '',
    status: lead.status,
    value: lead.value === null ? '' : String(lead.value),
    notes: lead.notes ?? '',
  };
}

export function buildUpdateLeadPayload(
  currentLead: Lead,
  form: EditLeadFormState,
): UpdateLeadPayload {
  const payload: UpdateLeadPayload = {};
  const trimmedName = form.name.trim();
  const trimmedEmail = form.email.trim();
  const trimmedCompany = form.company.trim();
  const trimmedNotes = form.notes.trim();
  const valueInput = form.value.trim();
  const normalizedValue = valueInput ? Number(valueInput) : null;

  if (trimmedName !== currentLead.name) payload.name = trimmedName;
  if (trimmedEmail !== (currentLead.email ?? '')) payload.email = trimmedEmail || null;
  if (trimmedCompany !== (currentLead.company ?? '')) payload.company = trimmedCompany || null;
  if (form.status !== currentLead.status) payload.status = form.status;
  if (normalizedValue !== currentLead.value) payload.value = normalizedValue;
  if (trimmedNotes !== (currentLead.notes ?? '')) payload.notes = trimmedNotes || null;

  return payload;
}
