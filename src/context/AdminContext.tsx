import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  toggleAdmin: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('adminMode') === 'true';
    } catch {
      return false;
    }
  });

  const toggleAdmin = () => {
    setIsAdmin((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('adminMode', String(next));
      } catch { /* ignore */ }
      return next;
    });
  };

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = (): AdminContextType => useContext(AdminContext);
