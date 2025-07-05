import { useEffect } from "react";
import type { Post } from "../types";

type UseKeyboardShortcutsProps = {
  currentPost: Post | null;
  visiblePosts: Post[];
  isModalOpen: boolean;
  openModal: (index: number) => void;
  closeModal: () => void;
  approvePost: (postId: string) => void;
  rejectPost: (postId: string) => void;
  clearSelection: () => void;
};

export const useKeyboardShortcuts = ({
  currentPost,
  visiblePosts,
  isModalOpen,
  openModal,
  closeModal,
  approvePost,
  rejectPost,
  clearSelection,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isTyping =
        document.activeElement &&
        ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);

      if (isTyping) return;

      switch (e.key) {
        case "a":
        case "A":
          if (currentPost && currentPost.status !== "approved") {
            approvePost(currentPost.id);
          }
          break;
        case "r":
        case "R":
          if (currentPost && currentPost.status !== "rejected") {
            rejectPost(currentPost.id);
          }
          break;
        case " ":
          e.preventDefault();
          if (!isModalOpen && visiblePosts.length > 0) {
            openModal(0);
          }
          break;
        case "Escape":
          if (isModalOpen) {
            closeModal();
          } else {
            clearSelection();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentPost,
    visiblePosts,
    isModalOpen,
    openModal,
    closeModal,
    approvePost,
    rejectPost,
    clearSelection,
  ]);
};
