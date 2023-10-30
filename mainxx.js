let todoArray = [];

window.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

// load todos from local storage
window.addEventListener("load", function () {
  const storedTodoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

  // initialize the todoArray with the stored items
  todoArray = storedTodoItems;

  if (todoArray.length > 0) {
    const section = document.getElementById("todo-section");
    section.classList.add("hidden");
  }

  // add stored items
  const todoList = document.getElementById("todo-list");
  for (const todo of todoArray) {
    const todoItem = createTodoItem(todo);
    todoList.appendChild(todoItem);
  }
});

function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  // todo object id
  const todo = {
    id: Date.now(),
    value: todoInput.value,
    isCompleted: false,
  };

  // save new todo item
  saveTodo(todo);

  // create and append todo item to the list
  const todoList = document.getElementById("todo-list");
  const todoItem = createTodoItem(todo);
  todoList.appendChild(todoItem);

  // clear input field
  todoInput.value = "";

  console.log(todoArray);
  if (todoArray.length > 0) {
    const section = document.getElementById("todo-section");
    section.classList.add("hidden");
  }
}

function saveTodo(todo) {
  // check if there is existing data in localStorage
  let storedTodoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

  // add the new todo object to the array
  storedTodoItems.push(todo);
  todoArray.push(todo);

  // save updated array back to localStorage
  localStorage.setItem("todoItems", JSON.stringify(storedTodoItems));
}

function createTodoItem(todo) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  // create complete button
  const todoComplete = document.createElement("input");
  todoComplete.type = "checkbox";
  todoComplete.innerText = "Complete";
  todoItem.appendChild(todoComplete);
  todoItem.classList.add("completebttn");

  // event listener for complete button
  todoComplete.addEventListener("click", function () {
    if (todo.isCompleted === false) {
      todoItem.classList.add("completed");
      todo.isCompleted = true;
    } else {
      todoItem.classList.remove("completed");
      todo.isCompleted = false;
    }

    // update localStorage to update the completed status
    const storedTodoItems = JSON.parse(localStorage.getItem("todoItems")) || [];
    const index = storedTodoItems.findIndex((item) => item.id === todo.id);
    if (index !== -1) {
      storedTodoItems[index] = todo;
    }

    localStorage.setItem("todoItems", JSON.stringify(storedTodoItems));
  });

  const todoText = document.createElement("span");
  todoText.innerText = todo.value;
  todoItem.appendChild(todoText);

  if (todo.isCompleted === true) {
    todoItem.classList.add("completed");
    todoComplete.checked = true;
  }

  // create delete button
  const todoDelete = document.createElement("button");
  todoDelete.innerText = "Delete";
  todoItem.appendChild(todoDelete);

  // event listener for delete button
  todoDelete.addEventListener("click", function () {
    todoItem.remove();
    deleteTodo(todo);
  });

  return todoItem;
}

// remove todo item from the array
function deleteTodo(todo) {
  const index = todoArray.findIndex((item) => item.id === todo.id);
  if (index !== -1) {
    todoArray.splice(index, 1);
  }

  // update localStorage to remove the deleted item
  const storedTodoItems = JSON.parse(localStorage.getItem("todoItems")) || [];
  const updatedStoredTodoItems = storedTodoItems.filter(
    (item) => item.id !== todo.id
  );
  localStorage.setItem("todoItems", JSON.stringify(updatedStoredTodoItems));

  if (todoArray.length === 0) {
    const section = document.getElementById("todo-section");
    section.classList.remove("hidden");
  }
}
