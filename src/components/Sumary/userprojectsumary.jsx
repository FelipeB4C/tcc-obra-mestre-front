import { Button } from '../Button';
import './projsmry.css';
import { FaUserTie, FaUser } from 'react-icons/fa6';

export const UserProjectSumary = ({ usertype, user }) => {
  return (
    <div className="data-sumary-project">
      <div className="title-name-user">
        {usertype == 'Profissional' && <FaUserTie />}
        {usertype == 'Cliente' && <FaUser />}
        <h2>Dados do {usertype}</h2>
      </div>
      <div className="data-name-score">
        <p>{user.nome}</p>
        <div className="score-usuario">
          <p>
            {usertype == 'Profissional' && <p>{user.avaliacaoProfissional}</p>}
            {usertype == 'Cliente' && <p>{user.notaCliente}</p>}
          </p>
          <p>({user.numAvaliacoes})</p>
        </div>
      </div>
      <p>{user.email}</p>
      <div className="data-location">
        <p>{user.estado}</p> <p>-</p> <p>{user.cidade}</p>
      </div>
      <div className="data-contact">
        <p>
          <b>Contato(s): </b>
        </p>
        <p>{user.contato1}</p>
        <p> | </p>
        <p>{user.contato2}</p>
      </div>
      <Button srcIcon="/src/img/whatsapp.svg" label={'Fale comigo!'} />
    </div>
  );
};
