import { useCallback, useRef } from "react";

export const useActionTimeouts = () => {
  const actionTimeouts = useRef<Map<string, any>>(new Map());

  const addTimeout = useCallback((actionId: string, timeoutId: any) => {
    actionTimeouts.current.set(actionId, timeoutId);
  }, []);

  const clearTimeout = useCallback((actionId: string) => {
    const timeout = actionTimeouts.current.get(actionId);
    if (timeout) {
      clearTimeout(timeout);
      actionTimeouts.current.delete(actionId);
    }
  }, []);

  const clearAllTimeouts = useCallback(() => {
    actionTimeouts.current.forEach(clearTimeout);
    actionTimeouts.current.clear();
  }, []);

  return { addTimeout, clearTimeout, clearAllTimeouts };
};
