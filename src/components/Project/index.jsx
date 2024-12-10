import { Container } from 'react-bootstrap';
import { Button } from '../Button';
import './styles.css';
import { Link } from 'react-router-dom';
import { ProjectFilter } from '../ProjectFilter';

export const Project = ({ projetos }) => {
  return (
    <Container>
      {projetos.content && projetos.content.length > 0 ? (
        projetos.content.map((proj) => (
          <Link
            className="go-to-project"
            key={proj.id}
            to={`/project/${proj.id}`}
          >
            <div className="project-field">
              <div className="project-info">
                <div className="project-name">
                  <h2>{proj.nomeProjeto}</h2>
                </div>
                <div className="project-date"></div>
                <div className="project-desc">
                  <p>{proj.descTrabalho}</p>
                </div>
                <div>
                  <p>Preciso de: {proj.ocupacao}</p>
                </div>
                <div className="project-location">
                  {proj.estado} - {proj.cidade}
                </div>
              </div>
              <div className="contact-client-info">
                <p>{proj.cliente.contato1}</p>
                <p>{proj.cliente.contato2}</p>
                <Button
                  label={'Fale comigo!'}
                  srcIcon={'/src/img/whatsapp.svg'}
                />
              </div>
              <div className="button-mobile-display">
                <Button
                  label={'Fale comigo!'}
                  srcIcon={'/src/img/whatsapp.svg'}
                />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Nenhum projeto disponível.</p>
      )}
    </Container>
  );
};

// export const Projects = () => {
//   const [listProjects, setProjects] = useState([]);

//   const fetchProjects = (filters) => {
//     const { nomeProjeto, estado, cidade } = filters;
//     fetch(`http://localhost:8080/projeto/pageable?nomeProjeto=${nomeProjeto}&estado=${estado}&cidade=${cidade}&page=0&linesPerPage=24&orderBy=nomeProjeto&direction=ASC`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         setProjects(data.content); // Ajuste conforme necessário para acessar os dados
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     // Carrega todos os projetos inicialmente, caso os filtros sejam vazios
//     fetchProjects({ nomeProjeto: '', estado: '', cidade: '' });
//   }, []);

//   return (
//     <div>
//       <ProjectFilter onFilter={fetchProjects} />
//       <Project projetos={listProjects} />
//     </div>
//   );
// };