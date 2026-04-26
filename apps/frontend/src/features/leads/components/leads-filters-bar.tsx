import { FormEvent } from 'react';
import {
  LEADS_LIMIT_OPTIONS,
  LEAD_STATUS_OPTIONS,
} from '../constants/leads.constants';
import type { LeadSortField, LeadStatus, SortOrder } from '../types/leads.types';

type LeadsFiltersBarProps = {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  status: LeadStatus | '';
  onStatusChange: (value: LeadStatus | '') => void;
  sort: LeadSortField;
  onSortChange: (value: LeadSortField) => void;
  order: SortOrder;
  onOrderChange: (value: SortOrder) => void;
  limit: number;
  onLimitChange: (value: number) => void;
  onApplySearch: () => void;
  onReset: () => void;
};

export function LeadsFiltersBar({
  searchInput,
  onSearchInputChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  order,
  onOrderChange,
  limit,
  onLimitChange,
  onApplySearch,
  onReset,
}: LeadsFiltersBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApplySearch();
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <form className="grid gap-3 md:grid-cols-6" onSubmit={handleSubmit}>
        <div className="md:col-span-2">
          <label
            htmlFor="leads-search"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Search
          </label>
          <input
            id="leads-search"
            name="search"
            autoComplete="off"
            value={searchInput}
            onChange={(event) => onSearchInputChange(event.target.value)}
            placeholder="name, email, company"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor="leads-status-filter"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="leads-status-filter"
            name="status"
            autoComplete="off"
            value={status}
            onChange={(event) => onStatusChange(event.target.value as LeadStatus | '')}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          >
            <option value="">All</option>
            {LEAD_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="leads-sort-field"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Sort
          </label>
          <select
            id="leads-sort-field"
            name="sort"
            autoComplete="off"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as LeadSortField)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          >
            <option value="createdAt">createdAt</option>
            <option value="updatedAt">updatedAt</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="leads-sort-order"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Order
          </label>
          <select
            id="leads-sort-order"
            name="order"
            autoComplete="off"
            value={order}
            onChange={(event) => onOrderChange(event.target.value as SortOrder)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          >
            <option value="desc">desc</option>
            <option value="asc">asc</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="leads-page-limit"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Limit
          </label>
          <select
            id="leads-page-limit"
            name="limit"
            autoComplete="off"
            value={String(limit)}
            onChange={(event) => onLimitChange(Number(event.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          >
            {LEADS_LIMIT_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-6 flex gap-2">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Apply search
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
