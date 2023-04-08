const taskForm = document.getElementById("add-task-form");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

let tasks = [];

// Load tasks from local storage if they exist
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    displayTasks();
}

// Add task to the list and update local storage
function addTask(task, date, time) {
    const newTask = {
        task: task,
        date: date,
        time: time,
        completed: false,
        id: Date.now()
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks in the pending and completed lists
function displayTasks() {
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        li.innerHTML = `
            <input type="checkbox">
            <label>${task.task} (${task.date} at ${task.time})</label>
            <button>Delete</button>
        `;
        const checkbox = li.querySelector("input");
        const deleteBtn = li.querySelector("button");

        // Check the checkbox if the task is completed
        if (task.completed) {
            checkbox.checked = true;
            li.classList.add("completed");
            completedList.prepend(li);
        } else {
            pendingList.prepend(li);
        }

        // Update the completed status of the task
        checkbox.addEventListener("click", () => {
            task.completed = checkbox.checked;
            if (task.completed) {
                li.classList.add("completed");
                completedList.prepend(li);
            } else {
                li.classList.remove("completed");
                pendingList.prepend(li);
            }
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        // Delete the task from the list and local storage
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            li.remove();
        });
    });
}

// Submit the task form and add the task to the list
taskForm.addEventListener("submit", event => {
    event.preventDefault();
    const task = document.getElementById("task").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    addTask(task, date, time);
    displayTasks();
    taskForm.reset();
});
