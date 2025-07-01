const unorderedList = document.querySelector("#todo-list");
const buttonEl = document.querySelector("#add-btn");
const inputEl = document.querySelector("#todo-input");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render a todo item in the DOM
function renderTodo(todo, index) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = todo.text;

  if (todo.done) li.classList.add("done");

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", function () {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  });

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.style.marginLeft = "5px";
  editBtn.addEventListener("click", function () {
    if (editBtn.textContent === "✏️") {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.text;

      li.insertBefore(editInput, span);
      li.removeChild(span);
      editBtn.textContent = "✅";
      editInput.focus();
    } else {
      const editInput = li.querySelector("input");
      todo.text = editInput.value;
      saveTodos();
      renderTodos();
    }
  });

  // Toggle done on click (excluding clicks on buttons)
  li.addEventListener("click", function (e) {
    if (e.target === deleteBtn || e.target === editBtn) return;
    todo.done = !todo.done;
    saveTodos();
    renderTodos();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  unorderedList.appendChild(li);
}

// Loop through all todos
function renderTodos() {
  unorderedList.innerHTML = ""; // Clear list
  todos.forEach((todo, index) => {
    renderTodo(todo, index);
  });
}

// Add a new todo
function addTodo() {
  const inputText = inputEl.value.trim();
  if (inputText === "") return;

  const newTodo = {
    text: inputText,
    done: false,
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
  inputEl.value = "";
}

// Load existing todos
renderTodos();

// Events
buttonEl.addEventListener("click", addTodo);
inputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});
