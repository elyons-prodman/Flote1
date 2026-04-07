import { useState } from 'react';
import './App.css';

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

const BADGE = {
  high:   { label: 'High',   cls: 'badge-high' },
  medium: { label: 'Medium', cls: 'badge-medium' },
  low:    { label: 'Low',    cls: 'badge-low' },
};

let nextId = 1;

function App() {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tasks, setTasks] = useState([]);

  function addTask() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask = { id: nextId++, text: trimmed, priority, done: false };
    setTasks(prev => {
      const updated = [...prev, newTask];
      return updated.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    });
    setText('');
  }

  function toggleDone(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Todo</h1>

        <div className="input-row">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="Add a task..."
            autoComplete="off"
          />
        </div>

        <div className="priority-row">
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="high">High priority</option>
            <option value="medium">Medium priority</option>
            <option value="low">Low priority</option>
          </select>
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>

        {tasks.length > 0 && <p className="section-label">Tasks</p>}

        <ul>
          {tasks.map(task => (
            <li key={task.id} className={`task-item priority-${task.priority}${task.done ? ' done' : ''}`}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              <div className="task-info">
                <span className="task-text">{task.text}</span>
                <span className={`priority-badge ${BADGE[task.priority].cls}`}>
                  {BADGE[task.priority].label}
                </span>
              </div>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>×</button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && <p className="empty">No tasks yet.</p>}
      </div>
    </div>
  );
}

export default App;
