import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './styles.css';
import { Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';

export const Copilot = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [id, setId] = useState(user.id);
  const [idProfissional, setIdProfissional] = useState(user.idProfissional);
  const [nome, setNome] = useState(user.nome);
  const [tipoUsuario, setTipoUsuario] = useState(user.tipoUsuario);
  const [cpfOuCnpj, setCpfOuCnpj] = useState(user.cpfOuCnpj);
  const [email, setEmail] = useState(user.email);
  const [contato1, setContato1] = useState(user.contato1);
  const [contato2, setContato2] = useState(user.contato2);
  const [estado, setEstado] = useState(user.estado);
  const [cidade, setCidade] = useState(user.cidade);
  const [notaCliente, setNotaCliente] = useState(user.notaCliente);
  const [numAvaliacoes, setNumAvaliacoes] = useState(user.numAvaliacoes);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setId(user.id);
    setIdProfissional(user.idProfissional);
    setNome(user.nome);
    setTipoUsuario(user.tipoUsuario);
    setCpfOuCnpj(user.cpfOuCnpj);
    setEmail(user.email);
    setContato1(user.contato1);
    setContato2(user.contato2);
    setEstado(user.estado);
    setCidade(user.cidade);
    setNotaCliente(user.notaCliente);
    setNumAvaliacoes(user.numAvaliacoes);
  };

  const handleSaveClick = async () => {
    const updatedUser = {
      id,
      idProfissional,
      nome,
      tipoUsuario,
      cpfOuCnpj,
      email,
      contato1,
      contato2,
      estado,
      cidade,
      notaCliente,
      numAvaliacoes,
    };

    try {
      const response = await fetch('https://sua-api-endpoint.com/atualizar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        // Sucesso na atualização
        setIsEditing(false);
      } else {
        // Tratar erro
        console.error('Erro ao atualizar os dados');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados para a API', error);
    }
  };

  return (
    <Container fluid>
      <Row className="bodybody">
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item action onClick={handleEditClick}>
              Atualizar Dados
            </ListGroup.Item>
            <ListGroup.Item action href="#delete">
              Deletar Conta
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Header>Perfil do Usuário</Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formNome">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formTipoUsuario">
                      <Form.Label>Tipo de Usuário</Form.Label>
                      <Form.Control
                        type="text"
                        value={tipoUsuario}
                        onChange={(e) => setTipoUsuario(e.target.value)}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formCpfOuCnpj">
                      <Form.Label>CPF/CNPJ</Form.Label>
                      <Form.Control
                        type="text"
                        value={cpfOuCnpj}
                        onChange={(e) => setCpfOuCnpj(e.target.value)}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formContato1">
                      <Form.Label>Contato 1</Form.Label>
                      <Form.Control
                        type="text"
                        value={contato1}
                        onChange={(e) => setContato1(e.target.value)}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formContato2">
                      <Form.Label>Contato 2</Form.Label>
                      <Form.Control
                        type="text"
                        value={contato2}
                        onChange={(e) => setContato2(e.target.value)}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formEstado">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        type="text"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formCidade">
                      <Form.Label>Cidade</Form.Label>
                      <Form.Control
                        type="text"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formNotaCliente">
                      <Form.Label>Nota do Cliente</Form.Label>
                      <Form.Control
                        type="number"
                        value={notaCliente}
                        onChange={(e) => setNotaCliente(e.target.value)}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formNumAvaliacoes">
                      <Form.Label>Número de Avaliações</Form.Label>
                      <Form.Control
                        type="number"
                        value={numAvaliacoes}
                        onChange={(e) => setNumAvaliacoes(e.target.value)}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {isEditing && (
                  <div className="mt-3">
                    <Button
                      variant="secondary"
                      onClick={handleCancelClick}
                      className="me-2"
                    >
                      Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveClick}>
                      Salvar Atualizações
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const user = {
  id: 1,
  idProfissional: 1,
  nome: 'Usuario1',
  tipoUsuario: 'Pessoa Física',
  cpfOuCnpj: '059442551145',
  email: 'email1@contato.com',
  contato1: 'contato1',
  contato2: 'contato1',
  estado: 'DF',
  cidade: 'Samambaia',
  notaCliente: 0.0,
  numAvaliacoes: 0,
};
