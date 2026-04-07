import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Cat } from '../types';

interface CatsStoreContextType {
  allCats: Cat[];
  addCats: (cats: Cat[]) => void;
  getCatById: (id: string) => Cat | undefined;
  addCat: (cat: Cat) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isAllCatsInitialized: boolean;
  setAllCatsInitialized: (initialized: boolean) => void;
}

const CatsStoreContext = createContext<CatsStoreContextType | undefined>(undefined);

export const CatsStoreProvider = ({ children }: { children: ReactNode }) => {
  const [allCats, setAllCats] = useState<Cat[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAllCatsInitialized, setAllCatsInitialized] = useState(false);

  const addCats = (cats: Cat[]) => {
    setAllCats((prev) => {
      const existingIds = new Set(prev.map((c) => c.id));
      const newCats = cats.filter((c) => !existingIds.has(c.id));
      return [...prev, ...newCats];
    });
  };

  const getCatById = (id: string) => allCats.find((cat) => cat.id === id);

  const addCat = (cat: Cat) => {
    setAllCats((prev) => {
      const exists = prev.some((c) => c.id === cat.id);
      if (exists) return prev;
      return [...prev, cat];
    });
  };

  return (
    <CatsStoreContext.Provider
      value={{
        allCats,
        addCats,
        getCatById,
        addCat,
        currentPage,
        setCurrentPage,
        isAllCatsInitialized,
        setAllCatsInitialized,
      }}
    >
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
