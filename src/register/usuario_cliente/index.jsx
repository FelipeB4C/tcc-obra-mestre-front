import './styles.css';
import { Input } from '../../components/Input';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Register = () => {
  const navigate = useNavigate();

  function registerUser(usuario) {
    fetch('http://localhost:8080/usuario/cadastrar', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(usuario),
    })
      .then((resp) => {
        console.log('Resposta da API:', resp); // Log da resposta completa
        if (resp.ok) {
          const location = resp.headers.get('Location');
          console.log('Cabeçalho Location:', location); // Log do cabeçalho Location
          if (location) {
            const userId = location.split('/').pop(); // Extrai o ID da URI
            console.log('ID do usuário:', userId); // Log do ID do usuário
            return userId;
          } else {
            throw new Error('Cabeçalho Location não encontrado');
          }
        } else {
          throw new Error('Erro ao cadastrar usuário');
        }
      })
      .then((userId) => {
        navigate(`/register/professional/${userId}`, {
          state: { message: 'Usuário criado com sucesso!' },
        });
      })
      .catch((err) => console.log('Erro:', err));
  }

  const [usuario, setUsuario] = useState({});

  const submit = (e) => {
    e.preventDefault();
    registerUser(usuario);
  };

  function handleChange(e) {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  function confereSenha() {
    const senha = document.querySelector('input[name=senha]');
    const confirmaSenha = document.querySelector('input[name=confirmaSenha]');

    if (confirmaSenha.value === senha.value) {
      confirmaSenha.setCustomValidity('');
    } else {
      confirmaSenha.setCustomValidity('As senhas não são as mesmas');
    }
  }

  function confereEmail() {
    const email = document.querySelector('input[name=email]');
    const confirmaEmail = document.querySelector('input[name=confirmaEmail]');

    if (confirmaEmail.value === email.value) {
      confirmaEmail.setCustomValidity('');
    } else {
      confirmaEmail.setCustomValidity('Os emails não são os mesmos');
    }
  }

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/\D/g, ''); // Remove tudo que não for número
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 3) return phoneNumber;
    if (phoneNumberLength < 7)
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    if (phoneNumberLength <= 11)
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  function handleChange(e) {
    const { name, value } = e.target;
    const formattedValue =
      name === 'contato1' || name === 'contato2'
        ? formatPhoneNumber(value)
        : value;

    setUsuario({ ...usuario, [name]: formattedValue });
  }

  return (
    <Container>
      <div className="form-field">
        <h1>Cadastro</h1>
        <form onSubmit={submit} autoComplete="off">
          <div className="radios-inputs">
            <div className="radio-input">
              <input
                type="radio"
                name="tipoUsuario"
                value="1"
                onChange={handleChange}
              />
              <label htmlFor="">Pessoa Física</label>
            </div>

            <div className="radio-input">
              <input
                type="radio"
                name="tipoUsuario"
                value="2"
                onChange={handleChange}
              />
              <label htmlFor="">Pessoa Jurídica</label>
            </div>
          </div>

          <div className="flex-inputs">
            <Input
              label={'Nome'}
              type={'text'}
              name="nome"
              length={15}
              placeholder={'Digite seu nome'}
              handleOnChange={handleChange}
              required
            />
            {usuario.tipoUsuario == 1 && (
              <Input
                label={'CPF'}
                type={'number'}
                name={'cpfOuCnpj'}
                id={'cpf'}
                placeholder={'000.000.000-00'}
                handleOnChange={handleChange}
                required
              />
            )}

            {usuario.tipoUsuario == 2 && (
              <Input
                label={'CNPJ'}
                type={'number'}
                name={'cpfOuCnpj'}
                placeholder={'000.000.000-00'}
                handleOnChange={handleChange}
                required
              />
            )}
          </div>

          <div className="flex-inputs">
            <Input
              label={'E-mail'}
              type={'email'}
              name={'email'}
              placeholder={'seuemail@contato.com'}
              handleOnChange={handleChange}
              required
            />
            <Input
              label={'Confirme seu E-mail'}
              type={'email'}
              name={'confirmaEmail'}
              placeholder={'Confirme seu e-mail'}
              handleOnChange={confereEmail}
              required
            />
          </div>

          <div className="flex-inputs">
            <Input
              label={'Senha'}
              type={'password'}
              name={'senha'}
              placeholder={'...'}
              handleOnChange={handleChange}
              required
            />
            <Input
              label={'Confirme a senha'}
              name={'confirmaSenha'}
              type={'password'}
              handleOnChange={confereSenha}
              placeholder={'...'}
              required
            />
          </div>

          <div className="flex-inputs">
            <Input
              label={'Contato 1'}
              type={'text'}
              name={'contato1'}
              value={usuario.contato1 || ''}
              placeholder={'(00) 0 0000-0000'}
              handleOnChange={handleChange}
              required
            />
            <Input
              label={'Contato 2 (Opcional)'}
              type={'text'}
              name={'contato2'}
              value={usuario.contato2 || ''}
              placeholder={'(00) 0 0000-0000'}
              handleOnChange={handleChange}
            />
          </div>

          <div className="flex-inputs">
            <Input
              label={'Estado'}
              type={'text'}
              name={'estado'}
              placeholder={'Insira Estado'}
              handleOnChange={handleChange}
              required
            />
            <Input
              label={'Cidade'}
              type={'text'}
              name={'cidade'}
              placeholder={'Insira cidade'}
              handleOnChange={handleChange}
              required
            />
          </div>

          <Button type="submit" variant="primary">
            ENVIAR
          </Button>
        </form>
      </div>
    </Container>
  );
};
