// script.js
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin');
const questionEl = document.getElementById('question');
const optionsList = document.getElementById('options');

const questions = [
    { question: "Question 1", options: ["Option A", "Option B", "Option C", "Option D"] },
    { question: "Question 2", options: ["Option A", "Option B", "Option C", "Option D"] },
    // Add more questions up to 15
];

const numSegments = questions.length;
const segmentAngle = (2 * Math.PI) / numSegments;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = Math.min(centerX, centerY) - 5;

let currentAngle = 0;
let spinning = false;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSegments; i++) {
        const startAngle = currentAngle + segmentAngle * i;
        const endAngle = startAngle + segmentAngle;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = `hsl(${(i * 360) / numSegments}, 70%, 55%)`;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(questions[i].question, radius - 12, 5);
        ctx.restore();
    }

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

function drawPointer() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(canvas.width - 10, centerY - 12);
    ctx.lineTo(canvas.width - 10, centerY + 12);
    ctx.lineTo(canvas.width - 30, centerY);
    ctx.closePath();
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.restore();
}

function getSelectedIndex() {
    // Pointer is on the right (angle 0). Normalize current rotation.
    const normalizedAngle = ((2 * Math.PI) - (currentAngle % (2 * Math.PI))) % (2 * Math.PI);
    return Math.floor(normalizedAngle / segmentAngle) % numSegments;
}

function spinWheel() {
    if (spinning) return;
    spinning = true;
    spinButton.disabled = true;
    questionEl.textContent = '';
    optionsList.replaceChildren();

    const totalRotation = (Math.random() * 4 + 5) * 2 * Math.PI; // 5-9 full rotations
    const duration = 3000;
    const startAngle = currentAngle;
    const startTime = performance.now();

    function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        currentAngle = startAngle + totalRotation * eased;

        drawWheel();
        drawPointer();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            spinButton.disabled = false;
            displayQuestion(getSelectedIndex());
        }
    }

    requestAnimationFrame(animate);
}

function displayQuestion(index) {
    const q = questions[index];
    questionEl.textContent = q.question;
    optionsList.replaceChildren();
    q.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        optionsList.appendChild(li);
    });
}

drawWheel();
drawPointer();
spinButton.addEventListener('click', spinWheel);
