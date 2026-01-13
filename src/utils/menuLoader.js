// src/utils/menuLoader.js

import { formatDate, getTodayDateString, getMonthFileName } from './dateUtils';

/**
 * โหลดข้อมูลเมนูทั้งเดือนจาก JSON file
 * @param {string} yearMonth - รูปแบบ "2026-01"
 * @returns {Promise<Object>} - ข้อมูลเมนูทั้งเดือน
 */
export async function loadMenuData(yearMonth) {
  try {
    console.log('🔍 กำลังโหลดเมนู:', yearMonth);
    
    const response = await fetch(`/data/${yearMonth}.json`);
    
    if (!response.ok) {
      console.warn(`⚠️ ไม่พบไฟล์ /data/${yearMonth}.json`);
      return null;
    }
    
    const data = await response.json();
    console.log('✅ โหลดเมนูสำเร็จ:', yearMonth, data);
    
    return data;
  } catch (error) {
    console.error('❌ Error loading menu:', error);
    return null;
  }
}

/**
 * ดึงเมนูของวันและมื้อที่เลือก
 * @param {Object} monthData - ข้อมูลเมนูทั้งเดือน
 * @param {string} day - วันที่ เช่น "2026-01-15"
 * @param {string} meal - มื้ออาหาร เช่น "breakfast"
 * @returns {Array} - รายการอาหาร
 */
export function getMenuForDate(monthData, day, meal) {
  console.log('📅 ดึงเมนู:', { day, meal, hasData: !!monthData[day] });
  
  if (!monthData || !monthData[day]) {
    console.warn('⚠️ ไม่มีข้อมูลเมนูสำหรับวันที่:', day);
    return [];
  }
  
  const dayMenu = monthData[day];
  const items = dayMenu[meal] || [];
  
  console.log('🍽️ เมนูที่พบ:', items);
  
  return items;
}

/**
 * โหลดเมนูของวันนี้ (สำหรับ backward compatibility)
 */
export async function loadTodayMenu() {
  const today = getTodayDateString();
  const monthFile = getMonthFileName(today);
  
  try {
    console.log('🔍 โหลดเมนูวันนี้:', today);
    
    const response = await fetch(`/data/${monthFile}`);
    
    if (!response.ok) {
      throw new Error(`ไม่มีข้อมูลเมนูสำหรับเดือนนี้`);
    }
    
    const monthData = await response.json();
    
    if (!monthData[today]) {
      throw new Error(`ไม่มีเมนูสำหรับวันนี้`);
    }
    
    return {
      menu: monthData[today],
      date: formatDate(today)
    };
  } catch (error) {
    console.error('❌ Error:', error);
    throw new Error(error.message || 'ไม่สามารถโหลดข้อมูลเมนู');
  }
}