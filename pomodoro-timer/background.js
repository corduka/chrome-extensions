let timer = null;
let timeLeft = 25 * 60;
let isRunning = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    if (!isRunning) {
      isRunning = true;
      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
        } else {
          clearInterval(timer);
          isRunning = false;
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon48.png",
            title: "Pomodoro Done!",
            message: "Take a break ☕",
          });
          chrome.storage.local.get(["pomodoroCount"], (result) => {
            let count = result.pomodoroCount || 0;
            chrome.storage.local.set({ pomodoroCount: count + 1 });
          });
          timeLeft = 25 * 60;
        }
      }, 1000);
    }
  } else if (message.action === "pause") {
    clearInterval(timer);
    isRunning = false;
  } else if (message.action === "reset") {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
  } else if (message.action === "getTime") {
    sendResponse({ timeLeft, isRunning });
  }
});
