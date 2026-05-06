import { useContext } from 'react';
import { AuthContext, AuthContextData } from '../../providers/auth-provider';

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
