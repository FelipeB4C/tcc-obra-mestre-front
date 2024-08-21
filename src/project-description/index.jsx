import { useEffect, useState } from 'react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserProjectSumary } from '../components/Sumary/userprojectsumary';
import { FaCircleInfo } from 'react-icons/fa6';

export const ProjectDescription = () => {
  const params = useParams();
  const { id } = params;
  const [project, setProject] = useState({});
  const [cliente, setCliente] = useState({});
  const [profissional, setProfissional] = useState({});

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
        setCliente(data.cliente);
        setProfissional(data.profissional);
      })
      .catch((err) => console.log(err));
  }, []);

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
    </Container>
  );
};
