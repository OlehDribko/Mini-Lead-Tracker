import { FormEvent, useState } from 'react';
import type { LeadComment } from '../types/leads.types';
import { formatLeadDate } from '../utils/leads-formatters';

type LeadCommentsSectionProps = {
  comments: LeadComment[];
  isLoading: boolean;
  loadError: string | null;
  validationError: string | null;
  submitError: string | null;
  isSubmitting: boolean;
  onSubmit: (text: string) => Promise<boolean>;
};

export function LeadCommentsSection({
  comments,
  isLoading,
  loadError,
  validationError,
  submitError,
  isSubmitting,
  onSubmit,
}: LeadCommentsSectionProps) {
  const [text, setText] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await onSubmit(text);
    if (success) {
      setText('');
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Comments</h2>

      <form className="mt-4" onSubmit={handleSubmit}>
        <label
          htmlFor="lead-comment-text"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Add comment
        </label>
        <textarea
          id="lead-comment-text"
          name="text"
          autoComplete="off"
          rows={3}
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
          placeholder="Write a note..."
        />
        {validationError ? <p className="mt-1 text-sm text-rose-600">{validationError}</p> : null}
        {submitError ? (
          <p className="mt-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {submitError}
          </p>
        ) : null}
        <div className="mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Adding...' : 'Add comment'}
          </button>
        </div>
      </form>

      <div className="mt-6 border-t border-slate-200 pt-4">
        {isLoading ? <p className="text-sm text-slate-600">Loading comments...</p> : null}

        {!isLoading && loadError ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {loadError}
          </p>
        ) : null}

        {!isLoading && !loadError && comments.length === 0 ? (
          <p className="text-sm text-slate-600">No comments yet.</p>
        ) : null}

        {!isLoading && !loadError && comments.length > 0 ? (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li key={comment.id} className="rounded-md border border-slate-200 p-3">
                <p className="text-sm text-slate-800">{comment.text}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {formatLeadDate(comment.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
