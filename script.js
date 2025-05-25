let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-bnt");
let msgContainer = document.querySelector(".mes-container");
let msg = document.querySelector("#msg");

let startGameBtn = document.getElementById("startGame");
let player1Category = document.getElementById("player1-category");
let player2Category = document.getElementById("player2-category");
let errorDiv = document.getElementById("error");

const emojiCategories = {
  smileys: ["😀", "😁", "😂", "🤣", "😜", "😎", "😊", "🥲"],
  animals: ["🐶", "🐱", "🐵", "🐸", "🐯", "🐷", "🐼", "🦁"],
  food: ["🍎", "🍕", "🍔", "🍟", "🍇", "🍉", "🍩", "🍫"],
  sports: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🥊", "🏓"],
};

let turnO = true; 
let playerEmojis = {
  O: "⭕", 
  X: "❌", 
};

const winPatterns = [
  [0,1,2], 
  [3,4,5], 
  [6,7,8],  
  [0,3,6], 
  [1,4,7], 
  [2,5,8],  
  [0,4,8], 
  [2,4,6],           
];

// Populate dropdowns
function populateDropdowns() {
  for (let category in emojiCategories) {
    const option1 = document.createElement("option");
    option1.value = category;
    option1.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    const option2 = option1.cloneNode(true);
    player1Category.appendChild(option1);
    player2Category.appendChild(option2);
  }
}

populateDropdowns();

// Start Game
startGameBtn.addEventListener("click", () => {
  const p1Cat = player1Category.value;
  const p2Cat = player2Category.value;

  if (!p1Cat || !p2Cat) {
    errorDiv.textContent = "Please select both categories!";
    return;
  }

  if (p1Cat === p2Cat) {
    errorDiv.textContent = "Please select different categories!";
    return;
  }

  errorDiv.textContent = "";

  const p1Emojis = emojiCategories[p1Cat];
  const p2Emojis = emojiCategories[p2Cat];

  // Assign emojis
  playerEmojis.O = p1Emojis[Math.floor(Math.random() * p1Emojis.length)];
  playerEmojis.X = p2Emojis[Math.floor(Math.random() * p2Emojis.length)];

  resetGame();
});

// Game Logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = playerEmojis.O;
      turnO = false;
    } else {
      box.innerText = playerEmojis.X;
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winnerEmoji) => {
  msg.innerText = `🎉 Winner is ${winnerEmoji}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [i, j, k] = pattern;
    const b1 = boxes[i].innerText;
    const b2 = boxes[j].innerText;
    const b3 = boxes[k].innerText;

    if (b1 && b2 && b3 && b1 === b2 && b2 === b3) {
      showWinner(b1);
      return;
    }
  }

  // Check for draw
  const allFilled = [...boxes].every(box => box.innerText !== "");
  if (allFilled) {
    msg.innerText = "It's a Draw! 😅";
    msgContainer.classList.remove("hide");
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Reset Handlers
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

