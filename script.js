document.getElementById('addTaskButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDateTime = document.getElementById('taskDateTime');
    const taskText = taskInput.value.trim();
    const taskDate = taskDateTime.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    li.innerHTML = `
        <span>${taskText} ${taskDate ? `- Due: ${new Date(taskDate).toLocaleString()}` : ''}</span>
        <div>
            <button onclick="markCompleted(this)">✔️</button>
            <button onclick="editTask(this)">✏️</button>
            <button onclick="deleteTask(this)">❌</button>
        </div>
    `;
    taskList.appendChild(li);

    taskInput.value = '';
    taskDateTime.value = '';
}

function markCompleted(button) {
    const li = button.parentElement.parentElement;
    li.querySelector('span').classList.toggle('completed');
}

function editTask(button) {
    const li = button.parentElement.parentElement;
    const span = li.querySelector('span');
    const currentText = span.childNodes[0].nodeValue.trim();

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = function() {
        span.childNodes[0].nodeValue = input.value;
        li.removeChild(input);
        li.removeChild(saveButton);
    };

    li.insertBefore(input, span);
    li.insertBefore(saveButton, span);
    li.removeChild(span);
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
}