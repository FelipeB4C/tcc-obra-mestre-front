import { useEffect, useState } from 'react';
import { Project } from '../components/Project';

export const Projects = () => {
  const [listProjects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/projeto/listarTodosDisp', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Project projetos={listProjects} />
    </div>
  );
};
