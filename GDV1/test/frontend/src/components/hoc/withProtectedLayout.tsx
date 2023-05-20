// src/hocs/withProtectedLayout.tsx
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@context/AuthContext';

const withProtectedLayout = (
    WrappedComponent: React.ComponentType,
    Layout: React.ComponentType
  ) => {
    const ProtectedLayout: React.FC = (props) => {
      const { isAuthenticated, initialCheckCompleted } = useContext(AuthContext); // Add initialCheckCompleted
      const router = useRouter();
  
      useEffect(() => {
        if (!isAuthenticated && initialCheckCompleted) { // Check initialCheckCompleted
          router.replace('/login');
        }
      }, [isAuthenticated, router, initialCheckCompleted]); // Add initialCheckCompleted
  
      return isAuthenticated && initialCheckCompleted ? ( // Check initialCheckCompleted
        <Layout>
          <WrappedComponent {...props} />
        </Layout>
      ) : null;
    };
  
    return ProtectedLayout;
  };
  
  export default withProtectedLayout;