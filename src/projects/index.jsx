


import { useEffect, useState } from 'react';
import { Project } from '../components/Project';
import { ProjectFilter } from '../components/ProjectFilter';
import { Container, Row, Col } from 'react-bootstrap';
import './styles.css'; // Novo CSS para suportar o layout com menu lateral

const occupations = [
  { id: 0, name: 'Pedreiro' },
  { id: 1, name: 'Eletricista' },
  { id: 2, name: 'Designer de Interiores' },
  { id: 3, name: 'Arquiteto' },
  { id: 4, name: 'Engenheiro' },
];

export const Projects = () => {
  const [listProjects, setProjects] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [selectedOccupations, setSelectedOccupations] = useState([]);

  const fetchProjects = ({ nomeProjeto = '', estado = '', cidade = '', ocupacao = '' }) => {
    let query = `http://localhost:8080/projeto/pageable?`;
    if (nomeProjeto) query += `nomeProjeto=${nomeProjeto}&`;
    if (estado) query += `estado=${estado}&`;
    if (cidade) query += `cidade=${cidade}&`;
    if (ocupacao) query += `ocupacao=${ocupacao}&`;

    query = query.endsWith('&') ? query.slice(0, -1) : query;

    fetch(query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log(err));
  };

  const fetchProfessions = () => {
    fetch('http://localhost:8080/professions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => setProfessions(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProjects({});
    fetchProfessions();
  }, []);

  const handleFilterChange = (filters) => {
    fetchProjects({ ...filters, ocupacao: selectedProfession });
  };

  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession);
    fetchProjects({ ocupacao: profession });
  };

  return (
    <Container fluid className="projects-container">
      <Row>
        <Col md={3} className="sidebar">
          <h3>Profissões</h3>
          <ul className="profession-list">
            {professions.map((prof) => (
              <li
                key={prof}
                onClick={() => handleProfessionSelect(prof)}
                className={prof === selectedProfession ? 'selected' : ''}
              >
                {prof}
              </li>
            ))}

            <div className="occupations">
              <label htmlFor="">Filtre por área de atuação</label>
              {occupations.map((occupation) => (
                <label key={occupation.id}>
                  <input
                    type="checkbox"
                    value={occupation.name}
                    checked={selectedOccupations.includes(occupation.name)}
                    onChange={() => handleCheckboxChange(occupation.name)}
                  />
                  {occupation.name}
                </label>

              ))}
            </div>
          </ul>
        </Col>
        <Col md={9}>
          <ProjectFilter onFilter={handleFilterChange} />
          <Project projetos={listProjects} />
        </Col>
      </Row>
    </Container>
  );
};
