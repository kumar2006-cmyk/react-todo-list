import React, { useState } from 'react';
import {
  IoAdd,
  IoRadioButtonOn,
  IoRadioButtonOffSharp,
} from 'react-icons/io5';
import {
  FaStar,
  FaRegStar,
  FaEdit,
  FaSave,
  FaTrash,
} from 'react-icons/fa';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (input.trim() === '') {
      alert('Please enter a task!');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      favorite: false,
    };

    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const toggleFavorite = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, favorite: !task.favorite }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: editText.trim() }
          : task
      )
    );

    setEditId(null);
    setEditText('');
  };

  return (
    <div className="todo-container">
      <div className="todo-card">
        <h1>My To-Do List</h1>
        <p className="subtitle">Organize your day, one task at a time!</p>

        <div className="todo-input">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask();
              }
            }}
          />

          <button className="add-btn" onClick={addTask}>
            <IoAdd />
            Add
          </button>
        </div>

        <div className="task-info">
          <span>Total: {tasks.length}</span>
          <span>
            Completed: {tasks.filter((task) => task.completed).length}
          </span>
          <span>
            Pending: {tasks.filter((task) => !task.completed).length}
          </span>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">
              No tasks yet. Add your first task!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                className={`task-item ${
                  task.completed ? 'completed' : ''
                }`}
                key={task.id}
              >
                <button
                  className="complete-btn"
                  onClick={() => toggleComplete(task.id)}
                  title="Complete task"
                >
                  {task.completed ? (
                    <IoRadioButtonOn />
                  ) : (
                    <IoRadioButtonOffSharp />
                  )}
                </button>

                {editId === task.id ? (
                  <input
                    className="edit-input"
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        saveEdit(task.id);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span className="task-text">{task.text}</span>
                )}

                <button
                  className="icon-btn favorite-btn"
                  onClick={() => toggleFavorite(task.id)}
                  title="Favorite task"
                >
                  {task.favorite ? <FaStar /> : <FaRegStar />}
                </button>

                {editId === task.id ? (
                  <button
                    className="icon-btn save-btn"
                    onClick={() => saveEdit(task.id)}
                    title="Save task"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className="icon-btn edit-btn"
                    onClick={() => startEdit(task)}
                    title="Edit task"
                  >
                    <FaEdit />
                  </button>
                )}

                <button
                  className="icon-btn delete-btn"
                  onClick={() => deleteTask(task.id)}
                  title="Delete task"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;