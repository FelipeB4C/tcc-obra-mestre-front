import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './styles.css';

export const Copilot = () => {
  const [dados, setDados] = useState({
    listaDePessoas: [],
    campoBooleano: false,
    campoString: '',
  });

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const adicionarPessoa = () => {
    const novaPessoa = { nome, idade };
    setDados((prevDados) => ({
      ...prevDados,
      listaDePessoas: [...prevDados.listaDePessoas, novaPessoa],
    }));
    setNome('');
    setIdade('');
  };

  const handlePrint = () => {
    console.log(dados);
  };

  return (
    <div className="bodybody">
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />
      <input
        type="number"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        placeholder="Idade"
      />
      <button onClick={adicionarPessoa}>Adicionar Pessoa</button>
      <button onClick={handlePrint}>Imprimir Dados</button>
      <ul>
        {dados.listaDePessoas.map((pessoa, index) => (
          <li key={index}>
            {pessoa.nome} - {pessoa.idade} anos
          </li>
        ))}
      </ul>
    </div>
  );
};
