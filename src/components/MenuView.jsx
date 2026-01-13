import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Sparkles } from 'lucide-react';
import MealTabs, { MEAL_TIMES } from './MealTabs';
import MenuItems from './MenuItems';
import { getCurrentMeal, formatDate, getYearMonth, getDay, isToday as checkIsToday } from '../utils/dateUtils';
import { loadMenuData, getMenuForDate } from '../utils/menuLoader';

const COLORS = {
  primary: { navy: '#444b8e', teal: '#2a9d8f' },
  accent: { sage: '#a8a47f' },
  neutral: { cream: '#ead7c1', warmWhite: '#fdfbf7', lightGray: '#f5f3ef' }
};

const MenuView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMeal, setSelectedMeal] = useState(getCurrentMeal());
  const [language, setLanguage] = useState('th');
  const [menuData, setMenuData] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // โหลดข้อมูลเมนูเมื่อเปลี่ยนเดือน
  useEffect(() => {
    const loadMenu = async () => {
      setIsLoading(true);
      const yearMonth = getYearMonth(selectedDate);
      
      // ตรวจสอบว่ามีข้อมูลเดือนนี้แล้วหรือยัง
      if (!menuData[yearMonth]) {
        const data = await loadMenuData(yearMonth);
        if (data) {
          setMenuData(prev => ({
            ...prev,
            [yearMonth]: data
          }));
        }
      }
      setIsLoading(false);
    };

    loadMenu();
  }, [selectedDate]);

  // Auto-update meal based on time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.toDateString() === selectedDate.toDateString()) {
        setSelectedMeal(getCurrentMeal());
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  const yearMonth = getYearMonth(selectedDate);
  const day = getDay(selectedDate);
  const currentMonthData = menuData[yearMonth] || {};
  const currentMenu = getMenuForDate(currentMonthData, day, selectedMeal);
  const isToday = checkIsToday(selectedDate);

  const changeDate = (days) => {
    setIsAnimating(true);
    setTimeout(() => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + days);
      setSelectedDate(newDate);
      setIsAnimating(false);
    }, 150);
  };

  const changeMeal = (meal) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedMeal(meal);
      setIsAnimating(false);
    }, 150);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
    setSelectedMeal(getCurrentMeal());
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-700"
      style={{ 
        background: `linear-gradient(135deg, ${COLORS.neutral.warmWhite} 0%, ${COLORS.neutral.cream}40 50%, ${COLORS.neutral.lightGray} 100%)`
      }}
    >
      {/* Header */}
      <header 
        className="sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
        style={{ 
          backgroundColor: 'rgba(253, 251, 247, 0.85)',
          borderColor: `${COLORS.primary.navy}15`,
          boxShadow: '0 1px 3px rgba(68, 75, 142, 0.08)'
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.primary.navy} 0%, ${COLORS.primary.teal} 100%)`
                }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 
                className="text-2xl md:text-3xl font-semibold tracking-tight"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.primary.navy} 0%, ${COLORS.primary.teal} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                The Diva's Menu
              </h1>
            </div>
            <button
              onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
              className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ 
                backgroundColor: `${COLORS.primary.navy}10`,
                color: COLORS.primary.navy,
                boxShadow: '0 2px 8px rgba(68, 75, 142, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = COLORS.primary.navy;
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = `${COLORS.primary.navy}10`;
                e.target.style.color = COLORS.primary.navy;
              }}
            >
              {language === 'th' ? 'English' : 'ไทย'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8 md:py-12">
        {/* Date Navigation */}
        <div 
          className="rounded-2xl p-6 md:p-8 mb-6 transition-all duration-300"
          style={{ 
            backgroundColor: 'white',
            boxShadow: '0 4px 24px rgba(68, 75, 142, 0.08)'
          }}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeDate(-1)}
              className="p-3 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
              style={{ backgroundColor: COLORS.neutral.lightGray }}
              aria-label="Previous day"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: COLORS.primary.navy }} />
            </button>
            
            <div className="flex-1 text-center px-4">
              <div 
                className="text-lg md:text-xl font-semibold mb-1"
                style={{ color: COLORS.primary.navy }}
              >
                {formatDate(selectedDate, language)}
              </div>
              {isToday && (
                <div 
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${COLORS.primary.teal}15`,
                    color: COLORS.primary.teal
                  }}
                >
                  <Clock className="w-4 h-4" />
                  {language === 'th' ? 'วันนี้' : 'Today'}
                </div>
              )}
            </div>

            <button
              onClick={() => changeDate(1)}
              className="p-3 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
              style={{ backgroundColor: COLORS.neutral.lightGray }}
              aria-label="Next day"
            >
              <ChevronRight className="w-6 h-6" style={{ color: COLORS.primary.navy }} />
            </button>
          </div>

          {!isToday && (
            <button
              onClick={goToToday}
              className="w-full mt-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.primary.teal} 0%, ${COLORS.primary.navy} 100%)`,
                color: 'white',
                boxShadow: '0 4px 16px rgba(42, 157, 143, 0.25)'
              }}
            >
              <Calendar className="w-4 h-4" />
              {language === 'th' ? 'กลับไปวันนี้' : 'Back to Today'}
            </button>
          )}
        </div>

        {/* Meal Tabs */}
        <MealTabs 
          selectedMeal={selectedMeal} 
          onMealChange={changeMeal} 
          language={language} 
        />

        {/* Menu Card */}
        <div 
          className="rounded-2xl overflow-hidden transition-all duration-300"
          style={{ 
            backgroundColor: 'white',
            boxShadow: '0 4px 24px rgba(68, 75, 142, 0.08)'
          }}
        >
          <div 
            className="p-6 md:p-8 border-b"
            style={{ 
              background: `linear-gradient(135deg, ${MEAL_TIMES[selectedMeal].color}15 0%, transparent 100%)`,
              borderColor: `${MEAL_TIMES[selectedMeal].color}20`
            }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold"
              style={{ color: COLORS.primary.navy }}
            >
              {language === 'th' 
                ? MEAL_TIMES[selectedMeal].labelTh 
                : MEAL_TIMES[selectedMeal].labelEn}
            </h2>
          </div>

          <div className="p-6 md:p-8">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">⏳</div>
                <p style={{ color: COLORS.accent.sage }}>
                  {language === 'th' ? 'กำลังโหลดเมนู...' : 'Loading menu...'}
                </p>
              </div>
            ) : (
              <MenuItems 
                menu={currentMenu} 
                selectedMeal={selectedMeal}
                language={language}
                isAnimating={isAnimating}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-12">
        <p 
          className="text-sm font-medium"
          style={{ color: COLORS.accent.sage }}
        >
          The Diva's Menu © 2026
        </p>
      </footer>
    </div>
  );
};

export default MenuView;
