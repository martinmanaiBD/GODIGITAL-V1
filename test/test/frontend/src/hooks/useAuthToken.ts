// src/hooks/useAuthToken.ts
import { useEffect, useState } from 'react';
import { getCookie } from '../utils/cookie';

const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchedToken = getCookie('token');
    if (fetchedToken) {
      setToken(fetchedToken);
    }
  }, []);

  const getAuthHeaders = () => {
    if (token) {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    } else {
      return {
        'Content-Type': 'application/json',
      };
    }
  };

  return {
    getAuthHeaders,
  };
};

export default useAuthToken;
