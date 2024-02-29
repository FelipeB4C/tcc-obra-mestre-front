import { Button } from '../Button';
import { Container } from '../Container';
import { Score } from '../Score';
import './styles.css';
import { useEffect, useState } from 'react';

export const BioHeader = ({ id }) => {
  const [idUsuario, setIdUsuario] = useState('');
  const [idProfissional, setIdProfissional] = useState('');
  const [nome, setNome] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [cpfOuCnpj, setCpfOuCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [contato1, setContato1] = useState('');
  const [contato2, setContato2] = useState('');
  const [contato2Enable, setFieldEnable] = useState('none');
  const [listProfissao, setListProfissao] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [listLocalAtendimento, setListLocalAtendimento] = useState([]);
  const [atendimentoOnline, setAtendimentoOnline] = useState(false);
  const [avaliacaoProfissional, setAvaliacaoProfissional] = useState(0);
  const [numAvaliacoes, setNumAvaliacoes] = useState(0);
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/profissional/listarUm/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setIdUsuario(data.idUsuario);
        setIdProfissional(data.idProfissional);
        setNome(data.nome);
        setTipoUsuario(data.tipoUsuario);
        setCpfOuCnpj(data.cpfOuCnpj);
        setEmail(data.email);
        setContato1(data.contato1);
        if (data.contato2) {
          setContato2(data.contato2);
        }
        setListProfissao(data.listProfissao);
        setDescricao(data.descricao);
        setListLocalAtendimento(data.listLocalAtendimento);
        setAtendimentoOnline(data.atendimentoOnline);
        setAvaliacaoProfissional(data.avaliacaoProfissional);
        setEstado(data.estado);
        setCidade(data.cidade);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <div className="colorHeader"></div>
      <div className="containerIn">
        <header className="headerBio">
          <div>
            <img className="imgUser" src="/src/img/Foto.png" alt="" />
          </div>
          <div className="info">
            <h2>{nome}</h2>
            <p>{email}</p>
            <p>
              {estado} - {cidade}
            </p>
            <Score score={avaliacaoProfissional} numAvaliacao={'375'} />
          </div>

          <div className="divisoria"></div>
          <div className="contato">
            <p>{contato1}</p>
            {contato2 && <p>{contato2}</p>}
            <Button srcIcon={'/src/img/whatsapp.svg'} label={'Fale comigo'} />
          </div>
        </header>
      </div>
    </Container>
  );
};
