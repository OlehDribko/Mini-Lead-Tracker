import { useCallback, useEffect, useState } from 'react';
import { ApiError, createLeadComment, listLeadComments } from '../api/leads-api';
import type { LeadComment } from '../types/leads.types';

type UseLeadCommentsResult = {
  comments: LeadComment[];
  isCommentsLoading: boolean;
  commentsError: string | null;
  commentError: string | null;
  commentApiError: string | null;
  isAddingComment: boolean;
  loadComments: () => Promise<void>;
  addComment: (text: string) => Promise<boolean>;
};

export function useLeadComments(
  leadId: string,
  shouldLoad: boolean,
  onLeadNotFound: () => void,
): UseLeadCommentsResult {
  const [comments, setComments] = useState<LeadComment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentApiError, setCommentApiError] = useState<string | null>(null);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const loadComments = useCallback(async () => {
    setIsCommentsLoading(true);
    setCommentsError(null);

    try {
      const result = await listLeadComments(leadId);
      setComments(result);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        onLeadNotFound();
      } else if (error instanceof ApiError) {
        setCommentsError(error.message);
      } else {
        setCommentsError('Failed to load comments.');
      }
    } finally {
      setIsCommentsLoading(false);
    }
  }, [leadId, onLeadNotFound]);

  useEffect(() => {
    if (!shouldLoad) return;
    void loadComments();
  }, [loadComments, shouldLoad]);

  const addComment = useCallback(
    async (text: string): Promise<boolean> => {
      setCommentError(null);
      setCommentApiError(null);

      const normalized = text.trim();
      if (!normalized) {
        setCommentError('Comment text is required.');
        return false;
      }
      if (normalized.length > 500) {
        setCommentError('Comment text must be at most 500 characters.');
        return false;
      }

      setIsAddingComment(true);
      try {
        await createLeadComment(leadId, { text: normalized });
        await loadComments();
        return true;
      } catch (error) {
        if (error instanceof ApiError) {
          setCommentApiError(error.message);
        } else {
          setCommentApiError('Failed to add comment.');
        }
        return false;
      } finally {
        setIsAddingComment(false);
      }
    },
    [leadId, loadComments],
  );

  return {
    comments,
    isCommentsLoading,
    commentsError,
    commentError,
    commentApiError,
    isAddingComment,
    loadComments,
    addComment,
  };
}
