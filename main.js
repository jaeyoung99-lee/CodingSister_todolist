let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
  // let taskContent = taskInput.value;
  // taskList.push(taskContent);
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `
    <div class="task">
        <div class="task-done">
            ${taskList[i].taskContent}
        </div>
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
            <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
    `;
    } else {
      resultHTML += `
      <div class="task">
          <div>
              ${taskList[i].taskContent}
          </div>
          <div>
              <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
              <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
      </div>
      `;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      // taskList[i].isComplete = true;
      // true를 false로 하고 false를 true로 해서 결과를 계속 바꾸고 싶을 땐 !(not) 사용
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
