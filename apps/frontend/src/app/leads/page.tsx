'use client';

import Link from 'next/link';
import { LeadsCreateForm } from '@/features/leads/components/leads-create-form';
import { LeadsFiltersBar } from '@/features/leads/components/leads-filters-bar';
import { LeadsPaginationControls } from '@/features/leads/components/leads-pagination-controls';
import { LeadsTable } from '@/features/leads/components/leads-table';
import { useLeadsPage } from '@/features/leads/hooks/use-leads-page';

export default function LeadsPage() {
  const {
    leads,
    total,
    page,
    totalPages,
    limit,
    status,
    sort,
    order,
    searchInput,
    isLoading,
    listError,
    isCreating,
    createError,
    canGoPrev,
    canGoNext,
    setSearchInput,
    setStatus,
    setSort,
    setOrder,
    setLimit,
    applySearch,
    resetFilters,
    goToPreviousPage,
    goToNextPage,
    submitCreateLead,
  } = useLeadsPage();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>
          <p className="text-sm text-slate-600">Total leads: {total}</p>
        </div>
        <Link
          href="/"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to home
        </Link>
      </header>

      <LeadsCreateForm
        isSubmitting={isCreating}
        submitError={createError}
        onSubmit={submitCreateLead}
      />

      <LeadsFiltersBar
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        status={status}
        onStatusChange={setStatus}
        sort={sort}
        onSortChange={setSort}
        order={order}
        onOrderChange={setOrder}
        limit={limit}
        onLimitChange={setLimit}
        onApplySearch={applySearch}
        onReset={resetFilters}
      />

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-6 text-sm text-slate-600">Loading leads...</div>
        ) : null}

        {!isLoading && listError ? (
          <div className="p-6">
            <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {listError}
            </p>
          </div>
        ) : null}

        {!isLoading && !listError && leads.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">No leads found.</div>
        ) : null}

        {!isLoading && !listError && leads.length > 0 ? (
          <>
            <LeadsTable leads={leads} />
            <LeadsPaginationControls
              page={page}
              totalPages={totalPages}
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
              onPrevious={goToPreviousPage}
              onNext={goToNextPage}
            />
          </>
        ) : null}
      </section>
    </main>
  );
}
