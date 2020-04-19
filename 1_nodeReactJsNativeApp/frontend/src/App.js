import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]); //initialize State w/ data type as will follow [], {}

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []); //dependency array

  async function handleAddProject() {

    const response = await api.post('projects', {
      title: `New Project ${Date.now()}`,
      owner: 'discombobulateme',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title='Projects'/>

      <ul>
        { projects.map(project => <li key={project.id}>{ project.title }</li>) }
      </ul>

      <button type="button" onClick={handleAddProject}>Add Projects</button>
    </>
  );
};

export default App;