const spanishEl = document.getElementById("spanish-word");
const englishEl = document.getElementById("english-word");
const historyBtn = document.getElementById("history-btn");
const newWordBtn = document.getElementById("new-word-btn");
const pronounceBtn = document.getElementById("pronounce-btn");
const historyList = document.getElementById("history-list");

const today = new Date().toISOString().split("T")[0];

const wordList = [
  { spanish: "libro", english: "book" },
  { spanish: "perro", english: "dog" },
  { spanish: "gato", english: "cat" },
  { spanish: "sol", english: "sun" },
  { spanish: "luna", english: "moon" },
  { spanish: "agua", english: "water" },
  { spanish: "comida", english: "food" },
  { spanish: "cielo", english: "sky" },
  { spanish: "familia", english: "family" },
  { spanish: "amigo", english: "friend" },
  { spanish: "casa", english: "house" },
  { spanish: "ventana", english: "window" },
  { spanish: "puerta", english: "door" },
  { spanish: "mesa", english: "table" },
  { spanish: "silla", english: "chair" },
  { spanish: "zapato", english: "shoe" },
  { spanish: "camisa", english: "shirt" },
  { spanish: "ciudad", english: "city" },
  { spanish: "escuela", english: "school" },
  { spanish: "trabajo", english: "job" },
  { spanish: "dinero", english: "money" },
  { spanish: "mujer", english: "woman" },
  { spanish: "hombre", english: "man" },
  { spanish: "niño", english: "boy" },
  { spanish: "niña", english: "girl" },
  { spanish: "tiempo", english: "time" },
  { spanish: "día", english: "day" },
  { spanish: "noche", english: "night" },
  { spanish: "mañana", english: "morning" },
  { spanish: "tarde", english: "afternoon" },
  { spanish: "feliz", english: "happy" },
  { spanish: "triste", english: "sad" },
  { spanish: "rápido", english: "fast" },
  { spanish: "lento", english: "slow" },
  { spanish: "grande", english: "big" },
  { spanish: "pequeño", english: "small" },
  { spanish: "caliente", english: "hot" },
  { spanish: "frío", english: "cold" },
  { spanish: "nuevo", english: "new" },
  { spanish: "viejo", english: "old" },
  { spanish: "blanco", english: "white" },
  { spanish: "negro", english: "black" },
  { spanish: "rojo", english: "red" },
  { spanish: "azul", english: "blue" },
  { spanish: "verde", english: "green" },
  { spanish: "amarillo", english: "yellow" },
  { spanish: "naranja", english: "orange" },
  { spanish: "gris", english: "gray" },
  { spanish: "marrón", english: "brown" },
  { spanish: "bonito", english: "beautiful" },
  { spanish: "feo", english: "ugly" },
  { spanish: "fácil", english: "easy" },
  { spanish: "difícil", english: "difficult" },
  { spanish: "corto", english: "short" },
  { spanish: "largo", english: "long" },
  { spanish: "alto", english: "tall" },
  { spanish: "bajo", english: "short (height)" },
  { spanish: "bueno", english: "good" },
  { spanish: "malo", english: "bad" },
  { spanish: "nuevo", english: "new" },
  { spanish: "viejo", english: "old" },
  { spanish: "cerca", english: "near" },
  { spanish: "lejos", english: "far" },
  { spanish: "encima", english: "above" },
  { spanish: "debajo", english: "below" },
  { spanish: "izquierda", english: "left" },
  { spanish: "derecha", english: "right" },
  { spanish: "sí", english: "yes" },
  { spanish: "no", english: "no" },
  { spanish: "aquí", english: "here" },
  { spanish: "allí", english: "there" },
  { spanish: "quién", english: "who" },
  { spanish: "qué", english: "what" },
  { spanish: "dónde", english: "where" },
  { spanish: "cuándo", english: "when" },
  { spanish: "por qué", english: "why" },
  { spanish: "cómo", english: "how" },
  { spanish: "porque", english: "because" },
  { spanish: "nunca", english: "never" },
  { spanish: "siempre", english: "always" },
  { spanish: "a veces", english: "sometimes" },
  { spanish: "todo", english: "everything" },
  { spanish: "nada", english: "nothing" },
  { spanish: "algo", english: "something" },
  { spanish: "nadie", english: "nobody" },
  { spanish: "todos", english: "everyone" },
  { spanish: "yo", english: "I" },
  { spanish: "tú", english: "you" },
  { spanish: "él", english: "he" },
  { spanish: "ella", english: "she" },
  { spanish: "nosotros", english: "we" },
  { spanish: "vosotros", english: "you all" },
  { spanish: "ellos", english: "they" },
  { spanish: "ser", english: "to be" },
  { spanish: "tener", english: "to have" },
  { spanish: "hacer", english: "to do/make" },
  { spanish: "ir", english: "to go" },
  { spanish: "ver", english: "to see" },
  { spanish: "hablar", english: "to speak" },
  { spanish: "vivir", english: "to live" },
  { spanish: "amar", english: "to love" },
  { spanish: "comer", english: "to eat" },
  { spanish: "beber", english: "to drink" },
];

// Load word on popup open
chrome.storage.local.get(["lastDate", "wordData", "history"], (result) => {
  if (result.lastDate === today && result.wordData) {
    showWord(result.wordData);
  } else {
    const newWordData = getRandomWord();
    updateWord(newWordData);
  }
});

// Show a new word
newWordBtn.addEventListener("click", () => {
  const newWordData = getRandomWord();
  updateWord(newWordData, true);
});

// Speak the Spanish word
pronounceBtn.addEventListener("click", () => {
  const word = spanishEl.textContent;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "es-ES";
  speechSynthesis.speak(utterance);
});

// Show/hide history list
historyBtn.addEventListener("click", () => {
  historyList.style.display =
    historyList.style.display === "none" ? "block" : "none";
  renderHistory();
});

function getRandomWord() {
  const index = Math.floor(Math.random() * wordList.length);
  const { spanish, english } = wordList[index];
  return { spanish, english };
}

function showWord({ spanish, english }) {
  spanishEl.textContent = spanish;
  englishEl.textContent = english;
}

function updateWord(data, isManual = false) {
  showWord(data);

  chrome.storage.local.get(["history"], (result) => {
    const history = result.history || [];
    const newHistory = history.filter(
      (entry) => entry.spanish !== data.spanish
    );
    newHistory.unshift(data);
    if (newHistory.length > 50) newHistory.pop();

    chrome.storage.local.set({
      wordData: data,
      lastDate: today,
      history: newHistory,
    });
  });
}

function renderHistory() {
  chrome.storage.local.get(["history"], (result) => {
    const history = result.history || [];
    historyList.innerHTML = "";

    history.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.spanish} - ${item.english}`;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        showWord(item);
      });
      historyList.appendChild(li);
    });
  });
}
