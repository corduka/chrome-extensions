let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const countDisplay = document.getElementById("count");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  timerDisplay.textContent = formattedTime;

  // Send timeLeft to content script for floating mini-timer
  chrome.runtime.sendMessage({ action: "update_timer", time: formattedTime });
}

//Floating Timer
document.getElementById("float").addEventListener("click", () => {
  chrome.windows.create({
    url: "floating.html",
    type: "popup",
    width: 120,
    height: 100,
  });
});

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      notify();
      incrementCount(); // ✅ Track completed Pomodoros
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 25 * 60;
  isRunning = false;
  updateDisplay();
}

function notify() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon48.png",
    title: "Pomodoro Finished!",
    message: "Time to take a break!",
    priority: 2,
  });
}

// ✅ Load Pomodoro count from chrome.storage
function loadCount() {
  chrome.storage.local.get(["pomodoroCount"], (result) => {
    countDisplay.textContent = result.pomodoroCount || 0;
  });
}

// ✅ Increment Pomodoro count and update display
function incrementCount() {
  chrome.storage.local.get(["pomodoroCount"], (result) => {
    let current = result.pomodoroCount || 0;
    chrome.storage.local.set({ pomodoroCount: current + 1 }, () => {
      loadCount();
    });
  });
}

// ✅ Event Listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initial setup
updateDisplay();
loadCount(); // ✅ Load saved count
