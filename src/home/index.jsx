import { useEffect, useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

import './styles.css';

export const Home = () => {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Plataforma Freelancer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Recursos</Nav.Link>
              <Nav.Link href="#testimonials">Depoimentos</Nav.Link>
            </Nav>
            <Button variant="outline-light">Cadastre-se Agora</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <header className="App-header">
        <Container className="text-center">
          <h1>Bem-vindo à Plataforma Freelancer de Construção Civil</h1>
          <p>
            Encontre os melhores profissionais para seus projetos de construção,
            reformas e design de interiores.
          </p>
          <Button variant="primary">Cadastre-se Agora</Button>
        </Container>
      </header>

      <section id="features" className="features py-5">
        <Container>
          <h2 className="text-center mb-4">
            Por que escolher nossa plataforma?
          </h2>
          <Row>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src="https://via.placeholder.com/300" />
                <Card.Body>
                  <Card.Title>Profissionais Qualificados</Card.Title>
                  <Card.Text>
                    Encontre profissionais experientes e qualificados para
                    qualquer tipo de projeto.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src="https://via.placeholder.com/300" />
                <Card.Body>
                  <Card.Title>Projetos Personalizados</Card.Title>
                  <Card.Text>
                    Receba propostas personalizadas que atendem às suas
                    necessidades específicas.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src="https://via.placeholder.com/300" />
                <Card.Body>
                  <Card.Title>Fácil de Usar</Card.Title>
                  <Card.Text>
                    Navegue e encontre profissionais de forma rápida e fácil.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="testimonials" className="testimonials py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Depoimentos</h2>
          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Text>
                    Encontrei o arquiteto perfeito para minha reforma. Recomendo
                    a plataforma! - Cliente Satisfeito
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Text>
                    Consegui vários projetos através da plataforma. Excelente
                    para freelancers! - Profissional Satisfeito
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="App-footer bg-dark text-white py-3">
        <Container className="text-center">
          <p>
            &copy; 2024 Plataforma Freelancer de Construção Civil. Todos os
            direitos reservados.
          </p>
        </Container>
      </footer>
    </div>
  );
};
