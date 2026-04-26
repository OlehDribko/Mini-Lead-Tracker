type LeadsPaginationControlsProps = {
  page: number;
  totalPages: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function LeadsPaginationControls({
  page,
  totalPages,
  canGoPrev,
  canGoNext,
  onPrevious,
  onNext,
}: LeadsPaginationControlsProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
      <p className="text-sm text-slate-600">
        Page {page} of {Math.max(totalPages, 1)}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!canGoPrev}
          onClick={onPrevious}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={onNext}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
