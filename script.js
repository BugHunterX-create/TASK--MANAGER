document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName !== '') {
        addTask(taskName);
        saveTaskToLocalStorage(taskName, false);
        taskInput.value = '';
    }
});

function addTask(taskName, completed = false) {
    const taskList = document.getElementById('taskList');

    const listItem = document.createElement('li');
    if (completed) {
        listItem.classList.add('completed');
    }

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskName;
    listItem.appendChild(taskSpan);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = function() {
        listItem.classList.toggle('completed');
        updateTaskInLocalStorage(taskName, listItem.classList.contains('completed'));
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = function() {
        const newTaskName = prompt('Edit task:', taskName);
        if (newTaskName) {
            taskSpan.textContent = newTaskName;
            editTaskInLocalStorage(taskName, newTaskName);
            taskName = newTaskName;
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
        listItem.remove();
        removeTaskFromLocalStorage(taskName);
    };

    listItem.appendChild(editButton);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function saveTaskToLocalStorage(taskName, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ name: taskName, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.name, task.completed));
}

function updateTaskInLocalStorage(taskName, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(t => t.name === taskName);
    if (task) {
        task.completed = completed;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTaskInLocalStorage(oldName, newName) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(t => t.name === oldName);
    if (task) {
        task.name = newName;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskName) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const newTasks = tasks.filter(task => task.name !== taskName);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
}
