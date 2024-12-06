document.addEventListener('DOMContentLoaded', () => {
    const questionEl = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitBtn = document.getElementById('submit');
    const startBtn = document.getElementById('start');
    const restartBtn = document.getElementById('restart');
    const timerEl = document.getElementById('time');
    const scoreEl = document.getElementById('current-score');
    const difficultySelect = document.getElementById('difficulty');
    
    let time = 30;
    let score = 0;
    let timer;
    let correctAnswer;
  
   
    function generateQuestion() {
      const difficulty = difficultySelect.value;
      let num1, num2;
  
      if (difficulty === 'easy') {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
      } else if (difficulty === 'medium') {
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
      } else {
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 100) + 1;
      }
  
      const operation = Math.random() > 0.5 ? '+' : '-';
      correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
  
      questionEl.textContent = `What is ${num1} ${operation} ${num2}?`;
    }
  
    
    function startGame() {
      score = 0;
      time = 30;
      scoreEl.textContent = score;
      timerEl.textContent = time;
      answerInput.value = '';
      answerInput.disabled = false;
      submitBtn.disabled = false;
      startBtn.disabled = true;
      restartBtn.disabled = false;
      setBodyBackground();
  
      generateQuestion();
      timer = setInterval(() => {
        time--;
        timerEl.textContent = time;
  
        if (time <= 0) {
          clearInterval(timer);
          endGame();
        }
      }, 1000);
    }
  
    
    function submitAnswer() {
      const userAnswer = parseInt(answerInput.value, 10);
  
      if (userAnswer === correctAnswer) {
        score++;
        scoreEl.textContent = score;
        generateQuestion();
      }
  
      answerInput.value = '';
    }
  
   
    function endGame() {
      questionEl.textContent = 'Game Over! Press Restart to Play Again.';
      answerInput.disabled = true;
      submitBtn.disabled = true;
      startBtn.disabled = false;
    }
  
   
    function restartGame() {
      clearInterval(timer);
      startGame();
    }
  
   
    function setBodyBackground() {
      document.body.className = difficultySelect.value;
    }
  
   
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);
    submitBtn.addEventListener('click', submitAnswer);
    difficultySelect.addEventListener('change', setBodyBackground);
  
    
    answerInput.disabled = true;
    submitBtn.disabled = true;
    restartBtn.disabled = true;
  });
  