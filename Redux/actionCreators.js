import { addToDo, removeTodo, doneTodo, getAllTodo } from "./actionsTypes.js";

const addToDoAction = (title) => {
  return {
    type: addToDo,
    title,
  };
};

const removeTodoAction = (id) => {
  return {
    type: removeTodo,
    id,
  };
};
const doneTodoAction = (id) => {
  return {
    type: doneTodo,
    id,
  };
};
const getAllTodoAction = () => {
  return {
    type: getAllTodo,
  };
};
export { addToDoAction, removeTodoAction, doneTodoAction, getAllTodoAction };
