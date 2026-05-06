import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LocalStorageUser } from '~/utils/store';

export const ProtectedRoute: React.FC = () => {
  const user = LocalStorageUser.getUserData();

  if (!user || !user.token) {
    return <Navigate to="/Login" replace />;
  }

  return <Outlet />;
};
