// src/hocs/withProtectedRoute.tsx
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@context/AuthContext';

const withProtectedRoute = (WrappedComponent: React.ComponentType) => {
  const ProtectedRoute: React.FC = (props) => {
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/login');
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return ProtectedRoute;
};

export default withProtectedRoute;
