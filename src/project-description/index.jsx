import { useEffect, useState } from 'react';
import './styles.css';
import { Button, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { UserProjectSumary } from '../components/Sumary/userprojectsumary';
import { FaCircleInfo } from 'react-icons/fa6';

export const ProjectDescription = () => {
  const params = useParams();
  const { id } = params;
  const [project, setProject] = useState({});
  const [cliente, setCliente] = useState({});
  const [profissional, setProfissional] = useState({});
  const idProfissional = localStorage.getItem('id_profissional')
  const [interessados, setInteressados] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:8080/projeto/listarUm/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        console.log(`DATA : ${project}`)
        setCliente(data.cliente);
        setProfissional(data.profissional);
        setInteressados(data.profissionaisInteressados)
        console.log(`INTERESSADOS : ${interessados}`)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInsertInProject = (idProfessional) => {
    fetch(`http://localhost:8080/projeto/${id}/inserir/${idProfessional}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Inclua o token se necessário
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Profissional adicionado ao projeto com sucesso!');
          // Opcional: Atualize o estado para refletir as mudanças
          setProfissional(idProfessional);
        } else {
          alert('Ocorreu um erro ao adicionar o profissional ao projeto.');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleInterest = () => {
    if (!idProfissional) {
      alert('Você precisa estar logado como um profissional para demonstrar interesse.');
      return;
    }

    fetch(`http://localhost:8080/projeto/${id}/interessado/${idProfissional}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Enviar o token, se necessário
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Você demonstrou interesse com sucesso!');
        } else {
          alert('Ocorreu um erro ao demonstrar interesse.');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <div className="project-data">
        <h1>PROJETO</h1>
        <div className="titulo-dados-projeto">
          <FaCircleInfo />
          <h2>Dados do Projeto</h2>
        </div>
        <h3>{project.nomeProjeto}</h3>
        <p>{project.descTrabalho}</p>
        <p>
          <b>Data início:</b> {project.dataInicio}

        </p>
      </div>
      <UserProjectSumary usertype={'Cliente'} user={cliente} />
      {profissional && (
        <UserProjectSumary usertype={'Profissional'} user={profissional} />
      )}
      {idProfissional && (
        <div className="interest-button">
          <button onClick={handleInterest}>Estou interessado</button>
        </div>
      )}

      <div className="interessados">
        <h3>Profissionais interessados</h3>
        {interessados && interessados.length > 0 ? (
          interessados.map((int) => (
            <Link
              className="go-to-profile"
              as={Link}
              to={`/profile/${int.idUsuario}`}
              key={int.idUsuario}
            >
              <div className="bio-sumary">
                <div className="bio-photo-sumary">
                  <img src="../src/img/usr.png" alt="" />
                </div>
                <div className="bio-info-sumary">
                  <div className="nome-nota">
                    <h2>{int.nome}</h2>
                    <p>
                      <img src="../src/img/star.svg" alt="" />
                      {int.avaliacaoProfissional} ({int.numAvaliacoes})
                    </p>
                  </div>
                  <div className="professions-sumary">
                    {int.listProfissao.map((int) => (
                      <p key={int.ocupacao}>{int.ocupacao}</p>
                    ))}
                  </div>
                  <div className="local-atendimento-sumary">
                    <p>Locais Atendimento: </p>
                    {int.localAtendimento.map((local) => (
                      <p key={local}>{local}</p>
                    ))}
                  </div>
                </div>
                <div className="bio-contact-sumary">
                  <p>{int.contato1}</p>
                  <p>{int.contato2}</p>
                  <Button onClick={() => handleInsertInProject(int.idProfissional)}>
                    Escolher para projeto
                  </Button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Nenhum projeto disponível.</p>
        )}
      </div>


    </Container>
  );
};
