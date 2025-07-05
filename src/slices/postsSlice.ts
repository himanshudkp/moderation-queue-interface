import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../types";
import { mockPosts } from "../data/mockPosts";

interface PostsStore {
  posts: Post[];
  loading: boolean;
  error: string | null;
  statusFilter: "all" | "pending" | "approved" | "rejected";
  visibleCount: number;
  selectedPostIds: string[];
  isSelectAllChecked: boolean;
}

const initialState: PostsStore = {
  posts: mockPosts,
  loading: false,
  error: null,
  statusFilter: "all",
  visibleCount: 20,
  selectedPostIds: [],
  isSelectAllChecked: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    approvePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.status = "approved";
      }
    },

    rejectPost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.status = "rejected";
      }
    },

    setStatusFilter: (
      state,
      action: PayloadAction<"all" | "pending" | "approved" | "rejected">
    ) => {
      state.statusFilter = action.payload;
      state.visibleCount = 20; // Reset visible count when filter changes
    },

    setVisibleCount: (state, action: PayloadAction<number>) => {
      state.visibleCount = action.payload;
    },

    increaseVisibleCount: (state, action: PayloadAction<number>) => {
      state.visibleCount += action.payload;
    },

    resetVisibleCount: (state) => {
      state.visibleCount = 20;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    bulkApprove: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((postId) => {
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.status = "approved";
        }
      });
      state.selectedPostIds = [];
      state.isSelectAllChecked = false;
    },

    bulkReject: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((postId) => {
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.status = "rejected";
        }
      });
      state.selectedPostIds = [];
      state.isSelectAllChecked = false;
    },

    togglePostSelection: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const isSelected = state.selectedPostIds.includes(postId);

      if (isSelected) {
        state.selectedPostIds = state.selectedPostIds.filter(
          (id) => id !== postId
        );
      } else {
        state.selectedPostIds.push(postId);
      }

      state.isSelectAllChecked = false;
    },

    toggleSelectAll: (state, action: PayloadAction<string[]>) => {
      const visiblePostIds = action.payload;

      if (state.isSelectAllChecked) {
        state.selectedPostIds = state.selectedPostIds.filter(
          (id) => !visiblePostIds.includes(id)
        );
        state.isSelectAllChecked = false;
      } else {
        const newSelections = visiblePostIds.filter(
          (id) => !state.selectedPostIds.includes(id)
        );
        state.selectedPostIds.push(...newSelections);
        state.isSelectAllChecked = true;
      }
    },

    clearSelection: (state) => {
      state.selectedPostIds = [];
      state.isSelectAllChecked = false;
    },

    bulkApproveSelected: (state) => {
      state.selectedPostIds.forEach((postId) => {
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.status = "approved";
        }
      });
      state.selectedPostIds = [];
      state.isSelectAllChecked = false;
    },

    bulkRejectSelected: (state) => {
      state.selectedPostIds.forEach((postId) => {
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.status = "rejected";
        }
      });
      state.selectedPostIds = [];
      state.isSelectAllChecked = false;
    },
  },
});

export const {
  approvePost,
  rejectPost,
  setStatusFilter,
  setVisibleCount,
  increaseVisibleCount,
  resetVisibleCount,
  setLoading,
  setError,
  bulkApprove,
  bulkReject,
  togglePostSelection,
  toggleSelectAll,
  clearSelection,
  bulkApproveSelected,
  bulkRejectSelected,
} = postsSlice.actions;

export default postsSlice.reducer;
