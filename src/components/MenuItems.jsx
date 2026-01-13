import React from 'react';

function MenuItems({ items, mealName }) {
  const mealLabels = {
    breakfast: 'อาหารเช้า',
    lunch: 'อาหารกลางวัน',
    dinner: 'อาหารเย็น',
    supper: 'อาหารว่าง'
  };

  if (!items || items.length === 0) {
    return (
      <div className="menu-items">
        <div className="empty-state">
          <p>ไม่มีเมนู{mealLabels[mealName]}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-items">
      <ul className="items-list">
        {items.map((item, index) => (
          <li key={index} className="menu-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuItems;
