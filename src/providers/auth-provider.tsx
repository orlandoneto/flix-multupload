import React, { createContext, useCallback, useState } from 'react';
import { AuthService } from '../services/AuthService';
import {
  LocalStorageForm,
  LocalStoragePlans,
  LocalStorageUser,
} from '../utils/store';

export interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<AuthData>;
  signOut(): void;
  getByUserId(id: number): Promise<User>;
  getByUserEmail(id: string): Promise<User>;
  createNewUser(user: User): Promise<User>;
  updateUser(user: User, userId: number, userType: string): Promise<User>;
  resetPasswordUser(email: string): Promise<ResetPasswordResponse>;
}

interface SignInCredentials {
  email: string;
  password: string;
  recaptchaToken: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children?: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthData>(() => {
    const result = LocalStorageUser.getUserData();
    if (result && result.user) {
      return { token: result.user.token, user: result.user, isLogged: true };
    }
    return { token: '', user: {} as User, isLogged: false };
  });

  const authService = new AuthService();

  const getByUserId = useCallback(async (id: number): Promise<User> => {
    return authService.getByUserId(id);
  }, []);

  const getByUserEmail = useCallback(async (email: string): Promise<User> => {
    return authService.getByUserEmail(email);
  }, []);

  const createNewUser = useCallback(async (userData: User): Promise<User> => {
    return authService.createNewUser(userData);
  }, []);

  const updateUser = useCallback(
    async (userData: User, userId: number, userType: string): Promise<User> => {
      return authService.updateUser(userData, userId, userType);
    },
    []
  );

  const resetPasswordUser = useCallback(async (email: string): Promise<ResetPasswordResponse> => {
    return authService.resetPasswordUser(email);
  }, []);

  const signIn = useCallback(async (credentials: SignInCredentials): Promise<AuthData> => {
    const response = await authService.signIn(credentials);
    const { token, data } = response;

    const userData = {
      ...data,
      token,
      isLogged: true,
    };

    LocalStorageUser.storeUserData(userData);
    setData({ token, ...userData });
    return { token, ...userData };
  }, []);

  const signOut = useCallback(() => {
    LocalStorageForm.removeFormData();
    LocalStoragePlans.removePlanData();
    LocalStorageUser.removeUserData();

    setData({} as AuthData);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        getByUserId,
        getByUserEmail,
        createNewUser,
        updateUser,
        resetPasswordUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
