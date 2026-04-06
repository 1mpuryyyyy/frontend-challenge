import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Cat } from '../types';

interface CatsStoreContextType {
  allCats: Cat[];
  addCats: (cats: Cat[]) => void;
}

const CatsStoreContext = createContext<CatsStoreContextType | undefined>(undefined);

export const CatsStoreProvider = ({ children }: { children: ReactNode }) => {
  const [allCats, setAllCats] = useState<Cat[]>([]);

  const addCats = (cats: Cat[]) => {
    setAllCats((prev) => [...prev, ...cats]);
  };

  return (
    <CatsStoreContext.Provider value={{ allCats, addCats }}>
      {children}
    </CatsStoreContext.Provider>
  );
};

export const useCatsStore = () => {
  const context = useContext(CatsStoreContext);
  if (!context) {
    throw new Error('useCatsStore must be used within CatsStoreProvider');
  }
  return context;
};
