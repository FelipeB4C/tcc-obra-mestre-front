import { useEffect, useState } from 'react';

import './styles.css';

export const Home = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  });

  return (
    <div className="home-home">
      <h1>Home</h1>
    </div>
  );
};
