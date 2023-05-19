// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Business, createBusiness, updateBusiness, getBusiness } from '@component/API/business';
import { getAddress } from '@component/API/address';
import { User, loginUser, registerUser, RegisterUserPayload, fetchUser, updateUser, logoutUser, isSessionValid as isValidSession } from '@component/API/auth';


interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterUserPayload) => Promise<void>;
  logout: () => void;
  fetchUserData: () => Promise<void>;
  updateUser: (values: Partial<User>) => Promise<void>;
  initialCheckCompleted: boolean;
  isLoading: boolean;
  business: Business | null;
  createOrUpdateBusinessInfo: (businessInfo: Business, formData: FormData) => Promise<void>;
  address: any | null;
  setAddress: (address: any) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialCheckCompleted, setInitialCheckCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error during authentication:', error.response.data);
    }
  };

  const register = async (userData: RegisterUserPayload) => {
    try {
      const data = await registerUser(userData);

      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error during registration:', error.response.data);
    }
  };


  const logout = () => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  const isSessionValid = async () => {
    try {
      const validSession = await isValidSession();
      if (validSession) {
        const data = await fetchUser();
        if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Unexpected error occurred:', error);
    } finally {
      setInitialCheckCompleted(true);
    }
  }

  const fetchUserData = async () => {
    try {
      const data = await fetchUser();
      if (data.user) {
        setTimeout(() => {
          setUser(data.user);
          setIsAuthenticated(true);
        }, 100);

        // Fetch the address information
        try {
          const fetchedAddress = await getAddress(data.user.id);
          setTimeout(() => {
            setAddress(fetchedAddress);
          }, 100);
        } catch (error) {
          console.error('Error fetching address data:', error);
          setAddress(null);
        }

        // Fetch the business information
        try {
          const businessData = await getBusiness(data.user.id);
          setTimeout(() => {
            setBusiness(businessData.business);
          }, 100);
        } catch (error) {
          console.error('Error fetching business data:', error);
          setBusiness(null);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const updateUserInContext = async (userData: Partial<User>) => {

    try {
      const data = await updateUser(userData);
      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error updating user data:', error.response.data);
    }
  };


  const createOrUpdateBusinessInfo = async (businessInfo: Business, formData: FormData) => {
    setIsLoading(true);
    try {
      let updatedBusiness: Business;

      if (formData.has('document')) {
        // Append businessInfo to formData
        for (const key in businessInfo) {
          if (!formData.has(key)) {
            formData.append(key, businessInfo[key]);
          }
        }

        if (businessInfo.id) {
          console.log("Updating business with ID:", businessInfo.id);
          updatedBusiness = await updateBusiness(formData); // Pass formData with appended businessInfo
        } else {
          console.log("Creating new business");
          updatedBusiness = await createBusiness(formData); // Pass formData with appended businessInfo
        }
      } else {
        if (businessInfo.id) {
          console.log("Updating business with ID:", businessInfo.id);
          updatedBusiness = await updateBusiness(businessInfo); // Pass businessInfo as JSON
        } else {
          console.log("Creating new business");
          updatedBusiness = await createBusiness(businessInfo); // Pass businessInfo as JSON
        }
      }


      setBusiness(updatedBusiness);
    } catch (error) {
      console.error('Error creating or updating business info:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    const publicRoutes = ['/login', '/signup', '/'];
    if (!publicRoutes.includes(router.pathname)) {
      isSessionValid();
    } else {
      setInitialCheckCompleted(true);
    }
  }, [router]);


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        fetchUserData,
        isLoading,
        initialCheckCompleted,
        updateUser: updateUserInContext,
        business,
        createOrUpdateBusinessInfo,
        address,
        setAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
