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
    const title = document.querySelector('#task-title-input').value;
    const description = document.querySelector('#task-desc-input').value;
    const task = {
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

function toggleCompleted(title) {
    const tasks = getTasks();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title === title) {
            tasks[i].completed = !tasks[i].completed;
        }
    } 
    saveTasks(tasks);
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

function getRandomTask() {
    const tasks = getOrCreateTasks();
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const randomTask = tasks[randomIndex];
    console.log(randomTask);
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
    const task = getRandomTask();
    const currentTaskDiv = document.querySelector('.current-task');
    currentTaskDiv.innerHTML = '<div class="task-title">' + task.title + '</div><div class="task-desc">' + task.description + '</div>';
    currentTaskDiv.onclick = function () {
        toggleCompleted(task.title);
    };
}