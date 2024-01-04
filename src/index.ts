let addTaskButton: HTMLElement;
let deleteTaskButton: NodeListOf<Element>;
let containerTask: HTMLElement;
document.addEventListener('DOMContentLoaded', () => {
    addTaskButton = document.getElementById('addTaskButton');
    containerTask = document.getElementById("containerTask");
    getLocalStorage();
    addTaskButton.addEventListener('click', () => checkInput())
});

interface ITask {
    taskName: string;
    taskId: string;
}

let tasks: ITask[] = [];

function checkInput(): void {
    const task2Add: HTMLInputElement = <HTMLInputElement>document.getElementById('task2Add');
    const taskAlert: HTMLElement = document.getElementById('taskAlert');
    const task: string = task2Add.value.trim();
    if (task.length < 1) {
        addTaskButton.classList.toggle("vaiven");
        taskAlert.classList.toggle("hidden")
        setTimeout(() => {
            addTaskButton.classList.toggle("vaiven");
            taskAlert.classList.toggle("hidden")
        }, 1000)
        return;
    }
    tasks.push(
        {
            taskName: task,
            taskId: Math.random().toString(30).substring(2),
        }
    )
    task2Add.value = "";
    addTaskHTML()
}

function addTaskHTML(): void {
    tasks.length < 1
      ? containerTask.classList.add("hidden")
      : containerTask.classList.remove("hidden");

    containerTask.innerHTML = "";
    for (let obj of tasks) {
        let HTMLtoInsert: string = `
              <div class="info-task-container">
                <p>${obj.taskName}</p>
                <button id="${obj.taskId}" class="delete-task-button"><span class="material-symbols-outlined">delete</span></button>
              </div>
      `;
        containerTask.insertAdjacentHTML("beforeend", HTMLtoInsert);
    }
    deleteTaskButton = document.querySelectorAll(".delete-task-button");
    deleteTaskButton.forEach((button) => {
        button.addEventListener("click", () => deleteTask(button.id))
    })
    addLocalStorage()
}

function deleteTask(taskIdToDelete: string): void {
    tasks = tasks.filter((task) => task.taskId !== taskIdToDelete);
    addTaskHTML();
}
function addLocalStorage(): void {
    localStorage.setItem("task", JSON.stringify(tasks));
  }
  function getLocalStorage(): void {
    const task = localStorage.getItem("task");
    if (task) {
      tasks = JSON.parse(task);
      addTaskHTML();
    }
  }
