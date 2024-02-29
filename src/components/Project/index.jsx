import { Container } from 'react-bootstrap';
import { Button } from '../Button';
import './styles.css';
import { Link } from 'react-router-dom';

export const Project = ({ projetos }) => {
  return (
    <Container>
      {projetos.map((proj) => (
        <Link
          className="go-to-project"
          key={proj.id}
          as={Link}
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
      ))}
    </Container>
  );
};
