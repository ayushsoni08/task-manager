// app.js, handles the front-end logic for the task manager application.

document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const tasksList = document.getElementById('tasks-list');

    // Fetches all tasks on initial load
    fetchTasks();

    // Event listener for form submission
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;

        const taskData = {
            title,
            description,
            dueDate
        };

        createTask(taskData);
    });

    // Function to fetch all tasks
    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => {
                tasksList.innerHTML = '';
                if (Array.isArray(data)) {
                    data.forEach(task => {
                        const taskElement = document.createElement('li');
                        const taskText = document.createElement('span');
                        taskText.textContent = `${task.title} - ${task.description} (Due: ${task.dueDate})`;
                        taskText.id = `task-text`;
                        taskElement.appendChild(taskText);

                        // Create the Edit button
                        const editButton = document.createElement('button');
                        editButton.textContent = 'Edit';
                        editButton.addEventListener('click', () => editTask(task));
                        taskElement.appendChild(editButton);

                        // Create the Delete button
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.addEventListener('click', () => deleteTask(task));
                        taskElement.appendChild(deleteButton);
                        tasksList.appendChild(taskElement);
                    });
                } else {
                    console.error('Error: Response is not an array');
                }
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }


    // function to edit a task
    function editTask(task) {
        const newTitle = prompt('Enter new title:', task.title);
        const newDescription = prompt('Enter new description:', task.description);
        const newDueDate = prompt('Enter new due date:', task.dueDate);

        if (newTitle && newDescription && newDueDate) {
            fetch(`/api/tasks/${task._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newTitle,
                    description: newDescription,
                    dueDate: newDueDate
                })
            })
            .then(response => response.json())
            .then(updatedTask => {
                alert('Task updated successfully');
                fetchTasks(); // Refresh the task list
            })
            .catch(error => console.error('Error updating task:', error));
        }
    }

    // function to delete a task
    function deleteTask(task) {
        if (confirm('Are you sure you want to delete this task?')) {
            fetch(`/api/tasks/${task._id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(() => {
                alert('Task deleted successfully');
                fetchTasks(); // Refresh the task list
            })
            .catch(error => console.error('Error deleting task:', error));
        }
    }
    
    // Function to create a new task
    function createTask(taskData) {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task created:', data);
            fetchTasks(); // Refreshes the tasks list
        })
        .catch(error => console.error('Error creating task:', error));
    }
});