import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Array<Todo> = [];

const todosContainer = <HTMLDivElement>(
  document.querySelector(".todosContainer")
);

const todoInput = <HTMLInputElement>document.getElementsByName("title")[0];
const myForm = <HTMLFormElement>document.getElementById("myForm");

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.floor(Math.random() * 1000)),
  };

  todos.push(todo);

  todoInput.value = "";

  renderTodo(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo = document.createElement("div");
  todo.className = "todo";

  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    });
    paragraph.className = checkBox.checked ? "textCut" : "";
  };

  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : "";

  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deletebtn";
  btn.onclick = () => {
    deleteTodo(id);
    renderTodo(todos);
  };

  todo.append(checkBox, paragraph, btn);

  todosContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const index = todos.findIndex((item) => item.id === id);

  todos.splice(index, 1);
};

const renderTodo = (todos: Todo[]) => {
  todosContainer.innerHTML = "";
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};
