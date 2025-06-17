document.addEventListener("DOMContentLoaded", () => {
  const timerDisplay = document.getElementById("floating-time");

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function updateTime() {
    chrome.runtime.sendMessage({ action: "getTime" }, (response) => {
      if (response && typeof response.timeLeft !== "undefined") {
        timerDisplay.textContent = formatTime(response.timeLeft);
      }
    });
  }

  updateTime();
  setInterval(updateTime, 1000);
});
