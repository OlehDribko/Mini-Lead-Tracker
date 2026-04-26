import { LEAD_STATUS_STYLES } from '../constants/leads.constants';
import type { LeadStatus } from '../types/leads.types';

type LeadStatusBadgeProps = {
  status: LeadStatus;
};

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${LEAD_STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
