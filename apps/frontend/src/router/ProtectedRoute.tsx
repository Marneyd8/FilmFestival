import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorageUser } from '../hooks/useAuth';

type ProtectedRouteProps = {
  Component: React.ComponentType;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ Component }) => {
  const [user, _setUser] = useLocalStorageUser();

  return user && user.isAdmin ? (
    <Component />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default ProtectedRoute;
