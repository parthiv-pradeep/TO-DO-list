document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskTimerInput = document.getElementById('task-timer');
    const taskList = document.getElementById('task-list');
    const completedTaskList = document.getElementById('completed-task-list');

    // Load tasks from localStorage
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        const taskTimer = parseFloat(taskTimerInput.value.trim());

        if (taskText !== '' && !isNaN(taskTimer) && taskTimer > 0) {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const timerSpan = document.createElement('span');
            timerSpan.textContent = ` (${taskTimer}h)`;
            listItem.appendChild(timerSpan);

            let timeLeft = taskTimer * 3600; // Convert hours to seconds
            const timerInterval = setInterval(() => {
                timeLeft--;
                const hoursLeft = (timeLeft / 3600).toFixed(2);
                timerSpan.textContent = ` (${hoursLeft}h)`;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    taskList.removeChild(listItem);
                    saveTasks();
                }
            }, 1000);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                clearInterval(timerInterval);
                taskList.removeChild(listItem);
                saveTasks();
            });

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Completed';
            completeButton.addEventListener('click', () => {
                clearInterval(timerInterval);
                taskList.removeChild(listItem);
                completedTaskList.appendChild(listItem);
                listItem.removeChild(deleteButton);
                listItem.removeChild(completeButton);
                saveTasks();
            });

            listItem.appendChild(deleteButton);
            listItem.appendChild(completeButton);
            taskList.appendChild(listItem);
            newTaskInput.value = '';
            taskTimerInput.value = '';
            saveTasks();
        }
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            const taskText = task.childNodes[0].textContent;
            const taskTimer = task.childNodes[1].textContent.match(/\((\d+(\.\d+)?)h\)/)[1];
            tasks.push({ text: taskText, timer: taskTimer });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        const completedTasks = [];
        completedTaskList.querySelectorAll('li').forEach(task => {
            const taskText = task.childNodes[0].textContent;
            const taskTimer = task.childNodes[1].textContent.match(/\((\d+(\.\d+)?)h\)/)[1];
            completedTasks.push({ text: taskText, timer: taskTimer });
        });
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = task.text;

            const timerSpan = document.createElement('span');
            timerSpan.textContent = ` (${task.timer}h)`;
            listItem.appendChild(timerSpan);

            let timeLeft = task.timer * 3600; // Convert hours to seconds
            const timerInterval = setInterval(() => {
                timeLeft--;
                const hoursLeft = (timeLeft / 3600).toFixed(2);
                timerSpan.textContent = ` (${hoursLeft}h)`;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    taskList.removeChild(listItem);
                    saveTasks();
                }
            }, 1000);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                clearInterval(timerInterval);
                taskList.removeChild(listItem);
                saveTasks();
            });

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Completed';
            completeButton.addEventListener('click', () => {
                clearInterval(timerInterval);
                taskList.removeChild(listItem);
                completedTaskList.appendChild(listItem);
                listItem.removeChild(deleteButton);
                listItem.removeChild(completeButton);
                saveTasks();
            });

            listItem.appendChild(deleteButton);
            listItem.appendChild(completeButton);
            taskList.appendChild(listItem);
        });

        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
        completedTasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = task.text;

            const timerSpan = document.createElement('span');
            timerSpan.textContent = ` (${task.timer}h)`;
            listItem.appendChild(timerSpan);

            completedTaskList.appendChild(listItem);
        });
    }
});