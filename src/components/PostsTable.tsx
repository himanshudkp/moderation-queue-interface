import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useActionTimeouts } from "../hooks/useActionTimeouts";
import { useDialogState } from "../hooks/useDialogState";
import { useConfirmatiomDialog } from "../hooks/useConfirmatiomDialog";
import {
  selectHasMorePosts,
  selectIsAllVisibleSelected,
  selectIsSomeVisibleSelected,
  selectSelectedPostIds,
  selectSelectedPostsCount,
  selectStatusCounts,
  selectStatusFilter,
  selectVisiblePostIds,
  selectVisiblePosts,
  storeError,
} from "../selecters/postsSelecters";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import {
  approvePost,
  bulkApproveSelected,
  bulkRejectSelected,
  clearSelection,
  rejectPost,
  resetVisibleCount,
  setLoading,
  setStatusFilter,
  togglePostSelection,
  toggleSelectAll,
} from "../slices/postsSlice";
import {
  INITIAL_LOADING_DELAY,
  UNDO_DELAY,
  type FilterType,
} from "../utils/utils";
import { toast } from "sonner";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import ErrorPage from "./ErrorPage";
import { FilterButtons } from "./FilterButtons";
import { BulkActionsBar } from "./BulkActionBar";
import SkeletonTable from "./SkeletonTable";
import { TableHeader } from "./TabHeader";
import { PostRow } from "./PostRow";
import SkeletonRow from "./SkeletonRow";
import NoPosts from "./NoPosts";
import PostDetailModal from "./ViewPostDialog";
import ConfirmationModal from "./ConfirmDialog";

