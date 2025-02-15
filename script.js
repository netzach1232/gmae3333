function updateCardSelectors() {
    const numCards = document.getElementById('numCards').value;
    const container = document.getElementById('cardSelections');
    container.innerHTML = '';

    for (let i = 0; i < numCards; i++) {
        const select = document.createElement('select');
        select.classList.add('cardSelect');

        ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'].forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = `🃏 ${value}`;
            select.appendChild(option);
        });

        container.appendChild(select);
    }
}

// הפעלת הפונקציה אוטומטית עם טעינת הדף
window.onload = function () {
    document.getElementById('numCards').value = "1"; // קביעת ערך ברירת מחדל ל-1 קלף
    updateCardSelectors();
};

function startLottery() {
    const numCards = parseInt(document.getElementById('numCards').value);
    const betAmount = parseInt(document.getElementById('betAmount').value);
    const selectedCards = Array.from(document.getElementsByClassName('cardSelect')).map(sel => sel.value.replace('🃏 ', ''));

    let drawnCard = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'][Math.floor(Math.random() * 8)];
    const resultElement = document.getElementById('result');

    // רשימת צבעים אקראיים למעט לבן
    const colors = ['red', 'blue', 'green', 'purple', 'orange'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];

    resultElement.innerHTML = `<div style='display: flex; align-items: center; justify-content: center; gap: 1px;'>
            <span style='font-size: 1.3em; margin-left: 50%;'>:תוצאה</span><span style='font-size: 1.3em;'>🎰</span>
            <strong style='font-size: 2em; color: ${randomColor}; width: 100px; text-align: center; position: relative; right: 180px;'>${drawnCard}</strong>
        </div>`;

    let balance = parseInt(document.getElementById('balance').innerText);
    let totalBet = parseInt(document.getElementById('totalBet').innerText);
    let totalDraws = parseInt(document.getElementById('totalDraws').innerText);
    totalDraws++;

    let betTotal = betAmount * numCards;
    totalBet += betTotal;

    let messageElement = document.createElement('span');

    if (selectedCards.includes(drawnCard)) {
        balance += betAmount * 5 - betTotal; // מתקן את החישוב כך שתמיד יהיה x5
        messageElement.innerHTML = "🎉 זכית!";
        messageElement.style.color = "green";
    } else {
        balance -= betTotal;
        messageElement.innerHTML = "❌ הפסדת! 😔";
        messageElement.style.color = "red";
    }

    resultElement.appendChild(document.createElement("br"));
    resultElement.appendChild(messageElement);

    document.getElementById('balance').innerText = balance;
    document.getElementById('totalBet').innerText = totalBet;
    document.getElementById('totalDraws').innerText = totalDraws;

    // העלמת הודעת ניצחון/הפסד לאחר 2.5 שניות
    setTimeout(() => {
        messageElement.remove();
    }, 2500);
}

function resetGame() {
    // איפוס ערכי המשחק
    document.getElementById('balance').innerText = "0"; // מאזן התחלתי
    document.getElementById('totalBet').innerText = "0"; // אפס הימורים
    document.getElementById('totalDraws').innerText = "0"; // אפס הגרלות
    document.getElementById('numCards').value = "1"; // חזרה לברירת מחדל של קלף אחד
    document.getElementById('betAmount').value = "5"; // שימוש ב-0 במקום ערך ריק
    document.getElementById('result').innerHTML = ""; // ניקוי תוצאות ההגרלה

    updateCardSelectors(); // עדכון שדה בחירת הקלפים
}

function startLottery() {
    const numCards = parseInt(document.getElementById('numCards').value);
    const betAmount = parseInt(document.getElementById('betAmount').value);
    const selectedCards = Array.from(document.getElementsByClassName('cardSelect')).map(sel => sel.value.replace('🃏 ', ''));

    const possibleCards = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const resultElement = document.getElementById('result');

    // רשימת צבעים אקראיים למעט לבן
    const colors = ['red', 'blue', 'green', 'purple', 'orange'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];

    let balance = parseInt(document.getElementById('balance').innerText);
    let totalBet = parseInt(document.getElementById('totalBet').innerText);
    let totalDraws = parseInt(document.getElementById('totalDraws').innerText);
    totalDraws++;

    let betTotal = betAmount * numCards;
    totalBet += betTotal;

    let messageElement = document.createElement('span');

    let index = 0; // מיקום קלף באנימציה
    let speed = 100; // מהירות התחלתית במילישניות
    let spinCount = 0; // מספר סיבובים לפני עצירה

    const interval = setInterval(() => {
        let drawnCard = possibleCards[index]; // בחירת קלף לסיבוב
        randomColor = colors[Math.floor(Math.random() * colors.length)];

        resultElement.innerHTML = `<div style='display: flex; align-items: center; justify-content: center; gap: 1px;'>
                <span style='font-size: 1.3em; margin-left: 50%;'>:תוצאה</span><span style='font-size: 1.3em;'>🎰</span>
                <strong style='font-size: 2em; color: ${randomColor}; width: 100px; text-align: center; position: relative; right: 180px;'>${drawnCard}</strong>
            </div>`;

        index = (index + 1) % possibleCards.length; // מעבר לקלף הבא
        spinCount++;

        // האטת הסיבוב לקראת העצירה
        if (spinCount > 2) {
            speed += 50;
        }
        if (spinCount > 2) {
            speed += 80;
        }

        if (speed >= 600) { // כשהמהירות מגיעה לסף מסוים, עצור ובחר קלף אחרון
            clearInterval(interval);
            let finalCard = possibleCards[Math.floor(Math.random() * possibleCards.length)]; // בחירת קלף סופי

            resultElement.innerHTML = `<div style='display: flex; align-items: center; justify-content: center; gap: 1px;'>
                    <span style='font-size: 1.3em; margin-left: 50%;'>:תוצאה</span><span style='font-size: 1.3em;'>🎰</span>
                    <strong style='font-size: 2em; color: ${randomColor}; width: 100px; text-align: center; position: relative; right: 180px;'>${finalCard}</strong>
                </div>`;

            // חישוב הזכייה לאחר העצירה
            if (selectedCards.includes(finalCard)) {
                balance += betAmount * 5 - betTotal; // שמירה על חישוב קבוע
                messageElement.innerHTML = "🎉 זכית!";
                messageElement.style.color = "green";
            } else {
                balance -= betTotal;
                messageElement.innerHTML = "❌ הפסדת! 😔";
                messageElement.style.color = "red";
            }

            resultElement.appendChild(document.createElement("br"));
            resultElement.appendChild(messageElement);

            document.getElementById('balance').innerText = balance;
            document.getElementById('totalBet').innerText = totalBet;
            document.getElementById('totalDraws').innerText = totalDraws;

            // העלמת הודעת ניצחון/הפסד לאחר 2.5 שניות
            setTimeout(() => {
                messageElement.remove();
            }, 2500);
        }

    }, speed);
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0); // השהייה כדי להבטיח שהתוכן נטען לפני הגלילה
});
