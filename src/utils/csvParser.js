const VALID_MEALS = ['breakfast', 'lunch', 'dinner', 'supper'];

export function validateCSV(content) {
  const errors = [];
  const lines = content.trim().split('\n');
  
  if (lines.length < 2) {
    errors.push('ไฟล์ CSV ว่างเปล่าหรือไม่มีข้อมูล');
    return { valid: false, errors };
  }
  
  const header = lines[0].trim().toLowerCase();
  if (header !== 'date,meal,item') {
    errors.push('Header ไม่ถูกต้อง ต้องเป็น: date,meal,item');
    return { valid: false, errors };
  }
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = line.split(',');
    if (parts.length !== 3) {
      errors.push(`บรรทัดที่ ${i + 1}: ต้องมี 3 คอลัมน์เท่านั้น`);
      continue;
    }
    
    const [date, meal, item] = parts.map(p => p.trim());
    
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errors.push(`บรรทัดที่ ${i + 1}: รูปแบบวันที่ไม่ถูกต้อง (ใช้ YYYY-MM-DD)`);
    }
    
    if (!VALID_MEALS.includes(meal.toLowerCase())) {
      errors.push(`บรรทัดที่ ${i + 1}: มื้ออาหารไม่ถูกต้อง '${meal}' (ใช้: breakfast, lunch, dinner, supper)`);
    }
    
    if (!item || item.length === 0) {
      errors.push(`บรรทัดที่ ${i + 1}: รายการอาหารต้องไม่ว่างเปล่า`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function parseCSV(content) {
  const lines = content.trim().split('\n');
  const menuData = {};
  let totalItems = 0;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const [date, meal, item] = line.split(',').map(p => p.trim());
    
    if (!menuData[date]) {
      menuData[date] = {
        breakfast: [],
        lunch: [],
        dinner: [],
        supper: []
      };
    }
    
    const mealLower = meal.toLowerCase();
    if (VALID_MEALS.includes(mealLower)) {
      menuData[date][mealLower].push(item);
      totalItems++;
    }
  }
  
  return {
    menuData,
    stats: {
      totalDays: Object.keys(menuData).length,
      totalItems
    }
  };
}
