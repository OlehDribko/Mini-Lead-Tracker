import { formatLeadCurrency, formatLeadDate } from '../utils/leads-formatters';
import type { Lead } from '../types/leads.types';

type LeadDetailsCardProps = {
  lead: Lead;
};

export function LeadDetailsCard({ lead }: LeadDetailsCardProps) {
  const detailRows = [
    { label: 'Email', value: lead.email || '-' },
    { label: 'Company', value: lead.company || '-' },
    { label: 'Value', value: formatLeadCurrency(lead.value) },
    { label: 'Notes', value: lead.notes || '-' },
    { label: 'Created at', value: formatLeadDate(lead.createdAt) },
    { label: 'Updated at', value: formatLeadDate(lead.updatedAt) },
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Lead details</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {detailRows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {row.label}
            </dt>
            <dd className="mt-1 text-sm text-slate-800">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
