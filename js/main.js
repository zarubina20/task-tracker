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


function createTaskElement(task) {
  const li = document.createElement('li');

  li.classList.add('task');
  li.classList.add('task--' + task.priority);

  if (task.completed) {
    li.classList.add('task--completed');
  }

  li.dataset.id = task.id;

  const checkbox = document.createElement('input');

  checkbox.type = 'checkbox';
  checkbox.classList.add('task__checkbox');
  checkbox.checked = task.completed;

  const text = document.createElement('span');

  text.classList.add('task__text');
  text.textContent = task.text;

  const priority = document.createElement('span');

  priority.classList.add('task__priority');
  priority.textContent = task.priority;

  const deleteButton = document.createElement('button');

  deleteButton.type = 'button';
  deleteButton.classList.add('task__delete');
  deleteButton.textContent = '×';
  deleteButton.setAttribute('aria-label', 'Delete task');

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(priority);
  li.appendChild(deleteButton);

  taskList.appendChild(li);
}


function completeTask(taskId) {
  for (let i = 0; i < tasks.length; i++) {

    if (tasks[i].id === taskId) {
      tasks[i].completed = !tasks[i].completed;
      break;
    }

  }

  saveTasks();
  renderTasks();
}


function completeTask(taskId) {
  for (let i = 0; i < tasks.length; i++) {

    if (tasks[i].id === taskId) {
      tasks[i].completed = !tasks[i].completed;
      break;
    }

  }

  saveTasks();
  renderTasks();
}


function deleteTask(taskId) {
  const newTasks = [];

  for (let i = 0; i < tasks.length; i++) {

    if (tasks[i].id !== taskId) {
      newTasks.push(tasks[i]);
    }

  }

  tasks = newTasks;

  saveTasks();
  renderTasks();
}


function changeFilter(filter) {
  currentFilter = filter;

  const filterButtons = filters.querySelectorAll('.filter');

  for (let i = 0; i < filterButtons.length; i++) {

    filterButtons[i].classList.remove('filter--active');

    if (filterButtons[i].dataset.filter === filter) {
      filterButtons[i].classList.add('filter--active');
    }

  }

  renderTasks();
}
