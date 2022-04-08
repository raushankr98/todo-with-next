import { useState } from "react";
import { connect } from "react-redux";
import styles from "../../styles/Todo.module.css";

function Todo({ todos, addTodo, removeTodo, toggleTodo, editTodo }) {
  const [todo, setTodo] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [edit, setEdit] = useState({ id: "", text: "" });
  const [error, setError] = useState(false);

  const handleOnchange = (e) => {
    setTodo(e.target.value);
    setError(false);
  };

  const handleTodo = () => {
    if (todo.length > 0) {
      addTodo(todo);
      setTodo("");
      setToggleEdit(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleEdit = (id, text) => {
    setTodo(text);
    setToggleEdit(true);
    setEdit({ id, text });
  };

  const handleEditText = () => {
    if (todo.length > 0) {
      setToggleEdit(false);
      editTodo(edit.id, todo);
      setTodo("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <h1>Todo</h1>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          value={todo}
          placeholder="Add todo..."
          onChange={(e) => handleOnchange(e)}
        />
        {error && <span className={styles.error}>This field is required</span>}
      </div>
      {!toggleEdit ? (
        <button className={styles.btn} onClick={handleTodo}>
          Add
        </button>
      ) : (
        <button className={styles.btn} onClick={handleEditText}>
          Edit
        </button>
      )}
      <ul>
        {todos.length > 0 &&
          todos.map((todo) => (
            <li className={styles.todoList} key={todo.id}>
              <div className={styles.todo}>
                <input
                  type="checkbox"
                  disabled={todo.completed}
                  style={{
                    marginRight: "10px",
                    cursor: !todo.completed ? "pointer" : "default",
                    padding: "7px",
                  }}
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <p
                  className={styles.textList}
                  style={
                    todo.completed ? { textDecorationLine: "line-through" } : {}
                  }
                >
                  {todo.text}
                </p>
              </div>
              <div className={styles.btnContainer}>
                <button
                  className={styles.btn}
                  style={{ marginRight: "10px" }}
                  onClick={() => removeTodo(todo.id)}
                >
                  Remove
                </button>
                <button
                  className={styles.btn}
                  style={todo.completed ? { visibility: "hidden" } : {}}
                  onClick={() => handleEdit(todo.id, todo.text)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default connect(
  (state) => ({
    todos: state.todoReducer.todos,
  }),
  (dispatch) => ({
    addTodo: (text) => dispatch({ type: "TODO_ADD", text }),
    removeTodo: (id) => dispatch({ type: "TODO_REMOVE", id }),
    toggleTodo: (id) => dispatch({ type: "TODO_TOGGLE", id }),
    editTodo: (id, text) => dispatch({ type: "TODO_EDIT", id, text }),
  })
)(Todo);
