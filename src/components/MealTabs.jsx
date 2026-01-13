import React from 'react';

const COLORS = {
  primary: { navy: '#444b8e', teal: '#2a9d8f' },
  accent: { coral: '#f6948e', yellow: '#e9c46a', orange: '#f4a261', sage: '#a8a47f' },
  neutral: { cream: '#ead7c1', warmWhite: '#fdfbf7', lightGray: '#f5f3ef' }
};

export const MEAL_TIMES = {
  breakfast: { 
    start: 6, end: 10, 
    labelTh: 'มื้อเช้า', labelEn: 'Breakfast', 
    color: COLORS.accent.orange,
    gradient: `linear-gradient(135deg, ${COLORS.accent.orange} 0%, ${COLORS.accent.yellow} 100%)`
  },
  lunch: { 
    start: 11, end: 14, 
    labelTh: 'มื้อกลางวัน', labelEn: 'Lunch', 
    color: COLORS.accent.yellow,
    gradient: `linear-gradient(135deg, ${COLORS.accent.yellow} 0%, ${COLORS.neutral.cream} 100%)`
  },
  dinner: { 
    start: 17, end: 20, 
    labelTh: 'มื้อเย็น', labelEn: 'Dinner', 
    color: COLORS.accent.coral,
    gradient: `linear-gradient(135deg, ${COLORS.accent.coral} 0%, ${COLORS.accent.orange} 100%)`
  },
  supper: { 
    start: 20, end: 24, 
    labelTh: 'มื้อดึก', labelEn: 'Supper', 
    color: COLORS.accent.sage,
    gradient: `linear-gradient(135deg, ${COLORS.accent.sage} 0%, ${COLORS.primary.teal} 100%)`
  }
};

const MealTabs = ({ selectedMeal, onMealChange, language }) => {
  return (
    <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-3 min-w-min">
        {Object.entries(MEAL_TIMES).map(([meal, time]) => {
          const isSelected = selectedMeal === meal;
          return (
            <button
              key={meal}
              onClick={() => onMealChange(meal)}
              className="px-8 py-4 rounded-2xl font-medium text-sm md:text-base whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0"
              style={{
                background: isSelected ? time.gradient : 'white',
                color: isSelected ? 'white' : COLORS.primary.navy,
                boxShadow: isSelected 
                  ? `0 8px 24px ${time.color}40` 
                  : '0 2px 8px rgba(68, 75, 142, 0.08)',
                transform: isSelected ? 'translateY(-2px)' : 'translateY(0)'
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="font-semibold">
                  {language === 'th' ? time.labelTh : time.labelEn}
                </span>
                <span className="text-xs opacity-80">
                  {time.start}:00 - {time.end}:00
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MealTabs;
