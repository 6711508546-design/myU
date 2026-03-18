// ================= JS: Logic & Interactive Charts =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDiUc6y2M5FCu-tEnY1mgYGgVhu7H-PFnE", 
    authDomain: "mindu-9f4b0.firebaseapp.com",
    projectId: "mindu-9f4b0", 
    storageBucket: "mindu-9f4b0.firebasestorage.app",
    messagingSenderId: "237113799668", 
    appId: "1:237113799668:web:0842f44252a1650a3abfa1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let appData = [];
let currentSelectedMood = "";
let studentChartInstance = null; 

const moodEmojiMap = { 'ตัวมารดา': '👑', 'ว้าวุ่น': '😵‍💫', 'ฉ่ำ': '✨', 'นอยด์': '😞', 'จึ้ง': '🔥', 'ขิต': '💀', 'จะเครซี่': '🤯', 'กี่โมง': '⏰' };
const moodScores = { 'ตัวมารดา':5, 'ฉ่ำ':5, 'จึ้ง':4, 'ว้าวุ่น':3, 'กี่โมง':3, 'จะเครซี่':2, 'นอยด์':2, 'ขิต':1 };

// ระบบบันทึกข้อมูลและจุดพลุฉลอง
window.saveMood = async () => {
    if (!currentSelectedMood) { alert("อย่าลืมเลือกอารมณ์ก่อนนะ 😊"); return; }

    const record = {
        mood: currentSelectedMood,
        majorValue: document.getElementById('student-major').value,
        note: document.getElementById('student-note').value,
        timestamp: Date.now()
    };

    // Confetti Effect
    if(typeof confetti === 'function') confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

    try {
        await addDoc(collection(db, "mood_records"), record);
        document.getElementById('student-note').value = "";
        document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
        currentSelectedMood = "";
        
        // อัปเดต UI ทันที
        document.getElementById('student-stats-section').classList.remove('hidden');
        updateStudentChart(); 
        renderStudentHistory();
    } catch (e) { console.error("Error saving:", e); }
};

// กราฟแบบ Interactive บอกระดับอารมณ์เมื่อชี้ (Tooltips)
window.updateStudentChart = () => {
    const ctx = document.getElementById('studentChart').getContext('2d');
    const recentData = appData.slice(-10);
    const labels = recentData.map((d, i) => `ครั้งที่ ${i+1}`);
    const dataPoints = recentData.map(d => moodScores[d.mood] || 3);

    if(studentChartInstance) studentChartInstance.destroy();
    
    studentChartInstance = new Chart(ctx, {
        type: 'line',
        data: { 
            labels: labels, 
            datasets: [{ 
                label: 'ระดับพลังงานใจ', data: dataPoints, borderColor: '#457b9d', 
                backgroundColor: 'rgba(162, 210, 255, 0.4)', borderWidth: 3, 
                pointBackgroundColor: '#e63946', pointRadius: 6, fill: true, tension: 0.4 
            }] 
        },
        options: { 
            responsive: true, maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const exactMood = recentData[context.dataIndex].mood;
                            return ` อารมณ์: ${moodEmojiMap[exactMood]} ${exactMood} (ระดับ ${context.raw})`;
                        }
                    }
                }
            }
        }
    });
};

// ดึงข้อมูล Real-time
const q = query(collection(db, "mood_records"), orderBy("timestamp", "asc"));
onSnapshot(q, (snapshot) => {
    appData = snapshot.docs.map(doc => doc.data());
    if (!document.getElementById('student-stats-section').classList.contains('hidden')) { 
        updateStudentChart(); 
        renderStudentHistory(); 
    }
});
