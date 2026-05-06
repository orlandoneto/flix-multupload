import React, { createContext, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface AppContextData {
  isUserContributor: boolean;
  setUserContributor: (contributor: boolean) => boolean;
  tokenPage: string;
  generateTokenPage: () => string;
  hasNewUpload: (uploads: boolean) => void;
  newUpload: boolean;
}

export const AppContext = createContext<AppContextData>({} as AppContextData);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isUserContributor, setIsUserContributor] = useState<boolean>(false);
  const [tokenPage, setTokenPage] = useState<string>('');
  const [newUpload, setNewUpload] = useState<boolean>(false);

  const setUserContributor = useCallback((contributor: boolean): boolean => {
    setIsUserContributor(contributor);
    return contributor;
  }, []);



  const generateTokenPage = useCallback((): string => {
    const token = uuidv4();
    setTokenPage(token);
    return token;
  }, []);

  const hasNewUpload = useCallback((uploads: boolean) => {
    setNewUpload(uploads);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isUserContributor,
        setUserContributor,
        tokenPage,
        generateTokenPage,
        hasNewUpload,
        newUpload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
