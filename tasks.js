function addRandomTask() {
    const temp = Math.floor(Math.random() * 100);
    const task = {
        title: temp,
        description: temp,
        completed: false
    };
    saveTask(task);
    displayTaskList();
}

function addNewTask() {
    document.querySelector('.new-task-form').classList.remove('hidden');
}

function hideAddTaskOverlay() {
    document.querySelector('.new-task-form').classList.add('hidden');
}

function addTask() {
    const id = getTasks()
        .map(function (task) { return task.id; })
        .reduce(function (a, b) { return Math.max(a, b); }, 0) + 1;
    const title = document.querySelector('#task-title-input').value;
    const description = document.querySelector('#task-desc-input').value;
    const task = {
        id: id,
        title: title,
        description: description,
        completed: false
    };
    saveTask(task);
    displayTaskList();
}

function clearTasks() {
    localStorage.setItem('tasks', '[]');
    displayTaskList();
}

function saveTask(task) {
    const tasks = getOrCreateTasks();

    tasks.push(task);

    saveTasks(tasks);

    document.querySelector('.new-task-form').classList.add('hidden');
}

function getTasks() {
    const tasks = getOrCreateTasks();
    return tasks;
}

function getRandomUncompletedTask() {
    const tasks = getTasks();
    const uncompletedTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].completed) {
            uncompletedTasks.push(tasks[i]);
        }
    }
    const randomIndex = Math.floor(Math.random() * uncompletedTasks.length);
    const randomTask = uncompletedTasks[randomIndex];
    return randomTask;
}


function getRandomTask() {
    const tasks = getOrCreateTasks();
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const randomTask = tasks[randomIndex];
    return randomTask;
}

function getOrCreateTasks() {
    let tasksString = localStorage.getItem('tasks');
    if (tasksString === null) {
        localStorage.setItem('tasks', '[]');
        tasksString = '[]';
    }
    return JSON.parse(tasksString);
}

function saveTasks(tasks) {
    const tasksString = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksString);
}

function displayTaskList() {
    document.querySelector('.tasks').innerHTML = '';

    const tasks = getTasks();

    for (let i = 0; i < tasks.length; i++) {
        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = tasks[i].title + ' - ' + tasks[i].description;
        taskDiv.classList.add('task');
        if (tasks[i].completed) {
            taskDiv.classList.add('completed');
        }
        document.querySelector('.tasks').appendChild(taskDiv);
    }
}

function showCurrentTask() {
    const task = getRandomUncompletedTask();
    const currentTaskDiv = document.querySelector('.current-task');
    currentTaskDiv.innerHTML = '<div class="task-title">' + task.title + '</div>'
        + '<div class="task-desc">' + task.description + '</div>'
        + '<div class="buttons">'
        + '<button class="button button-default">Completed</button>'
        + '<button class="button button-cancel">Close</button>'
        + '</div>';
    currentTaskDiv.querySelector('.button-default').onclick = function () {
        toggleCompleted(task.id);
    };
    currentTaskDiv.querySelector('.button-cancel').onclick = function () {
        currentTaskDiv.classList.add('hidden');
    };
    currentTaskDiv.classList.remove('hidden');
}

function toggleCompleted(id) {
    const tasks = getTasks();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = !tasks[i].completed;
        }
    }
    saveTasks(tasks);
    displayTaskList();
}