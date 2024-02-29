import './styles.css';
import { Link } from 'react-router-dom';
import logo from '../../img/logoobra.png';
import { Container } from '../Container';
import { useState } from 'react';

export const Menu = () => {
  const [active, setMode] = useState(false);
  const ToggleMode = () => {
    setMode(!active);
  };

  return (
    <nav className="nav-background">
      <Container className={'container-menu'}>
        <div className="navbar">
          <Link to="/">
            <img className="logo" src={logo} alt="logo obra mestre" />
          </Link>
          <img className="icon-menu" src="src/assets/menu.svg" alt="" />
          <ul className="list" id="itens">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/biolink">BioLink</Link>
            </li>
            <li>
              <Link to="/register">Cadastre-se</Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};
