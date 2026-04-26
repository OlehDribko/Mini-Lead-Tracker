import { FormEvent, useState } from 'react';
import { LEAD_STATUS_OPTIONS } from '../constants/leads.constants';
import type { CreateLeadPayload, LeadStatus } from '../types/leads.types';

type CreateLeadFormState = {
  name: string;
  email: string;
  company: string;
  status: LeadStatus | '';
  value: string;
  notes: string;
};

const INITIAL_FORM: CreateLeadFormState = {
  name: '',
  email: '',
  company: '',
  status: '',
  value: '',
  notes: '',
};

type LeadsCreateFormProps = {
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: (payload: CreateLeadPayload) => Promise<void>;
};

export function LeadsCreateForm({
  isSubmitting,
  submitError,
  onSubmit,
}: LeadsCreateFormProps) {
  const [form, setForm] = useState<CreateLeadFormState>(INITIAL_FORM);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldError(null);

    if (!form.name.trim()) {
      setFieldError('Name is required.');
      return;
    }

    const payload: CreateLeadPayload = {
      name: form.name.trim(),
      email: form.email.trim() || undefined,
      company: form.company.trim() || undefined,
      status: form.status || undefined,
      notes: form.notes.trim() || undefined,
    };

    if (form.value.trim()) {
      payload.value = Number(form.value);
    }

    try {
      await onSubmit(payload);
      setForm(INITIAL_FORM);
    } catch {
      // Parent hook provides a readable API error message.
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Create lead</h2>
      <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="md:col-span-2">
          <label
            htmlFor="create-lead-name"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Name *
          </label>
          <input
            id="create-lead-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            placeholder="Jane Smith"
          />
          {fieldError ? <p className="mt-1 text-sm text-rose-600">{fieldError}</p> : null}
        </div>

        <div>
          <label
            htmlFor="create-lead-email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="create-lead-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            placeholder="jane@company.com"
          />
        </div>

        <div>
          <label
            htmlFor="create-lead-company"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Company
          </label>
          <input
            id="create-lead-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, company: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <label
            htmlFor="create-lead-status"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="create-lead-status"
            name="status"
            autoComplete="off"
            value={form.status}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                status: event.target.value as LeadStatus | '',
              }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          >
            <option value="">Default (NEW)</option>
            {LEAD_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="create-lead-value"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Value
          </label>
          <input
            id="create-lead-value"
            name="value"
            type="number"
            autoComplete="off"
            min="0"
            step="1"
            value={form.value}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, value: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            placeholder="5000"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="create-lead-notes"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Notes
          </label>
          <textarea
            id="create-lead-notes"
            name="notes"
            autoComplete="off"
            rows={3}
            value={form.notes}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, notes: event.target.value }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            placeholder="Initial notes..."
          />
        </div>

        {submitError ? (
          <p className="md:col-span-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {submitError}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating...' : 'Create lead'}
          </button>
        </div>
      </form>
    </section>
  );
}
