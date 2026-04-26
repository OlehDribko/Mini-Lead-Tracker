'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { LeadCommentsSection } from '@/features/leads/components/lead-comments-section';
import { LeadDetailsCard } from '@/features/leads/components/lead-details-card';
import { LeadEditForm } from '@/features/leads/components/lead-edit-form';
import { LeadStatusBadge } from '@/features/leads/components/lead-status-badge';
import { useLeadComments } from '@/features/leads/hooks/use-lead-comments';
import { useLeadDetails } from '@/features/leads/hooks/use-lead-details';

export default function LeadDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const leadId = params.id;

  const {
    lead,
    editForm,
    isLeadLoading,
    isNotFound,
    leadError,
    editApiError,
    editSuccess,
    editErrors,
    isSaving,
    isDeleting,
    setEditForm,
    markAsNotFound,
    updateCurrentLead,
    deleteCurrentLead,
  } = useLeadDetails(leadId);

  const {
    comments,
    isCommentsLoading,
    commentsError,
    commentError,
    commentApiError,
    isAddingComment,
    addComment,
  } = useLeadComments(leadId, !isNotFound, markAsNotFound);

  const handleDeleteLead = async () => {
    if (!lead) return;
    const confirmed = window.confirm(`Delete lead "${lead.name}"?`);
    if (!confirmed) return;

    const success = await deleteCurrentLead();
    if (success) {
      router.push('/leads');
    }
  };

  if (isLeadLoading) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <p className="text-sm text-slate-600">Loading lead details...</p>
      </main>
    );
  }

  if (isNotFound) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">Lead not found</h1>
          <p className="mt-2 text-sm text-slate-600">
            The lead does not exist or was removed.
          </p>
          <Link
            href="/leads"
            className="mt-4 inline-block rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to leads
          </Link>
        </div>
      </main>
    );
  }

  if (leadError || !lead || !editForm) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {leadError || 'Failed to load lead.'}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{lead.name}</h1>
          <div className="mt-2">
            <LeadStatusBadge status={lead.status} />
          </div>
        </div>
        <Link
          href="/leads"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to leads
        </Link>
      </header>

      <LeadDetailsCard lead={lead} />

      <LeadEditForm
        form={editForm}
        formErrors={editErrors}
        apiError={editApiError}
        successMessage={editSuccess}
        isSaving={isSaving}
        isDeleting={isDeleting}
        onFormChange={(updater) =>
          setEditForm((prev) => (prev ? updater(prev) : prev))
        }
        onSubmit={async () => {
          await updateCurrentLead();
        }}
        onDelete={handleDeleteLead}
      />

      <LeadCommentsSection
        comments={comments}
        isLoading={isCommentsLoading}
        loadError={commentsError}
        validationError={commentError}
        submitError={commentApiError}
        isSubmitting={isAddingComment}
        onSubmit={addComment}
      />
    </main>
  );
}
