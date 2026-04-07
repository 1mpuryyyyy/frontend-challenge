import { useState, useEffect, useMemo } from 'react';
import { CatCard } from '../../shared/ui/CatCard';
import { useFavorites } from '../../shared/store/favorites';
import { useCatsStore } from '../../shared/store/cats';
import { fetchCatById } from '../../shared/api/cats';
import './cats-list.css';

export const CatsListFavorites = () => {
  const { favorites } = useFavorites();
  const { allCats, getCatById, addCat } = useCatsStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadMissingFavorites = async () => {
      const missingIds = Array.from(favorites).filter((id) => !getCatById(id));

      if (missingIds.length === 0) return;

      setIsLoading(true);
      try {
        await Promise.all(
          missingIds.map(async (id) => {
            try {
              const cat = await fetchCatById(id);
              addCat(cat);
            } catch (error) {
              console.error(`Failed to load cat ${id}:`, error);
            }
          })
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadMissingFavorites();
  }, [favorites, getCatById, addCat]);

  const favoriteCats = useMemo(
    () => allCats.filter((cat) => favorites.has(cat.id)),
    [allCats, favorites]
  );

  return (
    <div className="cats-list-container">
      <div className="cats-list">
        {favoriteCats.map((cat, index) => (
          <CatCard key={`${cat.id}-${index}`} cat={cat} />
        ))}
      </div>

      {favoriteCats.length === 0 && !isLoading && (
        <div className="cats-list__empty">Нет избранных котиков</div>
      )}

      {isLoading && <div className="cats-list__loader"><p>... загружаем избранные котиков ...</p></div>}
    </div>
  );
};
