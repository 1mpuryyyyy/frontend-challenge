import { useState } from 'react';
import { Navbar } from '../features/navbar/Navbar';
import { CatsListAll } from '../features/cats-list/CatsListAll';
import { CatsListFavorites } from '../features/cats-list/CatsListFavorites';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  return (
    <div className="app">
      <Navbar active={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'all' ? <CatsListAll /> : <CatsListFavorites />}
    </div>
  );
}

export default App;
