const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const prioritySelect = document.querySelector('#priority-select');
const taskList = document.querySelector('#task-list');
const activeCount = document.querySelector('#active-count');
const emptyState = document.querySelector('#empty-state');
const formError = document.querySelector('#form-error');
const filters = document.querySelector('#filters');

let tasks = [];
let currentFilter = 'all';

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask(event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText === '') {
    formError.hidden = false;
    taskInput.focus();
    return;
  }

  formError.hidden = true;

  const newTask = {
    id: Date.now(),
    text: taskText,
    priority: priority,
    completed: false
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();

  taskInput.value = '';
  prioritySelect.value = 'medium';

  taskInput.focus();
}


function renderTasks() {
  taskList.innerHTML = '';

  let visibleTasks = [];

  if (currentFilter === 'all') {
    visibleTasks = tasks;
  }

  if (currentFilter === 'active') {
    visibleTasks = tasks.filter(function(task) {
      return task.completed === false;
    });
  }

  if (currentFilter === 'completed') {
    visibleTasks = tasks.filter(function(task) {
      return task.completed === true;
    });
  }

  if (visibleTasks.length === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }

  for (let i = 0; i < visibleTasks.length; i++) {
    createTaskElement(visibleTasks[i]);
  }

  updateActiveCount();
}
