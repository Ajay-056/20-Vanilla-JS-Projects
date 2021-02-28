const wrongLetters = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const audio = document.getElementById("audio");
const audio1 = document.getElementById("audio-1");
const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "kitchen",
  "element",
  "actual",
  "perfect",
  "eleven",
  "our",
  "movie",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLettersArr = [];
const wrongLettersArr = [];

function displayWord() {
  word.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) =>
              `<span class="letter">${
                correctLettersArr.includes(letter) ? letter : ""
              }</span>`
          )
          .join("")}
    `;

  const innerWord = word.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = `Congratulations! You Won! 😎🥇`;
    popup.style.display = "flex";
  }
}

function updateWrongLettersEl() {
  wrongLetters.innerHTML = `
        ${wrongLettersArr.length > 0 ? "<p>Wrong</p>" : ""}
        ${wrongLettersArr.map((letter) => `<span>${letter}</span>`)}
    `;

  figureParts.forEach((part, index) => {
    const errors = wrongLettersArr.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLettersArr.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately You Lost! 😢";
    figureParts.forEach((figure) => figure.classList.add("hang"));
    audio1.currentTime = 11;
    audio1.play();
    audio.play();
    setTimeout(() => (popup.style.display = "flex"), 3000);
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => notification.classList.remove("show"), 2000);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLettersArr.includes(letter)) {
        correctLettersArr.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLettersArr.includes(letter)) {
        wrongLettersArr.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playAgainBtn.addEventListener("click", () => {
  correctLettersArr.splice(0);
  wrongLettersArr.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  figureParts.forEach((figure) => figure.classList.remove("hang"));

  popup.style.display = "none";
});

displayWord();
