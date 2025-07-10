const gameSelector = document.getElementById("game-selector");
const instructionsSection = document.getElementById("instructions");
const scoreForm = document.getElementById("score-form");
const nameInput = document.getElementById("player-name");
const scoreInput = document.getElementById("player-score");
const scoreList = document.getElementById("score-list");
const clearBtn = document.getElementById("clear-scores");

let currentGame = gameSelector.value;

const instructionsMap = {
  farkle: "Farkle instructions go here...",
  yahtzee: "Yahtzee instructions go here...",
  "liars-dice": "Liar's Dice instructions go here...",
  tens: "Tens instructions go here...",
  "kings-corner": "Kings Corner instructions go here...",
  trash: "Trash instructions go here...",
  golf: "Golf instructions go here..."
};

function loadInstructions() {
  instructionsSection.innerHTML = `<p>${instructionsMap[currentGame]}</p>`;
}

function loadScores() {
  const scores = JSON.parse(localStorage.getItem(currentGame)) || [];
  scoreList.innerHTML = "";
  scores.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${entry.name}</strong>: ${entry.score}</span>
      <button onclick="editScore(${index})">Edit</button>
      <button onclick="deleteScore(${index})">Delete</button>
    `;
    scoreList.appendChild(li);
  });
}

function saveScores(scores) {
  localStorage.setItem(currentGame, JSON.stringify(scores));
}

scoreForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value.trim(), 10);
  if (!name || isNaN(score)) return;

  const scores = JSON.parse(localStorage.getItem(currentGame)) || [];
  scores.push({ name, score });
  saveScores(scores);
  nameInput.value = "";
  scoreInput.value = "";
  loadScores();
});

window.editScore = function (index) {
  const scores = JSON.parse(localStorage.getItem(currentGame)) || [];
  const { name, score } = scores[index];

  // Replace inputs with current values
  nameInput.value = name;
  scoreInput.value = score;

  // Temporarily change submit button to update mode
  const submitBtn = scoreForm.querySelector("button");
  submitBtn.textContent = "Update Score";

  // Remove the old entry
  scores.splice(index, 1);
  saveScores(scores);
  loadScores();
};

window.deleteScore = function (index) {
  const scores = JSON.parse(localStorage.getItem(currentGame)) || [];
  scores.splice(index, 1);
  saveScores(scores);
  loadScores();
};

clearBtn.addEventListener("click", () => {
  localStorage.removeItem(currentGame);
  loadScores();
});

gameSelector.addEventListener("change", () => {
  currentGame = gameSelector.value;
  loadInstructions();
  loadScores();
});

// Initial load
loadInstructions();
loadScores();
