import React from 'react';
import { MEAL_TIMES } from './MealTabs';

const COLORS = {
  primary: { navy: '#444b8e', teal: '#2a9d8f' },
  accent: { sage: '#a8a47f' }
};

const MenuItems = ({ menu, selectedMeal, language, isAnimating }) => {
  if (!menu || menu.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-7xl mb-6 opacity-20">🍽️</div>
        <p 
          className="text-lg font-medium"
          style={{ color: COLORS.accent.sage }}
        >
          {language === 'th' 
            ? 'ยังไม่มีเมนูสำหรับมื้อนี้' 
            : 'No menu available for this meal'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {menu.map((item, index) => (
        <div
          key={index}
          className="group py-5 border-b last:border-b-0 transition-all duration-300"
          style={{
            borderColor: `${COLORS.primary.navy}08`,
            animation: isAnimating ? 'none' : `slideInUp 0.4s ease-out ${index * 0.08}s both`,
            opacity: isAnimating ? 0.3 : 1
          }}
        >
          <div className="flex gap-6 items-start">
            <div 
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110"
              style={{ 
                background: `linear-gradient(135deg, ${MEAL_TIMES[selectedMeal].color}20 0%, ${MEAL_TIMES[selectedMeal].color}40 100%)`,
                color: COLORS.primary.navy
              }}
            >
              {index + 1}
            </div>
            <div className="flex-1 pt-1">
              <div 
                className="text-xl md:text-2xl font-semibold mb-2 leading-relaxed"
                style={{ color: COLORS.primary.navy }}
              >
                {language === 'th' ? item.th : item.en}
              </div>
              <div 
                className="text-base md:text-lg leading-relaxed"
                style={{ color: COLORS.accent.sage }}
              >
                {language === 'th' ? item.en : item.th}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
