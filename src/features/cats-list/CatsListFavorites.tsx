import { useMemo } from 'react';
import { CatCard } from '../../shared/ui/CatCard';
import { useFavorites } from '../../shared/store/favorites';
import { useCatsStore } from '../../shared/store/cats';
import './cats-list.css';

export const CatsListFavorites = () => {
  const { favorites } = useFavorites();
  const { allCats } = useCatsStore();

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

      {favoriteCats.length === 0 && <div className="cats-list__empty">Нет избранных котиков</div>}
    </div>
  );
};
