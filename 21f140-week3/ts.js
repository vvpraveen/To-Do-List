// Get elements from the DOM
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalTasksCount = document.getElementById("totalTasks");
const completedTasksCount = document.getElementById("completedTasks");

let totalTasks = 0;
let completedTasks = 0;

// Update the task count
function updateTaskCount() {
  totalTasksCount.textContent = totalTasks;
  completedTasksCount.textContent = completedTasks;
}

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
      <input type="checkbox" class="task-checkbox form-check-input">
      <span>${taskText}</span>
      <button type="button" class="delete-btn btn btn-dark my-2">Delete</button>
      
    `;
    taskList.appendChild(taskItem);
    taskInput.value = "";
    totalTasks++;
    updateTaskCount();

    // Trigger animation for new task item
    taskItem.style.animation = "fade-in 0.3s ease-in forwards";
  }
}

// Delete a task
function deleteTask(event) {
  if (event.target.classList.contains("delete-btn")) {
    const taskItem = event.target.parentElement;
    taskItem.style.animation = "fade-out 0.3s ease-in forwards";

    // Remove task item from the DOM after the animation ends
    setTimeout(() => {
      taskList.removeChild(taskItem);
    }, 300);

    totalTasks--;
    updateTaskCount();
  }
}

// Mark a task as completed
function completeTask(event) {
  if (event.target.classList.contains("task-checkbox")) {
    const taskItem = event.target.parentElement;
    taskItem.classList.toggle("completed");
    if (taskItem.classList.contains("completed")) {
      completedTasks++;
    } else {
      completedTasks--;
    }
    updateTaskCount();
  }
}

// Event listeners
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    // Enter key
    addTask();
  }
});

taskList.addEventListener("click", function (event) {
  deleteTask(event);
  completeTask(event);
});