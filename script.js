// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly
let score = 0;
let timeLeft = 30;
let timer;

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("reset-btn").addEventListener("click", resetGame); 

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;
  score = 0;
timeLeft = 30;

document.getElementById("score").textContent = score;
document.getElementById("time").textContent = timeLeft;
document.getElementById("message").textContent = "Collect the clean water drops!";

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);
  timer = setInterval(function () {
  timeLeft--;
  document.getElementById("time").textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}, 1000);
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop"
  const isDirty = Math.random() < 0.25;

if (isDirty) {
  drop.classList.add("dirty-drop");
  drop.textContent = "🟤";
} else {
  drop.classList.add("clean-drop");
  drop.textContent = "💧";
}

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);
  drop.addEventListener("click", function () {

  if (!gameRunning) return;

  if (isDirty) {
    score -= 2;

    if (score < 0) {
      score = 0;
    }

    document.getElementById("message").textContent =
      "Dirty water! -2 points";
  } else {
    score += 1;

    document.getElementById("message").textContent =
      "Clean water collected! +1 point";
  }

  document.getElementById("score").textContent = score;

  drop.remove();

  if (score >= 15) {
    winGame();
  }
});

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}
function endGame() {
  gameRunning = false;

  clearInterval(dropMaker);
  clearInterval(timer);

  document.getElementById("game-container").innerHTML = "";

  document.getElementById("message").textContent =
    "Time's up! Your final score is " + score + ".";
}

function winGame() {
  gameRunning = false;

  clearInterval(dropMaker);
  clearInterval(timer);

  document.getElementById("game-container").innerHTML = "";

  document.getElementById("message").textContent =
    "🎉 You collected enough clean water! You win! 🎉";

  createConfetti();
}
function createConfetti() {
  const gameContainer = document.getElementById("game-container");

  const colors = [
    "#FFC907",
    "#2E9DF7",
    "#8BD1CB",
    "#4FCB53",
    "#F5402C"
  ];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");

    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.animationDelay =
      Math.random() * 1.5 + "s";

    confetti.style.animationDuration =
      2 + Math.random() * 2 + "s";

    gameContainer.appendChild(confetti);
  }
}

function resetGame() {
  gameRunning = false;

  clearInterval(dropMaker);
  clearInterval(timer);

  score = 0;
  timeLeft = 30;

  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = timeLeft;

  document.getElementById("game-container").innerHTML = "";

  document.getElementById("message").textContent =
    "Press Start to begin!";
}
