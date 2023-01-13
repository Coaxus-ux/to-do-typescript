document.addEventListener("DOMContentLoaded", function <T>(): void {
  const addTaskButton: Node = document.getElementById("addTaskButton");
  getLocalStorage();
  addTaskButton.addEventListener("click", () => chechInput());
});
let globalTask: any[] = [];
let deleteTaskButton: NodeListOf<Element>;

function chechInput(): void {
  const task2AddInput = <HTMLInputElement>document.getElementById("task2Add");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskAlert = document.getElementById("taskAlert");

  const task2Add = task2AddInput.value.trim();

  if (task2Add.length < 1) {
    addTaskButton.classList.add("vaiven");
    taskAlert.classList.remove("hidden");
    task2AddInput.value = "";
    setTimeout(() => {
      addTaskButton.classList.remove("vaiven");
      taskAlert.classList.add("hidden");
    }, 1000);
    return;
  }
  task2AddInput.value = "";
  globalTask.push([
    {
      taskName: task2Add,
      taskId: Math.random().toString(30).substring(2),
    },
  ]);
  addTasks();
}

function addTasks(): void {
  const containerTask = document.getElementById("containerTask");
  globalTask.length < 1
    ? containerTask.classList.add("hidden")
    : containerTask.classList.remove("hidden");

  containerTask.innerHTML = "";
  for (let obj of globalTask) {
    let HTMLtoInsert = `
    <div class="info-task-container">
      <p>${obj[0].taskName}</p>
      <button id="${obj[0].taskId}" class="delete-task-button"><span class="material-symbols-outlined">delete</span></button>
    </div>
    `;
    containerTask.insertAdjacentHTML("beforeend", HTMLtoInsert);
  }
  deleteTaskButton = document.querySelectorAll(".delete-task-button");
  deleteTaskButton.forEach((button) => {
    button.addEventListener("click", () => deleteTask(button.id));
  });
  addLocalStorage();
}
function addLocalStorage(): void {
  localStorage.setItem("task", JSON.stringify(globalTask));
}
function getLocalStorage(): void {
  const task = localStorage.getItem("task");
  if (task) {
    globalTask = JSON.parse(task);
    addTasks();
  }
}
function deleteTask(taskIdToDelete: string): void {
  globalTask = globalTask.filter((task) => task[0].taskId !== taskIdToDelete);
  addTasks();
}
