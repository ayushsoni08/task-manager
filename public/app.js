document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const tasksList = document.getElementById('tasks-list');

    getTasks();

    taskForm.addEventListener('submit', function(e){
        e.preventDefault();
        const title = document.getElementById('title').value;
        const desc = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;

        const taskData = {
            title,
            desc,
            dueDate
        };

        createTask(taskData);
    });

    function getTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                tasksList.innerHTML = '';
                if(Array.isArray(data)) {
                    data.forEach(task => {
                        const taskElement = document.createElement('li');
                        taskElement.textContent = `${task.title} - ${task.desc} (Due: ${task.dueDate})`;
                        taskElement.id = `task-${task._id}`;
                        tasksList.appendChild(taskElement);
                    });
                } else {
                    console.error(`Error: Response is not an array`);
                }
            })
            .catch(error => console.log('Error fetching tasks:', error));
    }

    function createTask(taskData) {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Task created:', data);
            getTasks();
        })
        .catch(err => console.error('Error creating task:', err));
    }
});