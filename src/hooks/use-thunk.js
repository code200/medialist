import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';

export function useThunk(thunk) {
  // param is thunk function to execute and dispatch.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // wrap in useCallback so it has a stable identity
  const runThunk = useCallback(
    arg => {
      // pass an arg for delete user case.
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap() // get a more typical promise
        .catch(err => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk],
  );

  return [runThunk, isLoading, error];
}
