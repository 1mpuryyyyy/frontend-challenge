import type { Cat } from '../types';
import { useFavorites } from '../store/favorites';
import { Heart } from './Heart';
import './cat-card.css';

interface CatCardProps {
  cat: Cat;
}

export const CatCard = ({ cat }: CatCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(cat.id);
  };

  return (
    <div className="cat-card">
      <img src={cat.url} alt="cat" className="cat-card__image" />
      <Heart isFavorite={isFavorite(cat.id)} onClick={handleHeartClick} />
    </div>
  );
};
