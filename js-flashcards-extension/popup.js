const questionDiv = document.getElementById("question");
const answerDiv = document.getElementById("answer");
const card = document.getElementById("flashcard");
const flipBtn = document.getElementById("flip");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const categoryTag = document.getElementById("category"); // 👈 SELECT the tag element

let currentIndex = 0;

function showCard(index) {
  const cardData = flashcards[index];
  questionDiv.textContent = cardData.question;
  answerDiv.textContent = cardData.answer;
  categoryTag.textContent = cardData.category; // 👈 UPDATE category here
  questionDiv.classList.remove("hidden");
  answerDiv.classList.add("hidden");
}

card.addEventListener("click", flipCard);
flipBtn.addEventListener("click", flipCard);
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % flashcards.length;
  showCard(currentIndex);
});
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  showCard(currentIndex);
});

function flipCard() {
  questionDiv.classList.toggle("hidden");
  answerDiv.classList.toggle("hidden");
}

// Initial render
showCard(currentIndex);
