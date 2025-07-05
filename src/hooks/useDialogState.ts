import { useCallback, useState } from "react";

export const useDialogState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState<number | null>(null);

  const openModal = useCallback((index: number) => {
    setCurrentPostIndex(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const navigateToNext = useCallback((maxIndex: number) => {
    setCurrentPostIndex((prev) =>
      prev !== null && prev < maxIndex - 1 ? prev + 1 : prev
    );
  }, []);

  const navigateToPrevious = useCallback(() => {
    setCurrentPostIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : prev
    );
  }, []);

  return {
    isModalOpen,
    currentPostIndex,
    openModal,
    closeModal,
    navigateToNext,
    navigateToPrevious,
  };
};
