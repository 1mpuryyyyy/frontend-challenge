import './navbar.css';

interface NavbarProps {
  active: 'all' | 'favorites';
  onTabChange: (tab: 'all' | 'favorites') => void;
}

export const Navbar = ({ active, onTabChange }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <button
          className={`navbar__button navbar__button__all ${active === 'all' ? 'navbar__button--active' : ''}`}
          onClick={() => onTabChange('all')}
        >
          Все котики
        </button>
        <button
          className={`navbar__button navbar__button__favorites ${active === 'favorites' ? 'navbar__button--active' : ''}`}
          onClick={() => onTabChange('favorites')}
        >
          Любимые котики
        </button>
      </div>
    </nav>
  );
};
