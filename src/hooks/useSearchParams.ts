import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function useSearchParams<S>(): S {
  const { search } = useLocation();

  return useMemo<S>(() => {
    const searchParams = new URLSearchParams(search);
    return Object.fromEntries(searchParams.entries()) as unknown as S;
  }, [search]);
}

export default useSearchParams;
