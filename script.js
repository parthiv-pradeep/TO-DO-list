document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskTimerInput = document.getElementById('task-timer');
    const taskList = document.getElementById('task-list');
    const completedTaskList = document.getElementById('completed-task-list');

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
                }
            }, 1000);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                clearInterval(timerInterval);
                taskList.removeChild(listItem);
            });

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Completed';
            completeButton.addEventListener('click', () => {
                clearInterval(timerInterval);
                taskList.removeChild(listItem);
                completedTaskList.appendChild(listItem);
                listItem.removeChild(deleteButton);
                listItem.removeChild(completeButton);
            });

            listItem.appendChild(deleteButton);
            listItem.appendChild(completeButton);
            taskList.appendChild(listItem);
            newTaskInput.value = '';
            taskTimerInput.value = '';
        }
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });
});