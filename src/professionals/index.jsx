import { useEffect, useState } from 'react';
import { Sumary } from '../components/Sumary';
const token = localStorage.getItem('token');

export const Professionals = () => {
  const [listProfessionals, setListProfessionals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/profissional/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setListProfessionals(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <Sumary profissional={listProfessionals} />;
};
