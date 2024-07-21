// DOM Elements
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector(".todos");
const totalTasks = document.querySelector("#total-tasks");
const remainingTasks = document.querySelector("#remaining-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const mainInput = document.querySelector("#todo-form input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.forEach((task) => {
    createTask(task);
  });
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = mainInput.value.trim();
  if (inputValue === "") {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(task);

  todoForm.reset();
  mainInput.focus();
});

todoList.addEventListener("click", (e) => {
  if (e.target.closest(".remove-task")) {
    const taskId = e.target.closest("li").id;
    removeTask(taskId);
  }
});

todoList.addEventListener("input", (e) => {
  const taskId = e.target.closest("li").id;
  updateTask(taskId, e.target);
});

todoList.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    e.target.blur();
  }
});

function createTask(task) {
  const taskItem = document.createElement("li");
  taskItem.setAttribute("id", task.id);
  taskItem.classList.add("task-item");

  if (task.isCompleted) {
    taskItem.classList.add("completed");
  }

  const taskItemMarkup = `
    <div>
      <input type="checkbox" name="tasks" id="${task.id}" ${
    task.isCompleted ? "checked" : ""
  }/>
      <span ${!task.isCompleted ? "contenteditable='true'" : ""}>${
    task.name
  }</span>
    </div>
    <button title="Remove the ${task.name} task" class="remove-task">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M17.25 17.25L6.75 6.75"
          stroke="#A4D8E3"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.25 6.75L6.75 17.25"
          stroke="#A4D8E3"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  `;

  taskItem.innerHTML = taskItemMarkup;
  todoList.appendChild(taskItem);

  updateTaskCount();
}

function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));

  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById(taskId).remove();

  updateTaskCount();
}

function updateTask(taskId, target) {
  const task = tasks.find((task) => task.id === parseInt(taskId));

  if (target.hasAttribute("contenteditable")) {
    task.name = target.textContent;
  } else {
    const span = target.nextElementSibling;
    const parent = target.closest("li");

    task.isCompleted = !task.isCompleted;

    if (task.isCompleted) {
      span.removeAttribute("contenteditable");
      parent.classList.add("completed");
    } else {
      span.setAttribute("contenteditable", "true");
      parent.classList.remove("completed");
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  updateTaskCount();
}

function updateTaskCount() {
  const completedTasksCount = tasks.filter((task) => task.isCompleted);

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedTasksCount.length;
  remainingTasks.textContent = tasks.length - completedTasksCount.length;
}
