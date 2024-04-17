const inputField = document.querySelector(".input-field textarea"),
  todoLists = document.querySelector(".todoLists"),
  pendingNum = document.querySelector(".pending-num"),
  clearButton = document.querySelector(".clear-button");

// Toggle dark/light mode
function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

// We will call this function while adding, deleting and checking-unchecking the task
function allTasks() {
  let tasks = document.querySelectorAll(".pending");

  // If tasks' length is 0 then pending num text content will be no, if not then pending num value will be task's length
  pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;

  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    return;
  }
  todoLists.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
}

// Add task while we put value in text area and press enter
inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim(); // Trim function removes space of front and back of the inputted value

  // If enter button is clicked and inputted value length is greater than 0.
  if (e.key === "Enter" && inputVal.length > 0) {
    let liTag = ` <li class="list pending" onclick="handleStatus(this)">
          <input type="checkbox" />
          <span class="task">${inputVal}</span>
          <i class="uil uil-trash" onclick="deleteTask(this)"></i>
        </li>`;

    todoLists.insertAdjacentHTML("beforeend", liTag); // Inserting li tag inside the todoLists div
    inputField.value = ""; // Removing value from input field
    allTasks();
  }
});

// Checking and unchecking the checkbox while we click on the task
function handleStatus(e) {
  const checkbox = e.querySelector("input"); // Getting checkbox
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("pending");
  allTasks();
}

// Deleting task while we click on the delete icon.
function deleteTask(e) {
  e.parentElement.remove(); // Getting parent element and remove it
  allTasks();
}

// Deleting all the tasks while we click on the clear button.
clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
  allTasks();
});
