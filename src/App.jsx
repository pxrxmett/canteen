import React, { useState, useEffect } from 'react';
import MenuView from './components/MenuView';
import AdminView from './components/AdminView';

function App() {
  const [currentPage, setCurrentPage] = useState('menu');

  useEffect(() => {
    const syncRoute = () =>
      setCurrentPage(window.location.pathname.includes('admin') ? 'admin' : 'menu');

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const navigateTo = (page) => {
    window.history.pushState({}, '', page === 'admin' ? '/admin' : '/');
    setCurrentPage(page);
  };

  return currentPage === 'menu'
    ? <MenuView onNavigateToAdmin={() => navigateTo('admin')} />
    : <AdminView onNavigateToMenu={() => navigateTo('menu')} />;
}

export default App;
