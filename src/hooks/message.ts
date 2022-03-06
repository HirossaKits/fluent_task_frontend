import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMessageOpen, setMessage } from '../features/main/mainSlice';

export default function useMessage() {
  const dispatch = useDispatch();

  return useCallback((message: string) => {
    dispatch(setMessage(message));
    dispatch(setMessageOpen(true));
  }, []);
}
