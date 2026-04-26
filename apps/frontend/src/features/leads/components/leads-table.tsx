import Link from 'next/link';
import { formatLeadCurrency, formatLeadDate } from '../utils/leads-formatters';
import { LeadStatusBadge } from './lead-status-badge';
import type { Lead } from '../types/leads.types';

type LeadsTableProps = {
  leads: Lead[];
};

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Email</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Company</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Value</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Updated</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-slate-200">
              <td className="px-4 py-3">
                <Link
                  href={`/leads/${lead.id}`}
                  className="font-medium text-slate-900 hover:underline"
                >
                  {lead.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-slate-600">{lead.email || '-'}</td>
              <td className="px-4 py-3 text-slate-600">{lead.company || '-'}</td>
              <td className="px-4 py-3">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3 text-slate-600">
                {formatLeadCurrency(lead.value)}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {formatLeadDate(lead.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
