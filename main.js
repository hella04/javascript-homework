let todoArray = [];

// when we load the page, we want to load the todos from local storage

function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  const todo = {
    id: Date.now(),
    value: todoInput.value,
    isCompleted: false,
  };

  /* Create list element */
  const todoItem = document.createElement("li");
  todoItem.innerText = todoInput.value;
  todoItem.dataset.key = todo.id;

  /* Create delete button */
  const todoDelete = document.createElement("button");
  todoDelete.innerText = "Delete";
  todoItem.append(todoDelete);

  /* Add event listener to delete button */
  todoDelete.addEventListener("click", function () {
    todoItem.remove();
  });

  /* Create delete button */
  const todoComplete = document.createElement("button");
  todoComplete.innerText = "Complete";
  todoItem.append(todoComplete);

  /* Add event listener to delete button */
  todoComplete.addEventListener("click", function () {
    // todo item isCompleted should be true
    // mark somehow the todo item as completed
  });

  todoArray.push(todo);

  list.append(todoItem);
}
