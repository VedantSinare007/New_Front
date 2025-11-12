const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from Local Storage
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="delete">X</button>
    </div>
  `;

  taskList.appendChild(li);
  saveTask(taskText);
  taskInput.value = "";

  li.addEventListener("click", () => li.classList.toggle("completed"));
  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
    removeTask(taskText);
  });
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task}</span>
      <div><button class="delete">X</button></div>
    `;
    taskList.appendChild(li);

    li.addEventListener("click", () => li.classList.toggle("completed"));
    li.querySelector(".delete").addEventListener("click", () => {
      li.remove();
      removeTask(task);
    });
  });
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
