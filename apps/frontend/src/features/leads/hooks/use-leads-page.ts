import { useCallback, useEffect, useState } from 'react';
import { ApiError, createLead, listLeads } from '../api/leads-api';
import type {
  CreateLeadPayload,
  Lead,
  LeadSortField,
  LeadStatus,
  SortOrder,
} from '../types/leads.types';

type UseLeadsPageResult = {
  leads: Lead[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  status: LeadStatus | '';
  sort: LeadSortField;
  order: SortOrder;
  searchInput: string;
  isLoading: boolean;
  listError: string | null;
  isCreating: boolean;
  createError: string | null;
  canGoPrev: boolean;
  canGoNext: boolean;
  setSearchInput: (value: string) => void;
  setStatus: (value: LeadStatus | '') => void;
  setSort: (value: LeadSortField) => void;
  setOrder: (value: SortOrder) => void;
  setLimit: (value: number) => void;
  applySearch: () => void;
  resetFilters: () => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  submitCreateLead: (payload: CreateLeadPayload) => Promise<void>;
};

export function useLeadsPage(): UseLeadsPageResult {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimitState] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatusState] = useState<LeadStatus | ''>('');
  const [sort, setSortState] = useState<LeadSortField>('createdAt');
  const [order, setOrderState] = useState<SortOrder>('desc');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    setListError(null);

    try {
      const result = await listLeads({
        page,
        limit,
        status: status || undefined,
        q: search || undefined,
        sort,
        order,
      });
      setLeads(result.items);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (error) {
      if (error instanceof ApiError) {
        setListError(error.message);
      } else {
        setListError('Failed to fetch leads. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [limit, order, page, search, sort, status]);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  const applySearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  const resetFilters = () => {
    setSearchInput('');
    setSearch('');
    setStatusState('');
    setSortState('createdAt');
    setOrderState('desc');
    setLimitState(10);
    setPage(1);
  };

  const setStatus = (value: LeadStatus | '') => {
    setStatusState(value);
    setPage(1);
  };

  const setSort = (value: LeadSortField) => {
    setSortState(value);
    setPage(1);
  };

  const setOrder = (value: SortOrder) => {
    setOrderState(value);
    setPage(1);
  };

  const setLimit = (value: number) => {
    setLimitState(value);
    setPage(1);
  };

  const submitCreateLead = async (payload: CreateLeadPayload) => {
    setCreateError(null);
    setIsCreating(true);

    try {
      await createLead(payload);
      if (page !== 1) {
        setPage(1);
      } else {
        await loadLeads();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setCreateError(error.message);
      } else {
        setCreateError('Failed to create lead. Please try again.');
      }
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return {
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
    goToPreviousPage: () => setPage((prev) => Math.max(1, prev - 1)),
    goToNextPage: () => setPage((prev) => prev + 1),
    submitCreateLead,
  };
}
