import {
  addToDo,
  removeTodo,
  doneTodo,
  getAllTodo,
} from "./Redux/actionsTypes.js";

import {
  addToDoAction,
  removeTodoAction,
  doneTodoAction,
  getAllTodoAction,
} from "./Redux/actionCreators.js";
window.removeTodoHandler = removeTodoHandler;
window.doneTodoHandler = doneTodoHandler;

const submitBtn = document.querySelector(".todo-button");
const todoElm = document.querySelector(".todo-input");
const todoContainer = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

const toDoListReducer = (state = [], action) => {
  switch (action.type) {
    case addToDo: {
      let newState = [...state];
      let newStateObj = {
        id: crypto.randomUUID(),
        title: action.title,
        todoDone: false,
      };
      newState.push(newStateObj);
      return newState;
    }
    case removeTodo: {
      let copyState = [...state];
      let newState = copyState.filter((todo) => todo.id !== action.id);
      return newState;
    }
    case doneTodo: {
      let newState = [...state];
      newState.some((todo) => {
        if (todo.id === action.id) {
          todo.todoDone = !todo.todoDone;
        }
      });
      return newState;
    }
    case getAllTodo: {
      return state;
    }

    default: {
      return state;
    }
  }
};

const store = Redux.createStore(toDoListReducer);
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const newToDoTitle = todoElm.value.trim();
  store.dispatch(addToDoAction(newToDoTitle));
  const todos = store.getState();
  todoElm.value = "";
  toDoGenarator(todos);
});

todoFilter.addEventListener("change", (event) => {
  store.dispatch(getAllTodoAction());

  let todos = store.getState();

  console.log(event.target.value);
  if (event.target.value === "all") {
    toDoGenarator(todos);
  } else if (event.target.value === "completed") {
    let complatedTodo = todos.filter((todo) => todo.todoDone);
    toDoGenarator(complatedTodo);
  } else if (event.target.value === "incomplete") {
    let inComplatedTodo = todos.filter((todo) => !todo.todoDone);
    toDoGenarator(inComplatedTodo);
  }
});

function doneTodoHandler(todoId) {
  store.dispatch(doneTodoAction(todoId));
  const todos = store.getState();
  toDoGenarator(todos);
}

function removeTodoHandler(todoId) {
  store.dispatch(removeTodoAction(todoId));
  const todos = store.getState();
  toDoGenarator(todos);
}

function toDoGenarator(todos) {
  todoContainer.innerHTML = "";
  todos.forEach((todo) => {
    todoContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="todo ${todo.todoDone && "completed"}">
      <li class="todo-item">${todo.title}</li>
      <button class="complete-btn" onclick=doneTodoHandler("${todo.id}")>
        <i class="fas fa-check-circle"></i>
      </button>
      <button class="trash-btn" onclick=removeTodoHandler("${todo.id}")>
        <i class="fas fa-trash"></i>
      </button>
    </div>
`
    );
  });
}
