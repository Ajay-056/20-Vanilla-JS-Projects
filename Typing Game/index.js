const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
  'discussing',
  'off',
  'brain',
  'smoothy',
  'practical',
  'hungry',
  'near',
  'inch',
  'store',
  'weak',
  'upwards',
  'tube',
  'tightly',
  'whale',
  'twenty',
  'lamp',
  'colony',
  'arrived',
  'ear',
  'offsprings',
  'ground',
  'industrial',
  'powder',
  'palace',
  'gave',
];

let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();

  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function createPartyPaerEffect() {
  for (let i = 0; i < 100; i++) {
    const it = document.createElement('i');
    endgameEl.appendChild(it);
  }

  setTimeout(() => {
    const alli = endgameEl.querySelectorAll('i');
    alli.forEach((el) => el.remove());
  }, 3000);
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0 && score >= 15) {
    clearInterval(timeInterval);
    gameOver();
    createPartyPaerEffect();
  } else if (time === 0 && score <= 15) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out!</h1>
    <p style="margin:3rem">Your final score is ${score}.</p>
    <button onclick="location.reload()" style="padding:1rem 2rem;cursor:pointer">Play again!</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', (e) => {
  const typedText = e.target.value;

  if (typedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = '';

    if (difficulty === 'hard') {
      time += 3;
    } else if (difficulty === 'medium') {
      time += 4;
    } else {
      time += 6;
    }

    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
