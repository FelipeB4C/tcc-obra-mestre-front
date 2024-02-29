import './styles.css';
import { Input } from '../components/Input';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Register = () => {
  const navigate = useNavigate();

  function registerUser(usuario) {
    fetch(
      'http://localhost:8080/usuario/cadastrar',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(usuario),
      },
      [],
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        navigate('/', { message: 'Projeto criado com sucesso!' });
      })
      .catch((err) => console.log(err));
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
              type={'number'}
              name={'contato1'}
              placeholder={'(00) 0 0000-0000'}
              handleOnChange={handleChange}
              required
            />
            <Input
              label={'Contato 2 (Opcional)'}
              type={'number'}
              name={'contato2'}
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
