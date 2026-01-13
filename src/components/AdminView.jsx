import React, { useState } from 'react';
import { parseCSV, validateCSV } from '../utils/csvParser';
import { formatDate } from '../utils/dateUtils';
import '../styles/admin.css';

function AdminView({ onNavigateToMenu }) {
  const [csvFile, setCsvFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCsvFile(file);
    setErrors([]);
    setSuccess(false);
    setParsedData(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      
      const validation = validateCSV(content);
      if (!validation.valid) {
        setErrors(validation.errors);
        return;
      }

      const parsed = parseCSV(content);
      setParsedData(parsed);
    };
    reader.readAsText(file);
  };

  const handlePublish = () => {
    if (!parsedData) return;

    const dates = Object.keys(parsedData.menuData);
    if (dates.length === 0) {
      setErrors(['ไม่มีข้อมูลเมนูที่ถูกต้อง']);
      return;
    }

    const firstDate = dates[0];
    const [year, month] = firstDate.split('-');
    const filename = `${year}-${month}.json`;

    const dataStr = JSON.stringify(parsedData.menuData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSuccess(true);
    
    alert(`ดาวน์โหลดไฟล์ ${filename} สำเร็จ\n\nวิธีการติดตั้ง:\n1. วางไฟล์นี้ใน public/data/\n2. Build และ Deploy แอปพลิเคชัน`);
  };

  const renderPreview = () => {
    if (!parsedData) return null;

    const dates = Object.keys(parsedData.menuData).sort();
    
    return (
      <div className="preview-section">
        <h3>ตัวอย่าง ({dates.length} วัน)</h3>
        <div className="preview-stats">
          <span>รายการทั้งหมด: {parsedData.stats.totalItems}</span>
          <span>ช่วงวันที่: {dates[0]} ถึง {dates[dates.length - 1]}</span>
        </div>
        <div className="preview-data">
          {dates.slice(0, 3).map(date => (
            <div key={date} className="preview-day">
              <h4>{formatDate(date)}</h4>
              {Object.entries(parsedData.menuData[date]).map(([meal, items]) => (
                items.length > 0 && (
                  <div key={meal} className="preview-meal">
                    <strong>{meal}:</strong> {items.join(', ')}
                  </div>
                )
              ))}
            </div>
          ))}
          {dates.length > 3 && (
            <p className="preview-more">... และอีก {dates.length - 3} วัน</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>จัดการเมนู</h1>
        <button onClick={onNavigateToMenu} className="back-btn">
          ← กลับไปเมนู
        </button>
      </header>

      <div className="admin-content">
        <section className="upload-section">
          <h2>อัปโหลดไฟล์ CSV</h2>
          <p className="help-text">
            รูปแบบ CSV: date,meal,item<br/>
            มื้ออาหาร: breakfast, lunch, dinner, supper
          </p>
          
          <div className="file-upload">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="upload-btn">
              เลือกไฟล์ CSV
            </label>
            {csvFile && <span className="file-name">{csvFile.name}</span>}
          </div>

          {errors.length > 0 && (
            <div className="error-messages">
              <h3>ข้อผิดพลาด</h3>
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {success && (
            <div className="success-message">
              ส่งออกข้อมูลเมนูสำเร็จ! ทำตามคำแนะนำเพื่อติดตั้ง
            </div>
          )}
        </section>

        {parsedData && (
          <>
            {renderPreview()}
            <button 
              onClick={handlePublish} 
              className="publish-btn"
              disabled={success}
            >
              ดาวน์โหลด JSON
            </button>
          </>
        )}

        <section className="template-section">
          <h3>ตัวอย่าง CSV</h3>
          <pre className="css-template">
date,meal,item
2026-01-15,breakfast,ไข่เจียว
2026-01-15,breakfast,ข้าวสวย
2026-01-15,breakfast,น้ำส้ม
2026-01-15,lunch,ไก่ย่าง
2026-01-15,lunch,ข้าวหอมมะลิ
2026-01-15,lunch,ผัดผักรวม
2026-01-15,dinner,ปลาทอด
2026-01-15,dinner,มันบด
2026-01-15,supper,ซุปผัก
2026-01-15,supper,ขนมปัง
          </pre>
        </section>
      </div>
    </div>
  );
}

export default AdminView;