import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

import type { GetColumnsData } from "@/features/kanban/interfaces";
import { GET_COLUMNS } from "@/features/kanban/queries";

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500;

const useBoardData = () => {
  const { data, loading, error, refetch } = useQuery<GetColumnsData>(GET_COLUMNS);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!error) {
      setAttempt(0);
      return;
    }
    if (attempt >= MAX_RETRIES) return;

    const timeout = setTimeout(
      () => {
        refetch().finally(() => setAttempt((count) => count + 1));
      },
      BASE_DELAY_MS * 2 ** attempt,
    );

    return () => clearTimeout(timeout);
  }, [error, attempt, refetch]);

  const isRetrying = Boolean(error) && attempt < MAX_RETRIES;

  return {
    columns: data?.columns ?? [],
    loading,
    error: isRetrying ? undefined : error,
    isRetrying,
    attempt,
    maxRetries: MAX_RETRIES,
  };
};

export { useBoardData };
