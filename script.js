/* ================= Modern UI & Responsive Design ================= */
:root {
    --text-main: #1d3557; 
    --text-light: #457b9d;
    --white: #ffffff; 
    --glass-bg: rgba(255, 255, 255, 0.85);
    --glass-border: rgba(255, 255, 255, 0.4);
    --shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}

* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Kanit', sans-serif; }

body {
    background: linear-gradient(-45deg, #ffc8dd, #a2d2ff, #cdb4db, #fdffb6);
    background-size: 300% 300%; 
    animation: gradientBG 15s ease infinite;
    color: var(--text-main); 
    min-height: 100vh; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    padding: 20px;
}

@keyframes gradientBG { 
    0% { background-position: 0% 50%; } 
    50% { background-position: 100% 50%; } 
    100% { background-position: 0% 50%; } 
}

/* Glassmorphism Container */
.container {
    width: 100%; max-width: 850px; 
    background: var(--glass-bg); 
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border-radius: 30px; 
    box-shadow: var(--shadow); 
    padding: 40px; 
    margin-top: 15px;
    border: 1px solid var(--glass-border);
    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeUp { 
    0% { transform: translateY(20px); opacity: 0; } 
    100% { transform: translateY(0); opacity: 1; } 
}

/* Typography */
h1 { font-size: 32px; font-weight: 700; color: #1d3557; text-align: center; margin-bottom: 10px; }
h2 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 25px; }

/* Buttons */
.btn { 
    padding: 16px 30px; border: none; border-radius: 20px; font-size: 18px; 
    cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); font-weight: 600; 
}
.btn-primary { 
    background: linear-gradient(135deg, #a2d2ff, #ffc8dd); 
    color: #1d3557; width: 100%; 
    box-shadow: 0 4px 15px rgba(162, 210, 255, 0.5); 
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(162, 210, 255, 0.7); }

/* Mood Grid & Buttons */
.mood-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 15px; margin-bottom: 30px; }
.mood-btn {
    background: rgba(255,255,255,0.7); border: 2px solid transparent; border-radius: 20px; padding: 18px 10px;
    font-size: 16px; font-weight: 600; color: #457b9d; cursor: pointer; transition: 0.3s; 
    display: flex; flex-direction: column; align-items: center; gap: 10px;
}
.mood-btn span.emoji { font-size: 42px; transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.mood-btn:hover { background: #fff; transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); } 
.mood-btn:hover span.emoji { transform: scale(1.25); }

/* Active Mood Colors */
.mood-btn[data-color="gold"].active { border-color: #ffd6a5; color: #e76f51; }
.mood-btn[data-color="green"].active { border-color: #caffbf; color: #2a9d8f; }
.mood-btn[data-color="pink"].active { border-color: #ffadad; color: #d62828; }
/* ... เพิ่มสีอื่นๆ ตามในไฟล์ HTML ได้เลย ... */

/* History Cards */
.history-card { 
    background: #fff; border-left: 6px solid var(--primary-blue); padding: 20px; 
    border-radius: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); margin-bottom: 15px;
}

.hidden { display: none !important; }

/* Responsive */
@media (max-width: 600px) {
    .container { padding: 25px; }
    .mood-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
}
    let text = `มีการบันทึกทั้งหมด <b>${total}</b> ครั้ง <br>`;
    text += `อารมณ์ส่วนใหญ่ของนักศึกษาคือ <b>"${maxMood}"</b> (${maxCount} คน)`;
    summaryBox.innerHTML = text;
}
