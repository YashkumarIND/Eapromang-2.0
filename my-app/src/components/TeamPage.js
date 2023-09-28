import React, { useState, useEffect } from 'react';
import '../css/Teampage.css'; // Import the CSS file

const TeamPage = ({ projectName, creator, onTaskAssignment }) => {
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);

  // Fetch tasks for the team when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/teams/${projectName}/tasks`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data.tasks);
        } else {
          console.error('Failed to fetch tasks for team:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching tasks for team:', error);
      }
    };

    fetchTasks();
  }, [projectName]);

  const handleTaskAssignment = async () => {
    if (newTask && dueDate) {
      // Create a new task object with description and due date
      const task = {
        description: newTask,
        dueDate: dueDate,
      };

      try {
        // Send a POST request to create the task for the team
        const response = await fetch(`/api/teams/${projectName}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });

        if (response.ok) {
          // Task created successfully, update the local tasks state
          setTasks([...tasks, task]);
          setAssignedTasks([...assignedTasks, task]);

          // Clear the input fields
          setNewTask('');
          setDueDate('');
        } else {
          console.error('Failed to create task:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  return (
    <div className="team-page">
      <h2>{projectName}</h2>
      <p>Creator: {creator}</p>

      <div className="notion-style-container">
        <div className="notion-style-block">
          <h3>Tasks</h3>
          {tasks.length === 0 ? (
            <p>No tasks assigned.</p>
          ) : (
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  {task.description} (Due: {task.dueDate})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="notion-style-block">
          <h3>Assign a Task</h3>
          <div className="task-form">
            <form onSubmit={handleTaskAssignment}>
              <input
                type="text"
                placeholder="Task description"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                required
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
              <button type="submit">Assign Task</button>
            </form>
          </div>
        </div>
      </div>

      <div className="notion-style-block">
        <h3>Assigned Tasks</h3>
        {assignedTasks.length === 0 ? (
          <p>No tasks assigned yet.</p>
        ) : (
          <ul>
            {assignedTasks.map((task, index) => (
              <li key={index}>
                {task.description} (Due: {task.dueDate})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
