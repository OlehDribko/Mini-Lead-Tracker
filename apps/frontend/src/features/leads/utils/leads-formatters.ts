export function formatLeadDate(value: string) {
  return new Date(value).toLocaleString();
}

export function formatLeadCurrency(value: number | null) {
  if (value === null) return '-';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}
