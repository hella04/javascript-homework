var todoItems = [];

// const todoInput = document.getElementsByClassName("input");
// const addData = document.getElementsByClassName("input");

// function addTodo(input) {
//   var input = document.getElementById("userInput");
// }
// addEventListener("keypress", addTodo);

function renderTodo(todo) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));

  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = "";
    return;
  }
  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("list");
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}
