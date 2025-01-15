import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PharmacyData {
  id: string;
  phoneNumber: string;
  name: string;
}

interface UserContextType {
  pharmacyData: PharmacyData | null;
  setPharmacyData: (data: PharmacyData | null) => void;
  clearPharmacyData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [pharmacyData, setPharmacyData] = useState<PharmacyData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('pharmacyData');
    if (storedData) {
      setPharmacyData(JSON.parse(storedData));
    }
  }, []);

  const clearPharmacyData = () => {
    setPharmacyData(null);
    localStorage.removeItem('pharmacyData');
  };

  return (
    <UserContext.Provider value={{ pharmacyData, setPharmacyData, clearPharmacyData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
