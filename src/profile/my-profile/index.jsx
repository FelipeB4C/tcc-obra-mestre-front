import './styles.css';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';
import { Input } from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirmation } from '../../components/DeleteConfirmation';

export const MyProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [idUsuario, setIdUsuario] = useState('');
  const [idProfissional, setIdProfissional] = useState('');
  const [nome, setNome] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [cpfOuCnpj, setCpfOuCnpj] = useState('');
  const [contato1, setContato1] = useState('');
  const [contato2, setContato2] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [notaCliente, setNotaCliente] = useState('');
  const [numAvaliacoes, setNumAvaliacoes] = useState('');

  const token = localStorage.getItem('token');
  const emailToken = localStorage.getItem('sub');
  const [user, setUser] = useState({});
  const [originalUser, setOriginalUser] = useState({});

  const [userUpdate, setUserUpdate] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/usuario/listarPorEmail/${emailToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
        setOriginalUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function updateDataUser(userU) {
    console.log(userU);
    fetch(
      `http://localhost:8080/usuario/atualizar/${user.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userU),
      },
      [],
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(token);
        console.log(data);
        navigate('/myprofile', {
          message: 'Profissional atualizado com sucesso!',
        });
      })
      .catch((err) => console.log(err));
  }

  function deleteUser() {
    console.log();
    fetch(
      `http://localhost:8080/usuario/deletar/${user.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      [],
    )
      .then((resp) => {
        navigate('/', {
          message: 'Usuário deletado com sucesso!',
        });
      })
      .catch((err) => console.log(err));
  }

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setUser(originalUser);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    const userType = user.tipoUsuario === 'Pessoa Física' ? 0 : 1;

    const userU = {
      nome: user.nome,
      tipoUsuario: userType,
      cpfOuCnpj: user.cpfOuCnpj,
      contato1: user.contato1,
      contato2: user.contato2,
      estado: user.estado,
      cidade: user.cidade,
    };
    console.log(userU);

    updateDataUser(userU);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    deleteUser();
    setShowModal(false);
  };

  const navCreateProfessional = () => {
    navigate(`/register/professional/${user.id}`);
  };

  const navCreateProject = () => {
    navigate(`/register/project/${user.id}`);
  };

  return (
    <Container>
      <Row className="myProfile">
        <Col md={2}>
          <ListGroup>
            <ListGroup.Item action onClick={navCreateProfessional}>
              Cadastrar dados profissionais
            </ListGroup.Item>
            <ListGroup.Item action onClick={navCreateProject}>
              Cadastrar projetos
            </ListGroup.Item>
            <ListGroup.Item action onClick={handleEditClick}>
              Atualizar Dados
            </ListGroup.Item>
            <ListGroup.Item action onClick={handleDeleteClick}>
              Deletar Conta
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>Perfil do Usuário</Card.Header>
            <Card.Body>
              <Form className="card-inputs">
                <Row className="row-input">
                  <Col md={12}>
                    <Form.Group controlId="formNome">
                      <Input
                        label={'Nome'}
                        type={'text'}
                        name={'nome'}
                        value={user.nome || ''}
                        handleOnChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="row-input">
                  <Col md={5}>
                    <Form.Group controlId="formEmail">
                      <Input
                        label={'E-mail'}
                        type={'text'}
                        name={'email'}
                        value={user.email || ''}
                        handleOnChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group controlId="formCpfOuCnpj">
                      <Input
                        label={'CPF/CNPJ'}
                        type={'text'}
                        name={'cpfOuCnpj'}
                        value={user.cpfOuCnpj || ''}
                        handleOnChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="row-input">
                  <Col md={5}>
                    <Form.Group controlId="formContato1">
                      <Input
                        label={'Contato 1'}
                        type={'text'}
                        name={'contato1'}
                        value={user.contato1 || ''}
                        handleOnChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group controlId="formContato2">
                      <Input
                        label={'Contato 2'}
                        type={'text'}
                        name={'contato2'}
                        value={user.contato2 || ''}
                        handleOnChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="row-input">
                  <Col md={5}>
                    <Form.Group controlId="formEstado">
                      <Input
                        label={'Estado'}
                        type={'text'}
                        name={'estado'}
                        value={user.estado || ''}
                        handleOnChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group controlId="formCidade">
                      <Input
                        label={'Cidade'}
                        type={'text'}
                        name={'cidade'}
                        value={user.cidade || ''}
                        handleOnChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="row-input">
                  <Col md={5}>
                    <Form.Group controlId="formNotaCliente">
                      <Input
                        label={'Nota como cliente'}
                        type={'text'}
                        name={'notaCliente'}
                        value={user.notaCliente}
                        handleOnChange={handleChange}
                        disabled={'disabled'}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group controlId="formNumAvaliacoes">
                      <Input
                        label={'Núm. de avaliações'}
                        type={'text'}
                        name={'numAvaliacoes'}
                        value={user.numAvaliacoes}
                        handleOnChange={handleChange}
                        disabled={'disabled'}
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
      <DeleteConfirmation
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Container>
  );
};
