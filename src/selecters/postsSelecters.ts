import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

export const selectPosts = (state: RootState) => state.posts;
export const storeError = (state: RootState) => state.error;
export const selectLoading = (state: RootState) => state.loading;
export const selectError = (state: RootState) => state.error;
export const selectStatusFilter = (state: RootState) => state.statusFilter;
export const selectVisibleCount = (state: RootState) => state.visibleCount;
export const selectSelectedPostIds = (state: RootState) =>
  state.selectedPostIds;
export const selectIsSelectAllChecked = (state: RootState) =>
  state.isSelectAllChecked;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectStatusFilter],
  (posts, statusFilter) => {
    if (statusFilter === "all") {
      return posts;
    }
    return posts.filter((post) => post.status === statusFilter);
  }
);

export const selectVisiblePosts = createSelector(
  [selectFilteredPosts, selectVisibleCount],
  (filteredPosts, visibleCount) => {
    return filteredPosts.slice(0, visibleCount);
  }
);

export const selectStatusCounts = createSelector([selectPosts], (posts) => {
  return posts.reduce(
    (acc, post) => {
      acc[post.status]++;
      return acc;
    },
    {
      all: posts.length,
      pending: 0,
      approved: 0,
      rejected: 0,
    }
  );
});

export const selectHasMorePosts = createSelector(
  [selectFilteredPosts, selectVisibleCount],
  (filteredPosts, visibleCount) => {
    return visibleCount < filteredPosts.length;
  }
);

export const selectPostById = createSelector(
  [selectPosts, (_: RootState, postId: string) => postId],
  (posts, postId) => posts.find((post) => post.id === postId)
);

export const selectSelectedPostsCount = createSelector(
  [selectSelectedPostIds],
  (selectedPostIds) => selectedPostIds.length
);

export const selectSelectedPosts = createSelector(
  [selectPosts, selectSelectedPostIds],
  (posts, selectedPostIds) => {
    return posts.filter((post) => selectedPostIds.includes(post.id));
  }
);

export const selectIsPostSelected = createSelector(
  [selectSelectedPostIds, (_: RootState, postId: string) => postId],
  (selectedPostIds, postId) => selectedPostIds.includes(postId)
);

export const selectCanBulkApprove = createSelector(
  [selectSelectedPosts],
  (selectedPosts) => {
    return selectedPosts.some((post) => post.status !== "approved");
  }
);

export const selectCanBulkReject = createSelector(
  [selectSelectedPosts],
  (selectedPosts) => {
    return selectedPosts.some((post) => post.status !== "rejected");
  }
);

export const selectVisiblePostIds = createSelector(
  [selectVisiblePosts],
  (visiblePosts) => visiblePosts.map((post) => post.id)
);

export const selectIsAllVisibleSelected = createSelector(
  [selectVisiblePostIds, selectSelectedPostIds],
  (visiblePostIds, selectedPostIds) => {
    if (visiblePostIds.length === 0) return false;
    return visiblePostIds.every((id) => selectedPostIds.includes(id));
  }
);

export const selectIsSomeVisibleSelected = createSelector(
  [selectVisiblePostIds, selectSelectedPostIds],
  (visiblePostIds, selectedPostIds) => {
    return visiblePostIds.some((id) => selectedPostIds.includes(id));
  }
);
