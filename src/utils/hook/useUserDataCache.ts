import { useState, useEffect } from 'react';
import { LocalStorageUser } from '../store';

export const useUserDataCache = () => {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const storedUser = LocalStorageUser.getUserData();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return user;
};
