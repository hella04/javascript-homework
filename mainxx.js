let todoArray = [];

//load the todos from local storage
window.addEventListener("load", function () {
  const storedTodoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

  // todoArray stored items
  todoArray = storedTodoItems;

  //todo list add stored items
  const todoList = document.getElementById("todo-list");
  for (const todo of todoArray) {
    const todoItem = createTodoItem(todo);
    todoList.appendChild(todoItem);
  }
});

function addTodo() {
  const todoInput = document.getElementById("todo-input");

  // todo object id
  const todo = {
    id: Date.now(),
    value: todoInput.value,
    isCompleted: false,
  };

  // save new todo item
  saveTodo(todo.value);

  // create and append todo item to the list
  const todoList = document.getElementById("todo-list");
  const todoItem = createTodoItem(todo);
  todoList.appendChild(todoItem);

  // clear input field
  todoInput.value = "";
}

function saveTodo(todoValue) {
  // check if there is existing data in localStorage
  let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

  // add new todo item to array
  todoItems.push(todoValue);

  // save the updated array back to localStorage
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function createTodoItem(todo) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  const todoText = document.createElement("span");
  todoText.innerText = todo.value;
  todoItem.appendChild(todoText);

  // create delete button
  const todoDelete = document.createElement("button");
  todoDelete.innerText = "Delete";
  todoItem.appendChild(todoDelete);

  // event listener to delete button
  todoDelete.addEventListener("click", function () {
    todoItem.remove();
    deleteTodo(todo.value);
  });

  // create complete button
  const todoComplete = document.createElement("button");
  todoComplete.innerText = "Complete";
  todoItem.appendChild(todoComplete);

  // event listener to complete button
  todoComplete.addEventListener("click", function () {
    todoItem.classList.add("completed");
  });

  return todoItem;
}

// remove todo item from the array
function deleteTodo(todoValue) {
  const index = todoArray.indexOf(todoValue);
  if (index !== -1) {
    todoArray.splice(index, 1);
  }

  // update localStorage to remove deleted item
  localStorage.setItem("todoItems", JSON.stringify(todoArray));

  const todoList = document.getElementById("todo-list");
  const todoItem = todoList.querySelector(`[data-value="${todoValue}"]`);
  if (todoItem) {
    todoItem.remove();
  }
}
