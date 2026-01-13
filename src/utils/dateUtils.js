// src/utils/dateUtils.js

/**
 * แปลงวันที่เป็น string รูปแบบ YYYY-MM-DD
 */
export function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * แปลง Date object เป็น string รูปแบบ YYYY-MM-DD
 */
export function getDay(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * แปลงวันที่เป็นชื่อไฟล์ JSON (YYYY-MM)
 */
export function getMonthFileName(dateString) {
  const [year, month] = dateString.split('-');
  return `${year}-${month}.json`;
}

/**
 * แปลง Date object เป็น year-month string (YYYY-MM)
 */
export function getYearMonth(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

/**
 * Format วันที่ให้อ่านง่าย (รองรับทั้งไทยและอังกฤษ)
 */
export function formatDate(date, language = 'th') {
  const dateObj = typeof date === 'string' ? new Date(date + 'T00:00:00') : date;
  
  if (language === 'th') {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return dateObj.toLocaleDateString('th-TH', options);
  } else {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return dateObj.toLocaleDateString('en-US', options);
  }
}

/**
 * เช็คว่าเป็นวันนี้หรือไม่
 */
export function isToday(date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

/**
 * หาว่าตอนนี้ควรเป็นมื้ออาหารอะไร
 */
export function getCurrentMeal() {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 16) return 'lunch';
  if (hour >= 16 && hour < 21) return 'dinner';
  return 'supper';
}

/**
 * รายการมื้อทั้งหมดพร้อมข้อมูล
 */
export const MEAL_TIMES = {
  breakfast: {
    id: 'breakfast',
    labelTh: 'อาหารเช้า',
    labelEn: 'Breakfast',
    icon: '🌅',
    color: '#f59e0b',
    startHour: 6,
    endHour: 11
  },
  lunch: {
    id: 'lunch',
    labelTh: 'อาหารกลางวัน',
    labelEn: 'Lunch',
    icon: '☀️',
    color: '#ef4444',
    startHour: 11,
    endHour: 16
  },
  dinner: {
    id: 'dinner',
    labelTh: 'อาหารเย็น',
    labelEn: 'Dinner',
    icon: '🌙',
    color: '#8b5cf6',
    startHour: 16,
    endHour: 21
  },
  supper: {
    id: 'supper',
    labelTh: 'อาหารว่าง',
    labelEn: 'Supper',
    icon: '⭐',
    color: '#06b6d4',
    startHour: 21,
    endHour: 6
  }
};