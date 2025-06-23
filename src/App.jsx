import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CompletedTasks from './pages/CompletedTasks';
import About from './pages/About';
import Settings from './pages/Settings';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('light');

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                tasks={tasks}
                addTask={addTask}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            }
          />
          <Route
            path="/completed"
            element={<CompletedTasks tasks={tasks} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/settings"
            element={<Settings theme={theme} setTheme={setTheme} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;