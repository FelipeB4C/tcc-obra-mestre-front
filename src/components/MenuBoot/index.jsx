import { Button, Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';

import './styles.css';
import { Link } from 'react-router-dom';

export const MenuBoot = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img src="/src/img/logoobra.png" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/professionals">
              Ache Profissionais
            </Nav.Link>
            <Nav.Link as={Link} to="/projects">
              Ache Projetos
            </Nav.Link>
            <Button
              className="register-btn"
              variant="outline-primary"
              as={Link}
              to="/register"
            >
              Cadastre-se
            </Button>
            <Button
              className="login-btn"
              variant="primary"
              as={Link}
              to="/login"
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
