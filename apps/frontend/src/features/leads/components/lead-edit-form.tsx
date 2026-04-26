import { FormEvent } from 'react';
import { LEAD_STATUS_OPTIONS } from '../constants/leads.constants';
import type { EditLeadFormState } from '../utils/lead-form-mappers';

type LeadEditFormProps = {
  form: EditLeadFormState;
  formErrors: { name?: string; value?: string };
  apiError: string | null;
  successMessage: string | null;
  isSaving: boolean;
  isDeleting: boolean;
  onFormChange: (updater: (prev: EditLeadFormState) => EditLeadFormState) => void;
  onSubmit: () => Promise<void>;
  onDelete: () => Promise<void>;
};

export function LeadEditForm({
  form,
  formErrors,
  apiError,
  successMessage,
  isSaving,
  isDeleting,
  onFormChange,
  onSubmit,
  onDelete,
}: LeadEditFormProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Edit lead</h2>
        <button
          type="button"
          onClick={() => void onDelete()}
          disabled={isDeleting}
          className="rounded-md border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? 'Deleting...' : 'Delete lead'}
        </button>
      </div>

      <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="md:col-span-2">
          <label
            htmlFor="edit-lead-name"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Name *
          </label>
          <input
            id="edit-lead-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) =>
              onFormChange((prev) => ({ ...prev, name: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          />
          {formErrors.name ? (
            <p className="mt-1 text-sm text-rose-600">{formErrors.name}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="edit-lead-email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="edit-lead-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) =>
              onFormChange((prev) => ({ ...prev, email: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor="edit-lead-company"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Company
          </label>
          <input
            id="edit-lead-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(event) =>
              onFormChange((prev) => ({ ...prev, company: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor="edit-lead-status"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="edit-lead-status"
            name="status"
            autoComplete="off"
            value={form.status}
            onChange={(event) =>
              onFormChange((prev) => ({
                ...prev,
                status: event.target.value as EditLeadFormState['status'],
              }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          >
            {LEAD_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="edit-lead-value"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Value
          </label>
          <input
            id="edit-lead-value"
            name="value"
            type="number"
            autoComplete="off"
            min="0"
            step="1"
            value={form.value}
            onChange={(event) =>
              onFormChange((prev) => ({ ...prev, value: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          />
          {formErrors.value ? (
            <p className="mt-1 text-sm text-rose-600">{formErrors.value}</p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="edit-lead-notes"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Notes
          </label>
          <textarea
            id="edit-lead-notes"
            name="notes"
            autoComplete="off"
            rows={3}
            value={form.notes}
            onChange={(event) =>
              onFormChange((prev) => ({ ...prev, notes: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          />
        </div>

        {apiError ? (
          <p className="md:col-span-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {apiError}
          </p>
        ) : null}
        {successMessage ? (
          <p className="md:col-span-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {successMessage}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </section>
  );
}
