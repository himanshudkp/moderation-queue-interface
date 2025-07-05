import { useCallback, useState } from "react";

export const useConfirmatiomDialog = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState("");

  const openConfirmModal = useCallback(
    (message: string, action: () => void) => {
      setConfirmMessage(message);
      setConfirmAction(() => action);
      setConfirmModalOpen(true);
    },
    []
  );

  const closeConfirmModal = useCallback(() => {
    setConfirmModalOpen(false);
  }, []);

  return {
    confirmModalOpen,
    confirmMessage,
    confirmAction,
    openConfirmModal,
    closeConfirmModal,
  };
};
