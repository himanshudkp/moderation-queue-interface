import { useCallback, useEffect, useState } from "react";
import {
  LOAD_MORE_DELAY,
  LOAD_MORE_THRESHOLD,
  POSTS_PER_BATCH,
} from "../utils/utils";
import { increaseVisibleCount } from "../slices/postsSlice";

interface UseInfiniteScrollProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  hasMorePosts: boolean;
  dispatch: any;
}

export const useInfiniteScroll = ({
  containerRef,
  dispatch,
  hasMorePosts,
}: UseInfiniteScrollProps) => {
  const [morePostLoading, setMorePostLoading] = useState(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || morePostLoading || !hasMorePosts) return;

    const nearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      LOAD_MORE_THRESHOLD;

    if (nearBottom) {
      setMorePostLoading(true);

      setTimeout(() => {
        dispatch(increaseVisibleCount(POSTS_PER_BATCH));
        setMorePostLoading(false);
      }, LOAD_MORE_DELAY);
    }
  }, [dispatch, hasMorePosts, morePostLoading, containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return morePostLoading;
};
