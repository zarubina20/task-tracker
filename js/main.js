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
  try {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    }
  } catch (error) {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === '') {
    formError.hidden = false;
    taskInput.focus();
    return;
  }

  formError.hidden = true;

  const newTask = {
    id: Date.now(),
    text: taskText,
    priority: prioritySelect.value,
    completed: false
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();

  taskInput.value = '';
  prioritySelect.value = 'medium';
  taskInput.focus();
}

function getVisibleTasks() {
  return tasks.filter(function (task) {
    if (currentFilter === 'active') {
      return !task.completed;
    }

    if (currentFilter === 'completed') {
      return task.completed;
    }

    return true;
  });
}

function renderTasks() {
  taskList.innerHTML = '';

  const visibleTasks = getVisibleTasks();

  emptyState.hidden = visibleTasks.length !== 0;

  visibleTasks.forEach(function (task) {
    createTaskElement(task);
  });

  updateActiveCount();
}

function createTaskElement(task) {
  const li = document.createElement('li');

  li.classList.add('task', 'task--' + task.priority);

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

  li.append(checkbox, text, priority, deleteButton);

  taskList.appendChild(li);
}

function completeTask(taskId) {
  const task = tasks.find(function (item) {
    return item.id === taskId;
  });

  if (!task) {
    return;
  }

  task.completed = !task.completed;

  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });

  saveTasks();
  renderTasks();
}

function changeFilter(filter) {
  currentFilter = filter;

  const filterButtons = filters.querySelectorAll('.filter');

  filterButtons.forEach(function (button) {
    button.classList.toggle(
      'filter--active',
      button.dataset.filter === filter
    );
  });

  renderTasks();
}

function updateActiveCount() {
  const count = tasks.filter(function (task) {
    return !task.completed;
  }).length;

  activeCount.textContent = count;
}

taskForm.addEventListener('submit', addTask);

taskList.addEventListener('click', function (event) {
  const taskElement = event.target.closest('.task');

  if (!taskElement) {
    return;
  }

  const taskId = Number(taskElement.dataset.id);

  if (event.target.classList.contains('task__checkbox')) {
    completeTask(taskId);
  }

  if (event.target.classList.contains('task__delete')) {
    deleteTask(taskId);
  }
});

filters.addEventListener('click', function (event) {
  if (!event.target.classList.contains('filter')) {
    return;
  }

  changeFilter(event.target.dataset.filter);
});

taskInput.addEventListener('input', function () {
  if (taskInput.value.trim() !== '') {
    formError.hidden = true;
  }
});

loadTasks();
renderTasks();