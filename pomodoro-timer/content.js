// Only run once
if (!document.getElementById("floating-timer")) {
  const timerDiv = document.createElement("div");
  timerDiv.id = "floating-timer";
  timerDiv.style.position = "fixed";
  timerDiv.style.bottom = "20px";
  timerDiv.style.right = "20px";
  timerDiv.style.background = "rgba(0,0,0,0.7)";
  timerDiv.style.color = "#fff";
  timerDiv.style.padding = "10px 15px";
  timerDiv.style.borderRadius = "10px";
  timerDiv.style.fontFamily = "Arial, sans-serif";
  timerDiv.style.zIndex = "999999";
  timerDiv.style.cursor = "move";
  timerDiv.style.userSelect = "none";
  timerDiv.textContent = "25:00";
  document.body.appendChild(timerDiv);

  // Drag functionality
  let isDragging = false;
  let offsetX, offsetY;

  timerDiv.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - timerDiv.getBoundingClientRect().left;
    offsetY = e.clientY - timerDiv.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      timerDiv.style.left = `${e.clientX - offsetX}px`;
      timerDiv.style.top = `${e.clientY - offsetY}px`;
      timerDiv.style.right = "auto";
      timerDiv.style.bottom = "auto";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Update timer text every second
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  setInterval(() => {
    chrome.runtime.sendMessage({ action: "getTime" }, (response) => {
      if (response && typeof response.timeLeft !== "undefined") {
        timerDiv.textContent = formatTime(response.timeLeft);
      }
    });
  }, 1000);
}
