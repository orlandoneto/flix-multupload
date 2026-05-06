import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LocalStorageUser } from '~/utils/store';

export const PublicRoute: React.FC = () => {
  const user = LocalStorageUser.getUserData();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
