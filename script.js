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

function drawWheel() {
    const numOptions = 15;
    const angle = 2 * Math.PI / numOptions;
    
    for (let i = 0; i < numOptions; i++) {
        ctx.beginPath();
        ctx.moveTo(250, 250); // Center of the canvas
        ctx.arc(250, 250, 250, angle * i, angle * (i+1), false);
        ctx.fillStyle = `hsl(${i * 25}, 100%, 50%)`;
        ctx.fill();
        ctx.stroke();
    }
}

function spinWheel() {
    const selected = Math.floor(Math.random() * 15);
    displayQuestion(selected);
}

function displayQuestion(index) {
    const question = questions[index];
    questionEl.textContent = question.question;
    optionsList.innerHTML = '';
    question.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        optionsList.appendChild(li);
    });
}

drawWheel();
spinButton.addEventListener('click', spinWheel);
