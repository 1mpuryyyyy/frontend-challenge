import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FavoritesProvider } from './shared/store/favorites';
import { CatsStoreProvider } from './shared/store/cats';
import App from './app/App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CatsStoreProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CatsStoreProvider>
  </StrictMode>
);
