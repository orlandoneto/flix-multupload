import { useCallback } from 'react';
import { toast, TypeOptions } from 'react-toastify';

export function useToast() {
  const showMessage = useCallback((msg: string, type: TypeOptions) => {
    toast(msg, { type });
  }, []);

  return {
    showMessage,
  };
}
