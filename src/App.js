import { useState } from "react";

const initTask = [
  {
    id: 34565,
    taskName: "Coding",
  },
  {
    id: 34569,
    taskName: "Shopping",
  },
  {
    id: 34265,
    taskName: "Gym",
  },
];

export default function App() {
  const [task, setTask] = useState(initTask);

  function handleAddTask(task) {
    // console.log(task);
    setTask((t) => [...t, task]);
  }

  function handleDeleteItem(id) {
    setTask((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="main">
      <Header />
      <Form onAddTask={handleAddTask} />
      <TaskList task={task} onDeleteItem={handleDeleteItem} />
    </div>
  );
}

function Header() {
  return <h1>Todo App</h1>;
}

function Form({ onAddTask }) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskName) return;

    const id = crypto.randomUUID();
    const newTask = {
      taskName,
      id,
    };

    onAddTask(newTask);
  }

  return (
    <form className="task__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task__input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button className="task__btn">
        <span className="task__btn--icon">+</span>
      </button>
    </form>
  );
}

function TaskList({ task, onDeleteItem }) {
  return (
    <div className="task">
      <ul className="task__list">
        {task.map((task) => (
          <List task={task} key={task.id} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function List({ task, onDeleteItem }) {
  return (
    <li className="task__list--item">
      <p>{task.taskName}</p>
      <div id="btnDele" onClick={() => onDeleteItem(task.id)}>
        <span className="delete__btn">❌</span>
      </div>
    </li>
  );
}
