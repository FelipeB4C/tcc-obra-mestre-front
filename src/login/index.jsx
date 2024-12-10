import { Button } from 'react-bootstrap';
import { Input } from '../components/Input';
import './styles.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { jwtDecode } from 'jwt-decode';

export const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const { login } = useAuth();

  function doLogin(credentials) {
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        takeEmailFromToken(data);
        takeIdProfissionalFromToken(data);
        login();
        navigate('/', { message: 'Projeto criado com sucesso!' });
      })
      .catch((err) => console.log(err));
  }

  function takeEmailFromToken(data) {
    const decodedToken = jwtDecode(data.token);
    localStorage.setItem('sub', decodedToken.sub);
  }

  function takeIdProfissionalFromToken(data) {
    const decodedToken = jwtDecode(data.token);
    console.log(jwtDecode(data.token))
    const idProfissional = decodedToken.id_profissional || null; // Decodifica o campo idProfissional
    localStorage.setItem('id_profissional', idProfissional); // Armazena no localStorage
  
  }

  const [credentials, setCredentials] = useState({});

  const submit = (e) => {
    e.preventDefault();
    doLogin(credentials);
  };

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <section className="container">
      <div className="loginOut">
        <div className="loginIn">
          <div>
            <img src="src/img/logo.png" className="logo" />
            <h1>Login</h1>
            <form onSubmit={submit}>
              <Input
                className="inputForm"
                name="login"
                label="E-mail"
                type="text"
                placeholder={'Digite seu e-mail'}
                handleOnChange={handleChange}
              />
              <Input
                className="inputPassword"
                name="senha"
                label="Senha"
                type="password"
                placeholder={'Digite sua senha'}
                handleOnChange={handleChange}
              />
              <p>
                <a href="">Esqueceu a senha?</a>
              </p>
              <Button type="submit">LOGIN</Button>
            </form>
            <Button variant="outline-primary" as={Link} to={'/register'}>
              CADASTRE-SE
            </Button>
          </div>
          <div>
            <img src="src/img/obra.jpeg" className="banner" />
          </div>
        </div>
      </div>
    </section>
  );
};
