let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = []; // 필터링된 데이터가 저장되는 배열
let mode = "all"; // 처음 상태는 전체를 보여주는 것이므로 all로 초기화
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask(event);
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let taskContent = taskInput.value;

  if (taskContent === "") {
    return alert("할 일을 입력하세요!");
  }

  let task = {
    id: randomIDGenerate(),
    taskContent: taskContent,
    isComplete: false,
  };

  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let list = [];
  let resultHTML = "";

  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
    <div class="task">
        <div class="task-done">
            ${list[i].taskContent}
        </div>
        <div>
            <button id="return-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
            <button id="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
    `;
    } else {
      resultHTML += `
      <div class="task">
          <div>
              ${list[i].taskContent}
          </div>
          <div>
              <button id="done-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
              <button id="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
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
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top = event.target.offsetTop + 47 + "px";
  }

  filterList = [];

  if (mode === "all") {
    // 전체 리스트를 보여줌.
    render();
  } else if (mode === "ongoing") {
    // 진행중인 리스트를 보여줌.
    // task.isComplete = false;
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    // 완료된 리스트를 보여줌.
    // task.isComplete = true;
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
