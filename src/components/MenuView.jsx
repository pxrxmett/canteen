import React, { useEffect, useState } from 'react';
import MealTabs from './MealTabs';
import MenuItems from './MenuItems';
import { loadTodayMenu } from '../utils/menuLoader';
import { getCurrentMealTime } from '../utils/dateUtils';
import '../styles/menu.css';

function MenuView({ onNavigateToAdmin }) {
  const [menuData, setMenuData] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [dateText, setDateText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setSelectedMeal(getCurrentMealTime());
    loadTodayMenu()
      .then(res => {
        setMenuData(res.menu);
        setDateText(res.date);
      })
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="error-state">
        <h2>ไม่มีเมนูวันนี้</h2>
        <p>{error}</p>
        <button onClick={onNavigateToAdmin} className="admin-link-btn">
          ไปหน้าจัดการ
        </button>
      </div>
    );
  }

  if (!menuData) {
    return <div className="loading-state"><div className="loading-spinner" /></div>;
  }

  return (
    <div className="menu-container">
      <header className="menu-header">
        <h1>เมนูวันนี้</h1>
        <p className="menu-date">{dateText}</p>
        <button className="admin-link" onClick={onNavigateToAdmin}>จัดการ</button>
      </header>

      <MealTabs selectedMeal={selectedMeal} onSelectMeal={setSelectedMeal} />
      <MenuItems items={menuData[selectedMeal]} mealName={selectedMeal} />
    </div>
  );
}

export default MenuView;
