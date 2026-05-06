import { useContext } from 'react';
import { AppContext, AppContextData } from '../../providers/app-provider';

export function useApp(): AppContextData {
  const context = useContext(AppContext);

  return context;
}
