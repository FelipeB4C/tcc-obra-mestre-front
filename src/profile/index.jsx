import { useParams } from 'react-router-dom';
import { BioHeader } from '../components/BioHeader';
import { TitleTopic } from '../components/TitleTopic';
import { Container } from 'react-bootstrap';
import { Button } from '../components/Button';

import './styles.css';

export const Profile = () => {
  const params = useParams();
  const { id } = params;

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
            <p>Engenheira - Crea: 1341-HX</p>
          </div>

          <div className="exp-user">
            <TitleTopic
              src={'/src/img/brain.svg'}
              title={'Experiências profissionais'}
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              nisi inventore nostrum, amet officia odit, iure similique soluta
              accusantium voluptates pariatur debitis excepturi numquam eum esse
              optio aut a deserunt!
            </p>
          </div>

          <div className="places-user">
            <TitleTopic
              src={'/src/img/place.svg'}
              title={'Locais que atendo'}
            />
            <span>Online</span>
            <span>Todas as regiões do Distrito Federal</span>
          </div>
        </div>
      </div>
    </Container>
  );
};
