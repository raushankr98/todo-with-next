import { TODO_ADD, TODO_REMOVE, TODO_TOGGLE, TODO_EDIT } from "./action";
import { v4 as uuid } from 'uuid';

export const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuid(),
            text: action.text,
            completed: false,
          },
        ],
      };
    case TODO_REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case TODO_TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case TODO_EDIT:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
