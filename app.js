// Load tasks from localStorage
window.onload = loadTasks;

// Task array
let tasks = [];

// Add Task Function
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate');
    const priority = document.getElementById('priority');
    const taskText = taskInput.value.trim();
    const taskDueDate = dueDate.value;
    const taskPriority = priority.value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create new task object
    const task = {
        text: taskText,
        dueDate: taskDueDate,
        priority: taskPriority,
        completed: false
    };

    // Add task to the task list and save to localStorage
    tasks.push(task);
    saveTasks();
    renderTasks();

    // Clear inputs
    taskInput.value = '';
    dueDate.value = '';
    priority.value = 'Low';
}

// Render all tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear current task list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        // Task text
        const taskText = document.createElement('span');
        taskText.textContent = `${task.text} (Due: ${task.dueDate}) `;
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
        }

        // Task priority
        const priorityLabel = document.createElement('span');
        priorityLabel.classList.add('priority');
        priorityLabel.textContent = ` [${task.priority}]`;

        // Complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.onclick = () => toggleComplete(index);

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.onclick = () => editTask(index);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(taskText);
        li.appendChild(priorityLabel);
        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Edit a task
function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Filter tasks by status
function filterTasks(status) {
    let filteredTasks;
    if (status === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (status === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else {
        filteredTasks = tasks;
    }

    renderFilteredTasks(filteredTasks);
}

// Render filtered tasks
function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear current task list

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        const taskText = document.createElement('span');
        taskText.textContent = `${task.text} (Due: ${task.dueDate})`;

        const priorityLabel = document.createElement('span');
        priorityLabel.classList.add('priority');
        priorityLabel.textContent = ` [${task.priority}]`;

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.onclick = () => toggleComplete(index);

        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(taskText);
        li.appendChild(priorityLabel);
        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}
