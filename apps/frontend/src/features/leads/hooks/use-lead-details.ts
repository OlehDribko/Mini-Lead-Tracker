import { useCallback, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ApiError, deleteLead, getLead, updateLead } from '../api/leads-api';
import type { Lead } from '../types/leads.types';
import {
  buildUpdateLeadPayload,
  toEditLeadForm,
  type EditLeadFormState,
} from '../utils/lead-form-mappers';

type UseLeadDetailsResult = {
  lead: Lead | null;
  editForm: EditLeadFormState | null;
  isLeadLoading: boolean;
  isNotFound: boolean;
  leadError: string | null;
  editApiError: string | null;
  editSuccess: string | null;
  editErrors: { name?: string; value?: string };
  isSaving: boolean;
  isDeleting: boolean;
  setEditForm: Dispatch<SetStateAction<EditLeadFormState | null>>;
  markAsNotFound: () => void;
  loadLead: () => Promise<void>;
  updateCurrentLead: () => Promise<boolean>;
  deleteCurrentLead: () => Promise<boolean>;
};

export function useLeadDetails(leadId: string): UseLeadDetailsResult {
  const [lead, setLead] = useState<Lead | null>(null);
  const [editForm, setEditForm] = useState<EditLeadFormState | null>(null);
  const [isLeadLoading, setIsLeadLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [editErrors, setEditErrors] = useState<{ name?: string; value?: string }>({});
  const [editApiError, setEditApiError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadLead = useCallback(async () => {
    setIsLeadLoading(true);
    setLeadError(null);
    setIsNotFound(false);

    try {
      const result = await getLead(leadId);
      setLead(result);
      setEditForm(toEditLeadForm(result));
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        setIsNotFound(true);
      } else if (error instanceof ApiError) {
        setLeadError(error.message);
      } else {
        setLeadError('Failed to load lead details.');
      }
    } finally {
      setIsLeadLoading(false);
    }
  }, [leadId]);

  useEffect(() => {
    void loadLead();
  }, [loadLead]);

  const updateCurrentLead = useCallback(async (): Promise<boolean> => {
    if (!lead || !editForm) return false;

    setEditErrors({});
    setEditApiError(null);
    setEditSuccess(null);

    const trimmedName = editForm.name.trim();
    if (!trimmedName) {
      setEditErrors({ name: 'Name is required.' });
      return false;
    }

    const valueInput = editForm.value.trim();
    if (valueInput && Number.isNaN(Number(valueInput))) {
      setEditErrors({ value: 'Value must be a valid number.' });
      return false;
    }

    const payload = buildUpdateLeadPayload(lead, editForm);
    if (Object.keys(payload).length === 0) {
      setEditSuccess('No changes to save.');
      return true;
    }

    setIsSaving(true);
    try {
      const updated = await updateLead(leadId, payload);
      setLead(updated);
      setEditForm(toEditLeadForm(updated));
      setEditSuccess('Lead updated successfully.');
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        setEditApiError(error.message);
      } else {
        setEditApiError('Failed to update lead.');
      }
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [editForm, lead, leadId]);

  const deleteCurrentLead = useCallback(async (): Promise<boolean> => {
    if (!lead) return false;

    setIsDeleting(true);
    setEditApiError(null);
    try {
      await deleteLead(leadId);
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        setEditApiError(error.message);
      } else {
        setEditApiError('Failed to delete lead.');
      }
      setIsDeleting(false);
      return false;
    }
  }, [lead, leadId]);

  const markAsNotFound = useCallback(() => {
    setIsNotFound(true);
  }, []);

  return {
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
    loadLead,
    updateCurrentLead,
    deleteCurrentLead,
  };
}