const PostTable = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Custom hooks
  const {
    addTimeout,
    clearTimeout: clearActionTimeout,
    clearAllTimeouts,
  } = useActionTimeouts();
  const {
    isModalOpen,
    currentPostIndex,
    openModal,
    closeModal,
    navigateToNext,
    navigateToPrevious,
  } = useDialogState();
  const {
    confirmModalOpen,
    confirmMessage,
    confirmAction,
    openConfirmModal,
    closeConfirmModal,
  } = useConfirmatiomDialog();

  // Selectors
  const error = useSelector(storeError);
  const visiblePosts = useSelector(selectVisiblePosts);
  const statusCounts = useSelector(selectStatusCounts);
  const statusFilter = useSelector(selectStatusFilter);
  const hasMorePosts = useSelector(selectHasMorePosts);
  const selectedPostIds = useSelector(selectSelectedPostIds);
  const selectedPostsCount = useSelector(selectSelectedPostsCount);
  const isAllVisibleSelected = useSelector(selectIsAllVisibleSelected);
  const isSomeVisibleSelected = useSelector(selectIsSomeVisibleSelected);
  const visiblePostIds = useSelector(selectVisiblePostIds);

  // Infinite scroll
  const morePostLoading = useInfiniteScroll({
    containerRef,
    hasMorePosts,
    dispatch,
  });

  // Event handlers
  const handleStatusFilterChange = useCallback(
    (status: FilterType) => {
      dispatch(setStatusFilter(status));
    },
    [dispatch]
  );

  const handleApprovePost = useCallback(
    (postId: string) => {
      openConfirmModal("Are you sure you want to approve this post?", () =>
        dispatch(approvePost(postId))
      );
    },
    [dispatch, openConfirmModal]
  );

  const handleRejectPost = useCallback(
    (postId: string) => {
      openConfirmModal("Are you sure you want to reject this post?", () =>
        dispatch(rejectPost(postId))
      );
    },
    [dispatch, openConfirmModal]
  );

  const handleViewPost = useCallback(
    (postId: string) => {
      const index = visiblePosts.findIndex((p) => p.id === postId);
      if (index !== -1) {
        openModal(index);
      }
    },
    [visiblePosts, openModal]
  );

  const handleTogglePostSelection = useCallback(
    (postId: string) => {
      dispatch(togglePostSelection(postId));
    },
    [dispatch]
  );

  const handleToggleSelectAll = useCallback(() => {
    dispatch(toggleSelectAll(visiblePostIds));
  }, [dispatch, visiblePostIds]);

  const handleClearSelection = useCallback(() => {
    dispatch(clearSelection());
  }, [dispatch]);

  const handleBulkApprove = useCallback(() => {
    if (selectedPostsCount > 0) {
      openConfirmModal(`Approve ${selectedPostsCount} selected post(s)?`, () =>
        dispatch(bulkApproveSelected())
      );
    }
  }, [dispatch, selectedPostsCount, openConfirmModal]);

  const handleBulkReject = useCallback(() => {
    if (selectedPostsCount > 0) {
      openConfirmModal(`Reject ${selectedPostsCount} selected post(s)?`, () =>
        dispatch(bulkRejectSelected())
      );
    }
  }, [dispatch, selectedPostsCount, openConfirmModal]);

  const isPostSelected = useCallback(
    (postId: string) => selectedPostIds.includes(postId),
    [selectedPostIds]
  );

  const handleConfirmAction = useCallback(() => {
    closeConfirmModal();

    const actionId = crypto.randomUUID();
    const timeoutId = setTimeout(() => {
      confirmAction();
      clearActionTimeout(actionId);
    }, UNDO_DELAY);

    addTimeout(actionId, timeoutId);

    toast.success("Action will be performed in 5s", {
      description: "Click undo to cancel it.",
      action: {
        label: "Undo",
        onClick: () => {
          clearActionTimeout(actionId);
          toast.info("Action canceled");
        },
      },
    });
  }, [closeConfirmModal, confirmAction, addTimeout, clearActionTimeout]);

  // Effects
  useEffect(() => {
    setIsInitialLoading(true);
    dispatch(setLoading(true));
    dispatch(clearSelection());

    const timer = setTimeout(() => {
      dispatch(resetVisibleCount());
      setIsInitialLoading(false);
      dispatch(setLoading(false));
    }, INITIAL_LOADING_DELAY);

    return () => clearTimeout(timer);
  }, [statusFilter, dispatch]);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    currentPost:
      currentPostIndex !== null ? visiblePosts[currentPostIndex] : null,
    visiblePosts,
    isModalOpen,
    openModal,
    closeModal,
    approvePost: handleApprovePost,
    rejectPost: handleRejectPost,
    clearSelection: handleClearSelection,
  });

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="space-y-4">
      {!isInitialLoading && (
        <FilterButtons
          statusFilter={statusFilter}
          statusCounts={statusCounts}
          onFilterChange={handleStatusFilterChange}
        />
      )}

      {selectedPostsCount > 0 && (
        <BulkActionsBar
          selectedPostsCount={selectedPostsCount}
          onClearSelection={handleClearSelection}
          onBulkApprove={handleBulkApprove}
          onBulkReject={handleBulkReject}
        />
      )}

      <div
        ref={containerRef}
        className="overflow-x-auto rounded-lg shadow-md border border-gray-200 max-h-[500px]"
      >
        {isInitialLoading ? (
          <SkeletonTable />
        ) : (
          <table className="min-w-full text-sm text-left text-gray-700 bg-white">
            <TableHeader
              isAllVisibleSelected={isAllVisibleSelected}
              isSomeVisibleSelected={isSomeVisibleSelected}
              onToggleSelectAll={handleToggleSelectAll}
            />
            <tbody className="overflow-y-auto">
              {visiblePosts.map((post) => (
                <PostRow
                  key={post.id}
                  post={post}
                  isSelected={isPostSelected(post.id)}
                  onToggleSelection={handleTogglePostSelection}
                  onView={handleViewPost}
                  onApprove={handleApprovePost}
                  onReject={handleRejectPost}
                />
              ))}

              {morePostLoading && <SkeletonRow />}

              {visiblePosts.length === 0 && (
                <NoPosts statusFilter={statusFilter} />
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && currentPostIndex !== null && (
        <PostDetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          post={visiblePosts[currentPostIndex]}
          onNext={() => navigateToNext(visiblePosts.length)}
          onPrevious={navigateToPrevious}
          hasNext={currentPostIndex < visiblePosts.length - 1}
          hasPrevious={currentPostIndex > 0}
        />
      )}

      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmAction}
        title="Confirmation"
        message={confirmMessage}
        confirmText="Confirm"
      />
    </div>
  );
};

export default PostTable;
