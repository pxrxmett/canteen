import { formatDate, getTodayDateString, getMonthFileName } from './dateUtils';

export async function loadTodayMenu() {
  const today = getTodayDateString();
  const monthFile = getMonthFileName(today);
  
  try {
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
    throw new Error(error.message || 'ไม่สามารถโหลดข้อมูลเมนู');
  }
}