import { useParams } from 'react-router-dom';
import { BioHeader } from '../components/BioHeader';
import { TitleTopic } from '../components/TitleTopic';
import { Container } from 'react-bootstrap';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';

import './styles.css';

export const Profile = () => {
  const params = useParams();
  const { id } = params;

  const [idUsuario, setIdUsuario] = useState('');
  const [idProfissional, setIdProfissional] = useState('');
  const [cpfOuCnpj, setCpfOuCnpj] = useState('');
  const [contato2Enable, setFieldEnable] = useState('none');
  const [listProfissao, setListProfissao] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [listLocalAtendimento, setListLocalAtendimento] = useState([]);
  const [atendimentoOnline, setAtendimentoOnline] = useState(false);

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
        setCpfOuCnpj(data.cpfOuCnpj);
        setListProfissao(data.listProfissao);
        setDescricao(data.descricao);
        setListLocalAtendimento(data.localAtendimento);
        setAtendimentoOnline(data.atendimentoOnline);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(listLocalAtendimento);

  return (
    <Container>
      <BioHeader id={id} />
      <div className="body-profile">
        <div className="buttons-profile">
          <Button srcIcon={'/src/img/work.svg'} label={'Propor projeto'} />
          <Button
            srcIcon={'/src/img/share.svg'}
            label={'Compartilhar Perfil'}
          />
        </div>
        <div className="body-topics">
          <div>
            <TitleTopic
              src={'/src/img/worktab.svg'}
              title={'Habilidades profissionais'}
            />
            {listProfissao.map((prof) => (
              <p key={prof.ocupacao}>
                {prof.ocupacao}{' '}
                {prof.codProfissao && `- Código: ${prof.codProfissao}`}
              </p>
            ))}
          </div>

          <div className="exp-user">
            <TitleTopic
              src={'/src/img/brain.svg'}
              title={'Experiências profissionais'}
            />
            <p>{descricao}</p>
          </div>

          <div className="places-user">
            <TitleTopic
              src={'/src/img/place.svg'}
              title={'Locais que atendo'}
            />
            {atendimentoOnline === true && <span>Online</span>}
            {listLocalAtendimento.map((local) => (
              <span key={local}>{local}</span>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
